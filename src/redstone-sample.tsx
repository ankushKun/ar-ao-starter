import Navbar from "@/components/navbar";
import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState, useEffect } from "react";
import redstone from "redstone-api";

interface TokenData {
  symbol: string;
  price: number;
  timestamp: string;
  source: Record<string, number>;
  icon: string;
}

const TOKEN_SYMBOLS = [
  "BTC",
  "ETH",
  "SOL",
  "BNB",
  "XRP",
  "USDC",
  "USDT",
  "DAI",
];

const iconMap: Record<string, string> = {
  BTC: "bitcoin-btc-logo.svg",
  ETH: "ethereum-eth-logo.svg",
  SOL: "solana-sol-logo.svg",
  BNB: "bnb-bnb-logo.svg",
  XRP: "xrp-xrp-logo.svg",
  USDC: "usd-coin-usdc-logo.svg",
  USDT: "tether-usdt-logo.svg",
  DAI: "multi-collateral-dai-dai-logo.svg",
};

function TokenIcon({ token }: { token: TokenData }) {
  const [imageError, setImageError] = useState(false);

  if (imageError) {
    return (
      <span className="w-6 h-6 rounded-full bg-gray-200 text-sm font-bold text-gray-600 flex items-center justify-center mr-2">
        {token.symbol.charAt(0)}
      </span>
    );
  }

  return (
    <img
      src={`/icons/${token.icon}`}
      alt={`${token.symbol} icon`}
      className="w-6 h-6 mr-2"
      onError={() => setImageError(true)}
    />
  );
}

function formatProviderName(provider: string): string {
  return provider
    .split(/[-_]/)  
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join('');
}

function TokenCard({ token }: { token: TokenData }) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const hasSourceData = token.source && Object.keys(token.source).length > 0;

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-foreground flex items-center">
          <TokenIcon token={token} />
          {token.symbol}
        </CardTitle>
        <CardDescription className="text-2xl font-bold text-foreground">
          $
          {token.price.toLocaleString("en-US", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 6,
          })}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full text-sm"
              >
                🔍 Sources
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Sources for {token.symbol}</DialogTitle>
              </DialogHeader>
              <div className="space-y-2">
                {hasSourceData ? (
                  Object.entries(token.source).map(([provider, price]) => (
                    <div key={provider} className="flex justify-between items-center py-1">
                      <span className="text-sm font-medium">{formatProviderName(provider)}:</span>
                      <span className="text-sm">${price.toFixed(2)}</span>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-muted-foreground">No source data available.</p>
                )}
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </CardContent>
    </Card>
  );
}

export default function RedstoneSample() {
  const [tokenData, setTokenData] = useState<TokenData[]>([]);
  const [loading, setLoading] = useState(true);
  const [lastFetched, setLastFetched] = useState<string>("");

  const fetchTokenPrices = async () => {
    setLoading(true);
    try {
      const prices = await redstone.getPrice(TOKEN_SYMBOLS, {
        verifySignature: true,
      });

      const processedData: TokenData[] = Object.entries(prices).map(
        ([symbol, data]) => ({
          symbol,
          price: data.value,
          timestamp: new Date(data.timestamp).toISOString(),
          source: (data as any).source || {},
          icon: iconMap[symbol] || `${symbol.toLowerCase()}-logo.svg`,
        })
      );

      setTokenData(processedData);
      setLastFetched(
        new Date()
          .toLocaleString("en-US", {
            timeZone: "UTC",
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
            timeZoneName: "short",
          })
          .replace(",", "")
      );
    } catch (error) {
      console.error("Failed to fetch token prices:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTokenPrices();
  }, []);

  const handleRefetch = () => {
    fetchTokenPrices();
  };

  return (
    <div className="min-h-screen text-foreground flex flex-col bg-foreground/5 items-center justify-center w-full">
      <Navbar />
      <div className="grow flex flex-col items-center justify-center p-6 w-full max-w-6xl">
        <div className="text-center mb-8 relative w-full">
          <div className="absolute top-0 right-0">
            <Button
              variant="outline"
              className="mb-4"
              onClick={handleRefetch}
              disabled={loading}
            >
              {loading ? "Loading..." : "Refetch"}
            </Button>
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-4">
            @redstone-api Sample
          </h1>
          <div className="text-sm text-muted-foreground mb-4">
            {lastFetched ? `Last fetched at: ${lastFetched}` : "Loading..."}
          </div>
          <div className="text-muted-foreground text-base max-w-2xl mx-auto space-y-2">
            <p>
              RedStone is an oracle network backed by Arweave's decentralized
              storage.
            </p>
            <p>
              There are three ways to implement RedStone in applications:{" "}
              <code className="bg-muted px-1 py-0.5 rounded">
                @redstone-finance/sdk
              </code>
              ,{" "}
              <code className="bg-muted px-1 py-0.5 rounded">
                @redstone-api
              </code>
              , and the RedStone HTTP API.
            </p>
            <p>
              For MVPs and simple prototypes,{" "}
              <code className="bg-muted px-1 py-0.5 rounded">
                @redstone-api
              </code>{" "}
              is the recommended choice.
            </p>
          </div>
        </div>

        {loading && tokenData.length === 0 ? (
          <div className="text-center text-muted-foreground text-lg">
            Loading...
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 w-full">
            {tokenData.map((token) => (
              <TokenCard key={token.symbol} token={token} />
            ))}
          </div>
        )}
      </div>
      <a href="/" className="text-sm text-foreground/50 p-10">
        Back to Home
      </a>
    </div>
  );
}
