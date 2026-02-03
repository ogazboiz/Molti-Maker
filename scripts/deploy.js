const hre = require("hardhat");

async function main() {
    console.log("🚀 Deploying Molti-Maker contracts to Monad...\n");

    // Get deployer
    const [deployer] = await hre.ethers.getSigners();
    console.log("📝 Deploying with account:", deployer.address);

    const balance = await hre.ethers.provider.getBalance(deployer.address);
    console.log("💰 Account balance:", hre.ethers.formatEther(balance), "MONAD\n");

    // Deploy AgentRegistry
    console.log("📦 Deploying AgentRegistry...");
    const AgentRegistry = await hre.ethers.getContractFactory("AgentRegistry");
    const registry = await AgentRegistry.deploy(deployer.address);
    await registry.waitForDeployment();
    const registryAddress = await registry.getAddress();
    console.log("✅ AgentRegistry deployed to:", registryAddress);

    // Deploy AgentEscrow
    console.log("\n📦 Deploying AgentEscrow...");
    const AgentEscrow = await hre.ethers.getContractFactory("AgentEscrow");
    const escrow = await AgentEscrow.deploy(deployer.address);
    await escrow.waitForDeployment();
    const escrowAddress = await escrow.getAddress();
    console.log("✅ AgentEscrow deployed to:", escrowAddress);

    // Summary
    console.log("\n" + "=".repeat(60));
    console.log("📋 Deployment Summary");
    console.log("=".repeat(60));
    console.log("AgentRegistry:", registryAddress);
    console.log("AgentEscrow:  ", escrowAddress);
    console.log("=".repeat(60));

    console.log("\n💡 Next steps:");
    console.log("1. Update .env with contract addresses");
    console.log("2. Verify contracts on Monad explorer");
    console.log("3. Test agent registration");
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
