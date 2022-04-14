const netflixSmartContract = artifacts.require("NetflixSmartContract");

module.exports = function (deployer) {
  deployer.deploy(netflixSmartContract);
};
