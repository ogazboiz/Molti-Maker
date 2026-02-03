// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

/**
 * @title AgentEscrow
 * @notice Handles payment escrow and revenue distribution
 * @dev Adapted from AgentMarket for Molti-Maker
 *
 * Revenue split:
 * - 90% to child agent wallet
 * - 10% to parent agent treasury
 */
contract AgentEscrow {
    address public parentAgent;
    uint256 public constant PARENT_FEE_PERCENT = 10; // 10%
    uint256 public totalFeesCollected;

    // Events
    event PaymentReceived(
        address indexed agentWallet,
        uint256 amount,
        uint256 agentShare,
        uint256 parentFee
    );

    event FundsWithdrawn(address indexed recipient, uint256 amount);

    constructor(address _parentAgent) {
        parentAgent = _parentAgent;
    }

    /**
     * @notice Receive payment for agent execution
     * @param agentWallet Agent's wallet address
     */
    function receivePayment(address payable agentWallet) external payable {
        require(msg.value > 0, "Payment must be greater than 0");
        require(agentWallet != address(0), "Invalid agent wallet");

        // Calculate split
        uint256 parentFee = (msg.value * PARENT_FEE_PERCENT) / 100;
        uint256 agentShare = msg.value - parentFee;

        // Transfer agent share immediately
        (bool success, ) = agentWallet.call{value: agentShare}("");
        require(success, "Transfer to agent failed");

        // Track parent fees
        totalFeesCollected += parentFee;

        emit PaymentReceived(agentWallet, msg.value, agentShare, parentFee);
    }

    /**
     * @notice Withdraw collected fees (parent agent only)
     */
    function withdrawFees() external {
        require(msg.sender == parentAgent, "Only parent agent");

        uint256 balance = address(this).balance;
        require(balance > 0, "No fees to withdraw");

        (bool success, ) = parentAgent.call{value: balance}("");
        require(success, "Withdrawal failed");

        emit FundsWithdrawn(parentAgent, balance);
    }

    /**
     * @notice Get contract balance
     */
    function getBalance() external view returns (uint256) {
        return address(this).balance;
    }

    /**
     * @notice Fallback to receive ETH
     */
    receive() external payable {}
}
