/**
 * Parent Agent - Main Orchestrator for Molti-Maker
 * 
 * This is the core agent that:
 * - Monitors opportunities via OpportunityScanner
 * - Creates child agents via AgentGenerator
 * - Manages treasury and revenue distribution
 * - Coordinates all child agent activities
 * 
 * Based on OpenClaw framework architecture
 */

require('dotenv').config();
const { ethers } = require('ethers');
const OpportunityScanner = require('./opportunity_scanner');
const AgentGenerator = require('./agent_generator');
const TreasuryManager = require('./treasury_manager');

class ParentAgent {
    constructor() {
        this.name = "Molti-Maker";
        this.version = "1.0.0";
        this.isRunning = false;

        // Initialize Monad provider
        this.provider = new ethers.JsonRpcProvider(process.env.MONAD_RPC_URL);
        this.wallet = new ethers.Wallet(process.env.MONAD_PRIVATE_KEY, this.provider);

        // Initialize components
        this.scanner = new OpportunityScanner();
        this.generator = new AgentGenerator(this.wallet);
        this.treasury = new TreasuryManager(this.wallet);

        // Track child agents
        this.childAgents = new Map();

        console.log(`🏭 ${this.name} v${this.version} initialized`);
        console.log(`💰 Parent wallet: ${this.wallet.address}`);
    }

    /**
     * Main orchestration loop
     */
    async start() {
        console.log('\n🚀 Starting Molti-Maker parent agent...\n');
        this.isRunning = true;

        // Check wallet balance
        const balance = await this.provider.getBalance(this.wallet.address);
        console.log(`💵 Wallet balance: ${ethers.formatEther(balance)} MONAD\n`);

        // Main loop
        while (this.isRunning) {
            try {
                // 1. Scan for opportunities
                console.log('🔍 Scanning for opportunities...');
                const opportunities = await this.scanner.scan();

                if (opportunities.length > 0) {
                    console.log(`✨ Found ${opportunities.length} opportunities!`);

                    // 2. Evaluate each opportunity
                    for (const opp of opportunities) {
                        await this.evaluateOpportunity(opp);
                    }
                }

                // 3. Monitor existing child agents
                await this.monitorChildAgents();

                // 4. Wait before next cycle (5 minutes)
                console.log('\n⏳ Waiting 5 minutes before next scan...\n');
                await this.sleep(5 * 60 * 1000);

            } catch (error) {
                console.error('❌ Error in main loop:', error.message);
                await this.sleep(60 * 1000); // Wait 1 minute on error
            }
        }
    }

    /**
     * Evaluate if we should create an agent for this opportunity
     */
    async evaluateOpportunity(opportunity) {
        console.log(`\n📊 Evaluating: ${opportunity.type} - "${opportunity.description}"`);

        // Check if we already have an agent for this type
        const existingAgent = Array.from(this.childAgents.values())
            .find(agent => agent.type === opportunity.type);

        if (existingAgent) {
            console.log(`⚠️  Already have ${opportunity.type} agent: ${existingAgent.name}`);
            return;
        }

        // Score the opportunity (0-10)
        const score = this.scoreOpportunity(opportunity);
        console.log(`📈 Opportunity score: ${score}/10`);

        // Create agent if score is high enough
        if (score >= 7) {
            console.log(`✅ Score threshold met! Creating agent...`);
            await this.createChildAgent(opportunity);
        } else {
            console.log(`❌ Score too low, skipping`);
        }
    }

    /**
     * Score an opportunity (0-10)
     */
    scoreOpportunity(opportunity) {
        let score = 5; // Base score

        // Increase score based on mention frequency
        if (opportunity.mentions > 10) score += 2;
        if (opportunity.mentions > 20) score += 1;

        // Increase score for trending topics
        if (opportunity.trending) score += 2;

        return Math.min(score, 10);
    }

    /**
     * Create a new child agent
     */
    async createChildAgent(opportunity) {
        try {
            console.log(`\n🤖 Creating ${opportunity.type} agent...`);

            // Generate the agent
            const agent = await this.generator.createAgent({
                type: opportunity.type,
                description: opportunity.description,
                parentWallet: this.wallet.address
            });

            // Store reference
            this.childAgents.set(agent.id, agent);

            console.log(`✅ Agent created successfully!`);
            console.log(`   ID: ${agent.id}`);
            console.log(`   Name: ${agent.name}`);
            console.log(`   Wallet: ${agent.wallet}`);
            console.log(`   Token: ${agent.token || 'Pending launch'}`);

        } catch (error) {
            console.error(`❌ Failed to create agent:`, error.message);
        }
    }

    /**
     * Monitor performance of existing child agents
     */
    async monitorChildAgents() {
        if (this.childAgents.size === 0) return;

        console.log(`\n📊 Monitoring ${this.childAgents.size} child agents...`);

        for (const [id, agent] of this.childAgents) {
            try {
                // Get agent performance metrics
                const metrics = await this.treasury.getAgentMetrics(agent.wallet);

                console.log(`   ${agent.name}:`);
                console.log(`     Executions: ${metrics.executions}`);
                console.log(`     Revenue: ${ethers.formatEther(metrics.revenue)} MONAD`);
                console.log(`     Status: ${metrics.isActive ? '🟢 Active' : '🔴 Paused'}`);

                // Pause underperforming agents
                if (metrics.executions < 5 && agent.age > 24 * 60 * 60 * 1000) {
                    console.log(`     ⚠️  Low performance, considering pause...`);
                }

            } catch (error) {
                console.error(`     ❌ Error monitoring ${agent.name}:`, error.message);
            }
        }
    }

    /**
     * Graceful shutdown
     */
    async stop() {
        console.log('\n🛑 Stopping Molti-Maker...');
        this.isRunning = false;

        // Save state
        console.log('💾 Saving state...');
        // TODO: Persist child agent data

        console.log('✅ Shutdown complete\n');
    }

    /**
     * Helper: Sleep for ms milliseconds
     */
    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}

// Handle graceful shutdown
process.on('SIGINT', async () => {
    if (global.parentAgent) {
        await global.parentAgent.stop();
    }
    process.exit(0);
});

// Start the agent if run directly
if (require.main === module) {
    const agent = new ParentAgent();
    global.parentAgent = agent;
    agent.start().catch(console.error);
}

module.exports = ParentAgent;
