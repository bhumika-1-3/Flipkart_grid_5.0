const FactoryContract = artifacts.require("FactoryContract");

module.exports = (deployer) => {
    deployer.deploy(FactoryContract, "0x52451FA4A51D194da2F0F7cc3DCf75Af6b38FD0c", "0x991e7b5f9C96c4fe2BeB83Cc83013413744a2060", "0xbCdC5Ba29ac34Eea3186FeD5988986cfBA50eb69");
    // 0x13eE69E97F50f54219D42A7453dfBFB94a88A8ea

    // LoyaltyToken 0x52451FA4A51D194da2F0F7cc3DCf75Af6b38FD0c
    // UserContract 0x991e7b5f9C96c4fe2BeB83Cc83013413744a2060
    // VendorContract 0xbCdC5Ba29ac34Eea3186FeD5988986cfBA50eb69
    // FactoryContract 0x1d861951d40a72B676b7eC3641Af69cC81c1E224
};