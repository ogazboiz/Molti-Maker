/**
 * Opportunity Scanner
 * 
 * Monitors multiple sources for market opportunities:
 * - Moltbook (agent social network)
 * - Discord (Monad community)
 * - Nad.fun (token launches)
 * 
 * Detects patterns like:
 * - "We need a [type] agent"
 * - High frequency of specific keywords
 * - Trending topics
 */

const axios = require('axios');
const { Client, GatewayIntentBits } = require('discord.js');

class OpportunityScanner {
    constructor() {
        this.opportunities = [];
        this.keywords = new Map(); // Track keyword frequency

        // Initialize Discord client (if token provided)
        if (process.env.DISCORD_BOT_TOKEN) {
            this.discord = new Client({
                intents: [
                    GatewayIntentBits.Guilds,
                    GatewayIntentBits.GuildMessages,
                    GatewayIntentBits.MessageContent
                ]
            });
            this.initDiscord();
        }
    }

    /**
     * Initialize Discord monitoring
     */
    async initDiscord() {
        try {
            await this.discord.login(process.env.DISCORD_BOT_TOKEN);
            console.log('✅ Discord bot connected');

            // Listen for messages
            this.discord.on('messageCreate', (message) => {
                this.analyzeMessage(message.content);
            });

        } catch (error) {
            console.error('❌ Discord connection failed:', error.message);
        }
    }

    /**
     * Main scan function - checks all sources
     */
    async scan() {
        const opportunities = [];

        try {
            // 1. Scan Moltbook
            const moltbookOpps = await this.scanMoltbook();
            opportunities.push(...moltbookOpps);

            // 2. Scan Nad.fun
            const nadfunOpps = await this.scanNadfun();
            opportunities.push(...nadfunOpps);

            // 3. Analyze keyword trends
            const trendOpps = this.analyzeTrends();
            opportunities.push(...trendOpps);

        } catch (error) {
            console.error('❌ Scan error:', error.message);
        }

        return opportunities;
    }

    /**
     * Scan Moltbook for agent-related posts
     */
    async scanMoltbook() {
        const opportunities = [];

        try {
            // TODO: Replace with actual Moltbook API when available
            const mockData = [
                { text: "We really need a gaming agent for tournaments", mentions: 15 },
                { text: "Someone should build a meme agent", mentions: 8 }
            ];

            for (const post of mockData) {
                const opp = this.extractOpportunity(post.text);
                if (opp) {
                    opp.mentions = post.mentions;
                    opp.source = 'moltbook';
                    opportunities.push(opp);
                }
            }

        } catch (error) {
            console.error('Moltbook scan error:', error.message);
        }

        return opportunities;
    }

    /**
     * Scan Nad.fun for trending tokens
     */
    async scanNadfun() {
        const opportunities = [];

        try {
            // TODO: Replace with actual Nad.fun API
            // Look for agent tokens with high volume
            const mockTokens = [
                { name: "TraderBot", volume24h: 50000, type: "trader" }
            ];

            for (const token of mockTokens) {
                if (token.volume24h > 10000) {
                    opportunities.push({
                        type: token.type,
                        description: `High volume ${token.type} agent detected`,
                        mentions: Math.floor(token.volume24h / 1000),
                        source: 'nadfun',
                        trending: true
                    });
                }
            }

        } catch (error) {
            console.error('Nad.fun scan error:', error.message);
        }

        return opportunities;
    }

    /**
     * Analyze message for opportunities
     */
    analyzeMessage(text) {
        const opp = this.extractOpportunity(text);
        if (opp) {
            // Track keyword frequency
            const key = opp.type;
            const count = (this.keywords.get(key) || 0) + 1;
            this.keywords.set(key, count);
        }
    }

    /**
     * Extract opportunity from text
     */
    extractOpportunity(text) {
        const lowerText = text.toLowerCase();

        // Pattern: "need a [type] agent"
        const needPattern = /need (?:a |an )?(\w+) agent/i;
        const needMatch = text.match(needPattern);
        if (needMatch) {
            return {
                type: needMatch[1].toLowerCase(),
                description: `Demand for ${needMatch[1]} agent`,
                mentions: 1,
                source: 'discord'
            };
        }

        // Pattern: "[type] agent" mentioned
        const agentPattern = /(\w+) agent/i;
        const agentMatch = text.match(agentPattern);
        if (agentMatch) {
            const type = agentMatch[1].toLowerCase();
            // Filter out common words
            if (!['the', 'an', 'this', 'that'].includes(type)) {
                return {
                    type,
                    description: `${type} agent mentioned`,
                    mentions: 1,
                    source: 'discord'
                };
            }
        }

        return null;
    }

    /**
     * Analyze keyword trends
     */
    analyzeTrends() {
        const opportunities = [];
        const threshold = 5; // Minimum mentions to be considered

        for (const [type, count] of this.keywords.entries()) {
            if (count >= threshold) {
                opportunities.push({
                    type,
                    description: `Trending: ${type} agent (${count} mentions)`,
                    mentions: count,
                    source: 'trends',
                    trending: true
                });
            }
        }

        // Reset keyword counts after analysis
        this.keywords.clear();

        return opportunities;
    }
}

module.exports = OpportunityScanner;
