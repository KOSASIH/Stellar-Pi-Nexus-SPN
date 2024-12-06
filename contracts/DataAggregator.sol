// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./Oracle.sol";

contract DataAggregator {
    struct OracleData {
        address oracleAddress;
        bytes32 key;
    }

    OracleData[] public oracles;

    // Function to add an oracle to the aggregator
    function addOracle(address _oracleAddress, bytes32 _key) public {
        oracles.push(OracleData(_oracleAddress, _key));
    }

    // Function to get the average value from all registered oracles
    function getAggregatedData() public view returns (uint256) {
        uint256 totalValue = 0;
        uint256 oracleCount = oracles.length;

        for (uint256 i = 0; i < oracleCount; i++) {
            totalValue += Oracle(oracles[i].oracleAddress).getData(oracles[i].key);
        }

        return totalValue / oracleCount;
    }
}
