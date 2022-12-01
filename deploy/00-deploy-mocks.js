const { network } = require("hardhat")
const {
    developmentChains,
    DECIMALS,
    INITIAL_ANSWER,
    INITIAL_PRICE,
} = require("../helper-hardhat-config")

module.exports = async ({ getNamedAccounts, deployments }) => {
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()
    const chainId = network.config.chainId
    log(`Chain id is: ${chainId}`)
    if (developmentChains.includes(network.name)) {
        //if (chainId == 31337) {
        log(`Local network ${network.name} detected!  Deploying mocks....`)
        await deploy("MockV3Aggregator", {
            contract: "MockV3Aggregator",
            from: deployer,
            log: true,
            args: [DECIMALS, INITIAL_PRICE],
        })
        log("Mocks deployed!")
        log("-------------------------------------------------")
    }
}
module.exports.tags = ["all", "mocks"]
