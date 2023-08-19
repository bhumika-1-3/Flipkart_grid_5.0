const FactoryContract = artifacts.require("FactoryContract");
const LoyaltyToken = artifacts.require("LoyaltyToken");
const UserContract = artifacts.require("UserContract");
const VendorContract = artifacts.require("VendorContract");

contract("FactoryContract", () => {
    let factoryContract = null, loyaltyToken = null;
    before(async () => {
        factoryContract = await FactoryContract.deployed();
        loyaltyToken = await LoyaltyToken.deployed();
    });
    it("Should deploy user contract", async () => {
        const [executor, proposer, voter1, voter2, voter3, voter4, voter5] = await web3.eth.getAccounts();
        const factoryContract = await FactoryContract.deployed();
        const userContract = await factoryContract.createUserContract("0xd5DAE65929dcD1503Dd4B660045ff9F98a4e32eB", {from: executor});
        const userContractAddress = await factoryContract.deployedUserContracts('0xd5DAE65929dcD1503Dd4B660045ff9F98a4e32eB', {from: executor});
        console.log("userContractAddress: ", userContractAddress, "userContract.address: ", userContract.address);
        assert(userContract.address !== userContractAddress);
    });
});
