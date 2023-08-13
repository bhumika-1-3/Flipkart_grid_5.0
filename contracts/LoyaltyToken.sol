// SPDX-License-Identifier: MIT
pragma solidity ^0.8.2;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract LoyaltyToken is ERC20{
    address payable public owner;

    constructor() ERC20("Flip Coins", "FC"){
        owner = payable(msg.sender);
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Only the owner can perform this action");
        _;
    }

    function mintForUser(address user, uint256 amount) public onlyOwner {
        _mint(user, amount * 10**18);
    }

    function burn(address user, uint256 amount) public onlyOwner{
        _burn(user, amount * 10**18);
    }

    function transferToUser(address to, uint256 amount) public {
        transfer(to, amount);
    }
}