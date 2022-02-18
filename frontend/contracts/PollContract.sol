//SPDX-License-Identifier: MIT
pragma solidity >=0.6.6;

contract PollContract {
    struct Poll {
        uint256 id;
        string question;
        string thumbnail;
        uint64[] votes; //[0,1,5,10,5,7,2]
        bytes32[] options;
    }

    struct Voter {
        address id; // Hash del usuario que esta botando
        uint256[] votedIds; // Ids de encuestas en las que voto la persona ---> CREDENCIAL DE ELECTOR
        mapping(uint256 => bool) votedMap; // Permite busquedas instantaneas, aqui se relaciona la encuesta y su estado de votacion(con respecto a una persona en particular)
    }

    Poll[] private polls; // Almacenando todas las encuestas
    mapping(address => Voter) private voters; // cada direccion en la cadena de bloques apunta a un unico votante

    function createPoll(
        string memory _question,
        string memory _thumb,
        bytes32[] memory _options
    ) public {
        // Restricciones
        require(bytes(_question).length > 0, "Empty question");
        require(_options.length > 1, "At leat 2 options required");

        // Code

        uint256 pollId = polls.length; //Id de la encuesta

        Poll memory newPoll = Poll({
            id: pollId,
            question: _question,
            thumbnail: _thumb,
            options: _options,
            votes: new uint64[](_options.length)
        });

        polls.push(newPoll);
    }

    function getPoll(uint256 _pollId)
        external
        view
        returns (
            uint256,
            string memory,
            string memory,
            uint64[] memory,
            bytes32[] memory
        )
    {
        require(_pollId < polls.length && _pollId >= 0, "No poll found");
        return (
            polls[_pollId].id,
            polls[_pollId].question,
            polls[_pollId].thumbnail,
            polls[_pollId].votes,
            polls[_pollId].options
        );
    }

    function vote(uint256 _pollId, uint64 _vote) external {
        /** Params:
        _pollId: Id de la encuesta en la que se desea votar
        _vote: Indice que toma la opcion en la encuesta
       */

        // Verificando si la encuesta en la que se desea votar es válida
        require(_pollId < polls.length, "Poll does not exist");

        // Verificando si la opcion elegida es válida
        require(_vote < polls[_pollId].options.length, "Invalid vote");

        // Verificando si la persona aun no ha votado en dicha encuesta
        require(
            voters[msg.sender].votedMap[_pollId] == false,
            "You already voted"
        );

        // Colocamos un voto más en la propiedad votes de Struc Poll (en el índice establecido--> _vote)
        polls[_pollId].votes[_vote] += 1;

        // Añadimos el id de la encuesta dentro del valor de la propiedad votedIds de Struct Voter
        voters[msg.sender].votedIds.push(_pollId);

        // Cambiamos el estado de votación de la persona dentro de la encuesta a true
        voters[msg.sender].votedMap[_pollId] = true;
    }
}
