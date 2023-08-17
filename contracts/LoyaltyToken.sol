// SPDX-License-Identifier: MIT
pragma solidity ^0.8.2;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract LoyaltyToken is ERC20{
    address payable public owner;
    address public factoryContract;

    constructor() ERC20("Flip Coins", "FC"){
        owner = payable(msg.sender);
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Only the owner can perform this action");
        _;
    }

    modifier onlyAuthorized() {
        require(msg.sender == owner || msg.sender == factoryContract, "Only the authorized can perform this action");
        _;
    }

    function setFactoryContractAddress(address payable _factoryContractAddress) public {
        factoryContract = _factoryContractAddress;
    }

    function mintForUser(address user, uint256 amount) public {
        _mint(user, amount * 10**18);
    }

    function burn(address user, uint256 amount) public {
        _burn(user, amount * 10**18);
    }

    function transfer(address to, uint256 amount) public override(ERC20) onlyAuthorized returns (bool) {
        return super.transfer(to, amount);
    }
}