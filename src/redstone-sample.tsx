import Navbar from "@/components/navbar"
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useState } from "react"

interface TokenData {
  symbol: string
  price: number
  timestamp: string
  signatureAvailable: boolean
  icon: string
}

const tokenData: TokenData[] = [
  {
    symbol: "BTC",
    price: 29532.12,
    timestamp: "2025/07/24 15:03 UTC",
    signatureAvailable: true,
    icon: "bitcoin-btc-logo.svg"
  },
  {
    symbol: "ETH",
    price: 1854.67,
    timestamp: "2025/07/24 15:03 UTC",
    signatureAvailable: true,
    icon: "ethereum-eth-logo.svg"
  },
  {
    symbol: "SOL",
    price: 24.89,
    timestamp: "2025/07/24 15:03 UTC",
    signatureAvailable: true,
    icon: "solana-sol-logo.svg"
  },
  {
    symbol: "BNB",
    price: 312.45,
    timestamp: "2025/07/24 15:03 UTC",
    signatureAvailable: false,
    icon: "bnb-bnb-logo.svg"
  },
  {
    symbol: "XRP",
    price: 0.6234,
    timestamp: "2025/07/24 15:03 UTC",
    signatureAvailable: true,
    icon: "xrp-xrp-logo.svg"
  },
  {
    symbol: "USDC",
    price: 1.0001,
    timestamp: "2025/07/24 15:03 UTC",
    signatureAvailable: true,
    icon: "usd-coin-usdc-logo.svg"
  },
  {
    symbol: "USDT",
    price: 0.9998,
    timestamp: "2025/07/24 15:03 UTC",
    signatureAvailable: true,
    icon: "tether-usdt-logo.svg"
  },
  {
    symbol: "DAI",
    price: 1.0003,
    timestamp: "2025/07/24 15:03 UTC",
    signatureAvailable: false,
    icon: "multi-collateral-dai-dai-logo.svg"
  }
]

function TokenIcon({ token }: { token: TokenData }) {
  const [imageError, setImageError] = useState(false)
  
  if (imageError) {
    return (
      <span className="w-6 h-6 rounded-full bg-gray-200 text-sm font-bold text-gray-600 flex items-center justify-center mr-2">
        {token.symbol.charAt(0)}
      </span>
    )
  }
  
  return (
    <img 
      src={`/icons/${token.icon}`}
      alt={`${token.symbol} icon`}
      className="w-6 h-6 mr-2"
      onError={() => setImageError(true)}
    />
  )
}

function TokenCard({ token }: { token: TokenData }) {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-foreground flex items-center">
          <TokenIcon token={token} />
          {token.symbol}
        </CardTitle>
        <CardDescription className="text-2xl font-bold text-foreground">
          ${token.price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 6 })}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="text-sm text-muted-foreground flex items-center gap-2">
            <span className="font-medium">Signature:</span>
            <span className="text-lg">
              {token.signatureAvailable ? "✅" : "❌"}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default function RedstoneSample() {
  return (
    <div className="min-h-screen text-foreground flex flex-col bg-foreground/5 items-center justify-center w-full">
      <Navbar />
      <div className="grow flex flex-col items-center justify-center p-6 w-full max-w-6xl">
        <div className="text-center mb-8 relative w-full">
          <div className="absolute top-0 right-0">
            <Button variant="outline" className="mb-4">
              Refresh
            </Button>
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-4">
            @redstone-api Sample
          </h1>
          <div className="text-sm text-muted-foreground mb-4">
            Data Timestamp: {tokenData[0].timestamp}
          </div>
          <div className="text-muted-foreground text-base max-w-2xl mx-auto space-y-2">
            <p>
              RedStone is an oracle network backed by Arweave's decentralized storage.
            </p>
            <p>
              There are three ways to implement RedStone in applications: <code className="bg-muted px-1 py-0.5 rounded">@redstone-finance/sdk</code>, <code className="bg-muted px-1 py-0.5 rounded">@redstone-api</code>, and the RedStone HTTP API.
            </p>
            <p>
              For MVPs and simple prototypes, <code className="bg-muted px-1 py-0.5 rounded">@redstone-api</code> is the recommended choice.
            </p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 w-full">
          {tokenData.map((token) => (
            <TokenCard key={token.symbol} token={token} />
          ))}
        </div>
      </div>
      <a href="/" className="text-sm text-foreground/50 p-10">Back to Home</a>
    </div>
  )
}