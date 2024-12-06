// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Governance {
    struct Proposal {
        string description;
        uint256 voteCount;
        mapping(address => bool) voters;
    }

    Proposal[] public proposals;
    address public owner;

    constructor() {
        owner = msg.sender;
    }

    function createProposal(string memory description) public {
        require(msg.sender == owner, "Only owner can create proposals");
        proposals.push(Proposal({description: description, voteCount: 0}));
    }

    function vote(uint256 proposalIndex) public {
        Proposal storage proposal = proposals[proposalIndex];
        require(!proposal.voters[msg.sender], "You have already voted");
        proposal.voters[msg.sender] = true;
        proposal.voteCount++;
    }
}
