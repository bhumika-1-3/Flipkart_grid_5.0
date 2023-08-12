// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.8.2 <0.9.0;
/**
 * @title Vendor
 * @dev Contract description
 * @custom:dev-run-script ./scripts/deploy_with_ethers.ts
 */
contract vendor {
    uint public token_vendor=100;
    // uint public token_exchange=5;
    address public owner;
    constructor(){
        //msg.sender is the address which is used when the contract is deployed
        owner=msg.sender;
        balance[owner]=token_vendor;//set inital value of tokens on evaluation of company
    }
    string [] public products=["Air Force","AirMax","InfinityRN"];
    mapping(address=>uint) public balance;
    function set_balance(uint my_value) public {
        balance[owner]=my_value; //can use this function to change balance in case of errors
    }
    function transfer_tokens(address to,uint token_exchange) public payable {
        require(token_exchange<=token_vendor);
        balance[owner]-=token_exchange;
        balance[to]+=token_exchange;
    }
}