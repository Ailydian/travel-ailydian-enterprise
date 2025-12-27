import { ethers } from 'ethers';

import logger from '../lib/logger';
// Types
export interface WalletInfo {
  address: string;
  balance: {
    eth: number;
    usdc: number;
    usdt: number;
  };
  chainId: number;
  network: string;
}

export interface TravelNFTContract {
  address: string;
  abi: any[];
}

export interface CryptoTransaction {
  hash: string;
  from: string;
  to: string;
  value: string;
  gasUsed: string;
  status: 'pending' | 'confirmed' | 'failed';
  timestamp: Date;
}

// Contract ABIs (simplified for demo)
export const TRAVEL_NFT_ABI = [
  "function mint(address to, string memory tokenURI) public returns (uint256)",
  "function tokenURI(uint256 tokenId) public view returns (string memory)",
  "function ownerOf(uint256 tokenId) public view returns (address)",
  "function balanceOf(address owner) public view returns (uint256)",
  "function tokensOfOwner(address owner) public view returns (uint256[] memory)",
  "function setApprovalForAll(address operator, bool approved) public",
  "function isApprovedForAll(address owner, address operator) public view returns (bool)",
  "event Transfer(address indexed from, address indexed to, uint256 indexed tokenId)",
  "event Mint(address indexed to, uint256 indexed tokenId, string tokenURI)"
];

export const ERC20_ABI = [
  "function balanceOf(address account) external view returns (uint256)",
  "function transfer(address to, uint256 amount) external returns (bool)",
  "function approve(address spender, uint256 amount) external returns (bool)",
  "function decimals() external view returns (uint8)",
  "function symbol() external view returns (string memory)"
];

// Contract addresses (mock addresses for demo)
export const CONTRACT_ADDRESSES = {
  TRAVEL_NFT: "0x742d35C4e7b77d3B2E4B19e1a6B0c4b5e6C7d8E9",
  USDC: "0xA0b86a33E6B3A8C9E2A1F4B6D7E8F9A0B1C2D3E4",
  USDT: "0xF1E2D3C4B5A69788996877665544332211000FFE",
  PAYMENT_PROCESSOR: "0x1234567890123456789012345678901234567890"
};

// Networks
export const SUPPORTED_NETWORKS = {
  1: { name: 'Ethereum Mainnet', rpc: 'https://mainnet.infura.io/v3/' },
  11155111: { name: 'Sepolia Testnet', rpc: 'https://sepolia.infura.io/v3/' },
  137: { name: 'Polygon Mainnet', rpc: 'https://polygon-rpc.com' },
  80001: { name: 'Mumbai Testnet', rpc: 'https://rpc-mumbai.maticvigil.com' }
};

class Web3Utils {
  private provider: ethers.BrowserProvider | null = null;
  private signer: ethers.JsonRpcSigner | null = null;

  // Connect to wallet
  async connectWallet(): Promise<WalletInfo | null> {
    if (typeof window.ethereum === 'undefined') {
      throw new Error('MetaMask is not installed');
    }

    try {
      // Request account access
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      
      this.provider = new ethers.BrowserProvider(window.ethereum);
      this.signer = await this.provider.getSigner();
      
      const address = await this.signer.getAddress();
      const balance = await this.provider.getBalance(address);
      const network = await this.provider.getNetwork();
      
      // Get token balances (mock for demo)
      const walletInfo: WalletInfo = {
        address,
        balance: {
          eth: parseFloat(ethers.formatEther(balance)),
          usdc: await this.getTokenBalance(address, CONTRACT_ADDRESSES.USDC) || 1250.75,
          usdt: await this.getTokenBalance(address, CONTRACT_ADDRESSES.USDT) || 890.50
        },
        chainId: Number(network.chainId),
        network: network.name
      };

      return walletInfo;
    } catch (error) {
      logger.error('Error connecting wallet:', error as Error, { component: 'Web3utils' });
      throw error;
    }
  }

  // Get token balance
  async getTokenBalance(address: string, tokenAddress: string): Promise<number | null> {
    if (!this.provider) return null;

    try {
      // Mock implementation for demo
      return Math.random() * 1000;
    } catch (error) {
      logger.error('Error getting token balance:', error as Error, { component: 'Web3utils' });
      return null;
    }
  }

  // Mint Travel NFT
  async mintTravelNFT(
    recipient: string,
    metadata: {
      title: string;
      description: string;
      location: string;
      image: string;
      attributes: any;
    }
  ): Promise<{ tokenId: number; transactionHash: string } | null> {
    if (!this.signer) {
      throw new Error('Wallet not connected');
    }

    try {
      // In real implementation, upload metadata to IPFS first
      const tokenURI = await this.uploadToIPFS(metadata);
      
      const nftContract = new ethers.Contract(
        CONTRACT_ADDRESSES.TRAVEL_NFT,
        TRAVEL_NFT_ABI,
        this.signer
      );

      // Mock implementation for demo
      const mockTokenId = Date.now();
      const mockTxHash = '0x' + Math.random().toString(16).substr(2, 64);
      
      return {
        tokenId: mockTokenId,
        transactionHash: mockTxHash
      };
    } catch (error) {
      logger.error('Error minting NFT:', error as Error, { component: 'Web3utils' });
      throw error;
    }
  }

  // Get user's NFTs
  async getUserNFTs(address: string): Promise<any[]> {
    if (!this.provider) return [];

    try {
      // Mock implementation for demo
      return [];
    } catch (error) {
      logger.error('Error getting user NFTs:', error as Error, { component: 'Web3utils' });
      return [];
    }
  }

  // Process crypto payment
  async processPayment(
    to: string,
    amount: number,
    currency: 'ETH' | 'USDC' | 'USDT'
  ): Promise<CryptoTransaction | null> {
    if (!this.signer) {
      throw new Error('Wallet not connected');
    }

    try {
      let transaction;
      
      // Mock implementation for demo
      const mockTxHash = '0x' + Math.random().toString(16).substr(2, 64);
      
      return {
        hash: mockTxHash,
        from: await this.signer.getAddress(),
        to,
        value: amount.toString(),
        gasUsed: '21000',
        status: 'confirmed' as const,
        timestamp: new Date()
      };
    } catch (error) {
      logger.error('Error processing payment:', error as Error, { component: 'Web3utils' });
      throw error;
    }
  }

  // Mock IPFS upload (in real implementation, use services like Pinata, Infura IPFS, etc.)
  private async uploadToIPFS(metadata: any): Promise<string> {
    // Mock implementation
    const mockHash = `QmNLei${Math.random().toString(36).substr(2, 9)}`;
    return `ipfs://${mockHash}`;
  }

  // Mock IPFS fetch
  private async fetchFromIPFS(tokenURI: string): Promise<any> {
    // Mock implementation - in real app, fetch from IPFS gateway
    return {
      title: 'Sample Travel NFT',
      description: 'A memorable travel experience',
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=400&q=90',
      attributes: {
        destination: 'Sample Location',
        activity: 'Travel',
        season: 'Summer',
        weather: 'Sunny',
        companions: 2
      }
    };
  }

  // Listen to wallet events
  setupEventListeners(callbacks: {
    onAccountsChanged?: (accounts: string[]) => void;
    onChainChanged?: (chainId: string) => void;
    onDisconnect?: () => void;
  }) {
    if (!window.ethereum) return;

    if (callbacks.onAccountsChanged) {
      window.ethereum.on('accountsChanged', callbacks.onAccountsChanged);
    }

    if (callbacks.onChainChanged) {
      window.ethereum.on('chainChanged', callbacks.onChainChanged);
    }

    if (callbacks.onDisconnect) {
      window.ethereum.on('disconnect', callbacks.onDisconnect);
    }
  }

  // Add network to wallet
  async addNetwork(chainId: number) {
    const network = SUPPORTED_NETWORKS[chainId as keyof typeof SUPPORTED_NETWORKS];
    if (!network || !window.ethereum) return;

    try {
      await window.ethereum.request({
        method: 'wallet_addEthereumChain',
        params: [{
          chainId: `0x${chainId.toString(16)}`,
          chainName: network.name,
          rpcUrls: [network.rpc],
          nativeCurrency: {
            name: 'ETH',
            symbol: 'ETH',
            decimals: 18
          }
        }]
      });
    } catch (error) {
      logger.error('Error adding network:', error as Error, { component: 'Web3utils' });
    }
  }

  // Switch network
  async switchNetwork(chainId: number) {
    if (!window.ethereum) return;

    try {
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: `0x${chainId.toString(16)}` }]
      });
    } catch (error: any) {
      if (error.code === 4902) {
        // Network not added, add it first
        await this.addNetwork(chainId);
      } else {
        throw error;
      }
    }
  }

  // Disconnect wallet
  disconnect() {
    this.provider = null;
    this.signer = null;
  }

  // Get provider and signer
  getProvider() {
    return this.provider;
  }

  getSigner() {
    return this.signer;
  }
}

// Singleton instance
export const web3Utils = new Web3Utils();

// Utility functions
export const formatAddress = (address: string): string => {
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
};

export const formatBalance = (balance: number, decimals: number = 4): string => {
  return balance.toFixed(decimals);
};

export const getExplorerUrl = (txHash: string, chainId: number): string => {
  const explorers: { [key: number]: string } = {
    1: 'https://etherscan.io/tx/',
    11155111: 'https://sepolia.etherscan.io/tx/',
    137: 'https://polygonscan.com/tx/',
    80001: 'https://mumbai.polygonscan.com/tx/'
  };
  
  return `${explorers[chainId] || explorers[1]}${txHash}`;
};

export const isValidAddress = (address: string): boolean => {
  try {
    ethers.getAddress(address);
    return true;
  } catch {
    return false;
  }
};

// Constants
export const GAS_MULTIPLIER = 1.1; // 10% gas buffer
export const MAX_GAS_PRICE = ethers.parseUnits('50', 'gwei');
export const NFT_MINT_FEE = ethers.parseEther('0.05'); // 0.05 ETH

export default web3Utils;