'use client'

import { useEffect, useState } from 'react'
import type { BreakoutData, MarketAsset } from '@/types/market'
import { formatDistanceToNow } from 'date-fns'

function AssetCard({ asset }: { asset: MarketAsset }) {
  const isBreakout = asset.breakoutType === 'breakout'
  const bgColor = isBreakout ? 'bg-green-900/20' : 'bg-red-900/20'
  const borderColor = isBreakout ? 'border-green-500' : 'border-red-500'
  const textColor = isBreakout ? 'text-green-400' : 'text-red-400'

  return (
    <div className={`${bgColor} ${borderColor} border-2 rounded-lg p-4 mb-3 hover:scale-[1.02] transition-transform`}>
      <div className="flex justify-between items-start mb-2">
        <div>
          <h3 className="text-xl font-bold text-white">{asset.symbol}</h3>
          <p className="text-sm text-gray-400">{asset.name}</p>
        </div>
        <div className="text-right">
          <p className="text-2xl font-bold text-white">${asset.price.toLocaleString()}</p>
          <p className={`text-sm font-semibold ${textColor}`}>
            {asset.change >= 0 ? '+' : ''}{asset.change.toFixed(2)} ({asset.changePercent.toFixed(2)}%)
          </p>
        </div>
      </div>
      <div className="flex justify-between items-center text-sm mt-3 pt-3 border-t border-gray-700">
        <div>
          <span className="text-gray-400">Volume: </span>
          <span className="text-white font-medium">{asset.volume.toLocaleString()}</span>
        </div>
        <div>
          <span className="text-gray-400">{isBreakout ? 'Broke Above' : 'Broke Below'}: </span>
          <span className="text-white font-medium">${asset.breakoutLevel.toFixed(2)}</span>
        </div>
      </div>
    </div>
  )
}

export default function Home() {
  const [data, setData] = useState<BreakoutData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [lastUpdated, setLastUpdated] = useState<string>('')

  const fetchData = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/breakouts')
      if (!response.ok) throw new Error('Failed to fetch data')
      const result = await response.json()
      setData(result)
      setLastUpdated(result.lastUpdated)
      setError(null)
    } catch (err) {
      setError('Failed to load market data')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
    // Refresh data every 60 seconds
    const interval = setInterval(fetchData, 60000)
    return () => clearInterval(interval)
  }, [])

  if (loading && !data) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-400">Loading market data...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 text-xl mb-4">{error}</p>
          <button
            onClick={fetchData}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg"
          >
            Retry
          </button>
        </div>
      </div>
    )
  }

  return (
    <main className="min-h-screen p-4 md:p-8 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
          Market Breakouts 📈
        </h1>
        <p className="text-gray-400 text-lg">
          Daily breakouts and breakdowns for stocks and cryptocurrencies
        </p>
        {lastUpdated && (
          <p className="text-sm text-gray-500 mt-2">
            Last updated: {formatDistanceToNow(new Date(lastUpdated), { addSuffix: true })}
          </p>
        )}
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Breakouts Section */}
        <div>
          <div className="flex items-center mb-4">
            <h2 className="text-2xl font-bold text-green-400 flex items-center">
              🚀 Breakouts
              <span className="ml-3 text-sm bg-green-900/30 text-green-300 px-3 py-1 rounded-full">
                {data?.breakouts.length || 0}
              </span>
            </h2>
          </div>
          {data?.breakouts.length === 0 ? (
            <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-8 text-center">
              <p className="text-gray-400">No breakouts detected today</p>
            </div>
          ) : (
            <div>
              {data?.breakouts.map(asset => (
                <AssetCard key={asset.symbol} asset={asset} />
              ))}
            </div>
          )}
        </div>

        {/* Breakdowns Section */}
        <div>
          <div className="flex items-center mb-4">
            <h2 className="text-2xl font-bold text-red-400 flex items-center">
              📉 Breakdowns
              <span className="ml-3 text-sm bg-red-900/30 text-red-300 px-3 py-1 rounded-full">
                {data?.breakdowns.length || 0}
              </span>
            </h2>
          </div>
          {data?.breakdowns.length === 0 ? (
            <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-8 text-center">
              <p className="text-gray-400">No breakdowns detected today</p>
            </div>
          ) : (
            <div>
              {data?.breakdowns.map(asset => (
                <AssetCard key={asset.symbol} asset={asset} />
              ))}
            </div>
          )}
        </div>
      </div>

      <button
        onClick={fetchData}
        disabled={loading}
        className="fixed bottom-6 right-6 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 text-white font-bold py-3 px-6 rounded-full shadow-lg transition-all hover:scale-105 disabled:scale-100"
      >
        {loading ? '⟳ Refreshing...' : '🔄 Refresh'}
      </button>
    </main>
  )
}
