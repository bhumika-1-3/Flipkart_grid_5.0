// SPDX-License-Identifier: MIT
pragma solidity ^0.8.2;

import "../LoyaltyToken.sol";

contract BankContract {

    address payable public owner;
    uint256 public burnable = 0;

    enum Tier { Tier1, Tier2, Tier3, Tier4 }

    struct Vendor {
        Tier vendorTier;
        uint256 maxPurchases;
        uint256 loyaltyTokensBalance;
    }

    mapping(address => Vendor) public vendorMapping;

    mapping(address => uint256) public userMapping;

    LoyaltyToken public loyaltyToken;

    constructor(
        address _loyaltyTokenAddress
    ) {
        owner = payable(msg.sender);
        loyaltyToken = LoyaltyToken(_loyaltyTokenAddress);
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Only the owner can perform this action");
        _;
    }

    function addVendor (
        Tier _vendorTier,
        uint256 _maxPurchases,
        address payable _vendorAddress,
        uint256 _balance
    ) public onlyOwner {
        vendorMapping[_vendorAddress].vendorTier = _vendorTier;
        vendorMapping[_vendorAddress].maxPurchases = _maxPurchases;
        if (burnable > _balance) {
            burnable -= _balance;
        }
        else{
            loyaltyToken.mintForUser(address(this), _balance-burnable);
            burnable = 0;
        }
        vendorMapping[_vendorAddress].loyaltyTokensBalance = _balance;
    }

    function addUser (
        address payable _userAddress
    ) public onlyOwner {
        if (burnable > 100) {
            burnable -= 100;
        }
        else{
            loyaltyToken.mintForUser(address(this), 100-burnable);
            burnable = 0;
        }
        userMapping[_userAddress] = 100;
    }

    function getTeasuryBalance() public view returns (uint){
        return loyaltyToken.balanceOf(address(this));
    }

    function setMaxPurchases(address _vendorAddress, uint256 _maxPurchases) public onlyOwner {
        vendorMapping[_vendorAddress].maxPurchases = _maxPurchases;
    }

    function setVendorTier(address _vendorAddress, Tier _vendorTier) public onlyOwner {
        vendorMapping[_vendorAddress].vendorTier = _vendorTier;
    }

    function issueTokens(address _userAddress, uint256 amount) public onlyOwner {
        if (burnable > amount) {
            burnable -= amount;
        }
        else{
            loyaltyToken.mintForUser(address(this), amount-burnable);
            burnable = 0;
        }
        vendorMapping[_userAddress].loyaltyTokensBalance = amount;
    }

    function transferTokens(address vendor, address user, uint256 amount) public onlyOwner {
        require(vendorMapping[vendor].loyaltyTokensBalance >= amount, "Insufficient LoyaltyTokens balance");
        vendorMapping[vendor].loyaltyTokensBalance -= amount;
        userMapping[user] += amount;
    }

    function spendTokens(address user, uint256 amount) public onlyOwner {
        require(userMapping[user] >= amount, "Insufficient LoyaltyTokens balance");
        userMapping[user] -= amount;
        burnable += amount;
    }
}
