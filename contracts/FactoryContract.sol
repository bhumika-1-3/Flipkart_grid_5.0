//SPDX-License-Identifier:MIT
pragma solidity ^0.8.2;

import "@openzeppelin/contracts/proxy/Clones.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./UserContract.sol";
import "./VendorContract.sol";
import "./LoyaltyToken.sol";

contract FactoryContract is Ownable {

    address immutable loyaltyTokenAddress;
    address immutable userContractAddress;
    address immutable vendorContractAddress;
    mapping(address => address) public deployedUserContracts;
    mapping(address => bool) public userContracts;
    mapping(address => address) public deployedVendorContracts;
    mapping(address => bool) public vendorContracts;
    LoyaltyToken public loyaltyToken;

    constructor(
        address _loyaltyTokenAddress,
        address _userContractAddress,
        address _vendorContractAddress
    ) Ownable() {
        loyaltyTokenAddress = _loyaltyTokenAddress;
        loyaltyToken = LoyaltyToken(_loyaltyTokenAddress);
        userContractAddress = _userContractAddress;
        vendorContractAddress = _vendorContractAddress;
    }

    function createUserContract(address _userAddress) external onlyOwner returns (address) {
        require(!userContracts[_userAddress], "user contract already exists");
        address clone = Clones.clone(userContractAddress);
        (bool success, ) = clone.call(
            abi.encodeWithSignature(
                "initialize(address,address)",
                _userAddress,
                loyaltyTokenAddress
            )
        );
        require(success, "creation of user contract failed");
        deployedUserContracts[_userAddress] = clone;
        userContracts[_userAddress] = true;
        loyaltyToken.mintForUser(clone, 5);
        return clone;
    }

    function createVendorContract(
        address _vendorAddress,
        uint256 _maxPurchases,
        uint256 _balance
    ) external onlyOwner returns (address) {
        require(!vendorContracts[_vendorAddress], "vendor contract already exists");
        address clone = Clones.clone(vendorContractAddress);
        (bool success, ) = clone.call(
            abi.encodeWithSignature(
                "initialize(address,address,uint256)",
                _vendorAddress,
                loyaltyTokenAddress,
                _maxPurchases
            )
        );
        require(success, "creation of vendor contract failed");
        deployedVendorContracts[_vendorAddress] = clone;
        vendorContracts[_vendorAddress] = true;
        loyaltyToken.mintForUser(clone, _balance);
        return clone;
    }

    function transferFromVendorToUser(address _vendorAddress, address _userAddress, uint _balance) external onlyOwner {
        require(vendorContracts[_vendorAddress], "Vendor doesn't exist");
        require(userContracts[_userAddress], "User doesn't exist");
        require(loyaltyToken.balanceOf(deployedVendorContracts[_vendorAddress])>=_balance, "Vendor doesn't have enough balance");
        loyaltyToken.burn(deployedVendorContracts[_vendorAddress], _balance);
        loyaltyToken.mintForUser(deployedUserContracts[_userAddress], _balance);
    }

    function spendTokens(address _userAddress, uint256 _balance) external onlyOwner {
        require(userContracts[_userAddress], "User doesn't exist");
        require(loyaltyToken.balanceOf(deployedUserContracts[_userAddress])>=_balance, "Vendor doesn't have enough balance");
        loyaltyToken.burn(deployedUserContracts[_userAddress], _balance);
    }

    function issueTokensUser(address _userAddress, uint256 _balance) external onlyOwner {
        require(userContracts[_userAddress], "User doesn't exist");
        loyaltyToken.mintForUser(deployedUserContracts[_userAddress], _balance);
    }

    function issueTokensVendor(address _vendorAddress, uint256 _balance) external onlyOwner {
        require(vendorContracts[_vendorAddress], "Vendor doesn't exist");
        loyaltyToken.mintForUser(deployedVendorContracts[_vendorAddress], _balance);
    }
}