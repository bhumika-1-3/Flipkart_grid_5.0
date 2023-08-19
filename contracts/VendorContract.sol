// SPDX-License-Identifier: MIT
pragma solidity ^0.8.2;

import "@openzeppelin/contracts/proxy/utils/Initializable.sol";
import "./LoyaltyToken.sol";
import "./UserContract.sol";

contract VendorContract is Initializable {

    address payable public owner;
    address public deployer;

    enum Tier { Tier1, Tier2, Tier3, Tier4 }

    Tier vendorTier;
    uint256 maxPurchases;
    
    LoyaltyToken public loyaltyToken;
    UserContract private userContract;
    
    function initialize(
        address _ownerAddress,
        address _loyaltyTokenAddress,
        uint256 _maxPurchases
    ) external initializer {
        owner = payable(_ownerAddress);
        loyaltyToken = LoyaltyToken(_loyaltyTokenAddress);
        maxPurchases = _maxPurchases;
        deployer = tx.origin;
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
}
