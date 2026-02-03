# Source Code Directory

This directory contains the core parent agent logic.

## Files

### `parent_agent.py`
Main orchestrator using OpenClaw framework. Coordinates all child agents and manages the overall system.

### `opportunity_scanner.py`
Monitors Moltbook, Discord, and nad.fun for market opportunities that indicate demand for new agents.

### `agent_generator.py`
Creates new child agents from templates, deploys wallets, registers on-chain, and launches tokens.

### `treasury_manager.py`
Manages multi-wallet coordination, funding, and revenue collection from child agents.

## Usage

```bash
# Start the parent agent
python src/parent_agent.py

# Run opportunity scanner standalone
python src/opportunity_scanner.py

# Test agent generation
python src/agent_generator.py --template meme --test
```
