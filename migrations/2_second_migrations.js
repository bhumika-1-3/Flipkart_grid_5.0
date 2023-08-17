const FactoryContract = artifacts.require("FactoryContract");

module.exports = (deployer) => {
    deployer.deploy(FactoryContract, "0x2ED990C71f418cab1c6344aDB387e0131e01858B", "0x7e03A23380a908d68560959994aed76bee4e9Db6", "0x704Cb46d8c84CA5a0F9b82F87823Ab54e257C422");
    //0x942d4339285a66E1bf73541E422fbdfd44f0e20f
};