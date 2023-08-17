// SPDX-License-Identifier: MIT
pragma solidity ^0.8.2;

import "@openzeppelin/contracts/proxy/utils/Initializable.sol";
import "./LoyaltyToken.sol";
import "./UserContract.sol";

contract VendorContract is Initializable {

    address payable public owner;

    enum Tier { Tier1, Tier2, Tier3, Tier4 }

    Tier vendorTier;
    uint256 maxPurchases;
    
    LoyaltyToken public loyaltyToken;
    UserContract private userContract;
    
    function initialize(
        address _ownerAddress,
        address _loyaltyTokenAddress,
        uint256 _maxPurchases,
        uint256 _balance
    ) external initializer {
        owner = payable(_ownerAddress);
        loyaltyToken = LoyaltyToken(_loyaltyTokenAddress);
        maxPurchases = _maxPurchases;
        loyaltyToken.mintForUser(address(this), _balance);
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Only the owner can perform this action");
        _;
    }

    function getBalance() public view returns (uint){
        return loyaltyToken.balanceOf(address(this));
    }

    function setMaxPurchases(uint256 _maxPurchases) public onlyOwner {
        maxPurchases = _maxPurchases;
    }

    function setVendorTier(Tier _vendorTier) public onlyOwner {
        vendorTier = _vendorTier;
    }

    function issueTokens(address _userContractAddress, uint256 amount) public onlyOwner {
        require(getBalance() >= amount, "Not enought loyalty tokens");
        userContract = UserContract(_userContractAddress);
        loyaltyToken.transfer(address(userContract), amount);
    }
}
