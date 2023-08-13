// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./LoyaltyToken.sol";

contract UserContract {
    address payable public owner;
    uint256 public loyaltyTokensBalance;

    LoyaltyToken public loyaltyToken;

    constructor(address _loyaltyTokenAddress) {
        owner = payable(msg.sender);
        loyaltyToken = LoyaltyToken(_loyaltyTokenAddress);
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Only the owner can perform this action");
        _;
    }

    function getLoyaltyTokenBalance() public view returns (uint256) {
        return loyaltyToken.balanceOf(address(this));
    }

    function transferTokens(address payable vendorcontract, uint256 amount) public onlyOwner {
        require(amount <= loyaltyToken.balanceOf(address(this)), "Insufficient contract balance");
        loyaltyToken.transfer(vendorcontract, amount);
        loyaltyTokensBalance -= amount;
    }

    function withdrawTokens(uint256 amount) public onlyOwner {
        transferTokens(owner, amount);
    }
}
