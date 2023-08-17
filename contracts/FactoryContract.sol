//SPDX-License-Identifier:MIT
pragma solidity ^0.8.2;

import "@openzeppelin/contracts/proxy/Clones.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./UserContract.sol";
import "./VendorContract.sol";

contract FactoryContract is Ownable {

    address immutable loyaltyTokenAddress;
    address immutable userContractAddress;
    address immutable vendorContractAddress;
    address[] public deployedUserContracts; //to do change to mapping owner : contract
    address[] public deployedVendorContracts; //to do change to mapping owner : contract


    constructor(
        address _loyaltyTokenAddress,
        address _userContractAddress,
        address _vendorContractAddress
    ) Ownable() {
        loyaltyTokenAddress = _loyaltyTokenAddress;
        userContractAddress = _userContractAddress;
        vendorContractAddress = _vendorContractAddress;
    }

    function createUserContract(address _userAddress) external returns (address) {
        address clone = Clones.clone(userContractAddress);
        (bool success, ) = clone.call(
            abi.encodeWithSignature(
                "initialize(address,address)",
                _userAddress,
                loyaltyTokenAddress
            )
        );
        require(success, "creation of user contract failed");

        deployedUserContracts.push(clone);
        return clone;
    }

    function createVendorContract(
        address _vendorAddress,
        uint256 _maxPurchases,
        uint256 _balance
    ) external returns (address) {
        address clone = Clones.clone(vendorContractAddress);
        (bool success, ) = clone.call(
            abi.encodeWithSignature(
                "initialize(address,address,uint256,uint256)",
                _vendorAddress,
                loyaltyTokenAddress,
                _maxPurchases,
                _balance
            )
        );
        require(success, "creation of vendor contract failed");

        deployedVendorContracts.push(clone);
        return clone;
    }
}