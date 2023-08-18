from web3 import Web3
from decouple import config

INFURA_ENDPOINT = config('INFURA_ENDPOINT')
OWNER_PRIVATE_KEY = config('OWNER_PRIVATE_KEY')
OWNER_PUBLIC_KEY = config('OWNER_PUBLIC_KEY')

web3 = Web3(Web3.HTTPProvider(INFURA_ENDPOINT))
factoryContractAddress = web3.to_checksum_address('0x942d4339285a66E1bf73541E422fbdfd44f0e20f')
factoryContractABI = '''[
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_userAddress",
				"type": "address"
			}
		],
		"name": "createUserContract",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
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
				"internalType": "uint256",
				"name": "_maxPurchases",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_balance",
				"type": "uint256"
			}
		],
		"name": "createVendorContract",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_loyaltyTokenAddress",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "_userContractAddress",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "_vendorContractAddress",
				"type": "address"
			}
		],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "previousOwner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "OwnershipTransferred",
		"type": "event"
	},
	{
		"inputs": [],
		"name": "renounceOwnership",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "transferOwnership",
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
		"name": "deployedUserContracts",
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
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "deployedVendorContracts",
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
		"name": "owner",
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
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "userContracts",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
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
		"name": "vendorContracts",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]'''
factoryContract = web3.eth.contract(address=factoryContractAddress, abi=factoryContractABI)

# tx = factoryContract.functions.createUserContract("0x5e2c2f26C25FCe863097A3a2adbeDBeAf24f0365").build_transaction({
#     'chainId': 5,
#     'from': OWNER_PUBLIC_KEY,
#     'gas': 3000000,
#     'gasPrice': web3.to_wei('1', 'gwei'),
#     'nonce': web3.eth.get_transaction_count(OWNER_PUBLIC_KEY)
# })

# signed_tx = web3.eth.account.sign_transaction(tx, private_key=OWNER_PRIVATE_KEY)
# tx_hash = web3.eth.send_raw_transaction(signed_tx.rawTransaction)
# tx_receipt = web3.eth.wait_for_transaction_receipt(tx_hash)
# print(tx_receipt['logs'][1]['address'])

# tx = factoryContract.functions.createVendorContract("0xDE5027E3D80874D1e5b3F1544021399c3C037047", 10, 100).build_transaction({
#     'chainId': 5,
#     'from': OWNER_PUBLIC_KEY,
#     'gas': 3000000,
#     'gasPrice': web3.to_wei('1', 'gwei'),
#     'nonce': web3.eth.get_transaction_count(OWNER_PUBLIC_KEY)
# })

# signed_tx = web3.eth.account.sign_transaction(tx, private_key=OWNER_PRIVATE_KEY)
# tx_hash = web3.eth.send_raw_transaction(signed_tx.rawTransaction)
# tx_receipt = web3.eth.wait_for_transaction_receipt(tx_hash)
# print(tx_receipt['logs'][1]['address'])

print(factoryContract.functions.deployedUserContracts("0x5e2c2f26C25FCe863097A3a2adbeDBeAf24f0365").call())
print(factoryContract.functions.deployedVendorContracts("0xDE5027E3D80874D1e5b3F1544021399c3C037047").call())