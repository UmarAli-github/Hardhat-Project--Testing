
/** @type import('hardhat/config').HardhatUserConfig */

require("@nomiclabs/hardhat-waffle");

require("dotenv").config();


const API_KEY = process.env.INFURA_API_KEY;
const PRIVATE_KEY = process.env.PRIVATE_KEY;

module.exports = {
  solidity: "0.8.9",
  networks: {
    ropsten:{
      url:`https://ropsten.infura.io/v3/${API_KEY}`,
      accounts:[`${PRIVATE_KEY}`]
    }
  }
};
