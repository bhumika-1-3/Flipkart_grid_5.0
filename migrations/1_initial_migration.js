const LoyaltyToken = artifacts.require("LoyaltyToken");
const VendorContract = artifacts.require("VendorContract");
const UserContract = artifacts.require("UserContract");

module.exports = (deployer) => {
    deployer.deploy(LoyaltyToken);
    deployer.deploy(VendorContract);
    deployer.deploy(UserContract);
};