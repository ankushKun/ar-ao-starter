Please update the existing `src/redstone-api-sample.tsx` file to implement the following feature.

### Goal

Fetch real-time token prices using RedStone API and display them in the UI.  
Allow users to manually refresh the data via a "Refetch" button.

### Package

Use the `redstone-api` package (already installed):

```ts
import redstone from "redstone-api";
```

### Target Tokens

Support the following tokens:

- BTC
- ETH
- SOL
- BNB
- XRP
- USDC
- USDT
- DAI

### Requirements

- On component mount, fetch token prices using `getPrice(["BTC", "ETH", ...])`
- Store the result in a local state (e.g. `tokenData`)
- Add a "Refetch" button to reload and update the state
- Display the following for each token:

  - `symbol`
  - `price` (from `value`)
  - `timestamp` (converted to UTC string)
  - `signatureAvailable`: `true` if `metadata?.signature` exists

### Data Structure Example

```ts
interface TokenData {
  symbol: string;
  price: number;
  timestamp: string;
  signatureAvailable: boolean;
}
```

### Processing Example

```ts
const prices = await redstone.getPrice(["BTC", "ETH", "DAI", "USDT", ...]);

const tokenData: TokenData[] = Object.entries(prices).map(([symbol, data]) => ({
  symbol,
  price: data.value,
  timestamp: new Date(data.timestamp).toISOString(),
  signatureAvailable: Boolean(data.metadata?.signature)
}));
```

### UI Requirements

- Show `Loading...` while fetching
- Each row shows:

  - token icon (use `logoMap` or `public/svgs/`)
  - symbol and price
  - signature check icon (✅ or ❌)

- Display a common “Last fetched at” timestamp at the top (e.g., `2025/07/24 15:03 UTC`)

### Refetch Button

- Trigger a data reload when clicked
- Immediately update the UI with the latest state
