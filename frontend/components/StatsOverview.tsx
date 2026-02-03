interface Agent {
    id: string
    executions: number
    revenue: string
    status: string
}

interface StatsOverviewProps {
    agents: Agent[]
}

export default function StatsOverview({ agents }: StatsOverviewProps) {
    const totalAgents = agents.length
    const activeAgents = agents.filter(a => a.status === 'active').length
    const totalExecutions = agents.reduce((sum, a) => sum + a.executions, 0)
    const totalRevenue = agents.reduce((sum, a) => sum + parseFloat(a.revenue), 0).toFixed(2)

    const stats = [
        { label: 'Total Agents', value: totalAgents, icon: '🤖', color: 'purple' },
        { label: 'Active Agents', value: activeAgents, icon: '🟢', color: 'green' },
        { label: 'Total Executions', value: totalExecutions, icon: '⚡', color: 'blue' },
        { label: 'Total Revenue', value: `${totalRevenue} MONAD`, icon: '💰', color: 'yellow' },
    ]

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {stats.map((stat, index) => (
                <div
                    key={index}
                    className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-6 border border-gray-700"
                >
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-gray-400 text-sm">{stat.label}</span>
                        <span className="text-2xl">{stat.icon}</span>
                    </div>
                    <div className={`text-3xl font-bold text-${stat.color}-400`}>
                        {stat.value}
                    </div>
                </div>
            ))}
        </div>
    )
}
