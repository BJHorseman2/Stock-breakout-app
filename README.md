# Market Breakouts Mini App

A Base + Farcaster Mini App that tracks and displays daily breakouts and breakdowns for stocks and cryptocurrencies.

## Features

- 📈 Real-time tracking of market breakouts (upward price movements)
- 📉 Real-time tracking of market breakdowns (downward price movements)
- 🔄 Auto-refresh every 60 seconds
- 💰 Support for both stocks and cryptocurrencies
- 🎨 Beautiful, responsive UI with dark mode
- ⚡ Built on Next.js 14 with TypeScript

## Getting Started

### Prerequisites

- Node.js 18.x or higher
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd Stock-breakout-app
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm start
```

## Base Mini App Setup

This app is configured as a Base + Farcaster Mini App. Follow these steps to deploy:

### 1. Update the Farcaster Manifest

Edit `.well-known/farcaster.json` and replace `yourdomain.com` with your actual domain:

```json
{
  "frame": {
    "version": "1",
    "name": "Market Breakouts",
    "iconUrl": "https://yourdomain.com/icon.png",
    "splashImageUrl": "https://yourdomain.com/splash.png",
    "homeUrl": "https://yourdomain.com",
    "imageUrl": "https://yourdomain.com/hero.png",
    "buttonTitle": "View Breakouts",
    "description": "Track daily breakouts and breakdowns for stocks and cryptocurrencies on Base"
  }
}
```

### 2. Deploy Your App

Deploy to Vercel, Netlify, or your preferred hosting platform:

#### Vercel (Recommended)
```bash
npm install -g vercel
vercel
```

#### Or use the Vercel dashboard to import your GitHub repository.

### 3. Verify Manifest Accessibility

After deployment, verify your manifest is accessible at:
```
https://yourdomain.com/.well-known/farcaster.json
```

### 4. Customize Assets

Replace the placeholder images in the `public/` folder with your custom graphics:
- `icon.png` - App icon (512x512px recommended)
- `hero.png` - Hero image (1200x630px recommended)
- `splash.png` - Splash screen (1125x2436px recommended)

## API Integration

The app currently uses mock data for demonstration. To integrate real market data:

1. Edit `app/api/breakouts/route.ts`
2. Add your preferred API integration:
   - **Stocks**: Alpha Vantage, Yahoo Finance, Polygon.io
   - **Crypto**: CoinGecko, Binance, CoinMarketCap

Example with environment variables:
```env
ALPHA_VANTAGE_API_KEY=your_key_here
COINGECKO_API_KEY=your_key_here
```

## Project Structure

```
Stock-breakout-app/
├── app/
│   ├── api/
│   │   └── breakouts/
│   │       └── route.ts          # API endpoint for market data
│   ├── globals.css                # Global styles
│   ├── layout.tsx                 # Root layout
│   └── page.tsx                   # Main page component
├── public/
│   ├── icon.png                   # App icon
│   ├── hero.png                   # Hero image
│   └── splash.png                 # Splash screen
├── types/
│   └── market.ts                  # TypeScript types
├── .well-known/
│   └── farcaster.json            # Farcaster manifest
└── package.json
```

## Breakout Detection Logic

The app identifies breakouts and breakdowns based on:
- Price movement relative to recent support/resistance levels
- Volume analysis
- Percentage change thresholds
- Time-based momentum

Current implementation uses mock data. Integrate with real APIs to enable actual technical analysis.

## Tech Stack

- **Framework**: Next.js 14
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Charts**: Recharts (ready for integration)
- **Date Handling**: date-fns

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT License - feel free to use this project for your own purposes.

## Support

For issues or questions, please open an issue on GitHub.
