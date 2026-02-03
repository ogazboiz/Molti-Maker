// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

/**
 * @title AgentRegistry
 * @notice On-chain registry for all agents (parent + children)
 * @dev Adapted from AgentMarket for Molti-Maker
 *
 * Tracks:
 * - Agent metadata (name, type, creator)
 * - Execution counts
 * - Parent-child relationships
 * - Status (active/paused)
 */
contract AgentRegistry {
    struct Agent {
        string agentId;
        string name;
        string agentType; // "meme", "trader", "social", etc.
        address wallet;
        address creator; // Parent agent address
        uint256 createdAt;
        uint256 executions;
        uint256 totalRevenue;
        bool isActive;
    }

    // Mappings
    mapping(string => Agent) public agents; // agentId => Agent
    mapping(address => string[]) public agentsByWallet; // wallet => agentIds
    mapping(address => string[]) public agentsByCreator; // creator => agentIds

    // Parent agent address
    address public parentAgent;

    // Events
    event AgentRegistered(
        string indexed agentId,
        string name,
        string agentType,
        address wallet,
        address creator
    );

    event AgentExecuted(
        string indexed agentId,
        uint256 executionCount,
        uint256 revenue
    );

    event AgentStatusChanged(string indexed agentId, bool isActive);

    constructor(address _parentAgent) {
        parentAgent = _parentAgent;
    }

    /**
     * @notice Register a new agent
     * @param agentId Unique agent identifier
     * @param name Human-readable agent name
     * @param agentType Type of agent (meme, trader, social)
     * @param wallet Agent's wallet address
     */
    function registerAgent(
        string memory agentId,
        string memory name,
        string memory agentType,
        address wallet
    ) external {
        require(
            bytes(agents[agentId].agentId).length == 0,
            "Agent already registered"
        );
        require(wallet != address(0), "Invalid wallet address");

        Agent memory newAgent = Agent({
            agentId: agentId,
            name: name,
            agentType: agentType,
            wallet: wallet,
            creator: msg.sender,
            createdAt: block.timestamp,
            executions: 0,
            totalRevenue: 0,
            isActive: true
        });

        agents[agentId] = newAgent;
        agentsByWallet[wallet].push(agentId);
        agentsByCreator[msg.sender].push(agentId);

        emit AgentRegistered(agentId, name, agentType, wallet, msg.sender);
    }

    /**
     * @notice Record an agent execution
     * @param agentId Agent identifier
     * @param revenue Revenue generated (in wei)
     */
    function recordExecution(string memory agentId, uint256 revenue) external {
        Agent storage agent = agents[agentId];
        require(bytes(agent.agentId).length > 0, "Agent not found");
        require(
            msg.sender == agent.wallet || msg.sender == parentAgent,
            "Unauthorized"
        );

        agent.executions++;
        agent.totalRevenue += revenue;

        emit AgentExecuted(agentId, agent.executions, agent.totalRevenue);
    }

    /**
     * @notice Pause/unpause an agent
     * @param agentId Agent identifier
     * @param isActive New status
     */
    function setAgentStatus(string memory agentId, bool isActive) external {
        Agent storage agent = agents[agentId];
        require(bytes(agent.agentId).length > 0, "Agent not found");
        require(
            msg.sender == agent.creator || msg.sender == parentAgent,
            "Unauthorized"
        );

        agent.isActive = isActive;

        emit AgentStatusChanged(agentId, isActive);
    }

    /**
     * @notice Get agent details
     * @param agentId Agent identifier
     */
    function getAgent(
        string memory agentId
    ) external view returns (Agent memory) {
        return agents[agentId];
    }

    /**
     * @notice Get all agents created by an address
     * @param creator Creator address
     */
    function getAgentsByCreator(
        address creator
    ) external view returns (string[] memory) {
        return agentsByCreator[creator];
    }

    /**
     * @notice Get agent count for a creator
     * @param creator Creator address
     */
    function getAgentCount(address creator) external view returns (uint256) {
        return agentsByCreator[creator].length;
    }
}
