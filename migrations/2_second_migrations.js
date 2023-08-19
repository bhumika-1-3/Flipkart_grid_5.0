const FactoryContract = artifacts.require("FactoryContract");

module.exports = (deployer) => {
    deployer.deploy(FactoryContract, "0x3944f7571a9427248c656950705F4595a1aA08c8", "0x0d594D586505c99EE3eE569452FFCa12DB0d089B", "0xFb3eD6eA836C5975B94d3cD24B26f573d8650C6D");
    // 0x13eE69E97F50f54219D42A7453dfBFB94a88A8ea
};