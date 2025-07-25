Please update the existing `src/redstone-sample.tsx` file with the following enhancements.

## Goal

Update the UI to support these three improvements:

1. Display a local SVG icon next to each token symbol
2. Move the timestamp display out of each card and show it once at the top of the page
3. Add a dummy "Refresh" button to the top-right corner of the page (no real functionality needed)

## Token Icons (Local SVGs)

- The SVG icons are located in the `public/icons/` folder
- Each token object includes a `icon` field corresponding to the exact filename

### Example tokenData:

```ts
const tokenData: TokenData[] = [
  {
    symbol: "BTC",
    price: 29532.12,
    timestamp: "2025/07/24 15:03 UTC",
    signatureAvailable: true,
    icon: "bitcoin-btc-logo.svg",
  },
  {
    symbol: "ETH",
    price: 1854.67,
    timestamp: "2025/07/24 15:03 UTC",
    signatureAvailable: true,
    icon: "ethereum-eth-logo.svg",
  },
  {
    symbol: "SOL",
    price: 24.89,
    timestamp: "2025/07/24 15:03 UTC",
    signatureAvailable: true,
    icon: "solana-sol-logo.svg",
  },
  {
    symbol: "BNB",
    price: 312.45,
    timestamp: "2025/07/24 15:03 UTC",
    signatureAvailable: false,
    icon: "bnb-bnb-logo.svg",
  },
  {
    symbol: "XRP",
    price: 0.6234,
    timestamp: "2025/07/24 15:03 UTC",
    signatureAvailable: true,
    icon: "xrp-xrp-logo.svg",
  },
  {
    symbol: "USDC",
    price: 1.0001,
    timestamp: "2025/07/24 15:03 UTC",
    signatureAvailable: true,
    icon: "usd-coin-usdc-logo.svg",
  },
  {
    symbol: "USDT",
    price: 0.9998,
    timestamp: "2025/07/24 15:03 UTC",
    signatureAvailable: true,
    icon: "tether-usdt-logo.svg",
  },
  {
    symbol: "DAI",
    price: 1.0003,
    timestamp: "2025/07/24 15:03 UTC",
    signatureAvailable: false,
    icon: "multi-collateral-dai-dai-logo.svg",
  },
];
```

## Error Handling: Fallback Initial as Styled Icon

- If the image fails to load, show the **first letter** of the token symbol (e.g., `B` for BTC) instead of the full symbol
- Style the fallback character to look like a circular icon using TailwindCSS:

  - Size: `w-6 h-6`
  - Rounded: `rounded-full`
  - Background: `bg-gray-200`
  - Font: `text-sm font-bold text-gray-600`
  - Center the text: `flex items-center justify-center`
  - Add spacing: `mr-2`

### Example (fallback):

```tsx
<span className="w-6 h-6 rounded-full bg-gray-200 text-sm font-bold text-gray-600 flex items-center justify-center mr-2">
  B
</span>
```

## Shared Timestamp Display

- Extract the `timestamp` from the first token in the array
- Display it once below the page heading, like this:
  `Data Timestamp: 2025/07/24 15:03 UTC`
- Remove the timestamp field from each individual token card

## Dummy Refresh Button

- Add a “Refresh” button to the top-right corner of the page
- Use the `Button` component from `shadcn/ui`
- It doesn't need to do anything yet (no logic required)

## Design Notes

- Use TailwindCSS and `shadcn/ui` components
- Keep the layout clean and minimal
- Use only neutral colors: white, black, gray
