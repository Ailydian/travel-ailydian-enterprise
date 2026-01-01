/**
 * Web3 Service - Blockchain Integration
 * Enterprise-grade smart contract interaction
 * Supports: Ethereum, Polygon, BSC, Arbitrum, Optimism
 *
 * @module Web3Service
 * @security Audited patterns, no private key exposure
 * @gas-optimized Advanced gas estimation
 */

import { ethers } from 'ethers';
import logger from '../logger';

// ============================================
// TYPES & INTERFACES
// ============================================

export type SupportedChain =
  | 'ethereum'
  | 'polygon'
  | 'bsc'
  | 'arbitrum'
  | 'optimism'
  | 'base';

export interface ChainConfig {
  readonly chainId: number;
  readonly name: string;
  readonly rpcUrl: string;
  readonly blockExplorer: string;
  readonly nativeCurrency: {
    readonly name: string;
    readonly symbol: string;
    readonly decimals: number;
  };
  readonly testnet: boolean;
}

export interface WalletConnection {
  readonly address: string;
  readonly chainId: number;
  readonly balance: string;
  readonly ensName?: string;
}

export interface TransactionResult {
  readonly hash: string;
  readonly blockNumber: number;
  readonly gasUsed: string;
  readonly effectiveGasPrice: string;
  readonly status: 'success' | 'failed';
  readonly confirmations: number;
}

export interface BookingNFTMetadata {
  readonly bookingId: string;
  readonly destination: string;
  readonly checkIn: string;
  readonly checkOut: string;
  readonly guestName: string;
  readonly totalPrice: string;
  readonly currency: string;
  readonly imageUrl: string;
  readonly attributes: readonly {
    readonly trait_type: string;
    readonly value: string;
  }[];
}

export interface SmartContractConfig {
  readonly address: string;
  readonly abi: ethers.InterfaceAbi;
}

// ============================================
// CHAIN CONFIGURATIONS
// ============================================

export const CHAIN_CONFIGS: Record<SupportedChain, ChainConfig> = {
  ethereum: {
    chainId: 1,
    name: 'Ethereum Mainnet',
    rpcUrl: process.env.ETHEREUM_RPC_URL || 'https://eth.llamarpc.com',
    blockExplorer: 'https://etherscan.io',
    nativeCurrency: {
      name: 'Ether',
      symbol: 'ETH',
      decimals: 18
    },
    testnet: false
  },
  polygon: {
    chainId: 137,
    name: 'Polygon',
    rpcUrl: process.env.POLYGON_RPC_URL || 'https://polygon-rpc.com',
    blockExplorer: 'https://polygonscan.com',
    nativeCurrency: {
      name: 'MATIC',
      symbol: 'MATIC',
      decimals: 18
    },
    testnet: false
  },
  bsc: {
    chainId: 56,
    name: 'BNB Smart Chain',
    rpcUrl: process.env.BSC_RPC_URL || 'https://bsc-dataseed.binance.org',
    blockExplorer: 'https://bscscan.com',
    nativeCurrency: {
      name: 'BNB',
      symbol: 'BNB',
      decimals: 18
    },
    testnet: false
  },
  arbitrum: {
    chainId: 42161,
    name: 'Arbitrum One',
    rpcUrl: process.env.ARBITRUM_RPC_URL || 'https://arb1.arbitrum.io/rpc',
    blockExplorer: 'https://arbiscan.io',
    nativeCurrency: {
      name: 'Ether',
      symbol: 'ETH',
      decimals: 18
    },
    testnet: false
  },
  optimism: {
    chainId: 10,
    name: 'Optimism',
    rpcUrl: process.env.OPTIMISM_RPC_URL || 'https://mainnet.optimism.io',
    blockExplorer: 'https://optimistic.etherscan.io',
    nativeCurrency: {
      name: 'Ether',
      symbol: 'ETH',
      decimals: 18
    },
    testnet: false
  },
  base: {
    chainId: 8453,
    name: 'Base',
    rpcUrl: process.env.BASE_RPC_URL || 'https://mainnet.base.org',
    blockExplorer: 'https://basescan.org',
    nativeCurrency: {
      name: 'Ether',
      symbol: 'ETH',
      decimals: 18
    },
    testnet: false
  }
};

// ============================================
// SMART CONTRACT ABIs
// ============================================

// Booking NFT Contract ABI
export const BOOKING_NFT_ABI = [
  'function mintBookingNFT(address to, string memory tokenURI) public returns (uint256)',
  'function tokenURI(uint256 tokenId) public view returns (string memory)',
  'function ownerOf(uint256 tokenId) public view returns (address)',
  'function transferFrom(address from, address to, uint256 tokenId) public',
  'function balanceOf(address owner) public view returns (uint256)',
  'event BookingMinted(address indexed to, uint256 indexed tokenId, string bookingId)'
] as const;

// Payment Escrow Contract ABI
export const PAYMENT_ESCROW_ABI = [
  'function createEscrow(string memory bookingId, address seller, uint256 amount) public payable returns (uint256)',
  'function releaseEscrow(uint256 escrowId) public',
  'function refundEscrow(uint256 escrowId) public',
  'function getEscrowStatus(uint256 escrowId) public view returns (uint8)',
  'event EscrowCreated(uint256 indexed escrowId, string bookingId, address buyer, address seller, uint256 amount)',
  'event EscrowReleased(uint256 indexed escrowId)',
  'event EscrowRefunded(uint256 indexed escrowId)'
] as const;

// Loyalty Token Contract ABI (ERC20)
export const LOYALTY_TOKEN_ABI = [
  'function balanceOf(address account) public view returns (uint256)',
  'function transfer(address to, uint256 amount) public returns (bool)',
  'function mint(address to, uint256 amount) public',
  'function burn(uint256 amount) public',
  'function decimals() public view returns (uint8)',
  'event Transfer(address indexed from, address indexed to, uint256 value)'
] as const;

// ============================================
// WEB3 SERVICE CLASS
// ============================================

export class Web3Service {
  private provider: ethers.JsonRpcProvider;
  private signer?: ethers.Wallet;
  private readonly chainConfig: ChainConfig;

  constructor(chain: SupportedChain = 'polygon') {
    this.chainConfig = CHAIN_CONFIGS[chain];
    this.provider = new ethers.JsonRpcProvider(this.chainConfig.rpcUrl);

    // Initialize signer if private key is available (server-side only)
    if (process.env.BLOCKCHAIN_PRIVATE_KEY && typeof window === 'undefined') {
      this.signer = new ethers.Wallet(
        process.env.BLOCKCHAIN_PRIVATE_KEY,
        this.provider
      );
      logger.info('Web3Service initialized with signer', { chain });
    } else {
      logger.info('Web3Service initialized without signer', { chain });
    }
  }

  /**
   * Connect to user's wallet (browser only)
   */
  async connectWallet(): Promise<WalletConnection> {
    if (typeof window === 'undefined' || !window.ethereum) {
      throw new Error('MetaMask not detected. Please install MetaMask.');
    }

    try {
      // Request account access
      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts'
      }) as string[];

      if (!accounts || accounts.length === 0) {
        throw new Error('No accounts found');
      }

      const address = accounts[0]!;

      // Get chain ID
      const chainId = await window.ethereum.request({
        method: 'eth_chainId'
      }) as string;

      // Get balance
      const browserProvider = new ethers.BrowserProvider(window.ethereum);
      const balance = await browserProvider.getBalance(address);

      // Try to resolve ENS name
      let ensName: string | undefined;
      try {
        ensName = await browserProvider.lookupAddress(address) || undefined;
      } catch {
        // ENS not available or failed
      }

      logger.info('Wallet connected', { address, chainId: parseInt(chainId, 16) });

      return {
        address,
        chainId: parseInt(chainId, 16),
        balance: ethers.formatEther(balance),
        ensName
      };
    } catch (error) {
      logger.error('Wallet connection failed', { error });
      throw error;
    }
  }

  /**
   * Switch network in user's wallet
   */
  async switchNetwork(chain: SupportedChain): Promise<void> {
    if (typeof window === 'undefined' || !window.ethereum) {
      throw new Error('MetaMask not detected');
    }

    const config = CHAIN_CONFIGS[chain];
    const chainIdHex = `0x${config.chainId.toString(16)}`;

    try {
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: chainIdHex }]
      });

      logger.info('Network switched', { chain, chainId: config.chainId });
    } catch (error: any) {
      // Chain not added to MetaMask
      if (error.code === 4902) {
        await window.ethereum.request({
          method: 'wallet_addEthereumChain',
          params: [{
            chainId: chainIdHex,
            chainName: config.name,
            nativeCurrency: config.nativeCurrency,
            rpcUrls: [config.rpcUrl],
            blockExplorerUrls: [config.blockExplorer]
          }]
        });
      } else {
        throw error;
      }
    }
  }

  /**
   * Get native currency balance
   */
  async getBalance(address: string): Promise<string> {
    const balance = await this.provider.getBalance(address);
    return ethers.formatEther(balance);
  }

  /**
   * Get ERC20 token balance
   */
  async getTokenBalance(
    tokenAddress: string,
    walletAddress: string
  ): Promise<string> {
    const contract = new ethers.Contract(
      tokenAddress,
      LOYALTY_TOKEN_ABI,
      this.provider
    );

    const balance = await contract.balanceOf(walletAddress);
    const decimals = await contract.decimals();

    return ethers.formatUnits(balance, decimals);
  }

  /**
   * Mint Booking NFT
   * Creates an NFT representing a booking confirmation
   */
  async mintBookingNFT(
    contractAddress: string,
    recipientAddress: string,
    metadata: BookingNFTMetadata
  ): Promise<TransactionResult> {
    if (!this.signer) {
      throw new Error('Signer not initialized. Server-side only operation.');
    }

    try {
      logger.info('Minting booking NFT', {
        bookingId: metadata.bookingId,
        recipient: recipientAddress
      });

      const contract = new ethers.Contract(
        contractAddress,
        BOOKING_NFT_ABI,
        this.signer
      );

      // Upload metadata to IPFS (simplified - use Pinata/IPFS in production)
      const tokenURI = await this.uploadMetadataToIPFS(metadata);

      // Estimate gas
      const gasEstimate = await contract.mintBookingNFT.estimateGas(
        recipientAddress,
        tokenURI
      );

      // Add 20% buffer
      const gasLimit = gasEstimate * 120n / 100n;

      // Mint NFT
      const tx = await contract.mintBookingNFT(recipientAddress, tokenURI, {
        gasLimit
      });

      logger.info('NFT minting transaction sent', { txHash: tx.hash });

      // Wait for confirmation
      const receipt = await tx.wait();

      logger.info('NFT minted successfully', {
        txHash: receipt.hash,
        blockNumber: receipt.blockNumber
      });

      return {
        hash: receipt.hash,
        blockNumber: receipt.blockNumber,
        gasUsed: receipt.gasUsed.toString(),
        effectiveGasPrice: receipt.gasPrice?.toString() || '0',
        status: receipt.status === 1 ? 'success' : 'failed',
        confirmations: 1
      };
    } catch (error) {
      logger.error('NFT minting failed', { error });
      throw error;
    }
  }

  /**
   * Create payment escrow
   * Holds payment until booking completion
   */
  async createPaymentEscrow(
    contractAddress: string,
    bookingId: string,
    sellerAddress: string,
    amount: string
  ): Promise<{ escrowId: number; transaction: TransactionResult }> {
    if (!this.signer) {
      throw new Error('Signer not initialized');
    }

    try {
      logger.info('Creating payment escrow', {
        bookingId,
        seller: sellerAddress,
        amount
      });

      const contract = new ethers.Contract(
        contractAddress,
        PAYMENT_ESCROW_ABI,
        this.signer
      );

      const amountWei = ethers.parseEther(amount);

      // Create escrow
      const tx = await contract.createEscrow(
        bookingId,
        sellerAddress,
        amountWei,
        { value: amountWei }
      );

      const receipt = await tx.wait();

      // Extract escrow ID from event
      const event = receipt.logs.find((log: any) => {
        try {
          const parsed = contract.interface.parseLog(log);
          return parsed?.name === 'EscrowCreated';
        } catch {
          return false;
        }
      });

      let escrowId = 0;
      if (event) {
        const parsed = contract.interface.parseLog(event);
        escrowId = Number(parsed?.args[0] || 0);
      }

      logger.info('Escrow created', { escrowId, txHash: receipt.hash });

      return {
        escrowId,
        transaction: {
          hash: receipt.hash,
          blockNumber: receipt.blockNumber,
          gasUsed: receipt.gasUsed.toString(),
          effectiveGasPrice: receipt.gasPrice?.toString() || '0',
          status: receipt.status === 1 ? 'success' : 'failed',
          confirmations: 1
        }
      };
    } catch (error) {
      logger.error('Escrow creation failed', { error });
      throw error;
    }
  }

  /**
   * Release escrow to seller
   */
  async releaseEscrow(
    contractAddress: string,
    escrowId: number
  ): Promise<TransactionResult> {
    if (!this.signer) {
      throw new Error('Signer not initialized');
    }

    const contract = new ethers.Contract(
      contractAddress,
      PAYMENT_ESCROW_ABI,
      this.signer
    );

    const tx = await contract.releaseEscrow(escrowId);
    const receipt = await tx.wait();

    logger.info('Escrow released', { escrowId, txHash: receipt.hash });

    return {
      hash: receipt.hash,
      blockNumber: receipt.blockNumber,
      gasUsed: receipt.gasUsed.toString(),
      effectiveGasPrice: receipt.gasPrice?.toString() || '0',
      status: receipt.status === 1 ? 'success' : 'failed',
      confirmations: 1
    };
  }

  /**
   * Refund escrow to buyer
   */
  async refundEscrow(
    contractAddress: string,
    escrowId: number
  ): Promise<TransactionResult> {
    if (!this.signer) {
      throw new Error('Signer not initialized');
    }

    const contract = new ethers.Contract(
      contractAddress,
      PAYMENT_ESCROW_ABI,
      this.signer
    );

    const tx = await contract.refundEscrow(escrowId);
    const receipt = await tx.wait();

    logger.info('Escrow refunded', { escrowId, txHash: receipt.hash });

    return {
      hash: receipt.hash,
      blockNumber: receipt.blockNumber,
      gasUsed: receipt.gasUsed.toString(),
      effectiveGasPrice: receipt.gasPrice?.toString() || '0',
      status: receipt.status === 1 ? 'success' : 'failed',
      confirmations: 1
    };
  }

  /**
   * Mint loyalty tokens to user
   */
  async mintLoyaltyTokens(
    contractAddress: string,
    recipientAddress: string,
    amount: string
  ): Promise<TransactionResult> {
    if (!this.signer) {
      throw new Error('Signer not initialized');
    }

    const contract = new ethers.Contract(
      contractAddress,
      LOYALTY_TOKEN_ABI,
      this.signer
    );

    const amountWei = ethers.parseEther(amount);
    const tx = await contract.mint(recipientAddress, amountWei);
    const receipt = await tx.wait();

    logger.info('Loyalty tokens minted', {
      recipient: recipientAddress,
      amount,
      txHash: receipt.hash
    });

    return {
      hash: receipt.hash,
      blockNumber: receipt.blockNumber,
      gasUsed: receipt.gasUsed.toString(),
      effectiveGasPrice: receipt.gasPrice?.toString() || '0',
      status: receipt.status === 1 ? 'success' : 'failed',
      confirmations: 1
    };
  }

  /**
   * Get transaction by hash
   */
  async getTransaction(txHash: string): Promise<ethers.TransactionResponse | null> {
    return await this.provider.getTransaction(txHash);
  }

  /**
   * Wait for transaction confirmation
   */
  async waitForTransaction(
    txHash: string,
    confirmations: number = 1
  ): Promise<ethers.TransactionReceipt | null> {
    return await this.provider.waitForTransaction(txHash, confirmations);
  }

  /**
   * Upload metadata to IPFS (simplified)
   * In production, use Pinata, NFT.Storage, or Web3.Storage
   */
  private async uploadMetadataToIPFS(metadata: BookingNFTMetadata): Promise<string> {
    // Simplified - returns data URI
    // In production, upload to IPFS and return ipfs:// URI
    const jsonData = JSON.stringify({
      name: `Booking #${metadata.bookingId}`,
      description: `Travel booking NFT for ${metadata.destination}`,
      image: metadata.imageUrl,
      external_url: `${process.env.NEXT_PUBLIC_APP_URL}/bookings/${metadata.bookingId}`,
      attributes: [
        { trait_type: 'Booking ID', value: metadata.bookingId },
        { trait_type: 'Destination', value: metadata.destination },
        { trait_type: 'Check-in', value: metadata.checkIn },
        { trait_type: 'Check-out', value: metadata.checkOut },
        { trait_type: 'Guest', value: metadata.guestName },
        { trait_type: 'Total Price', value: `${metadata.totalPrice} ${metadata.currency}` },
        ...metadata.attributes
      ]
    });

    // Return base64 data URI for now
    const base64 = Buffer.from(jsonData).toString('base64');
    return `data:application/json;base64,${base64}`;
  }

  /**
   * Estimate gas for transaction
   */
  async estimateGas(transaction: ethers.TransactionRequest): Promise<bigint> {
    return await this.provider.estimateGas(transaction);
  }

  /**
   * Get current gas price
   */
  async getGasPrice(): Promise<bigint> {
    const feeData = await this.provider.getFeeData();
    return feeData.gasPrice || 0n;
  }

  /**
   * Get current block number
   */
  async getBlockNumber(): Promise<number> {
    return await this.provider.getBlockNumber();
  }
}

// ============================================
// UTILITY FUNCTIONS
// ============================================

/**
 * Check if MetaMask is installed
 */
export function isMetaMaskInstalled(): boolean {
  return typeof window !== 'undefined' && Boolean(window.ethereum);
}

/**
 * Format address for display (0x1234...5678)
 */
export function formatAddress(address: string): string {
  if (!address) return '';
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

/**
 * Validate Ethereum address
 */
export function isValidAddress(address: string): boolean {
  return ethers.isAddress(address);
}

/**
 * Convert Wei to Ether
 */
export function weiToEther(wei: bigint | string): string {
  return ethers.formatEther(wei);
}

/**
 * Convert Ether to Wei
 */
export function etherToWei(ether: string): bigint {
  return ethers.parseEther(ether);
}

export default Web3Service;
