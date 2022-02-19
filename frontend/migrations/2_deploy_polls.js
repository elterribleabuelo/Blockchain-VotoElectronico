const PollContract = artifacts.require("PollsContract");

module.exports = function (deployer) {
  deployer.deploy(PollContract);
};
