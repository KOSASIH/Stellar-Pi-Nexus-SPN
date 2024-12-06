// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Oracle {
    // Mapping to store data associated with a unique key
    mapping(bytes32 => uint256) public data;

    // Event to emit when data is updated
    event DataUpdated(bytes32 indexed key, uint256 value);

    // Function to update data in the oracle
    function updateData(bytes32 _key, uint256 _value) public {
        data[_key] = _value;
        emit DataUpdated(_key, _value);
    }

    // Function to retrieve data from the oracle
    function getData(bytes32 _key) public view returns (uint256) {
        return data[_key];
    }
}
