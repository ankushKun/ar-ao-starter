Create a frontend-only sample page that displays token price data using `@redstone-api`.

## File

- Save the file as: `src/redstone-sample.tsx`

## Routing

- We are using `HashRouter` defined in `main.tsx`
- This page should be accessible via the path `/#/redstone-sample`
- Export the component as default

## Layout & Structure

- The page layout and design should follow the same structure as `another-page.tsx`
- Reuse the same Header component used in `another-page.tsx`
- Add a Footer section with a “Back to Home” button, just like in `another-page.tsx`
- At the top, add a heading: `@redstone-api Sample`
- Below the heading, add a short paragraph that explains what RedStone is:
  - RedStone is an oracle network backed by Arweave's decentralized storage
  - There are three ways to implement RedStone in applications: `@redstone-finance/sdk`, `@redstone-api`, and the RedStone HTTP API
  - For MVPs and simple prototypes, `@redstone-api` is the recommended choice

## Token List

Display the following tokens:

- BTC
- ETH
- SOL
- BNB
- XRP
- USDC
- USDT
- DAI

## Fields to Display (per token)

- Token symbol (e.g., BTC)
- Current price in USD (e.g., $29,532.12)
- Data timestamp (e.g., 2025/07/24 15:03 UTC)
- Signature available (✅ or ❌)

Use dummy data for now (no API calls).

## Design Requirements

- Use white, black, and gray only
- Match the minimal style used in existing pages
- Display tokens using `Card` components from `shadcn/ui`
- Layout should be clean and responsive using TailwindCSS
