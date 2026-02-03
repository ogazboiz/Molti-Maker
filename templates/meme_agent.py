"""
Meme Agent Template

Based on Mindchain's Vision Node architecture.
Creates and posts memes about trending topics.

Capabilities:
- Generate memes using AI
- Post to Moltbook
- Track engagement metrics
- Earn fees per meme ($0.10)
"""

import os
import sys
import time
import json
from datetime import datetime
from openai import OpenAI
from dotenv import load_dotenv
import requests

load_dotenv()

class MemeAgent:
    def __init__(self, agent_id, wallet_address):
        self.agent_id = agent_id
        self.wallet_address = wallet_address
        self.name = f"MemeAgent-{agent_id}"
        
        # Initialize OpenAI
        self.client = OpenAI(api_key=os.getenv('OPENAI_API_KEY'))
        
        # Moltbook API (mock for now)
        self.moltbook_api = os.getenv('MOLTBOOK_API_URL')
        self.moltbook_key = os.getenv('MOLTBOOK_API_KEY')
        
        # Performance tracking
        self.memes_created = 0
        self.total_engagement = 0
        
        print(f"🎨 {self.name} initialized")
        print(f"💰 Wallet: {self.wallet_address}")
    
    def run(self):
        """Main execution loop"""
        print(f"\n🚀 Starting {self.name}...\n")
        
        while True:
            try:
                # 1. Detect trending topic
                topic = self.detect_trending_topic()
                
                if topic:
                    print(f"📈 Trending topic detected: {topic}")
                    
                    # 2. Generate meme
                    meme = self.generate_meme(topic)
                    
                    # 3. Post to Moltbook
                    self.post_meme(meme)
                    
                    # 4. Track metrics
                    self.memes_created += 1
                    print(f"✅ Meme #{self.memes_created} posted!")
                
                # Wait 10 minutes before next cycle
                print("\n⏳ Waiting 10 minutes...\n")
                time.sleep(10 * 60)
                
            except Exception as e:
                print(f"❌ Error: {e}")
                time.sleep(60)  # Wait 1 minute on error
    
    def detect_trending_topic(self):
        """Detect trending topics from Moltbook"""
        try:
            # TODO: Replace with actual Moltbook API
            # For now, return mock trending topics
            topics = [
                "Monad speed",
                "Agent economy",
                "Nad.fun launches",
                "DeFi on Monad"
            ]
            
            import random
            return random.choice(topics)
            
        except Exception as e:
            print(f"Error detecting trends: {e}")
            return None
    
    def generate_meme(self, topic):
        """Generate meme text using AI"""
        try:
            prompt = f"""Create a funny, short meme caption about: {topic}

Requirements:
- Maximum 2 sentences
- Crypto/Web3 humor
- Relatable to the community
- No offensive content

Just return the meme text, nothing else."""

            response = self.client.chat.completions.create(
                model="gpt-4o-mini",
                messages=[
                    {"role": "system", "content": "You are a meme creator for the crypto community."},
                    {"role": "user", "content": prompt}
                ],
                max_tokens=100,
                temperature=0.9
            )
            
            meme_text = response.choices[0].message.content.strip()
            print(f"🎨 Generated: {meme_text}")
            
            return {
                "topic": topic,
                "text": meme_text,
                "created_at": datetime.now().isoformat(),
                "agent_id": self.agent_id
            }
            
        except Exception as e:
            print(f"Error generating meme: {e}")
            return None
    
    def post_meme(self, meme):
        """Post meme to Moltbook"""
        if not meme:
            return
        
        try:
            # TODO: Replace with actual Moltbook API
            print(f"📤 Posting to Moltbook...")
            
            # Mock API call
            # response = requests.post(
            #     f"{self.moltbook_api}/posts",
            #     headers={"Authorization": f"Bearer {self.moltbook_key}"},
            #     json={"content": meme['text'], "agent_id": self.agent_id}
            # )
            
            # For now, just save locally
            self.save_meme_locally(meme)
            
            # Simulate engagement
            self.total_engagement += 10  # Mock: 10 likes per meme
            
        except Exception as e:
            print(f"Error posting meme: {e}")
    
    def save_meme_locally(self, meme):
        """Save meme to local file for testing"""
        try:
            os.makedirs('memes', exist_ok=True)
            filename = f"memes/{self.agent_id}_{self.memes_created}.json"
            
            with open(filename, 'w') as f:
                json.dump(meme, f, indent=2)
            
            print(f"💾 Saved: {filename}")
            
        except Exception as e:
            print(f"Error saving meme: {e}")
    
    def get_stats(self):
        """Get performance statistics"""
        return {
            "agent_id": self.agent_id,
            "memes_created": self.memes_created,
            "total_engagement": self.total_engagement,
            "wallet": self.wallet_address
        }

# Run agent if executed directly
if __name__ == "__main__":
    if len(sys.argv) < 3:
        print("Usage: python meme_agent.py <agent_id> <wallet_address>")
        sys.exit(1)
    
    agent_id = sys.argv[1]
    wallet_address = sys.argv[2]
    
    agent = MemeAgent(agent_id, wallet_address)
    agent.run()
