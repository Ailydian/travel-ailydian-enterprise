// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title PaymentEscrow
 * @dev Secure escrow contract for travel booking payments
 * @custom:security-contact security@ailydian.com
 */
contract PaymentEscrow is ReentrancyGuard, Ownable {
    enum EscrowStatus {
        ACTIVE,
        RELEASED,
        REFUNDED,
        DISPUTED
    }

    struct Escrow {
        string bookingId;
        address buyer;
        address seller;
        uint256 amount;
        EscrowStatus status;
        uint256 createdAt;
        uint256 completedAt;
    }

    // Escrow ID counter
    uint256 private escrowIdCounter;

    // Escrow ID to Escrow data
    mapping(uint256 => Escrow) public escrows;

    // Booking ID to Escrow ID
    mapping(string => uint256) public bookingToEscrow;

    // Platform fee percentage (basis points, 250 = 2.5%)
    uint256 public platformFeeBps = 250;

    // Platform fee recipient
    address public feeRecipient;

    // Events
    event EscrowCreated(
        uint256 indexed escrowId,
        string bookingId,
        address indexed buyer,
        address indexed seller,
        uint256 amount
    );

    event EscrowReleased(
        uint256 indexed escrowId,
        address indexed seller,
        uint256 amount,
        uint256 platformFee
    );

    event EscrowRefunded(
        uint256 indexed escrowId,
        address indexed buyer,
        uint256 amount
    );

    event EscrowDisputed(
        uint256 indexed escrowId,
        address indexed initiator
    );

    event PlatformFeeUpdated(uint256 newFeeBps);
    event FeeRecipientUpdated(address indexed newRecipient);

    constructor(address _feeRecipient) {
        require(_feeRecipient != address(0), "Invalid fee recipient");
        feeRecipient = _feeRecipient;
    }

    /**
     * @dev Create a new escrow
     * @param bookingId Unique booking identifier
     * @param seller Address of the service provider
     */
    function createEscrow(string memory bookingId, address seller)
        external
        payable
        returns (uint256)
    {
        require(bytes(bookingId).length > 0, "Booking ID cannot be empty");
        require(seller != address(0), "Invalid seller address");
        require(msg.value > 0, "Amount must be greater than 0");
        require(bookingToEscrow[bookingId] == 0, "Escrow already exists");

        uint256 escrowId = escrowIdCounter++;

        escrows[escrowId] = Escrow({
            bookingId: bookingId,
            buyer: msg.sender,
            seller: seller,
            amount: msg.value,
            status: EscrowStatus.ACTIVE,
            createdAt: block.timestamp,
            completedAt: 0
        });

        bookingToEscrow[bookingId] = escrowId;

        emit EscrowCreated(escrowId, bookingId, msg.sender, seller, msg.value);

        return escrowId;
    }

    /**
     * @dev Release escrow to seller (after successful booking completion)
     * @param escrowId ID of the escrow
     */
    function releaseEscrow(uint256 escrowId) external nonReentrant {
        Escrow storage escrow = escrows[escrowId];

        require(escrow.amount > 0, "Escrow does not exist");
        require(escrow.status == EscrowStatus.ACTIVE, "Escrow not active");
        require(
            msg.sender == escrow.buyer || msg.sender == owner(),
            "Not authorized"
        );

        // Calculate platform fee
        uint256 platformFee = (escrow.amount * platformFeeBps) / 10000;
        uint256 sellerAmount = escrow.amount - platformFee;

        escrow.status = EscrowStatus.RELEASED;
        escrow.completedAt = block.timestamp;

        // Transfer to seller
        (bool successSeller, ) = escrow.seller.call{value: sellerAmount}("");
        require(successSeller, "Transfer to seller failed");

        // Transfer platform fee
        if (platformFee > 0) {
            (bool successFee, ) = feeRecipient.call{value: platformFee}("");
            require(successFee, "Platform fee transfer failed");
        }

        emit EscrowReleased(escrowId, escrow.seller, sellerAmount, platformFee);
    }

    /**
     * @dev Refund escrow to buyer (cancellation/dispute resolution)
     * @param escrowId ID of the escrow
     */
    function refundEscrow(uint256 escrowId) external nonReentrant {
        Escrow storage escrow = escrows[escrowId];

        require(escrow.amount > 0, "Escrow does not exist");
        require(escrow.status == EscrowStatus.ACTIVE, "Escrow not active");
        require(
            msg.sender == escrow.seller || msg.sender == owner(),
            "Not authorized"
        );

        escrow.status = EscrowStatus.REFUNDED;
        escrow.completedAt = block.timestamp;

        // Refund to buyer
        (bool success, ) = escrow.buyer.call{value: escrow.amount}("");
        require(success, "Refund failed");

        emit EscrowRefunded(escrowId, escrow.buyer, escrow.amount);
    }

    /**
     * @dev Mark escrow as disputed
     * @param escrowId ID of the escrow
     */
    function disputeEscrow(uint256 escrowId) external {
        Escrow storage escrow = escrows[escrowId];

        require(escrow.amount > 0, "Escrow does not exist");
        require(escrow.status == EscrowStatus.ACTIVE, "Escrow not active");
        require(
            msg.sender == escrow.buyer || msg.sender == escrow.seller,
            "Not authorized"
        );

        escrow.status = EscrowStatus.DISPUTED;

        emit EscrowDisputed(escrowId, msg.sender);
    }

    /**
     * @dev Resolve disputed escrow (owner only)
     * @param escrowId ID of the escrow
     * @param refundToBuyer If true, refund to buyer; if false, release to seller
     */
    function resolveDispute(uint256 escrowId, bool refundToBuyer)
        external
        onlyOwner
        nonReentrant
    {
        Escrow storage escrow = escrows[escrowId];

        require(escrow.amount > 0, "Escrow does not exist");
        require(escrow.status == EscrowStatus.DISPUTED, "Not disputed");

        if (refundToBuyer) {
            escrow.status = EscrowStatus.REFUNDED;
            escrow.completedAt = block.timestamp;

            (bool success, ) = escrow.buyer.call{value: escrow.amount}("");
            require(success, "Refund failed");

            emit EscrowRefunded(escrowId, escrow.buyer, escrow.amount);
        } else {
            uint256 platformFee = (escrow.amount * platformFeeBps) / 10000;
            uint256 sellerAmount = escrow.amount - platformFee;

            escrow.status = EscrowStatus.RELEASED;
            escrow.completedAt = block.timestamp;

            (bool successSeller, ) = escrow.seller.call{value: sellerAmount}("");
            require(successSeller, "Transfer to seller failed");

            if (platformFee > 0) {
                (bool successFee, ) = feeRecipient.call{value: platformFee}("");
                require(successFee, "Platform fee transfer failed");
            }

            emit EscrowReleased(escrowId, escrow.seller, sellerAmount, platformFee);
        }
    }

    /**
     * @dev Get escrow status
     */
    function getEscrowStatus(uint256 escrowId)
        external
        view
        returns (EscrowStatus)
    {
        return escrows[escrowId].status;
    }

    /**
     * @dev Get escrow by booking ID
     */
    function getEscrowByBooking(string memory bookingId)
        external
        view
        returns (
            uint256 escrowId,
            address buyer,
            address seller,
            uint256 amount,
            EscrowStatus status,
            uint256 createdAt,
            uint256 completedAt
        )
    {
        escrowId = bookingToEscrow[bookingId];
        Escrow memory escrow = escrows[escrowId];

        return (
            escrowId,
            escrow.buyer,
            escrow.seller,
            escrow.amount,
            escrow.status,
            escrow.createdAt,
            escrow.completedAt
        );
    }

    /**
     * @dev Update platform fee (owner only)
     * @param newFeeBps New fee in basis points (max 1000 = 10%)
     */
    function setPlatformFee(uint256 newFeeBps) external onlyOwner {
        require(newFeeBps <= 1000, "Fee too high (max 10%)");
        platformFeeBps = newFeeBps;
        emit PlatformFeeUpdated(newFeeBps);
    }

    /**
     * @dev Update fee recipient (owner only)
     */
    function setFeeRecipient(address newRecipient) external onlyOwner {
        require(newRecipient != address(0), "Invalid recipient");
        feeRecipient = newRecipient;
        emit FeeRecipientUpdated(newRecipient);
    }

    /**
     * @dev Get total escrows created
     */
    function getTotalEscrows() external view returns (uint256) {
        return escrowIdCounter;
    }

    /**
     * @dev Emergency withdrawal (owner only, for stuck funds)
     */
    function emergencyWithdraw() external onlyOwner {
        (bool success, ) = owner().call{value: address(this).balance}("");
        require(success, "Withdrawal failed");
    }

    // Receive function to accept direct ETH transfers
    receive() external payable {}
}
