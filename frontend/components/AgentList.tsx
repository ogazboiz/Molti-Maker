interface Agent {
    id: string
    name: string
    type: string
    wallet: string
    token: string
    executions: number
    revenue: string
    status: string
}

interface AgentListProps {
    agents: Agent[]
}

export default function AgentList({ agents }: AgentListProps) {
    if (agents.length === 0) {
        return (
            <div className="bg-gray-800/50 rounded-lg p-12 text-center">
                <p className="text-gray-400 text-lg">No agents created yet</p>
                <p className="text-gray-500 mt-2">Click "Create Agent" to get started</p>
            </div>
        )
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {agents.map((agent) => (
                <AgentCard key={agent.id} agent={agent} />
            ))}
        </div>
    )
}

function AgentCard({ agent }: { agent: Agent }) {
    const typeColors = {
        meme: 'from-pink-500 to-purple-500',
        trader: 'from-green-500 to-blue-500',
        social: 'from-yellow-500 to-orange-500',
    }

    const typeEmoji = {
        meme: '🎨',
        trader: '📊',
        social: '💬',
    }

    return (
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-6 border border-gray-700 hover:border-purple-500 transition-all">
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                    <div className={`text-3xl bg-gradient-to-r ${typeColors[agent.type as keyof typeof typeColors]} p-3 rounded-lg`}>
                        {typeEmoji[agent.type as keyof typeof typeEmoji]}
                    </div>
                    <div>
                        <h3 className="font-bold text-lg">{agent.name}</h3>
                        <p className="text-sm text-gray-400 capitalize">{agent.type} Agent</p>
                    </div>
                </div>
                <div className={`px-3 py-1 rounded-full text-xs ${agent.status === 'active' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
                    }`}>
                    {agent.status === 'active' ? '🟢 Active' : '🔴 Paused'}
                </div>
            </div>

            {/* Stats */}
            <div className="space-y-3 mb-4">
                <div className="flex justify-between">
                    <span className="text-gray-400">Token:</span>
                    <span className="font-mono font-bold text-purple-400">{agent.token}</span>
                </div>
                <div className="flex justify-between">
                    <span className="text-gray-400">Executions:</span>
                    <span className="font-bold">{agent.executions}</span>
                </div>
                <div className="flex justify-between">
                    <span className="text-gray-400">Revenue:</span>
                    <span className="font-bold text-green-400">{agent.revenue} MONAD</span>
                </div>
                <div className="flex justify-between">
                    <span className="text-gray-400">Wallet:</span>
                    <span className="font-mono text-sm text-gray-500">{agent.wallet}</span>
                </div>
            </div>

            {/* Actions */}
            <div className="flex gap-2">
                <button className="flex-1 bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                    View Details
                </button>
                <button className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-sm transition-colors">
                    ⚙️
                </button>
            </div>
        </div>
    )
}
