// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract DecentralizedIdentity {
    struct Identity {
        string name;
        string email;
        string publicKey;
        bool exists;
    }

    mapping(address => Identity) public identities;

    function createIdentity(string memory _name, string memory _email, string memory _publicKey) public {
        require(!identities[msg.sender].exists, "Identity already exists");
        identities[msg.sender] = Identity(_name, _email, _publicKey, true);
    }

    function updateIdentity(string memory _name, string memory _email, string memory _publicKey) public {
        require(identities[msg.sender].exists, "Identity does not exist");
        identities[msg.sender].name = _name;
        identities[msg.sender].email = _email;
        identities[msg.sender].publicKey = _publicKey;
    }

    function getIdentity(address _user) public view returns (string memory, string memory, string memory) {
        require(identities[_user].exists, "Identity does not exist");
        Identity memory identity = identities[_user];
        return (identity.name, identity.email, identity.publicKey);
    }
}
