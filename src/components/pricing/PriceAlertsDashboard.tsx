'use client';

import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { format } from 'date-fns';
import logger from '../../lib/logger';
import { useToast } from '../../context/ToastContext';

interface PriceAlert {
  id: string;
  entityType: string;
  entityId: string;
  entityName: string;
  targetPrice: number;
  currentPrice: number;
  currency: string;
  status: string;
  priceDropPercentage?: number;
  expiresAt?: string;
  lastNotifiedAt?: string;
  notificationCount: number;
  createdAt: string;
  updatedAt: string;
}

export default function PriceAlertsDashboard() {
  const { showSuccess, showError, showWarning, showInfo, showToast } = useToast();

  const { data: session } = useSession();
  const [alerts, setAlerts] = useState<PriceAlert[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'ALL' | 'ACTIVE' | 'TRIGGERED' | 'EXPIRED'>('ALL');

  useEffect(() => {
    if (session) {
      fetchAlerts();
    }
  }, [session, filter]);

  const fetchAlerts = async () => {
    setLoading(true);
    try {
      const queryParams = filter !== 'ALL' ? `?status=${filter}` : '';
      const res = await fetch(`/api/prices/alerts${queryParams}`);
      const data = await res.json();

      if (data.success) {
        setAlerts(data.alerts);
      }
    } catch (error) {
      logger.error('Error fetching alerts:', error as Error, { component: 'Pricealertsdashboard' });
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAlert = async (alertId: string) => {
    if (!confirm('Are you sure you want to delete this price alert?')) return;

    try {
      const res = await fetch(`/api/prices/alerts?alertId=${alertId}`, {
        method: 'DELETE'
      });

      const data = await res.json();

      if (data.success) {
        setAlerts(alerts.filter((alert) => alert.id !== alertId));
      } else {
        showToast({ type: 'error', title: 'Failed to delete alert' });
      }
    } catch (error) {
      logger.error('Error deleting alert:', error as Error, { component: 'Pricealertsdashboard' });
      showToast({ type: 'error', title: 'Failed to delete alert' });
    }
  };

  const handleToggleStatus = async (alertId: string, currentStatus: string) => {
    const newStatus = currentStatus === 'ACTIVE' ? 'DISABLED' : 'ACTIVE';

    try {
      const res = await fetch('/api/prices/alerts', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ alertId, status: newStatus })
      });

      const data = await res.json();

      if (data.success) {
        setAlerts(
          alerts.map((alert) =>
          alert.id === alertId ? { ...alert, status: newStatus } : alert
          )
        );
      } else {
        showToast({ type: 'error', title: 'Failed to update alert' });
      }
    } catch (error) {
      logger.error('Error updating alert:', error as Error, { component: 'Pricealertsdashboard' });
      showToast({ type: 'error', title: 'Failed to update alert' });
    }
  };

  const getStatusBadge = (status: string) => {
    const styles = {
      ACTIVE: 'bg-green-100 text-green-800 border-green-300',
      TRIGGERED: 'bg-blue-100 text-blue-800 border-blue-300',
      EXPIRED: 'bg-lydian-bg/10 text-gray-100 border-white/20',
      DISABLED: 'bg-yellow-100 text-yellow-800 border-yellow-300'
    };

    return (
      <span
        className={`px-3 py-1 rounded-full text-xs font-semibold border ${
        styles[status as keyof typeof styles] || styles.ACTIVE}`
        }>

        {status}
      </span>);

  };

  const getEntityTypeIcon = (entityType: string) => {
    switch (entityType) {
      case 'HOTEL':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />

          </svg>);

      case 'FLIGHT':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />

          </svg>);

      case 'TOUR':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />

          </svg>);

      default:
        return null;
    }
  };

  const calculateSavings = (alert: PriceAlert) => {
    const currentPrice = parseFloat(alert.currentPrice.toString());
    const targetPrice = parseFloat(alert.targetPrice.toString());
    const savings = currentPrice - targetPrice;
    const percentage = savings / currentPrice * 100;

    return { savings, percentage };
  };

  if (!session) {
    return (
      <div className="text-center py-12">
        <svg
          className="w-16 h-16 text-lydian-text-muted mx-auto mb-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24">

          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />

        </svg>
        <p className="text-lydian-text-dim dark:text-lydian-text-muted">Please sign in to view your price alerts</p>
      </div>);

  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-lydian-text-inverse dark:text-lydian-text-inverse">Price Alerts</h1>
          <p className="text-lydian-text-dim dark:text-lydian-text-muted mt-1">
            Manage your travel price tracking alerts
          </p>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 border-b border-lydian-border-light/10 dark:border-gray-700">
        {(['ALL', 'ACTIVE', 'TRIGGERED', 'EXPIRED'] as const).map((status) =>
        <button
          key={status}
          onClick={() => setFilter(status)}
          className={`px-4 py-2 font-medium transition-colors ${
          filter === status ?
          'text-lydian-primary dark:text-blue-400 border-b-2 border-blue-600' :
          'text-lydian-text-dim dark:text-lydian-text-muted hover:text-white dark:hover:text-gray-200'}`
          }>

            {status}
          </button>
        )}
      </div>

      {/* Alerts List */}
      {loading ?
      <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-lydian-primary"></div>
        </div> :
      alerts.length === 0 ?
      <div className="text-center py-12 bg-lydian-glass-dark dark:bg-gray-900 rounded-lg">
          <svg
          className="w-16 h-16 text-lydian-text-muted mx-auto mb-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24">

            <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />

          </svg>
          <p className="text-lydian-text-dim dark:text-lydian-text-muted text-lg">No price alerts found</p>
          <p className="text-lydian-text-muted dark:text-lydian-text-muted text-sm mt-2">
            Start tracking prices to get notified when they drop
          </p>
        </div> :

      <div className="grid gap-4">
          {alerts.map((alert) => {
          const { savings, percentage } = calculateSavings(alert);
          const isGoodDeal = savings > 0;

          return (
            <div
              key={alert.id}
              className="bg-lydian-glass-dark dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow p-6">

                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4 flex-1">
                    {/* Icon */}
                    <div className="p-3 bg-lydian-primary-light dark:bg-blue-900/30 rounded-lg text-lydian-primary dark:text-blue-400">
                      {getEntityTypeIcon(alert.entityType)}
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-semibold text-lydian-text-inverse dark:text-lydian-text-inverse">
                          {alert.entityName}
                        </h3>
                        {getStatusBadge(alert.status)}
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                        <div>
                          <p className="text-xs text-lydian-text-dim dark:text-lydian-text-muted">Current Price</p>
                          <p className="text-lg font-bold text-lydian-text-inverse dark:text-lydian-text-inverse">
                            {alert.currency} {parseFloat(alert.currentPrice.toString()).toFixed(2)}
                          </p>
                        </div>

                        <div>
                          <p className="text-xs text-lydian-text-dim dark:text-lydian-text-muted">Target Price</p>
                          <p className="text-lg font-bold text-lydian-success">
                            {alert.currency} {parseFloat(alert.targetPrice.toString()).toFixed(2)}
                          </p>
                        </div>

                        <div>
                          <p className="text-xs text-lydian-text-dim dark:text-lydian-text-muted">
                            Potential Savings
                          </p>
                          <p
                          className={`text-lg font-bold ${
                          isGoodDeal ? 'text-lydian-success' : 'text-lydian-text-muted'}`
                          }>

                            {isGoodDeal ? '-' : ''}
                            {alert.currency} {Math.abs(savings).toFixed(2)}
                          </p>
                          <p className="text-xs text-lydian-text-muted">
                            {isGoodDeal ? percentage.toFixed(1) : '0'}% off
                          </p>
                        </div>

                        <div>
                          <p className="text-xs text-lydian-text-dim dark:text-lydian-text-muted">Notifications</p>
                          <p className="text-lg font-bold text-lydian-primary">
                            {alert.notificationCount}
                          </p>
                          {alert.lastNotifiedAt &&
                        <p className="text-xs text-lydian-text-muted">
                              Last: {format(new Date(alert.lastNotifiedAt), 'MMM dd')}
                            </p>
                        }
                        </div>
                      </div>

                      <div className="flex items-center gap-6 mt-4 text-sm text-lydian-text-dim dark:text-lydian-text-muted">
                        <div className="flex items-center gap-1">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />

                          </svg>
                          <span>Created {format(new Date(alert.createdAt), 'MMM dd, yyyy')}</span>
                        </div>
                        {alert.expiresAt &&
                      <div className="flex items-center gap-1">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />

                            </svg>
                            <span>Expires {format(new Date(alert.expiresAt), 'MMM dd, yyyy')}</span>
                          </div>
                      }
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">
                    <button
                    onClick={() => handleToggleStatus(alert.id, alert.status)}
                    className="p-2 text-lydian-text-dim hover:text-lydian-primary dark:text-lydian-text-muted dark:hover:text-blue-400 transition-colors"
                    title={alert.status === 'ACTIVE' ? 'Disable alert' : 'Enable alert'}>

                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        {alert.status === 'ACTIVE' ?
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" /> :


                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />

                      }
                      </svg>
                    </button>
                    <button
                    onClick={() => handleDeleteAlert(alert.id)}
                    className="p-2 text-lydian-text-dim hover:text-lydian-primary dark:text-lydian-text-muted dark:hover:text-lydian-error transition-colors"
                    title="Delete alert">

                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />

                      </svg>
                    </button>
                  </div>
                </div>
              </div>);

        })}
        </div>
      }
    </div>);

}