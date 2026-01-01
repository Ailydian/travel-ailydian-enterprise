/**
 * Web3 Connector Component
 * MetaMask/WalletConnect integration with multi-chain support
 *
 * @component Web3Connector
 * @features Wallet connection, network switching, balance display
 */

'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Wallet,
  ChevronDown,
  ExternalLink,
  Copy,
  Check,
  AlertCircle,
  Zap,
  Shield
} from 'lucide-react';
import {
  Web3Service,
  CHAIN_CONFIGS,
  type SupportedChain,
  type WalletConnection,
  formatAddress,
  isMetaMaskInstalled
} from '../../lib/blockchain/web3-service';
import { useToast } from '../../context/ToastContext';
import logger from '../../lib/logger';

// ============================================
// TYPES
// ============================================

interface Web3ConnectorProps {
  defaultChain?: SupportedChain;
  showBalance?: boolean;
  showNetworkSwitch?: boolean;
  className?: string;
  onConnect?: (connection: WalletConnection) => void;
  onDisconnect?: () => void;
}

// ============================================
// MAIN COMPONENT
// ============================================

export const Web3Connector: React.FC<Web3ConnectorProps> = ({
  defaultChain = 'polygon',
  showBalance = true,
  showNetworkSwitch = true,
  className = '',
  onConnect,
  onDisconnect
}) => {
  const { showSuccess, showError, showInfo } = useToast();
  const [web3Service] = useState(() => new Web3Service(defaultChain));

  const [connection, setConnection] = useState<WalletConnection | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [currentChain, setCurrentChain] = useState<SupportedChain>(defaultChain);
  const [showNetworkMenu, setShowNetworkMenu] = useState(false);
  const [copied, setCopied] = useState(false);

  /**
   * Check if wallet is already connected
   */
  useEffect(() => {
    const checkConnection = async () => {
      if (!isMetaMaskInstalled()) return;

      try {
        const accounts = await window.ethereum.request({
          method: 'eth_accounts'
        }) as string[];

        if (accounts && accounts.length > 0) {
          // Auto-connect if previously connected
          handleConnect();
        }
      } catch (error) {
        logger.error('Failed to check wallet connection', { error });
      }
    };

    checkConnection();
  }, []);

  /**
   * Listen to wallet events
   */
  useEffect(() => {
    if (!isMetaMaskInstalled()) return;

    const handleAccountsChanged = (accounts: string[]) => {
      if (accounts.length === 0) {
        // Wallet disconnected
        handleDisconnect();
      } else {
        // Account changed
        handleConnect();
      }
    };

    const handleChainChanged = () => {
      // Reload page on chain change (MetaMask recommendation)
      window.location.reload();
    };

    window.ethereum.on('accountsChanged', handleAccountsChanged);
    window.ethereum.on('chainChanged', handleChainChanged);

    return () => {
      window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
      window.ethereum.removeListener('chainChanged', handleChainChanged);
    };
  }, []);

  /**
   * Connect wallet
   */
  const handleConnect = useCallback(async () => {
    if (!isMetaMaskInstalled()) {
      showError('MetaMask yüklü değil. Lütfen MetaMask kurun.');
      window.open('https://metamask.io/download/', '_blank');
      return;
    }

    setIsConnecting(true);

    try {
      const walletConnection = await web3Service.connectWallet();
      setConnection(walletConnection);

      showSuccess(
        `Cüzdan bağlandı: ${walletConnection.ensName || formatAddress(walletConnection.address)}`
      );

      logger.info('Wallet connected', {
        address: walletConnection.address,
        chainId: walletConnection.chainId
      });

      if (onConnect) {
        onConnect(walletConnection);
      }
    } catch (error) {
      logger.error('Wallet connection failed', { error });
      showError('Cüzdan bağlantısı başarısız. Lütfen tekrar deneyin.');
    } finally {
      setIsConnecting(false);
    }
  }, [web3Service, showSuccess, showError, onConnect]);

  /**
   * Disconnect wallet
   */
  const handleDisconnect = useCallback(() => {
    setConnection(null);
    showInfo('Cüzdan bağlantısı kesildi');

    if (onDisconnect) {
      onDisconnect();
    }
  }, [showInfo, onDisconnect]);

  /**
   * Switch network
   */
  const handleSwitchNetwork = useCallback(async (chain: SupportedChain) => {
    try {
      await web3Service.switchNetwork(chain);
      setCurrentChain(chain);
      setShowNetworkMenu(false);
      showSuccess(`${CHAIN_CONFIGS[chain].name} ağına geçildi`);
    } catch (error) {
      logger.error('Network switch failed', { error, chain });
      showError('Ağ değiştirme başarısız');
    }
  }, [web3Service, showSuccess, showError]);

  /**
   * Copy address to clipboard
   */
  const handleCopyAddress = useCallback(async () => {
    if (!connection) return;

    try {
      await navigator.clipboard.writeText(connection.address);
      setCopied(true);
      showSuccess('Adres kopyalandı');

      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      showError('Kopyalama başarısız');
    }
  }, [connection, showSuccess, showError]);

  /**
   * Open block explorer
   */
  const openBlockExplorer = useCallback(() => {
    if (!connection) return;

    const config = CHAIN_CONFIGS[currentChain];
    const url = `${config.blockExplorer}/address/${connection.address}`;
    window.open(url, '_blank');
  }, [connection, currentChain]);

  // Not installed warning
  if (!isMetaMaskInstalled()) {
    return (
      <div className={`web3-connector ${className}`}>
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-3 px-4 py-2 bg-warning-500/10 border border-warning-500/30 rounded-lg"
        >
          <AlertCircle className="w-5 h-5 text-warning-500" />
          <span className="text-sm text-text-secondary">
            Web3 özelliklerini kullanmak için{' '}
            <a
              href="https://metamask.io/download/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary-500 hover:text-primary-600 font-semibold underline"
            >
              MetaMask
            </a>{' '}
            kurmanız gerekiyor.
          </span>
        </motion.div>
      </div>
    );
  }

  // Not connected
  if (!connection) {
    return (
      <div className={`web3-connector ${className}`}>
        <button
          onClick={handleConnect}
          disabled={isConnecting}
          className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary-500 to-accent-500 hover:from-primary-600 hover:to-accent-600 text-white rounded-lg font-semibold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
        >
          <Wallet className="w-5 h-5" />
          {isConnecting ? 'Bağlanıyor...' : 'Cüzdan Bağla'}
        </button>
      </div>
    );
  }

  // Connected
  return (
    <div className={`web3-connector flex items-center gap-3 ${className}`}>
      {/* Network Selector */}
      {showNetworkSwitch && (
        <div className="relative">
          <button
            onClick={() => setShowNetworkMenu(!showNetworkMenu)}
            className="flex items-center gap-2 px-4 py-2 bg-surface-elevated hover:bg-surface-card border border-border-subtle rounded-lg transition-colors"
          >
            <div className="w-2 h-2 bg-success-400 rounded-full animate-pulse" />
            <span className="text-sm font-medium text-text-primary">
              {CHAIN_CONFIGS[currentChain].nativeCurrency.symbol}
            </span>
            <ChevronDown className="w-4 h-4 text-text-secondary" />
          </button>

          <AnimatePresence>
            {showNetworkMenu && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute top-full right-0 mt-2 w-64 bg-surface-elevated border border-border-subtle rounded-lg shadow-xl overflow-hidden z-50"
              >
                <div className="p-2 space-y-1">
                  {(Object.keys(CHAIN_CONFIGS) as SupportedChain[]).map((chain) => {
                    const config = CHAIN_CONFIGS[chain];
                    const isCurrent = chain === currentChain;

                    return (
                      <button
                        key={chain}
                        onClick={() => handleSwitchNetwork(chain)}
                        className={`w-full flex items-center justify-between px-3 py-2 rounded-lg transition-colors ${
                          isCurrent
                            ? 'bg-primary-500/10 text-primary-500'
                            : 'hover:bg-surface-card text-text-secondary'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          {isCurrent && (
                            <div className="w-2 h-2 bg-primary-500 rounded-full" />
                          )}
                          <span className="text-sm font-medium">{config.name}</span>
                        </div>
                        <span className="text-xs text-text-muted">
                          {config.nativeCurrency.symbol}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}

      {/* Wallet Info */}
      <div className="flex items-center gap-3 px-4 py-2 bg-surface-elevated border border-border-subtle rounded-lg">
        {showBalance && (
          <div className="flex items-center gap-2 pr-3 border-r border-border-subtle">
            <Zap className="w-4 h-4 text-primary-500" />
            <span className="text-sm font-bold text-text-primary">
              {parseFloat(connection.balance).toFixed(4)}{' '}
              {CHAIN_CONFIGS[currentChain].nativeCurrency.symbol}
            </span>
          </div>
        )}

        <div className="flex items-center gap-2">
          <Shield className="w-4 h-4 text-success-500" />
          <span className="text-sm font-medium text-text-primary">
            {connection.ensName || formatAddress(connection.address)}
          </span>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-1 ml-2">
          <button
            onClick={handleCopyAddress}
            className="p-1.5 hover:bg-surface-card rounded transition-colors"
            title="Adresi Kopyala"
          >
            {copied ? (
              <Check className="w-4 h-4 text-success-500" />
            ) : (
              <Copy className="w-4 h-4 text-text-secondary" />
            )}
          </button>

          <button
            onClick={openBlockExplorer}
            className="p-1.5 hover:bg-surface-card rounded transition-colors"
            title="Block Explorer'da Aç"
          >
            <ExternalLink className="w-4 h-4 text-text-secondary" />
          </button>
        </div>
      </div>

      {/* Disconnect Button */}
      <button
        onClick={handleDisconnect}
        className="px-4 py-2 bg-surface-elevated hover:bg-error-500/10 border border-border-subtle hover:border-error-500/30 text-text-secondary hover:text-error-500 rounded-lg transition-all duration-200"
      >
        <span className="text-sm font-medium">Bağlantıyı Kes</span>
      </button>
    </div>
  );
};

export default Web3Connector;
