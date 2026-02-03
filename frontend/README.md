# Molti-Maker Dashboard

Next.js dashboard for monitoring and managing child agents.

## Features

- 📊 **Agent List**: View all active child agents
- 💰 **Token Prices**: Real-time prices from nad.fun
- 📈 **Performance Metrics**: Revenue, executions, success rate
- ➕ **Create Agent**: Launch new child agents
- 🔗 **Wallet Integration**: Connect with MetaMask

## Tech Stack

- Next.js 14 (App Router)
- TailwindCSS
- Wagmi + Viem (Web3)
- SWR (Data fetching)

## Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## Environment Variables

Create `.env.local`:

```env
NEXT_PUBLIC_MONAD_RPC=https://testnet.monad.xyz
NEXT_PUBLIC_CHAIN_ID=41454
NEXT_PUBLIC_AGENT_REGISTRY=0x...
NEXT_PUBLIC_NADFUN_API=https://api.nad.fun
```

## Project Structure

```
frontend/
├── app/                # Next.js app router
│   ├── page.tsx        # Main dashboard
│   └── layout.tsx      # Root layout
├── components/         # React components
│   ├── AgentCard.tsx   # Individual agent display
│   ├── AgentList.tsx   # List of all agents
│   └── CreateAgent.tsx # Agent creation form
└── lib/                # Utilities
    ├── contracts.ts    # Contract ABIs & addresses
    └── nadfun.ts       # Nad.fun API client
```
