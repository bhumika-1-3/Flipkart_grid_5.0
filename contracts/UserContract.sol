// SPDX-License-Identifier: MIT
pragma solidity ^0.8.2;

import "@openzeppelin/contracts/proxy/utils/Initializable.sol";
import "./LoyaltyToken.sol";
import "./VendorContract.sol";

contract UserContract is Initializable{
    address payable public owner;
    
    mapping(address => uint256) orderMapping;

    LoyaltyToken public loyaltyToken;

    function initialize(
        address _ownerAddress,
        address _loyaltyTokenAddress
    ) external initializer {
        owner = payable(_ownerAddress);
        loyaltyToken = LoyaltyToken(_loyaltyTokenAddress);
        loyaltyToken.mintForUser(address(this), 100);
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Only the owner can perform this action");
        _;
    }

    function getBalance() public view returns (uint){
        return loyaltyToken.balanceOf(address(this));
    }

    function spendTokens(uint256 amount) public onlyOwner {
        require(getBalance() >= amount, "Insufficient LoyaltyTokens balance");
        loyaltyToken.burn(address(this), amount);
    }
}
