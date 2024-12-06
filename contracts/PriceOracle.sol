// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract PriceOracle {
    mapping(string => uint256) public prices;

    function updatePrice(string memory asset, uint256 price) public {
        prices[asset] = price;
    }

    function getPrice(string memory asset) public view returns (uint256) {
        return prices[asset];
    }
}
