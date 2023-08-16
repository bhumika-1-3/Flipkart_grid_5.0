require("dotenv").config();
const { MNEMONIC, INFURA_ENDPOINT } = process.env;
var HDWalletProvider = require("@truffle/hdwallet-provider");
module.exports = {
    networks: {
        development: {
            host: "127.0.0.1", // Localhost (default: none)
            port: 7545, // Standard Ethereum port (default: none)
            network_id: "*", // Any network (default: none)
        },
        goerli: {
            provider: () =>
                new HDWalletProvider(
                    `${MNEMONIC}`,
                    `${INFURA_ENDPOINT}`,
                ),
            network_id: 5, // Goerli's id
            // confirmations: 2, // # of confirmations to wait between deployments. (default: 0)
            networkCheckTimeout: 2000000, // # seconds before the transaction will time out (default: 0)
            timeoutBlocks: 200, // # of blocks before a deployment times out  (minimum/default: 50)
            // skipDryRun: true, // Skip dry run before migrations? (default: false for public nets )
            gas: 4465030,
            gasPrice: 10000000000,
        },
    },
    compilers: {
        solc: {
            version: "0.8.18",
        },
    },
};