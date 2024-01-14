// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Donation {
    mapping(address => uint256) public donations;

    function donate() public payable {
        require(msg.value > 0, "You need to send some Ether");
        donations[msg.sender] += msg.value;
    }

    function getDonationAmount(address donor) public view returns (uint256) {
        return donations[donor];
    }
}
