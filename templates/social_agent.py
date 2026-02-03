"""
Social Agent Template

Based on Mindchain's Coordinator architecture.
Engagement farming on Moltbook.

Capabilities:
- Reply to posts
- Like and share content
- Build follower count
- Earn engagement fees
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

class SocialAgent:
    def __init__(self, agent_id, wallet_address):
        self.agent_id = agent_id
        self.wallet_address = wallet_address
        self.name = f"SocialAgent-{agent_id}"
        
        # Initialize OpenAI
        self.client = OpenAI(api_key=os.getenv('OPENAI_API_KEY'))
        
        # Moltbook API
        self.moltbook_api = os.getenv('MOLTBOOK_API_URL')
        self.moltbook_key = os.getenv('MOLTBOOK_API_KEY')
        
        # Engagement tracking
        self.replies_posted = 0
        self.likes_given = 0
        self.followers = 0
        
        print(f"💬 {self.name} initialized")
        print(f"💰 Wallet: {self.wallet_address}")
    
    def run(self):
        """Main execution loop"""
        print(f"\n🚀 Starting {self.name}...\n")
        
        while True:
            try:
                # 1. Fetch recent posts
                posts = self.fetch_posts()
                
                if posts:
                    print(f"📬 Found {len(posts)} posts")
                    
                    # 2. Engage with posts
                    for post in posts[:5]:  # Engage with top 5
                        self.engage_with_post(post)
                
                # Wait 15 minutes before next cycle
                print("\n⏳ Waiting 15 minutes...\n")
                time.sleep(15 * 60)
                
            except Exception as e:
                print(f"❌ Error: {e}")
                time.sleep(60)
    
    def fetch_posts(self):
        """Fetch recent posts from Moltbook"""
        try:
            # TODO: Replace with actual Moltbook API
            # For now, return mock posts
            mock_posts = [
                {
                    "id": "post1",
                    "author": "user123",
                    "content": "Just launched my agent on nad.fun! 🚀",
                    "likes": 5,
                    "replies": 2
                },
                {
                    "id": "post2",
                    "author": "user456",
                    "content": "Monad is so fast! Building the future of agents.",
                    "likes": 10,
                    "replies": 3
                }
            ]
            
            return mock_posts
            
        except Exception as e:
            print(f"Error fetching posts: {e}")
            return []
    
    def engage_with_post(self, post):
        """Engage with a post (like + reply)"""
        try:
            print(f"\n💬 Engaging with post by {post['author']}")
            
            # 1. Like the post
            self.like_post(post)
            
            # 2. Generate and post reply
            reply = self.generate_reply(post['content'])
            if reply:
                self.post_reply(post['id'], reply)
            
        except Exception as e:
            print(f"Error engaging: {e}")
    
    def like_post(self, post):
        """Like a post"""
        try:
            # TODO: Replace with actual Moltbook API
            print(f"❤️  Liked post {post['id']}")
            self.likes_given += 1
            
        except Exception as e:
            print(f"Error liking post: {e}")
    
    def generate_reply(self, post_content):
        """Generate relevant reply using AI"""
        try:
            prompt = f"""Generate a friendly, engaging reply to this post: "{post_content}"

Requirements:
- Maximum 1-2 sentences
- Be supportive and positive
- Add value to the conversation
- Use crypto/Web3 terminology naturally
- No spam or promotional content

Just return the reply text, nothing else."""

            response = self.client.chat.completions.create(
                model="gpt-4o-mini",
                messages=[
                    {"role": "system", "content": "You are a helpful member of the crypto community."},
                    {"role": "user", "content": prompt}
                ],
                max_tokens=100,
                temperature=0.7
            )
            
            reply_text = response.choices[0].message.content.strip()
            print(f"💭 Generated reply: {reply_text}")
            
            return reply_text
            
        except Exception as e:
            print(f"Error generating reply: {e}")
            return None
    
    def post_reply(self, post_id, reply_text):
        """Post reply to Moltbook"""
        try:
            # TODO: Replace with actual Moltbook API
            print(f"📤 Posted reply to {post_id}")
            
            # Save locally for testing
            self.save_reply_locally(post_id, reply_text)
            
            self.replies_posted += 1
            
        except Exception as e:
            print(f"Error posting reply: {e}")
    
    def save_reply_locally(self, post_id, reply_text):
        """Save reply to local file for testing"""
        try:
            os.makedirs('replies', exist_ok=True)
            filename = f"replies/{self.agent_id}_{self.replies_posted}.json"
            
            data = {
                "post_id": post_id,
                "reply": reply_text,
                "timestamp": datetime.now().isoformat(),
                "agent_id": self.agent_id
            }
            
            with open(filename, 'w') as f:
                json.dump(data, f, indent=2)
            
            print(f"💾 Saved: {filename}")
            
        except Exception as e:
            print(f"Error saving reply: {e}")
    
    def get_stats(self):
        """Get performance statistics"""
        return {
            "agent_id": self.agent_id,
            "replies_posted": self.replies_posted,
            "likes_given": self.likes_given,
            "followers": self.followers,
            "wallet": self.wallet_address
        }

# Run agent if executed directly
if __name__ == "__main__":
    if len(sys.argv) < 3:
        print("Usage: python social_agent.py <agent_id> <wallet_address>")
        sys.exit(1)
    
    agent_id = sys.argv[1]
    wallet_address = sys.argv[2]
    
    agent = SocialAgent(agent_id, wallet_address)
    agent.run()
