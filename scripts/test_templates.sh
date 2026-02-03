#!/bin/bash

# Test script for agent templates
# Tests each template in isolation

echo "🧪 Testing Molti-Maker Agent Templates"
echo "======================================"

# Check Python installation
if ! command -v python3 &> /dev/null; then
    echo "❌ Python 3 not found"
    exit 1
fi

echo "✅ Python 3 found"

# Check if .env exists
if [ ! -f .env ]; then
    echo "⚠️  .env file not found, using .env.example"
    cp .env.example .env
fi

# Test Meme Agent
echo ""
echo "📝 Testing Meme Agent..."
python3 templates/meme_agent.py "test-meme-1" "0x1234567890123456789012345678901234567890" &
MEME_PID=$!
sleep 5
kill $MEME_PID 2>/dev/null
echo "✅ Meme Agent test complete"

# Test Trader Agent
echo ""
echo "📝 Testing Trader Agent..."
python3 templates/trader_agent.py "test-trader-1" "0x1234567890123456789012345678901234567890" "0xabcdef" &
TRADER_PID=$!
sleep 5
kill $TRADER_PID 2>/dev/null
echo "✅ Trader Agent test complete"

# Test Social Agent
echo ""
echo "📝 Testing Social Agent..."
python3 templates/social_agent.py "test-social-1" "0x1234567890123456789012345678901234567890" &
SOCIAL_PID=$!
sleep 5
kill $SOCIAL_PID 2>/dev/null
echo "✅ Social Agent test complete"

echo ""
echo "🎉 All template tests complete!"
