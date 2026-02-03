require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
    solidity: {
        version: "0.8.24",
        settings: {
            optimizer: {
                enabled: true,
                runs: 200
            }
        }
    },
    networks: {
        "monad-testnet": {
            url: process.env.MONAD_RPC_URL || "https://testnet.monad.xyz",
            accounts: process.env.MONAD_PRIVATE_KEY ? [process.env.MONAD_PRIVATE_KEY] : [],
            chainId: 41454
        }
    },
    etherscan: {
        apiKey: {
            "monad-testnet": "placeholder" // Monad explorer API key when available
        }
    }
};
