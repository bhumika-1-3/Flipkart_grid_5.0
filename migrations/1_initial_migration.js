const MyToken = artifacts.require("LoyaltyToken");
const VendorContract = artifacts.require("VendorContract");
const UserContract = artifacts.require("UserContract");

module.exports = (deployer) => {
    deployer.deploy(MyToken);
    deployer.deploy(VendorContract);
    deployer.deploy(UserContract);
};