// SPDX-License-Identifier: MIT
pragma solidity ^0.8.2;

import "../LoyaltyToken.sol";
import "./VendorContract.sol";

contract UserContract {
    address payable public owner;
    uint256 public burnable = 0;

    mapping(address => uint256) public userMapping;

    LoyaltyToken public loyaltyToken;
    VendorContract public vendorContract;

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

    modifier onlyVendor() {
        require(msg.sender == address(vendorContract)  || msg.sender == owner, "Only the vendor can perform this action");
        _;
    }

    modifier onlyUser(address _userAddress) {
        require(msg.sender == _userAddress  || msg.sender == owner, "Only user can perform this action on his account");
        _;
    }

    function getTeasuryBalance() public view returns (uint){
        return loyaltyToken.balanceOf(address(this));
    }

    function setVendorContract(address payable _vendorContractAddress) external onlyOwner {
        vendorContract = VendorContract(_vendorContractAddress);
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

    function spendTokens(address user, uint256 amount) public onlyUser(user) {
        require(userMapping[user] >= amount, "Insufficient LoyaltyTokens balance");
        userMapping[user] -= amount;
        burnable += amount;
    }

    function getTokens(address user, uint256 amount) public onlyVendor {
        userMapping[user] += amount;
    }
}
