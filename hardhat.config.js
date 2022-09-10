require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();
api_key = process.env.API_KEY;
private_key = process.env.PRIVATE_KEY;

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.9",
  networks: {
    goerli: {
    url: api_key,
    accounts: [private_key]
}
}
};
