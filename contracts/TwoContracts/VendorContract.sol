// SPDX-License-Identifier: MIT
pragma solidity ^0.8.2;

import "../LoyaltyToken.sol";
import "./UserContract.sol";

contract VendorContract {

    address payable public owner;

    enum Tier { Tier1, Tier2, Tier3, Tier4 }

    struct Vendor {
        Tier vendorTier;
        uint256 maxPurchases;
        uint256 loyaltyTokensBalance;
    }

    mapping(address => Vendor) public vendorMapping;

    LoyaltyToken public loyaltyToken;
    UserContract public userContract;

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

    modifier onlyVendor(address _vendorAddress) {
        require(msg.sender == _vendorAddress, "Only the vendor can perform this action");
        _;
    }

    function setUserContract(address _userContractAddress) external onlyOwner {
        userContract = UserContract(_userContractAddress);
    }

    function getTeasuryBalance() public view returns (uint){
        return loyaltyToken.balanceOf(address(this));
    }

    function addVendor (
        Tier _vendorTier,
        uint256 _maxPurchases,
        address payable _vendorAddress,
        uint256 _balance
    ) public onlyOwner {
        vendorMapping[_vendorAddress].vendorTier = _vendorTier;
        vendorMapping[_vendorAddress].maxPurchases = _maxPurchases;
        loyaltyToken.mintForUser(address(this), _balance);
        vendorMapping[_vendorAddress].loyaltyTokensBalance = _balance;
    }

    function setMaxPurchases(address _vendorAddress, uint256 _maxPurchases) public onlyVendor(_vendorAddress){
        vendorMapping[_vendorAddress].maxPurchases = _maxPurchases;
    }

    function setVendorTier(address _vendorAddress, Tier _vendorTier) public onlyVendor(_vendorAddress){
        vendorMapping[_vendorAddress].vendorTier = _vendorTier;
    }

    function issueTokens(address _vendorAddress, address _userAddress, uint256 amount) public onlyVendor(_vendorAddress){
        require(vendorMapping[_vendorAddress].loyaltyTokensBalance >= amount, "Not enought loyalty tokens");
        loyaltyToken.transfer(address(userContract), amount);
        vendorMapping[_vendorAddress].loyaltyTokensBalance -= amount;
        userContract.getTokens(_userAddress, amount);
    }
}
