# Smart Contracts

Solidity contracts for on-chain agent registry, escrow, and payments.

## Contracts

### `AgentRegistry.sol`
On-chain registry for all agents (parent + children). Tracks:
- Agent metadata (name, type, creator)
- Execution counts
- Parent-child relationships
- Status (active/paused)

**Source**: Adapted from AgentMarket

### `AgentEscrow.sol`
Handles payment escrow and revenue distribution:
- 90% to child agent wallet
- 10% to parent agent treasury

**Source**: Adapted from AgentMarket

### `x402Payment.sol`
Micropayment system for pay-per-use agent executions.
- $0.10 per execution
- Automated settlement
- Payment verification

**Source**: Adapted from AgentMarket

## Deployment

```bash
# Install dependencies
npm install

# Compile contracts
npx hardhat compile

# Deploy to Monad testnet
npx hardhat run scripts/deploy.js --network monad-testnet

# Verify contracts
npx hardhat verify --network monad-testnet <CONTRACT_ADDRESS>
```

## Testing

```bash
# Run tests
npx hardhat test

# Run with coverage
npx hardhat coverage
```
