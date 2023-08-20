const FactoryContract = artifacts.require("FactoryContract");

module.exports = (deployer) => {
    deployer.deploy(FactoryContract, "0x7CbB169a55c861cb3f8Ea6682512F27167F36FAB", "0x1b988f64Fba43092418eb2c306058da435B97375", "0x12Ba75C22aC7191c6d122b5d3ae9bFC7fa04C8AA");
    // 0x13eE69E97F50f54219D42A7453dfBFB94a88A8ea

    // LoyaltyToken 0x7CbB169a55c861cb3f8Ea6682512F27167F36FAB
    // UserContract 0x1b988f64Fba43092418eb2c306058da435B97375
    // VendorContract 0x12Ba75C22aC7191c6d122b5d3ae9bFC7fa04C8AA
    // FactoryContract 0x9d81Fc738d6E7Bc831aa79606a515543a9C5e73A
};