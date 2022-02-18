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
        uint256[] votedIds; // Encuestas en las que voto la persona
        mapping(uint256 => bool) votedMap; // Permite busquedas instantaneas
    }

    // Almacenando todas las encuestas
    Poll[] private polls;
    mapping(address => Voter) private voters; // cada direccion en la cadena de bloques apunta a un unico votante
}
