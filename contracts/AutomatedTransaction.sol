// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract AutomatedTransaction {
    address public owner;
    event TransactionExecuted(address indexed to, uint256 amount);

    constructor() {
        owner = msg.sender;
    }

    function executeTransaction(address payable to, uint256 amount) public {
        require(msg.sender == owner, "Only owner can execute transactions");
        to.transfer(amount);
        emit TransactionExecuted(to, amount);
    }

    receive() external payable {}
}
