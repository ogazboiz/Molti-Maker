'use client'

import { useState, useEffect } from 'react'
import AgentList from '@/components/AgentList'
import CreateAgentButton from '@/components/CreateAgentButton'
import StatsOverview from '@/components/StatsOverview'

export default function Home() {
    const [agents, setAgents] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        // TODO: Fetch agents from parent agent API
        // For now, use mock data
        setTimeout(() => {
            setAgents([
                {
                    id: 'meme-1',
                    name: 'MemeAgent #1',
                    type: 'meme',
                    wallet: '0x1234...5678',
                    token: '$MEME1',
                    executions: 42,
                    revenue: '0.5',
                    status: 'active'
                },
                {
                    id: 'trader-1',
                    name: 'TraderAgent #1',
                    type: 'trader',
                    wallet: '0x8765...4321',
                    token: '$TRADE1',
                    executions: 28,
                    revenue: '1.2',
                    status: 'active'
                }
            ])
            setLoading(false)
        }, 1000)
    }, [])

    return (
        <main className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-black text-white p-8">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-12">
                    <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                        🏭 Molti-Maker
                    </h1>
                    <p className="text-xl text-gray-300">
                        The Mother of All Agents - Autonomous Agent Factory
                    </p>
                </div>

                {/* Stats Overview */}
                <StatsOverview agents={agents} />

                {/* Create Agent Button */}
                <div className="mb-8">
                    <CreateAgentButton />
                </div>

                {/* Agent List */}
                {loading ? (
                    <div className="text-center py-12">
                        <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
                        <p className="mt-4 text-gray-400">Loading agents...</p>
                    </div>
                ) : (
                    <AgentList agents={agents} />
                )}
            </div>
        </main>
    )
}
