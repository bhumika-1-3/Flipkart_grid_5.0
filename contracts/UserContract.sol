// SPDX-License-Identifier: MIT
pragma solidity ^0.8.2;

import "@openzeppelin/contracts/proxy/utils/Initializable.sol";
import "./LoyaltyToken.sol";
import "./VendorContract.sol";

contract UserContract is Initializable{
    address payable public owner;
    address public deployer;
    
    mapping(address => uint256) orderMapping;

    LoyaltyToken public loyaltyToken;

    function initialize(
        address _ownerAddress,
        address _loyaltyTokenAddress
    ) external initializer {
        owner = payable(_ownerAddress);
        deployer = tx.origin;
        loyaltyToken = LoyaltyToken(_loyaltyTokenAddress);
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Only the owner can perform this action");
        _;
    }

    function getBalance() public view returns (uint){
        return loyaltyToken.balanceOf(address(this));
    }

}
