/**
 * Agent Generator
 * 
 * Creates child agents from templates:
 * - Clones template code
 * - Creates Monad wallet
 * - Registers on-chain (AgentRegistry)
 * - Launches token on nad.fun
 * - Starts agent execution
 * 
 * Templates are based on Mindchain's multi-node architecture
 */

const { ethers } = require('ethers');
const fs = require('fs').promises;
const path = require('path');

class AgentGenerator {
    constructor(parentWallet) {
        this.parentWallet = parentWallet;
        this.provider = parentWallet.provider;
        this.agentCount = 0;

        // Template mappings
        this.templates = {
            'meme': 'meme_agent.py',
            'trader': 'trader_agent.py',
            'social': 'social_agent.py',
            'gaming': 'meme_agent.py' // Reuse meme template for now
        };
    }

    /**
     * Create a new child agent
     */
    async createAgent(config) {
        const { type, description, parentWallet } = config;

        console.log(`\n🔨 Generating ${type} agent...`);

        // 1. Create unique agent ID
        this.agentCount++;
        const agentId = `${type}-${this.agentCount}-${Date.now()}`;
        const agentName = `${this.capitalize(type)}Agent #${this.agentCount}`;

        console.log(`   📝 Agent ID: ${agentId}`);
        console.log(`   📝 Agent Name: ${agentName}`);

        // 2. Create wallet for agent
        console.log(`   💰 Creating wallet...`);
        const agentWallet = ethers.Wallet.createRandom().connect(this.provider);
        console.log(`   ✅ Wallet: ${agentWallet.address}`);

        // 3. Fund agent wallet (0.1 MONAD for gas)
        console.log(`   💸 Funding wallet...`);
        await this.fundAgent(agentWallet.address, '0.1');

        // 4. Clone template
        console.log(`   📋 Cloning template...`);
        const templatePath = await this.cloneTemplate(type, agentId);
        console.log(`   ✅ Template: ${templatePath}`);

        // 5. Register on-chain (TODO: Deploy AgentRegistry first)
        console.log(`   📝 Registering on-chain...`);
        // const registryTx = await this.registerAgent(agentId, agentName, agentWallet.address);
        console.log(`   ⏭️  Skipping (registry not deployed yet)`);

        // 6. Launch token on nad.fun (TODO: Integrate nad.fun API)
        console.log(`   🪙 Launching token...`);
        // const token = await this.launchToken(agentName, agentId);
        console.log(`   ⏭️  Skipping (nad.fun integration pending)`);

        // 7. Create agent object
        const agent = {
            id: agentId,
            name: agentName,
            type,
            description,
            wallet: agentWallet.address,
            privateKey: agentWallet.privateKey, // Store securely in production!
            templatePath,
            token: null, // Will be set after token launch
            createdAt: Date.now(),
            age: 0,
            status: 'active'
        };

        console.log(`   ✅ Agent created successfully!\n`);

        return agent;
    }

    /**
     * Clone template for new agent
     */
    async cloneTemplate(type, agentId) {
        const templateName = this.templates[type] || this.templates['meme'];
        const templateSrc = path.join(__dirname, '..', 'templates', templateName);
        const agentDest = path.join(__dirname, '..', 'agents', `${agentId}.py`);

        try {
            // Create agents directory if it doesn't exist
            const agentsDir = path.join(__dirname, '..', 'agents');
            await fs.mkdir(agentsDir, { recursive: true });

            // For now, just create a placeholder
            // TODO: Copy actual template when templates are implemented
            const placeholder = `# ${agentId}\n# Type: ${type}\n# Template: ${templateName}\n\nprint("Agent ${agentId} running...")\n`;
            await fs.writeFile(agentDest, placeholder);

            return agentDest;

        } catch (error) {
            console.error(`Error cloning template:`, error.message);
            throw error;
        }
    }

    /**
     * Fund agent wallet with MONAD
     */
    async fundAgent(agentAddress, amount) {
        try {
            const tx = await this.parentWallet.sendTransaction({
                to: agentAddress,
                value: ethers.parseEther(amount)
            });
            await tx.wait();
            console.log(`   ✅ Funded ${amount} MONAD`);
        } catch (error) {
            console.error(`   ❌ Funding failed:`, error.message);
            // Continue anyway - agent can be funded manually
        }
    }

    /**
     * Register agent on-chain
     */
    async registerAgent(agentId, agentName, agentWallet) {
        // TODO: Implement after deploying AgentRegistry contract
        // const registry = new ethers.Contract(REGISTRY_ADDRESS, REGISTRY_ABI, this.parentWallet);
        // const tx = await registry.registerAgent(agentId, agentName, agentWallet);
        // await tx.wait();
        return null;
    }

    /**
     * Launch token on nad.fun
     */
    async launchToken(agentName, agentId) {
        // TODO: Implement nad.fun API integration
        // const response = await axios.post('https://api.nad.fun/tokens', {
        //   name: agentName,
        //   symbol: agentId.toUpperCase(),
        //   supply: 100000
        // });
        return null;
    }

    /**
     * Helper: Capitalize first letter
     */
    capitalize(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }
}

module.exports = AgentGenerator;
