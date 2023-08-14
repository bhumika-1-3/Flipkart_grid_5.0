// SPDX-License-Identifier: MIT
pragma solidity ^0.8.2;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract LoyaltyToken is ERC20{
    address payable public owner;
    address public vendorContract;
    address public userContract;

    constructor() ERC20("Flip Coins", "FC"){
        owner = payable(msg.sender);
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Only the owner can perform this action");
        _;
    }

    modifier onlyAuthorized() {
        require(msg.sender == owner || msg.sender == vendorContract || msg.sender == userContract, "Only the authorized can perform this action");
        _;
    }

    function setVendorContractAddress(address payable _vendorContractAddress) public onlyOwner {
        vendorContract = _vendorContractAddress;
    }

    function setUserContractAddress(address payable _userContractAddress) public onlyOwner {
        userContract = _userContractAddress;
    }

    function mintForUser(address user, uint256 amount) public onlyAuthorized {
        _mint(user, amount * 10**18);
    }

    function burn(address user, uint256 amount) public onlyAuthorized {
        _burn(user, amount * 10**18);
    }

    function transfer(address to, uint256 amount) public override(ERC20) onlyAuthorized returns (bool) {
        return super.transfer(to, amount);
    }
}