## 🎯 Goal

Remove the `signatureAvailable` feature and instead allow users to view the underlying price sources for each token using the `source` object from RedStone's Price data format.

## 📄 File

- Modify the existing file: `src/redstone-sample.tsx`

## 🛠️ Instructions

- Remove all logic and UI elements related to `signatureAvailable`.

- Each token row should include a new button: `🔍 Sources`

- When clicked, this button should open a modal or expand a section displaying the token’s `source` object.

- `source` is a field in the RedStone API Price data format and looks like this:

  ```ts
  source: Record<string, number>; // e.g. { "coingecko": 123.12, "uniswap": 123.45 }
  ```

- Display each entry in the format:

  ```
  ProviderName: $Price
  ```

  Example:

  ```
  Sources for ETH:
  - Uniswap: $1854.73
  - SushiSwap: $1854.67
  - CoinGecko: $1854.65
  ```

- Format each provider name in Title Case (e.g., `CoinGecko`, `Uniswap`)

- Format prices with 2 decimal places (e.g., `$1854.73`)

- If a `source` object is missing or empty, display a fallback message like:

  ```
  No source data available.
  ```

- Use Tailwind CSS and shadcn/ui components.

- The UI must remain minimalistic: use only white, black, and grayscale tones.

## ✅ Notes

- `source` is returned by the RedStone API as part of the [Price data format](https://github.com/redstone-finance/redstone-api).
- You can access it via `prices["DAI"].source`, `prices["ETH"].source`, etc.
- No external API key is required; RedStone API is public and TypeScript-compatible.
- This prompt assumes the RedStone API has already been integrated and prices have been fetched.

## 🧪 Optional Enhancements

- Add animation (e.g., fade-in) when showing the source section using shadcn/ui's `Dialog`, `Popover`, or `Accordion`.
- Allow toggling the source section with a button per token row (e.g., expand/collapse instead of modal).
- Future-proof the code to support showing historical source data per token.
