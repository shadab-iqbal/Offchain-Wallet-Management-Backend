require("@nomicfoundation/hardhat-toolbox");
require("hardhat-deploy");
// import { HardhatUserConfig } from "hardhat/config";
// import "@nomicfoundation/hardhat-toolbox";

module.exports = {
  solidity: "0.8.18",
  networks: {
    localhost: {
      url: "http://127.0.0.1:8545/",
      chainId: 31337,
      blockConfirmations: 1,
      saveDeployments: true,
    },
  },
  namedAccounts: {
    deployer: {
      default: 0,
    },
  },
  typechain: {
    target: "@typechain/ethers-v5",
  },
};

// export default config;
