// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";

/**
 * @title LoyaltyToken
 * @dev ERC20 loyalty rewards token for AILYDIAN platform
 * Symbol: AILT (AILYDIAN Loyalty Token)
 * @custom:security-contact security@ailydian.com
 */
contract LoyaltyToken is ERC20, ERC20Burnable, AccessControl {
    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");
    bytes32 public constant REWARDER_ROLE = keccak256("REWARDER_ROLE");

    // Reward rates (tokens per action)
    uint256 public bookingReward = 100 * 10**18; // 100 tokens per booking
    uint256 public reviewReward = 10 * 10**18;   // 10 tokens per review
    uint256 public referralReward = 50 * 10**18; // 50 tokens per referral

    // Redemption rates
    uint256 public tokensPerDollar = 10 * 10**18; // 10 tokens = $1 discount

    // Total rewards distributed
    uint256 public totalRewardsDistributed;

    // User rewards tracking
    mapping(address => uint256) public userTotalRewards;
    mapping(address => uint256) public userRedeemed;

    // Events
    event RewardMinted(
        address indexed user,
        uint256 amount,
        string rewardType
    );

    event TokensRedeemed(
        address indexed user,
        uint256 tokens,
        uint256 discountValue
    );

    event RewardRatesUpdated(
        uint256 bookingReward,
        uint256 reviewReward,
        uint256 referralReward
    );

    constructor() ERC20("AILYDIAN Loyalty Token", "AILT") {
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(MINTER_ROLE, msg.sender);
        _grantRole(REWARDER_ROLE, msg.sender);

        // Mint initial supply to deployer (100M tokens)
        _mint(msg.sender, 100_000_000 * 10**decimals());
    }

    /**
     * @dev Mint tokens (minter only)
     */
    function mint(address to, uint256 amount) public onlyRole(MINTER_ROLE) {
        _mint(to, amount);
    }

    /**
     * @dev Reward user for booking
     */
    function rewardBooking(address user) external onlyRole(REWARDER_ROLE) {
        _mintReward(user, bookingReward, "BOOKING");
    }

    /**
     * @dev Reward user for writing review
     */
    function rewardReview(address user) external onlyRole(REWARDER_ROLE) {
        _mintReward(user, reviewReward, "REVIEW");
    }

    /**
     * @dev Reward user for successful referral
     */
    function rewardReferral(address user) external onlyRole(REWARDER_ROLE) {
        _mintReward(user, referralReward, "REFERRAL");
    }

    /**
     * @dev Custom reward amount
     */
    function rewardCustom(
        address user,
        uint256 amount,
        string memory rewardType
    ) external onlyRole(REWARDER_ROLE) {
        _mintReward(user, amount, rewardType);
    }

    /**
     * @dev Internal reward minting
     */
    function _mintReward(
        address user,
        uint256 amount,
        string memory rewardType
    ) private {
        _mint(user, amount);

        totalRewardsDistributed += amount;
        userTotalRewards[user] += amount;

        emit RewardMinted(user, amount, rewardType);
    }

    /**
     * @dev Redeem tokens for discount
     * Burns tokens and returns discount value in USD cents
     */
    function redeemTokens(uint256 tokenAmount)
        external
        returns (uint256 discountValue)
    {
        require(tokenAmount > 0, "Amount must be greater than 0");
        require(balanceOf(msg.sender) >= tokenAmount, "Insufficient balance");

        // Calculate discount value (in USD cents)
        discountValue = (tokenAmount * 100) / tokensPerDollar;

        // Burn tokens
        _burn(msg.sender, tokenAmount);

        userRedeemed[msg.sender] += tokenAmount;

        emit TokensRedeemed(msg.sender, tokenAmount, discountValue);

        return discountValue;
    }

    /**
     * @dev Update reward rates (admin only)
     */
    function setRewardRates(
        uint256 _bookingReward,
        uint256 _reviewReward,
        uint256 _referralReward
    ) external onlyRole(DEFAULT_ADMIN_ROLE) {
        bookingReward = _bookingReward;
        reviewReward = _reviewReward;
        referralReward = _referralReward;

        emit RewardRatesUpdated(
            _bookingReward,
            _reviewReward,
            _referralReward
        );
    }

    /**
     * @dev Update redemption rate (admin only)
     */
    function setRedemptionRate(uint256 _tokensPerDollar)
        external
        onlyRole(DEFAULT_ADMIN_ROLE)
    {
        require(_tokensPerDollar > 0, "Rate must be greater than 0");
        tokensPerDollar = _tokensPerDollar;
    }

    /**
     * @dev Get user reward stats
     */
    function getUserStats(address user)
        external
        view
        returns (
            uint256 balance,
            uint256 totalEarned,
            uint256 totalRedeemed,
            uint256 availableDiscount
        )
    {
        balance = balanceOf(user);
        totalEarned = userTotalRewards[user];
        totalRedeemed = userRedeemed[user];
        availableDiscount = (balance * 100) / tokensPerDollar; // USD cents
    }

    /**
     * @dev Calculate potential discount from token amount
     */
    function calculateDiscount(uint256 tokenAmount)
        external
        view
        returns (uint256)
    {
        return (tokenAmount * 100) / tokensPerDollar;
    }
}
