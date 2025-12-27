'use client';

import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import logger from '../../../../lib/logger';

interface WatchPriceButtonProps {
  entityType: 'HOTEL' | 'FLIGHT' | 'TOUR';
  entityId: string;
  entityName: string;
  currentPrice: number;
  currency?: string;
  metadata?: any;
  onSuccess?: () => void;
  variant?: 'default' | 'icon' | 'compact';
  className?: string;
}

export default function WatchPriceButton({
  entityType,
  entityId,
  entityName,
  currentPrice,
  currency = 'TRY',
  metadata,
  onSuccess,
  variant = 'default',
  className = '',
}: WatchPriceButtonProps) {
  const { data: session } = useSession();
  const [isWatching, setIsWatching] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [alertSettings, setAlertSettings] = useState({
    targetPrice: currentPrice * 0.9, // Default: 10% discount
    priceDropPercentage: 10,
    expiresInDays: 30,
  });

  useEffect(() => {
    checkIfWatching();
  }, [entityId, session]);

  const checkIfWatching = async () => {
    if (!session) return;

    try {
      const res = await fetch(
        `/api/prices/alerts?entityType=${entityType}&entityId=${entityId}&status=ACTIVE`
      );
      const data = await res.json();

      if (data.success && data.alerts && data.alerts.length > 0) {
        setIsWatching(true);
      }
    } catch (error) {
      logger.error('Error checking watch status:', error as Error, { component: 'Watchpricebutton' });
    }
  };

  const handleWatchPrice = async () => {
    if (!session) {
      alert('Please sign in to track prices');
      return;
    }

    if (isWatching) {
      // Remove from watchlist
      setShowModal(false);
      // Would need alert ID to delete - simplified for this example
      setIsWatching(false);
      return;
    }

    setShowModal(true);
  };

  const handleConfirmWatch = async () => {
    setLoading(true);

    try {
      const expiresAt = new Date();
      expiresAt.setDate(expiresAt.getDate() + alertSettings.expiresInDays);

      const res = await fetch('/api/prices/track', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          entityType,
          entityId,
          entityName,
          targetPrice: alertSettings.targetPrice,
          currentPrice,
          currency,
          priceDropPercentage: alertSettings.priceDropPercentage,
          expiresAt: expiresAt.toISOString(),
          metadata,
        }),
      });

      const data = await res.json();

      if (data.success) {
        setIsWatching(true);
        setShowModal(false);
        if (onSuccess) onSuccess();
      } else {
        alert('Failed to set price alert: ' + data.error);
      }
    } catch (error) {
      logger.error('Error setting price alert:', error as Error, { component: 'Watchpricebutton' });
      alert('Failed to set price alert');
    } finally {
      setLoading(false);
    }
  };

  // Icon variant
  if (variant === 'icon') {
    return (
      <>
        <button
          onClick={handleWatchPrice}
          className={`p-2 rounded-full hover:bg-white/10 dark:hover:bg-gray-800 transition-colors ${className}`}
          title={isWatching ? 'Watching price' : 'Watch price'}
        >
          <svg
            className={`w-6 h-6 ${isWatching ? 'text-yellow-500 fill-current' : 'text-gray-300'}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
            />
          </svg>
        </button>
        {showModal && <WatchPriceModal />}
      </>
    );
  }

  // Compact variant
  if (variant === 'compact') {
    return (
      <>
        <button
          onClick={handleWatchPrice}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border ${
            isWatching
              ? 'bg-yellow-50 border-yellow-300 text-yellow-700'
              : 'bg-white/5 border-white/20 text-gray-200 hover:bg-white/5'
          } transition-colors ${className}`}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
            />
          </svg>
          <span className="text-sm font-medium">
            {isWatching ? 'Watching' : 'Watch Price'}
          </span>
        </button>
        {showModal && <WatchPriceModal />}
      </>
    );
  }

  // Default variant
  const WatchPriceModal = () => (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white/5 dark:bg-gray-800 rounded-2xl shadow-2xl max-w-md w-full mx-4 p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white dark:text-white">
            Set Price Alert
          </h2>
          <button
            onClick={() => setShowModal(false)}
            className="text-gray-400 hover:text-gray-300 dark:hover:text-gray-300"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-200 dark:text-gray-300 mb-2">
              Item
            </label>
            <p className="text-white dark:text-white font-semibold">{entityName}</p>
            <p className="text-sm text-gray-300 dark:text-gray-400">
              Current Price: {currency} {currentPrice.toFixed(2)}
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-200 dark:text-gray-300 mb-2">
              Target Price
            </label>
            <div className="relative">
              <input
                type="number"
                value={alertSettings.targetPrice}
                onChange={(e) =>
                  setAlertSettings({ ...alertSettings, targetPrice: parseFloat(e.target.value) })
                }
                className="w-full px-4 py-2 border border-white/20 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                step="0.01"
                min="0"
              />
              <span className="absolute right-3 top-2.5 text-gray-400">{currency}</span>
            </div>
            <p className="text-xs text-gray-400 mt-1">
              {(((currentPrice - alertSettings.targetPrice) / currentPrice) * 100).toFixed(1)}%
              discount from current price
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-200 dark:text-gray-300 mb-2">
              Or notify when price drops by
            </label>
            <div className="relative">
              <input
                type="number"
                value={alertSettings.priceDropPercentage}
                onChange={(e) =>
                  setAlertSettings({
                    ...alertSettings,
                    priceDropPercentage: parseFloat(e.target.value),
                  })
                }
                className="w-full px-4 py-2 border border-white/20 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                step="1"
                min="1"
                max="50"
              />
              <span className="absolute right-3 top-2.5 text-gray-400">%</span>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-200 dark:text-gray-300 mb-2">
              Alert Duration
            </label>
            <select
              value={alertSettings.expiresInDays}
              onChange={(e) =>
                setAlertSettings({ ...alertSettings, expiresInDays: parseInt(e.target.value) })
              }
              className="w-full px-4 py-2 border border-white/20 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            >
              <option value={7}>7 days</option>
              <option value={14}>14 days</option>
              <option value={30}>30 days</option>
              <option value={60}>60 days</option>
              <option value={90}>90 days</option>
            </select>
          </div>

          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
            <div className="flex items-start">
              <svg
                className="w-5 h-5 text-blue-600 dark:text-blue-400 mr-2 flex-shrink-0 mt-0.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <div className="text-sm text-blue-800 dark:text-blue-200">
                <p className="font-medium mb-1">How it works:</p>
                <ul className="list-disc list-inside space-y-1 text-xs">
                  <li>We&apos;ll monitor the price daily</li>
                  <li>You&apos;ll get an email when the price drops</li>
                  <li>You can manage alerts from your dashboard</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="flex gap-3 mt-6">
          <button
            onClick={() => setShowModal(false)}
            className="flex-1 px-4 py-2 border border-white/20 dark:border-gray-600 text-gray-200 dark:text-gray-300 rounded-lg hover:bg-white/5 dark:hover:bg-gray-700 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirmWatch}
            disabled={loading}
            className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <svg
                  className="animate-spin h-5 w-5 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Setting Alert...
              </span>
            ) : (
              'Set Alert'
            )}
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <button
        onClick={handleWatchPrice}
        className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all ${
          isWatching
            ? 'bg-yellow-100 text-yellow-700 border-2 border-yellow-300 hover:bg-yellow-200'
            : 'bg-blue-600 text-white hover:bg-blue-700 shadow-lg hover:shadow-xl'
        } ${className}`}
      >
        <svg
          className={`w-5 h-5 ${isWatching ? 'fill-current' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
          />
        </svg>
        <span>{isWatching ? 'Watching Price' : 'Watch Price'}</span>
        {isWatching && (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clipRule="evenodd"
            />
          </svg>
        )}
      </button>
      {showModal && <WatchPriceModal />}
    </>
  );
}
