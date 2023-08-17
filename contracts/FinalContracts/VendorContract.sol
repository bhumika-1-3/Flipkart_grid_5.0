// SPDX-License-Identifier: MIT
pragma solidity ^0.8.2;

import "./LoyaltyToken.sol";
import "./UserContract.sol";

contract VendorContract {

    address payable public owner;

    enum Tier { Tier1, Tier2, Tier3, Tier4 }

    Tier vendorTier;
    uint256 maxPurchases;
    
    LoyaltyToken public loyaltyToken;
    
    constructor(
        address _loyaltyTokenAddress
    ) {
        owner = payable(tx.origin);
        loyaltyToken = LoyaltyToken(_loyaltyTokenAddress);
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Only the owner can perform this action");
        _;
    }

    modifier onlyVendor(address _vendorAddress) {
        require(msg.sender == _vendorAddress || msg.sender == owner, "Only the vendor can perform this action");
        _;
    }

    function getBalance() public view returns (uint){
        return loyaltyToken.balanceOf(address(this));
    }

    function setMaxPurchases(address _vendorAddress, uint256 _maxPurchases) public onlyOwner{
        maxPurchases = _maxPurchases;
    }

    function setVendorTier(address _vendorAddress, Tier _vendorTier) public {
        vendorTier = _vendorTier;
    }

    function issueTokens(address _userContractAddress, uint256 amount) public {
        require(getBalance() >= amount, "Not enought loyalty tokens");
        userContract = UserContract(_userAddress)
        loyaltyToken.transfer(address(userContract), amount);
        vendorMapping[_vendorAddress].loyaltyTokensBalance -= amount;
        userContract.getTokens(_userAddress, amount);
    }
}
