"""
Trader Agent Template

Based on Mindchain's Text Node architecture.
Simple trading agent for nad.fun tokens.

Capabilities:
- Monitor token prices
- Execute buy/sell orders
- Track portfolio performance
- Earn trading fees
"""

import os
import sys
import time
import json
from datetime import datetime
from dotenv import load_dotenv
from web3 import Web3
import requests

load_dotenv()

class TraderAgent:
    def __init__(self, agent_id, wallet_address, private_key):
        self.agent_id = agent_id
        self.wallet_address = wallet_address
        self.private_key = private_key
        self.name = f"TraderAgent-{agent_id}"
        
        # Initialize Web3
        self.w3 = Web3(Web3.HTTPProvider(os.getenv('MONAD_RPC_URL')))
        
        # Nad.fun API
        self.nadfun_api = os.getenv('NADFUN_API_URL')
        self.nadfun_key = os.getenv('NADFUN_API_KEY')
        
        # Trading parameters
        self.min_liquidity = 1000  # Minimum liquidity in USD
        self.max_position_size = 100  # Max position in USD
        
        # Portfolio tracking
        self.positions = {}  # token_address -> amount
        self.trades_executed = 0
        self.total_pnl = 0
        
        print(f"📊 {self.name} initialized")
        print(f"💰 Wallet: {self.wallet_address}")
    
    def run(self):
        """Main execution loop"""
        print(f"\n🚀 Starting {self.name}...\n")
        
        while True:
            try:
                # 1. Scan for trading opportunities
                opportunities = self.scan_tokens()
                
                if opportunities:
                    print(f"💡 Found {len(opportunities)} opportunities")
                    
                    # 2. Evaluate each opportunity
                    for opp in opportunities:
                        self.evaluate_trade(opp)
                
                # 3. Check existing positions
                self.manage_positions()
                
                # Wait 5 minutes before next cycle
                print("\n⏳ Waiting 5 minutes...\n")
                time.sleep(5 * 60)
                
            except Exception as e:
                print(f"❌ Error: {e}")
                time.sleep(60)
    
    def scan_tokens(self):
        """Scan nad.fun for trading opportunities"""
        try:
            # TODO: Replace with actual nad.fun API
            # For now, return mock tokens
            mock_tokens = [
                {
                    "address": "0x1234...",
                    "name": "AgentToken",
                    "price": 0.5,
                    "volume_24h": 5000,
                    "liquidity": 2000,
                    "price_change_24h": 15.5
                }
            ]
            
            # Filter by minimum liquidity
            opportunities = [
                t for t in mock_tokens 
                if t['liquidity'] >= self.min_liquidity
            ]
            
            return opportunities
            
        except Exception as e:
            print(f"Error scanning tokens: {e}")
            return []
    
    def evaluate_trade(self, token):
        """Evaluate if we should trade this token"""
        try:
            print(f"\n📊 Evaluating: {token['name']}")
            
            # Simple strategy: Buy if price up >10%, sell if down >5%
            price_change = token['price_change_24h']
            
            if price_change > 10 and token['address'] not in self.positions:
                # BUY signal
                print(f"🟢 BUY signal: +{price_change}%")
                self.execute_buy(token)
                
            elif price_change < -5 and token['address'] in self.positions:
                # SELL signal
                print(f"🔴 SELL signal: {price_change}%")
                self.execute_sell(token)
            
            else:
                print(f"⚪ HOLD: {price_change}%")
            
        except Exception as e:
            print(f"Error evaluating trade: {e}")
    
    def execute_buy(self, token):
        """Execute buy order"""
        try:
            amount_usd = min(self.max_position_size, 50)  # Start with $50
            amount_tokens = amount_usd / token['price']
            
            print(f"💰 Buying {amount_tokens:.2f} {token['name']} (${amount_usd})")
            
            # TODO: Execute actual trade on nad.fun
            # For now, just track position
            self.positions[token['address']] = {
                "amount": amount_tokens,
                "entry_price": token['price'],
                "entry_time": datetime.now().isoformat()
            }
            
            self.trades_executed += 1
            print(f"✅ Buy executed!")
            
        except Exception as e:
            print(f"Error executing buy: {e}")
    
    def execute_sell(self, token):
        """Execute sell order"""
        try:
            position = self.positions.get(token['address'])
            if not position:
                return
            
            amount = position['amount']
            entry_price = position['entry_price']
            exit_price = token['price']
            
            # Calculate P&L
            pnl = (exit_price - entry_price) * amount
            pnl_pct = ((exit_price / entry_price) - 1) * 100
            
            print(f"💰 Selling {amount:.2f} {token['name']}")
            print(f"📈 P&L: ${pnl:.2f} ({pnl_pct:+.2f}%)")
            
            # TODO: Execute actual trade on nad.fun
            # For now, just remove position
            del self.positions[token['address']]
            
            self.total_pnl += pnl
            self.trades_executed += 1
            print(f"✅ Sell executed!")
            
        except Exception as e:
            print(f"Error executing sell: {e}")
    
    def manage_positions(self):
        """Check and manage existing positions"""
        if not self.positions:
            return
        
        print(f"\n📊 Managing {len(self.positions)} positions...")
        
        for token_address, position in list(self.positions.items()):
            # TODO: Get current price and check stop-loss/take-profit
            pass
    
    def get_stats(self):
        """Get performance statistics"""
        return {
            "agent_id": self.agent_id,
            "trades_executed": self.trades_executed,
            "total_pnl": self.total_pnl,
            "open_positions": len(self.positions),
            "wallet": self.wallet_address
        }

# Run agent if executed directly
if __name__ == "__main__":
    if len(sys.argv) < 4:
        print("Usage: python trader_agent.py <agent_id> <wallet_address> <private_key>")
        sys.exit(1)
    
    agent_id = sys.argv[1]
    wallet_address = sys.argv[2]
    private_key = sys.argv[3]
    
    agent = TraderAgent(agent_id, wallet_address, private_key)
    agent.run()
