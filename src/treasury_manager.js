/**
 * Treasury Manager
 * 
 * Manages multi-wallet coordination:
 * - Parent wallet (main treasury)
 * - Child agent wallets
 * - Revenue collection (10% from each agent)
 * - Automated funding
 * 
 * Based on ChainSniper's multi-wallet architecture
 */

const { ethers } = require('ethers');

class TreasuryManager {
    constructor(parentWallet) {
        this.parentWallet = parentWallet;
        this.provider = parentWallet.provider;
        this.agentWallets = new Map(); // agentId -> wallet address
    }

    /**
     * Get performance metrics for an agent
     */
    async getAgentMetrics(agentWallet) {
        try {
            // Get wallet balance
            const balance = await this.provider.getBalance(agentWallet);

            // TODO: Get on-chain metrics from AgentRegistry
            // For now, return mock data
            return {
                executions: 0,
                revenue: balance,
                isActive: true
            };

        } catch (error) {
            console.error(`Error getting metrics for ${agentWallet}:`, error.message);
            return {
                executions: 0,
                revenue: 0n,
                isActive: false
            };
        }
    }

    /**
     * Collect revenue from child agents (10% fee)
     */
    async collectRevenue(agentWallet) {
        try {
            const balance = await this.provider.getBalance(agentWallet);
            const fee = balance / 10n; // 10% fee

            if (fee > ethers.parseEther('0.01')) {
                // TODO: Implement revenue collection via escrow contract
                console.log(`💰 Collecting ${ethers.formatEther(fee)} MONAD from ${agentWallet}`);
            }

        } catch (error) {
            console.error(`Revenue collection error:`, error.message);
        }
    }

    /**
     * Fund an agent wallet if balance is low
     */
    async ensureFunding(agentWallet, minBalance = '0.05') {
        try {
            const balance = await this.provider.getBalance(agentWallet);
            const minBalanceWei = ethers.parseEther(minBalance);

            if (balance < minBalanceWei) {
                const amount = ethers.parseEther('0.1');
                console.log(`💸 Refunding ${agentWallet}...`);

                const tx = await this.parentWallet.sendTransaction({
                    to: agentWallet,
                    value: amount
                });
                await tx.wait();

                console.log(`✅ Refunded ${ethers.formatEther(amount)} MONAD`);
            }

        } catch (error) {
            console.error(`Funding error:`, error.message);
        }
    }

    /**
     * Get total treasury value
     */
    async getTotalValue() {
        try {
            // Parent wallet balance
            const parentBalance = await this.provider.getBalance(this.parentWallet.address);

            // Sum of all child agent balances
            let childrenBalance = 0n;
            for (const agentWallet of this.agentWallets.values()) {
                const balance = await this.provider.getBalance(agentWallet);
                childrenBalance += balance;
            }

            return {
                parent: parentBalance,
                children: childrenBalance,
                total: parentBalance + childrenBalance
            };

        } catch (error) {
            console.error(`Error calculating total value:`, error.message);
            return { parent: 0n, children: 0n, total: 0n };
        }
    }
}

module.exports = TreasuryManager;
