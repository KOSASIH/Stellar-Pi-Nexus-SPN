// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract IdentityVerification {
    mapping(address => bool) public verifiedUsers;

    function verifyUser (address user) public {
        verifiedUsers[user] = true;
    }

    function isVerified(address user) public view returns (bool) {
        return verifiedUsers[user];
    }
}
