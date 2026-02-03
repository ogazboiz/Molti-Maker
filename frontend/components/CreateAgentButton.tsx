'use client'

import { useState } from 'react'

export default function CreateAgentButton() {
    const [isOpen, setIsOpen] = useState(false)
    const [selectedType, setSelectedType] = useState('meme')
    const [creating, setCreating] = useState(false)

    const handleCreate = async () => {
        setCreating(true)

        // TODO: Call parent agent API to create agent
        console.log('Creating agent of type:', selectedType)

        setTimeout(() => {
            setCreating(false)
            setIsOpen(false)
            alert(`${selectedType} agent created successfully!`)
        }, 2000)
    }

    if (!isOpen) {
        return (
            <button
                onClick={() => setIsOpen(true)}
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 px-8 py-4 rounded-lg font-bold text-lg shadow-lg hover:shadow-xl transition-all"
            >
                ➕ Create New Agent
            </button>
        )
    }

    return (
        <div className="bg-gray-800/90 backdrop-blur-sm rounded-lg p-6 border border-gray-700">
            <h3 className="text-2xl font-bold mb-4">Create New Agent</h3>

            <div className="mb-6">
                <label className="block text-sm font-medium mb-2">Agent Type</label>
                <div className="grid grid-cols-3 gap-4">
                    {['meme', 'trader', 'social'].map((type) => (
                        <button
                            key={type}
                            onClick={() => setSelectedType(type)}
                            className={`p-4 rounded-lg border-2 transition-all ${selectedType === type
                                    ? 'border-purple-500 bg-purple-500/20'
                                    : 'border-gray-600 hover:border-gray-500'
                                }`}
                        >
                            <div className="text-3xl mb-2">
                                {type === 'meme' && '🎨'}
                                {type === 'trader' && '📊'}
                                {type === 'social' && '💬'}
                            </div>
                            <div className="font-medium capitalize">{type}</div>
                        </button>
                    ))}
                </div>
            </div>

            <div className="flex gap-4">
                <button
                    onClick={handleCreate}
                    disabled={creating}
                    className="flex-1 bg-purple-600 hover:bg-purple-700 disabled:bg-gray-600 px-6 py-3 rounded-lg font-bold transition-colors"
                >
                    {creating ? 'Creating...' : 'Create Agent'}
                </button>
                <button
                    onClick={() => setIsOpen(false)}
                    disabled={creating}
                    className="px-6 py-3 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
                >
                    Cancel
                </button>
            </div>
        </div>
    )
}
