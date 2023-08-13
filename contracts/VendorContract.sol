// SPDX-License-Identifier: MIT
pragma solidity ^0.8.2;

import "./LoyaltyToken.sol";

contract VendorContract {
    address public owner;
    uint256 public loyaltyTokensBalance;
    uint256 public maxPurchases;
    Tier public vendorTier;

    enum Tier { Tier1, Tier2, Tier3, Tier4 }

    LoyaltyToken public loyaltyToken;

    constructor(
        address _owner,
        address _loyaltyTokenAddress,
        uint256 _maxPurchases,
        Tier _vendorTier
    ) {
        loyaltyToken = LoyaltyToken(_loyaltyTokenAddress);
        maxPurchases = _maxPurchases;
        vendorTier = _vendorTier;
        owner = _owner;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Only the owner can perform this action");
        _;
    }

    function getLoyaltyTokenBalance() public view returns (uint256) {
        return loyaltyToken.balanceOf(address(this));
    }

    function setMaxPurchases(uint256 _maxPurchases) public onlyOwner {
        maxPurchases = _maxPurchases;
    }

    function setVendorTier(Tier _vendorTier) public onlyOwner {
        vendorTier = _vendorTier;
    }

    function issueTokens(address user, uint256 amount) public onlyOwner {
        require(amount <= getLoyaltyTokenBalance(), "Insufficient LoyaltyTokens balance");
        loyaltyToken.transfer(user, amount * 10**18);
    }
}
