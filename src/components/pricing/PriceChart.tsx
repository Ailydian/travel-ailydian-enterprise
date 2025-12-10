'use client';

import React, { useEffect, useState } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceLine,
  Area,
  ComposedChart,
  Scatter,
} from 'recharts';
import { format } from 'date-fns';

interface PriceDataPoint {
  date: Date;
  price: number;
  isPrediction?: boolean;
  confidence?: number;
}

interface PriceChartProps {
  entityType: string;
  entityId: string;
  days?: number;
  showPredictions?: boolean;
  height?: number;
  currency?: string;
}

interface ChartData {
  date: string;
  price: number;
  predictedPrice?: number;
  confidence?: number;
  isPrediction?: boolean;
}

export default function PriceChart({
  entityType,
  entityId,
  days = 30,
  showPredictions = true,
  height = 400,
  currency = 'TRY',
}: PriceChartProps) {
  const [chartData, setChartData] = useState<ChartData[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<any>(null);
  const [predictions, setPredictions] = useState<any>(null);

  useEffect(() => {
    fetchPriceData();
  }, [entityType, entityId, days]);

  const fetchPriceData = async () => {
    setLoading(true);
    try {
      // Fetch historical data
      const historyRes = await fetch(
        `/api/prices/history?entityType=${entityType}&entityId=${entityId}&days=${days}`
      );
      const historyData = await historyRes.json();

      if (!historyData.success) {
        throw new Error('Failed to fetch price history');
      }

      setStats(historyData.stats);

      // Format historical data
      const formattedHistory: ChartData[] = historyData.data.map((item: any) => ({
        date: format(new Date(item.createdAt), 'MMM dd'),
        price: parseFloat(item.price),
        isPrediction: false,
      }));

      // Fetch predictions if enabled and we have enough data
      if (showPredictions && historyData.data.length >= 7) {
        const predictRes = await fetch('/api/prices/predict', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            entityType,
            entityId,
            daysAhead: 7,
          }),
        });

        const predictData = await predictRes.json();

        if (predictData.success && predictData.predictions) {
          setPredictions(predictData);

          // Format prediction data
          const formattedPredictions: ChartData[] = predictData.predictions.map(
            (pred: any) => ({
              date: format(new Date(pred.date), 'MMM dd'),
              predictedPrice: pred.price,
              confidence: pred.confidence,
              isPrediction: true,
            })
          );

          setChartData([...formattedHistory, ...formattedPredictions]);
        } else {
          setChartData(formattedHistory);
        }
      } else {
        setChartData(formattedHistory);
      }
    } catch (error) {
      console.error('Error fetching price data:', error);
      setChartData([]);
    } finally {
      setLoading(false);
    }
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      const isPredicted = data.isPrediction;

      return (
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
          <p className="font-semibold text-gray-900 dark:text-white">{label}</p>
          <p className={`text-sm ${isPredicted ? 'text-blue-600' : 'text-green-600'}`}>
            {isPredicted ? 'Predicted: ' : 'Actual: '}
            {currency} {(data.price || data.predictedPrice)?.toFixed(2)}
          </p>
          {isPredicted && data.confidence && (
            <p className="text-xs text-gray-500 mt-1">
              Confidence: {data.confidence}%
            </p>
          )}
        </div>
      );
    }
    return null;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center" style={{ height }}>
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (chartData.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900 rounded-lg p-8" style={{ height }}>
        <svg
          className="w-16 h-16 text-gray-400 mb-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
          />
        </svg>
        <p className="text-gray-600 dark:text-gray-400 text-center">
          No price history available yet.
          <br />
          Start tracking to see price trends!
        </p>
      </div>
    );
  }

  const currentPrice = stats?.current || 0;
  const minPrice = stats?.min || 0;
  const maxPrice = stats?.max || 0;

  return (
    <div className="space-y-4">
      {/* Stats Cards */}
      {stats && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
            <p className="text-sm text-gray-600 dark:text-gray-400">Current Price</p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">
              {currency} {currentPrice?.toFixed(2)}
            </p>
            {stats.trend && (
              <p className={`text-xs mt-1 ${
                stats.trend === 'decreasing' ? 'text-green-600' :
                stats.trend === 'increasing' ? 'text-red-600' :
                'text-gray-600'
              }`}>
                {stats.trend === 'decreasing' ? '↓ Decreasing' :
                 stats.trend === 'increasing' ? '↑ Increasing' :
                 '→ Stable'}
              </p>
            )}
          </div>

          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
            <p className="text-sm text-gray-600 dark:text-gray-400">Lowest Price</p>
            <p className="text-2xl font-bold text-green-600">
              {currency} {minPrice?.toFixed(2)}
            </p>
            <p className="text-xs text-gray-500 mt-1">
              Best deal recorded
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
            <p className="text-sm text-gray-600 dark:text-gray-400">Highest Price</p>
            <p className="text-2xl font-bold text-red-600">
              {currency} {maxPrice?.toFixed(2)}
            </p>
            <p className="text-xs text-gray-500 mt-1">
              Peak price recorded
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
            <p className="text-sm text-gray-600 dark:text-gray-400">Average Price</p>
            <p className="text-2xl font-bold text-blue-600">
              {currency} {stats.avg}
            </p>
            <p className="text-xs text-gray-500 mt-1">
              {days}-day average
            </p>
          </div>
        </div>
      )}

      {/* Best Time to Book Alert */}
      {stats?.bestTimeToBook && (
        <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
          <div className="flex items-start">
            <svg
              className="w-6 h-6 text-green-600 dark:text-green-400 mr-3 flex-shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <div>
              <h3 className="font-semibold text-green-900 dark:text-green-100">
                Best Time to Book
              </h3>
              <p className="text-sm text-green-800 dark:text-green-200 mt-1">
                The lowest price was {currency} {stats.bestTimeToBook.price?.toFixed(2)} on{' '}
                {format(new Date(stats.bestTimeToBook.date), 'MMMM dd, yyyy')}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ML Predictions Insight */}
      {predictions?.bestDayToBuy && (
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
          <div className="flex items-start">
            <svg
              className="w-6 h-6 text-blue-600 dark:text-blue-400 mr-3 flex-shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 10V3L4 14h7v7l9-11h-7z"
              />
            </svg>
            <div>
              <h3 className="font-semibold text-blue-900 dark:text-blue-100">
                AI Prediction ({predictions.confidence}% confidence)
              </h3>
              <p className="text-sm text-blue-800 dark:text-blue-200 mt-1">
                Best predicted price in next 7 days: {currency}{' '}
                {predictions.bestDayToBuy.price?.toFixed(2)} on day{' '}
                {predictions.bestDayToBuy.day}
                {predictions.bestDayToBuy.savings > 0 && (
                  <span className="text-green-600 dark:text-green-400 font-semibold">
                    {' '}(Save {currency} {predictions.bestDayToBuy.savings?.toFixed(2)})
                  </span>
                )}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Chart */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Price History & Predictions
        </h3>
        <ResponsiveContainer width="100%" height={height}>
          <ComposedChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis
              dataKey="date"
              stroke="#6b7280"
              style={{ fontSize: '12px' }}
            />
            <YAxis
              stroke="#6b7280"
              style={{ fontSize: '12px' }}
              tickFormatter={(value) => `${currency} ${value}`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend />

            {/* Min/Max reference lines */}
            <ReferenceLine
              y={minPrice}
              stroke="#10b981"
              strokeDasharray="3 3"
              label={{ value: 'Lowest', position: 'insideTopRight', fill: '#10b981' }}
            />
            <ReferenceLine
              y={maxPrice}
              stroke="#ef4444"
              strokeDasharray="3 3"
              label={{ value: 'Highest', position: 'insideBottomRight', fill: '#ef4444' }}
            />

            {/* Actual prices */}
            <Line
              type="monotone"
              dataKey="price"
              stroke="#10b981"
              strokeWidth={3}
              dot={{ fill: '#10b981', r: 4 }}
              name="Actual Price"
              connectNulls
            />

            {/* Predicted prices */}
            {showPredictions && (
              <Line
                type="monotone"
                dataKey="predictedPrice"
                stroke="#3b82f6"
                strokeWidth={2}
                strokeDasharray="5 5"
                dot={{ fill: '#3b82f6', r: 3 }}
                name="Predicted Price"
                connectNulls
              />
            )}
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      {/* Legend */}
      <div className="flex items-center justify-center gap-6 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-4 h-1 bg-green-500"></div>
          <span className="text-gray-600 dark:text-gray-400">Actual Price</span>
        </div>
        {showPredictions && (
          <div className="flex items-center gap-2">
            <div className="w-4 h-1 bg-blue-500 border-dashed border-t-2 border-blue-500"></div>
            <span className="text-gray-600 dark:text-gray-400">ML Prediction</span>
          </div>
        )}
      </div>
    </div>
  );
}
