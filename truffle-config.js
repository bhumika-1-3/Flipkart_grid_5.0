require("dotenv").config();
const { MNEMONIC, INFURA_ENDPOINT, POLYGON_ENDPOINT_MUMBAI } = process.env;
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
        matic: {
            provider: () =>
                new HDWalletProvider(
                    `${MNEMONIC}`,
                    `${POLYGON_ENDPOINT_MUMBAI}`,
                ),
            network_id: 80001, // Polygon's id
            from: "0x5e2c2f26C25FCe863097A3a2adbeDBeAf24f0365"
        },
    },
    compilers: {
        solc: {
            version: "0.8.18",
        },
    },
};