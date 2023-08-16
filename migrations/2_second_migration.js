const VendorContract = artifacts.require("VendorContract");
const UserContract = artifacts.require("UserContract");

module.exports = (deployer) => {
    deployer.deploy(VendorContract, "0x4B14305715F7674a486C26Cfb8a28Be96049598b");
    deployer.deploy(UserContract, "0x4B14305715F7674a486C26Cfb8a28Be96049598b");
};