import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Market Breakouts - Stocks & Crypto',
  description: 'Track daily breakouts and breakdowns for stocks and cryptocurrencies',
  openGraph: {
    title: 'Market Breakouts',
    description: 'Track daily breakouts and breakdowns for stocks and cryptocurrencies',
    images: ['/hero.png'],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
