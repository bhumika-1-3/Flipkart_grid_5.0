import json
from web3 import Web3
import time

# For connecting to ganache
w3 = Web3(Web3.HTTPProvider("https://goerli.infura.io/v3/c5ed05a99df94725bce7436f7d103556"))
chain_id = 5
public_key = "0xeB0CA13a78B052311413A082E218bddA70c7087f"
private_key = "af32aaf5e53c2522e065c47e612f86f5f664af6e0738e48662ac28ef0842f1fe"

loyaltyTokenAddress = w3.to_checksum_address('0x4B14305715F7674a486C26Cfb8a28Be96049598b')
loyaltyTokenABI = '''[
{
	"inputs": [],
	"stateMutability": "nonpayable",
	"type": "constructor"
},
{
	"anonymous": false,
	"inputs": [
		{
			"indexed": true,
			"internalType": "address",
			"name": "owner",
			"type": "address"
		},
		{
			"indexed": true,
			"internalType": "address",
			"name": "spender",
			"type": "address"
		},
		{
			"indexed": false,
			"internalType": "uint256",
			"name": "value",
			"type": "uint256"
		}
	],
	"name": "Approval",
	"type": "event"
},
{
	"anonymous": false,
	"inputs": [
		{
			"indexed": true,
			"internalType": "address",
			"name": "from",
			"type": "address"
		},
		{
			"indexed": true,
			"internalType": "address",
			"name": "to",
			"type": "address"
		},
		{
			"indexed": false,
			"internalType": "uint256",
			"name": "value",
			"type": "uint256"
		}
	],
	"name": "Transfer",
	"type": "event"
},
{
	"inputs": [
		{
			"internalType": "address",
			"name": "owner",
			"type": "address"
		},
		{
			"internalType": "address",
			"name": "spender",
			"type": "address"
		}
	],
	"name": "allowance",
	"outputs": [
		{
			"internalType": "uint256",
			"name": "",
			"type": "uint256"
		}
	],
	"stateMutability": "view",
	"type": "function"
},
{
	"inputs": [
		{
			"internalType": "address",
			"name": "spender",
			"type": "address"
		},
		{
			"internalType": "uint256",
			"name": "amount",
			"type": "uint256"
		}
	],
	"name": "approve",
	"outputs": [
		{
			"internalType": "bool",
			"name": "",
			"type": "bool"
		}
	],
	"stateMutability": "nonpayable",
	"type": "function"
},
{
	"inputs": [
		{
			"internalType": "address",
			"name": "account",
			"type": "address"
		}
	],
	"name": "balanceOf",
	"outputs": [
		{
			"internalType": "uint256",
			"name": "",
			"type": "uint256"
		}
	],
	"stateMutability": "view",
	"type": "function"
},
{
	"inputs": [
		{
			"internalType": "address",
			"name": "user",
			"type": "address"
		},
		{
			"internalType": "uint256",
			"name": "amount",
			"type": "uint256"
		}
	],
	"name": "burn",
	"outputs": [],
	"stateMutability": "nonpayable",
	"type": "function"
},
{
	"inputs": [],
	"name": "decimals",
	"outputs": [
		{
			"internalType": "uint8",
			"name": "",
			"type": "uint8"
		}
	],
	"stateMutability": "view",
	"type": "function"
},
{
	"inputs": [
		{
			"internalType": "address",
			"name": "spender",
			"type": "address"
		},
		{
			"internalType": "uint256",
			"name": "subtractedValue",
			"type": "uint256"
		}
	],
	"name": "decreaseAllowance",
	"outputs": [
		{
			"internalType": "bool",
			"name": "",
			"type": "bool"
		}
	],
	"stateMutability": "nonpayable",
	"type": "function"
},
{
	"inputs": [
		{
			"internalType": "address",
			"name": "spender",
			"type": "address"
		},
		{
			"internalType": "uint256",
			"name": "addedValue",
			"type": "uint256"
		}
	],
	"name": "increaseAllowance",
	"outputs": [
		{
			"internalType": "bool",
			"name": "",
			"type": "bool"
		}
	],
	"stateMutability": "nonpayable",
	"type": "function"
},
{
	"inputs": [
		{
			"internalType": "address",
			"name": "user",
			"type": "address"
		},
		{
			"internalType": "uint256",
			"name": "amount",
			"type": "uint256"
		}
	],
	"name": "mintForUser",
	"outputs": [],
	"stateMutability": "nonpayable",
	"type": "function"
},
{
	"inputs": [],
	"name": "name",
	"outputs": [
		{
			"internalType": "string",
			"name": "",
			"type": "string"
		}
	],
	"stateMutability": "view",
	"type": "function"
},
{
	"inputs": [],
	"name": "owner",
	"outputs": [
		{
			"internalType": "address payable",
			"name": "",
			"type": "address"
		}
	],
	"stateMutability": "view",
	"type": "function"
},
{
	"inputs": [
		{
			"internalType": "address payable",
			"name": "_userContractAddress",
			"type": "address"
		}
	],
	"name": "setUserContractAddress",
	"outputs": [],
	"stateMutability": "nonpayable",
	"type": "function"
},
{
	"inputs": [
		{
			"internalType": "address payable",
			"name": "_vendorContractAddress",
			"type": "address"
		}
	],
	"name": "setVendorContractAddress",
	"outputs": [],
	"stateMutability": "nonpayable",
	"type": "function"
},
{
	"inputs": [],
	"name": "symbol",
	"outputs": [
		{
			"internalType": "string",
			"name": "",
			"type": "string"
		}
	],
	"stateMutability": "view",
	"type": "function"
},
{
	"inputs": [],
	"name": "totalSupply",
	"outputs": [
		{
			"internalType": "uint256",
			"name": "",
			"type": "uint256"
		}
	],
	"stateMutability": "view",
	"type": "function"
},
{
	"inputs": [
		{
			"internalType": "address",
			"name": "to",
			"type": "address"
		},
		{
			"internalType": "uint256",
			"name": "amount",
			"type": "uint256"
		}
	],
	"name": "transfer",
	"outputs": [
		{
			"internalType": "bool",
			"name": "",
			"type": "bool"
		}
	],
	"stateMutability": "nonpayable",
	"type": "function"
},
{
	"inputs": [
		{
			"internalType": "address",
			"name": "from",
			"type": "address"
		},
		{
			"internalType": "address",
			"name": "to",
			"type": "address"
		},
		{
			"internalType": "uint256",
			"name": "amount",
			"type": "uint256"
		}
	],
	"name": "transferFrom",
	"outputs": [
		{
			"internalType": "bool",
			"name": "",
			"type": "bool"
		}
	],
	"stateMutability": "nonpayable",
	"type": "function"
},
{
	"inputs": [],
	"name": "userContract",
	"outputs": [
		{
			"internalType": "address",
			"name": "",
			"type": "address"
		}
	],
	"stateMutability": "view",
	"type": "function"
},
{
	"inputs": [],
	"name": "vendorContract",
	"outputs": [
		{
			"internalType": "address",
			"name": "",
			"type": "address"
		}
	],
	"stateMutability": "view",
	"type": "function"
}
]'''
vendorContractAddress = w3.to_checksum_address('0xf9e826f5a6bdef779e712ad86d146a9f712ae64e')
vendorContractABI = '''[
{
	"inputs": [
		{
			"internalType": "address",
			"name": "_loyaltyTokenAddress",
			"type": "address"
		}
	],
	"stateMutability": "nonpayable",
	"type": "constructor"
},
{
	"inputs": [
		{
			"internalType": "enum VendorContract.Tier",
			"name": "_vendorTier",
			"type": "uint8"
		},
		{
			"internalType": "uint256",
			"name": "_maxPurchases",
			"type": "uint256"
		},
		{
			"internalType": "address payable",
			"name": "_vendorAddress",
			"type": "address"
		},
		{
			"internalType": "uint256",
			"name": "_balance",
			"type": "uint256"
		}
	],
	"name": "addVendor",
	"outputs": [],
	"stateMutability": "nonpayable",
	"type": "function"
},
{
	"inputs": [],
	"name": "getTeasuryBalance",
	"outputs": [
		{
			"internalType": "uint256",
			"name": "",
			"type": "uint256"
		}
	],
	"stateMutability": "view",
	"type": "function"
},
{
	"inputs": [
		{
			"internalType": "address",
			"name": "_vendorAddress",
			"type": "address"
		},
		{
			"internalType": "address",
			"name": "_userAddress",
			"type": "address"
		},
		{
			"internalType": "uint256",
			"name": "amount",
			"type": "uint256"
		}
	],
	"name": "issueTokens",
	"outputs": [],
	"stateMutability": "nonpayable",
	"type": "function"
},
{
	"inputs": [],
	"name": "loyaltyToken",
	"outputs": [
		{
			"internalType": "contract LoyaltyToken",
			"name": "",
			"type": "address"
		}
	],
	"stateMutability": "view",
	"type": "function"
},
{
	"inputs": [],
	"name": "owner",
	"outputs": [
		{
			"internalType": "address payable",
			"name": "",
			"type": "address"
		}
	],
	"stateMutability": "view",
	"type": "function"
},
{
	"inputs": [
		{
			"internalType": "address",
			"name": "_vendorAddress",
			"type": "address"
		},
		{
			"internalType": "uint256",
			"name": "_maxPurchases",
			"type": "uint256"
		}
	],
	"name": "setMaxPurchases",
	"outputs": [],
	"stateMutability": "nonpayable",
	"type": "function"
},
{
	"inputs": [
		{
			"internalType": "address",
			"name": "_userContractAddress",
			"type": "address"
		}
	],
	"name": "setUserContract",
	"outputs": [],
	"stateMutability": "nonpayable",
	"type": "function"
},
{
	"inputs": [
		{
			"internalType": "address",
			"name": "_vendorAddress",
			"type": "address"
		},
		{
			"internalType": "enum VendorContract.Tier",
			"name": "_vendorTier",
			"type": "uint8"
		}
	],
	"name": "setVendorTier",
	"outputs": [],
	"stateMutability": "nonpayable",
	"type": "function"
},
{
	"inputs": [],
	"name": "userContract",
	"outputs": [
		{
			"internalType": "contract UserContract",
			"name": "",
			"type": "address"
		}
	],
	"stateMutability": "view",
	"type": "function"
},
{
	"inputs": [
		{
			"internalType": "address",
			"name": "",
			"type": "address"
		}
	],
	"name": "vendorMapping",
	"outputs": [
		{
			"internalType": "enum VendorContract.Tier",
			"name": "vendorTier",
			"type": "uint8"
		},
		{
			"internalType": "uint256",
			"name": "maxPurchases",
			"type": "uint256"
		},
		{
			"internalType": "uint256",
			"name": "loyaltyTokensBalance",
			"type": "uint256"
		}
	],
	"stateMutability": "view",
	"type": "function"
}
]'''
userContractAddress = w3.to_checksum_address('0x414790f6510d13b3bb55077bd34912baf37b4855')
userContractABI = '''[
{
	"inputs": [
		{
			"internalType": "address",
			"name": "_loyaltyTokenAddress",
			"type": "address"
		}
	],
	"stateMutability": "nonpayable",
	"type": "constructor"
},
{
	"inputs": [
		{
			"internalType": "address payable",
			"name": "_userAddress",
			"type": "address"
		}
	],
	"name": "addUser",
	"outputs": [],
	"stateMutability": "nonpayable",
	"type": "function"
},
{
	"inputs": [],
	"name": "burnable",
	"outputs": [
		{
			"internalType": "uint256",
			"name": "",
			"type": "uint256"
		}
	],
	"stateMutability": "view",
	"type": "function"
},
{
	"inputs": [],
	"name": "getTeasuryBalance",
	"outputs": [
		{
			"internalType": "uint256",
			"name": "",
			"type": "uint256"
		}
	],
	"stateMutability": "view",
	"type": "function"
},
{
	"inputs": [
		{
			"internalType": "address",
			"name": "user",
			"type": "address"
		},
		{
			"internalType": "uint256",
			"name": "amount",
			"type": "uint256"
		}
	],
	"name": "getTokens",
	"outputs": [],
	"stateMutability": "nonpayable",
	"type": "function"
},
{
	"inputs": [],
	"name": "loyaltyToken",
	"outputs": [
		{
			"internalType": "contract LoyaltyToken",
			"name": "",
			"type": "address"
		}
	],
	"stateMutability": "view",
	"type": "function"
},
{
	"inputs": [],
	"name": "owner",
	"outputs": [
		{
			"internalType": "address payable",
			"name": "",
			"type": "address"
		}
	],
	"stateMutability": "view",
	"type": "function"
},
{
	"inputs": [
		{
			"internalType": "address payable",
			"name": "_vendorContractAddress",
			"type": "address"
		}
	],
	"name": "setVendorContract",
	"outputs": [],
	"stateMutability": "nonpayable",
	"type": "function"
},
{
	"inputs": [
		{
			"internalType": "address",
			"name": "user",
			"type": "address"
		},
		{
			"internalType": "uint256",
			"name": "amount",
			"type": "uint256"
		}
	],
	"name": "spendTokens",
	"outputs": [],
	"stateMutability": "nonpayable",
	"type": "function"
},
{
	"inputs": [
		{
			"internalType": "address",
			"name": "",
			"type": "address"
		}
	],
	"name": "userMapping",
	"outputs": [
		{
			"internalType": "uint256",
			"name": "",
			"type": "uint256"
		}
	],
	"stateMutability": "view",
	"type": "function"
},
{
	"inputs": [],
	"name": "vendorContract",
	"outputs": [
		{
			"internalType": "contract VendorContract",
			"name": "",
			"type": "address"
		}
	],
	"stateMutability": "view",
	"type": "function"
}
]'''

loyaltyToken = w3.eth.contract(address=loyaltyTokenAddress, abi=loyaltyTokenABI)
vendorContract = w3.eth.contract(address=vendorContractAddress, abi=vendorContractABI)
userContract = w3.eth.contract(address=userContractAddress, abi=userContractABI)


print(loyaltyToken.functions.balanceOf("0x5e2c2f26C25FCe863097A3a2adbeDBeAf24f0365").call())

# tx = loyaltyToken.functions.setVendorContractAddress(vendorContractAddress).build_transaction({
#     'chainId': 5,
#     'from': public_key,
#     'gas': 3000000,
#     'gasPrice': w3.to_wei('1', 'gwei'),
#     'nonce': w3.eth.get_transaction_count(public_key)
# })

# signed_tx = w3.eth.account.sign_transaction(tx, private_key=private_key)
# tx_hash = w3.eth.send_raw_transaction(signed_tx.rawTransaction)
# tx_receipt = w3.eth.wait_for_transaction_receipt(tx_hash)

# tx = loyaltyToken.functions.setUserContractAddress(userContractAddress).build_transaction({
#     'chainId': 5,
#     'from': public_key,
#     'gas': 3000000,
#     'gasPrice': w3.to_wei('1', 'gwei'),
#     'nonce': w3.eth.get_transaction_count(public_key)
# })

# signed_tx = w3.eth.account.sign_transaction(tx, private_key=private_key)
# tx_hash = w3.eth.send_raw_transaction(signed_tx.rawTransaction)
# tx_receipt = w3.eth.wait_for_transaction_receipt(tx_hash)

# print(loyaltyToken.functions.vendorContract().call())
# print(loyaltyToken.functions.userContract().call())

# tx = vendorContract.functions.setUserContract(userContractAddress).build_transaction({
#     'chainId': 5,
#     'from': public_key,
#     'gas': 3000000,
#     'gasPrice': w3.to_wei('1', 'gwei'),
#     'nonce': w3.eth.get_transaction_count(public_key)
# })

# signed_tx = w3.eth.account.sign_transaction(tx, private_key=private_key)
# tx_hash = w3.eth.send_raw_transaction(signed_tx.rawTransaction)
# tx_receipt = w3.eth.wait_for_transaction_receipt(tx_hash)

# print(vendorContract.functions.userContract().call())

# tx = userContract.functions.setVendorContract(vendorContractAddress).build_transaction({
#     'chainId': 5,
#     'from': public_key,
#     'gas': 3000000,
#     'gasPrice': w3.to_wei('1', 'gwei'),
#     'nonce': w3.eth.get_transaction_count(public_key)
# })

# signed_tx = w3.eth.account.sign_transaction(tx, private_key=private_key)
# tx_hash = w3.eth.send_raw_transaction(signed_tx.rawTransaction)
# tx_receipt = w3.eth.wait_for_transaction_receipt(tx_hash)

# print(loyaltyToken.functions.vendorContract().call())

# tx = userContract.functions.addUser("0x5e2c2f26C25FCe863097A3a2adbeDBeAf24f0365").build_transaction({
#     'chainId': 5,
#     'from': public_key,
#     'gas': 3000000,
#     'gasPrice': w3.to_wei('1', 'gwei'),
#     'nonce': w3.eth.get_transaction_count(public_key)
# })

# signed_tx = w3.eth.account.sign_transaction(tx, private_key=private_key)
# tx_hash = w3.eth.send_raw_transaction(signed_tx.rawTransaction)
# tx_receipt = w3.eth.wait_for_transaction_receipt(tx_hash)

print(loyaltyToken.functions.balanceOf(userContractAddress).call())