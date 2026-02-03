# The Molti-Maker 🏭

**The Mother of All Agents - Bootstrapping the Agent Economy**

An autonomous AI agent that creates, deploys, and manages other AI agents based on market opportunities. Each child agent gets its own token on nad.fun, and the parent agent takes a revenue cut.

**Hackathon**: Moltiverse by Nad.fun & Monad  
**Track**: Agent+Token ($140K Prize Pool)  
**Submission Deadline**: February 15, 2026

---

## 🎯 What It Does

The Molti-Maker is an agent factory that:
- 🔍 **Scans** Moltbook and Discord for market opportunities
- 🤖 **Creates** specialized child agents from templates
- 💰 **Launches** tokens on nad.fun for each child agent
- 📊 **Manages** a portfolio of autonomous agents
- 💸 **Earns** 10% revenue from all child agent activities

---

## 🏗️ Architecture

```
The Molti-Maker (Parent Agent)
├── Opportunity Scanner → Detects market needs
├── Agent Generator → Creates child agents from templates
├── Agent Registry → On-chain registration (AgentMarket)
├── x402 Payments → Micropayments per execution
├── Token Launcher → Deploys tokens on nad.fun
└── Treasury Manager → Multi-wallet coordination

Child Agents (Examples)
├── Meme Agent #1 → Creates memes ($MEME1 token)
├── Trader Agent #1 → Trades on nad.fun ($TRADE1 token)
└── Social Agent #1 → Engages on Moltbook ($SOCIAL1 token)
```

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- Python 3.10+
- Monad wallet with testnet tokens
- Nad.fun account

### Installation

```bash
# Install dependencies
npm install
pip install -r requirements.txt

# Set up environment
cp .env.example .env
# Edit .env with your keys

# Deploy contracts to Monad
npm run deploy:contracts

# Start parent agent
npm run start:parent

# Start dashboard
cd frontend
npm run dev
```

---

## 📁 Project Structure

```
molti-maker/
├── src/                    # Parent agent core
│   ├── parent_agent.py     # Main orchestrator
│   ├── opportunity_scanner.py
│   ├── agent_generator.py
│   └── treasury_manager.py
├── contracts/              # Smart contracts
│   ├── AgentRegistry.sol   # On-chain agent registry
│   ├── AgentEscrow.sol     # Payment escrow
│   └── x402Payment.sol     # Micropayment system
├── templates/              # Child agent templates
│   ├── meme_agent.py       # Meme creation agent
│   ├── trader_agent.py     # Trading agent
│   └── social_agent.py     # Social engagement agent
├── frontend/               # Dashboard UI
│   ├── pages/
│   ├── components/
│   └── lib/
├── scripts/                # Deployment & utilities
└── docs/                   # Documentation
```

---

## 🎬 Demo Flow

1. **Opportunity Detection**: Scanner detects "need gaming agent" in Discord
2. **Agent Creation**: Generator creates gaming agent from template
3. **Wallet Deployment**: New Monad wallet created for agent
4. **Registry**: Agent registered on-chain
5. **Token Launch**: $GAME1 token launched on nad.fun
6. **Agent Start**: Gaming agent begins operating autonomously
7. **Revenue Flow**: Agent earns fees, 10% goes to parent

---

## 🔧 Tech Stack

- **Framework**: OpenClaw (official Moltiverse starter kit)
- **Blockchain**: Monad (high TPS for multi-agent coordination)
- **Tokens**: Nad.fun (community building & monetization)
- **Payments**: x402 micropayments ($0.10 per execution)
- **Frontend**: Next.js 14 + TailwindCSS
- **Backend**: Python + Node.js

---

## 📊 Code Attribution

**Existing Code (85% reuse)**:
- ✅ AgentMarket - Agent registry, x402 payments, escrow
- ✅ Mindchain - Multi-agent orchestration, templates
- ✅ ChainSniper - Multi-wallet management
- ✅ Aegis - Performance monitoring

**Original Code (15% new)**:
- ⚠️ Parent agent orchestrator
- ⚠️ Opportunity scanner
- ⚠️ Agent generator logic
- ⚠️ Nad.fun integration
- ⚠️ Dashboard UI

---

## 🏆 Why It Wins

- **Uniqueness**: Nobody else will build an agent that creates agents
- **Monad Utilization**: Multiple agents = exponential transaction volume
- **Token Economics**: Parent-child token relationship is novel
- **Demo Impact**: Live agent birth = unforgettable
- **Technical Depth**: Proven architecture from 4 previous hackathon wins

---

## 📝 Development Status

See [task.md](./task.md) for detailed development checklist.

---

## 🚀 Deployment

### Monad Testnet
- AgentRegistry: `TBD`
- AgentEscrow: `TBD`
- x402Payment: `TBD`

### Nad.fun
- $MOLTI Token: `TBD`

---

## 📄 License

MIT License

---

**Built for Moltiverse Hackathon 2026** 🚀
