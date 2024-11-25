// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract MultiSigWallet {
    // State variables
    address[] public owners;
    mapping(address => bool) public isOwner;
    uint public requiredConfirmations;
    uint public transactionCount;

    struct Transaction {
        address to;
        uint value;
        bool executed;
        uint confirmations;
        mapping(address => bool) isConfirmed;
    }

    mapping(uint => Transaction) public transactions;

    // Events
    event Deposit(address indexed sender, uint amount);
    event TransactionSubmitted(uint indexed transactionId, address indexed to, uint value);
    event TransactionConfirmed(uint indexed transactionId, address indexed owner);
    event TransactionExecuted(uint indexed transactionId);
    event OwnerAdded(address indexed newOwner);
    event OwnerRemoved(address indexed removedOwner);
    event RequiredConfirmationsChanged(uint required);

    // Modifiers
    modifier onlyOwner() {
        require(isOwner[msg.sender], "Not an owner");
        _;
    }

    modifier transactionExists(uint transactionId) {
        require(transactionId < transactionCount, "Transaction does not exist");
        _;
    }

    modifier notExecuted(uint transactionId) {
        require(!transactions[transactionId].executed, "Transaction already executed");
        _;
    }

    // Constructor
    constructor(address[] memory _owners, uint _requiredConfirmations) {
        require(_owners.length > 0, "Owners required");
        require(_requiredConfirmations > 0 && _requiredConfirmations <= _owners.length, "Invalid required confirmations");

        for (uint i = 0; i < _owners.length; i++) {
            isOwner[_owners[i]] = true;
        }
        owners = _owners;
        requiredConfirmations = _requiredConfirmations;
    }

    // Fallback function to receive Ether
    receive() external payable {
        emit Deposit(msg.sender, msg.value);
    }

    // Function to submit a transaction
    function submitTransaction(address to, uint value) public onlyOwner {
        uint transactionId = transactionCount++;
        Transaction storage newTransaction = transactions[transactionId];
        newTransaction.to = to;
        newTransaction.value = value;
        newTransaction.executed = false;
        newTransaction.confirmations = 0;

        emit TransactionSubmitted(transactionId, to, value);
    }

    // Function to confirm a transaction
    function confirmTransaction(uint transactionId) public onlyOwner transactionExists(transactionId) notExecuted(transactionId) {
        Transaction storage transaction = transactions[transactionId];
        require(!transaction.isConfirmed[msg.sender], "Transaction already confirmed");

        transaction.isConfirmed[msg.sender] = true;
        transaction.confirmations++;

        emit TransactionConfirmed(transactionId, msg.sender);

        if (transaction.confirmations >= requiredConfirmations) {
            executeTransaction(transactionId);
        }
    }

    // Function to execute a transaction
    function executeTransaction(uint transactionId) internal transactionExists(transactionId) notExecuted(transactionId) {
        Transaction storage transaction = transactions[transactionId];
        require(transaction.confirmations >= requiredConfirmations, "Not enough confirmations");

        transaction.executed = true;
        (bool success, ) = transaction.to.call{value: transaction.value}("");
        require(success, "Transaction execution failed");

        emit TransactionExecuted(transactionId);
    }

    // Function to add a new owner
    function addOwner(address newOwner) public onlyOwner {
        require(!isOwner[newOwner], "Already an owner");
        isOwner[newOwner] = true;
        owners.push(newOwner);
        emit OwnerAdded(newOwner);
    }

    // Function to remove an owner
    function removeOwner(address ownerToRemove) public onlyOwner {
        require(isOwner[ownerToRemove], "Not an owner");
        isOwner[ownerToRemove] = false;

        // Remove the owner from the owners array
        for (uint i = 0; i < owners.length; i++) {
            if (owners[i] == ownerToRemove) {
                owners[i] = owners[owners.length - 1];
                owners.pop();
                break;
            }
        }
        emit OwnerRemoved(ownerToRemove);
    }

    // Function to change the required confirmations
    function changeRequiredConfirmations(uint newRequired) public onlyOwner {
        require(newRequired > 0 && newRequired <= owners.length, "Invalid required confirmations");
        requiredConfirmations = newRequired;
        emit RequiredConfirmationsChanged(newRequired);
    }
}
