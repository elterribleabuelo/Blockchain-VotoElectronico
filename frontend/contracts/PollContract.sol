//SPDX-License-Identifier: MIT
pragma solidity >=0.6.6;

contract PollContract {
    struct Poll {
        uint256 id;
        string question;
        string thumbnail;
        uint64[] votes;
        bytes32[] options;
    }

    struct Voter {
        address id; // Hash del usuario que esta botando
        uint256[] votedIds; // Ids de encuestas en las que voto la persona
        mapping(uint256 => bool) votedMap; // Permite busquedas instantaneas
    }

    // Almacenando todas las encuestas
    Poll[] private polls;
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
}
