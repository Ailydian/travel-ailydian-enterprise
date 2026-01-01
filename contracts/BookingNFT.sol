// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

/**
 * @title BookingNFT
 * @dev NFT contract for travel booking confirmations
 * @custom:security-contact security@ailydian.com
 */
contract BookingNFT is ERC721, ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;

    Counters.Counter private _tokenIdCounter;

    // Booking ID to Token ID mapping
    mapping(string => uint256) public bookingToToken;

    // Token ID to Booking ID mapping
    mapping(uint256 => string) public tokenToBooking;

    // Events
    event BookingMinted(
        address indexed to,
        uint256 indexed tokenId,
        string bookingId
    );

    event BookingTransferred(
        address indexed from,
        address indexed to,
        uint256 indexed tokenId,
        string bookingId
    );

    constructor() ERC721("AILYDIAN Travel Booking", "AILBOOK") {}

    /**
     * @dev Mint a new booking NFT
     * @param to Address to receive the NFT
     * @param tokenURI Metadata URI (IPFS/HTTP)
     * @param bookingId Unique booking identifier
     */
    function mintBookingNFT(
        address to,
        string memory tokenURI,
        string memory bookingId
    ) public onlyOwner returns (uint256) {
        require(bytes(bookingId).length > 0, "Booking ID cannot be empty");
        require(bookingToToken[bookingId] == 0, "Booking NFT already exists");

        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();

        _safeMint(to, tokenId);
        _setTokenURI(tokenId, tokenURI);

        bookingToToken[bookingId] = tokenId;
        tokenToBooking[tokenId] = bookingId;

        emit BookingMinted(to, tokenId, bookingId);

        return tokenId;
    }

    /**
     * @dev Get token ID by booking ID
     */
    function getTokenByBooking(string memory bookingId)
        public
        view
        returns (uint256)
    {
        return bookingToToken[bookingId];
    }

    /**
     * @dev Get booking ID by token ID
     */
    function getBookingByToken(uint256 tokenId)
        public
        view
        returns (string memory)
    {
        return tokenToBooking[tokenId];
    }

    /**
     * @dev Check if booking NFT exists
     */
    function bookingExists(string memory bookingId)
        public
        view
        returns (bool)
    {
        return bookingToToken[bookingId] != 0;
    }

    /**
     * @dev Override transfer to emit custom event
     */
    function _afterTokenTransfer(
        address from,
        address to,
        uint256 tokenId,
        uint256 batchSize
    ) internal override {
        super._afterTokenTransfer(from, to, tokenId, batchSize);

        if (from != address(0) && to != address(0)) {
            emit BookingTransferred(from, to, tokenId, tokenToBooking[tokenId]);
        }
    }

    // Required overrides
    function _burn(uint256 tokenId)
        internal
        override(ERC721, ERC721URIStorage)
    {
        super._burn(tokenId);
    }

    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}
