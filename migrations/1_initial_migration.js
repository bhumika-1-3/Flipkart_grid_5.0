const MyToken = artifacts.require("LoyaltyToken");

module.exports = (deployer) => {
    deployer.deploy(MyToken);
};