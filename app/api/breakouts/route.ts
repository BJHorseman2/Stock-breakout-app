import { NextResponse } from 'next/server'
import type { BreakoutData, MarketAsset } from '@/types/market'

// Mock data generator for demonstration
// In production, this would fetch from real APIs like:
// - Stocks: Alpha Vantage, Yahoo Finance, Polygon.io
// - Crypto: CoinGecko, Binance, CoinMarketCap
function generateMockBreakoutData(): BreakoutData {
  const stocks = [
    { symbol: 'AAPL', name: 'Apple Inc.' },
    { symbol: 'GOOGL', name: 'Alphabet Inc.' },
    { symbol: 'MSFT', name: 'Microsoft Corp.' },
    { symbol: 'TSLA', name: 'Tesla Inc.' },
    { symbol: 'NVDA', name: 'NVIDIA Corp.' },
    { symbol: 'AMD', name: 'Advanced Micro Devices' },
    { symbol: 'META', name: 'Meta Platforms' },
  ]

  const cryptos = [
    { symbol: 'BTC', name: 'Bitcoin' },
    { symbol: 'ETH', name: 'Ethereum' },
    { symbol: 'SOL', name: 'Solana' },
    { symbol: 'BNB', name: 'Binance Coin' },
    { symbol: 'ADA', name: 'Cardano' },
    { symbol: 'AVAX', name: 'Avalanche' },
  ]

  const allAssets = [...stocks, ...cryptos]
  const breakouts: MarketAsset[] = []
  const breakdowns: MarketAsset[] = []

  // Randomly assign some assets as breakouts or breakdowns
  allAssets.forEach(asset => {
    const isBreakout = Math.random() > 0.5
    const changePercent = isBreakout
      ? Math.random() * 15 + 5 // 5-20% gain for breakouts
      : -(Math.random() * 15 + 5) // 5-20% loss for breakdowns

    const price = Math.random() * 1000 + 10
    const change = (price * changePercent) / 100
    const volume = Math.random() * 10000000 + 1000000
    const breakoutLevel = isBreakout ? price * 0.95 : price * 1.05

    const marketAsset: MarketAsset = {
      symbol: asset.symbol,
      name: asset.name,
      price: parseFloat(price.toFixed(2)),
      change: parseFloat(change.toFixed(2)),
      changePercent: parseFloat(changePercent.toFixed(2)),
      volume: Math.round(volume),
      breakoutType: isBreakout ? 'breakout' : 'breakdown',
      breakoutLevel: parseFloat(breakoutLevel.toFixed(2)),
      timestamp: Date.now(),
    }

    if (isBreakout && breakouts.length < 5) {
      breakouts.push(marketAsset)
    } else if (!isBreakout && breakdowns.length < 5) {
      breakdowns.push(marketAsset)
    }
  })

  // Sort by change percentage
  breakouts.sort((a, b) => b.changePercent - a.changePercent)
  breakdowns.sort((a, b) => a.changePercent - b.changePercent)

  return {
    breakouts,
    breakdowns,
    lastUpdated: new Date().toISOString(),
  }
}

export async function GET() {
  try {
    const data = generateMockBreakoutData()
    return NextResponse.json(data)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch breakout data' },
      { status: 500 }
    )
  }
}
