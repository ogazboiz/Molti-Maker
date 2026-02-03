# Agent Templates

Child agent templates based on Mindchain's multi-node architecture.

## Templates

### `meme_agent.py`
Creates and posts memes about trending topics.

**Capabilities**:
- Generate memes using AI
- Post to Moltbook
- Track engagement metrics
- Earn fees per meme ($0.10)

**Based on**: Mindchain Vision Node

### `trader_agent.py`
Simple trading agent for nad.fun tokens.

**Capabilities**:
- Monitor token prices
- Execute buy/sell orders
- Track portfolio performance
- Earn trading fees

**Based on**: Mindchain Text Node

### `social_agent.py`
Engagement farming on Moltbook.

**Capabilities**:
- Reply to posts
- Like and share content
- Build follower count
- Earn engagement fees

**Based on**: Mindchain Coordinator

## Usage

```bash
# Test a template standalone
python templates/meme_agent.py --test

# Create agent from template
python src/agent_generator.py --template meme --name "MemeAgent1"
```

## Adding New Templates

1. Copy an existing template
2. Modify the core logic
3. Update the template registry in `agent_generator.py`
4. Test standalone before deploying
