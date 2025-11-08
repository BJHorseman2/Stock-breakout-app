export interface MarketAsset {
  symbol: string
  name: string
  price: number
  change: number
  changePercent: number
  volume: number
  breakoutType: 'breakout' | 'breakdown'
  breakoutLevel: number
  timestamp: number
}

export interface BreakoutData {
  breakouts: MarketAsset[]
  breakdowns: MarketAsset[]
  lastUpdated: string
}
