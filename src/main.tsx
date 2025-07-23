import { createRoot } from 'react-dom/client'
import './index.css'
import { ThemeProvider } from '@/components/theme-provider.tsx'
import { BrowserRouter, HashRouter, Route, Routes } from "react-router";
import { ArweaveWalletKit } from "@arweave-wallet-kit/react"
import WanderStrategy from "@arweave-wallet-kit/wander-strategy"
import WAuthStrategy from "@wauth/strategy"
import { WAuthProviders } from "@wauth/strategy"
import AosyncStrategy from "@vela-ventures/aosync-strategy"

import App from './App'
import AnotherPage from './another-page'



function Main() {
  return (
    <ArweaveWalletKit
      config={{
        appInfo: {
          name: "ArAO Starter",
          logo: "t8cPU_PWjdLXRBAN89nzb9JQoRAf5ZBF2kkTZoxtJPc",
        },
        strategies: [
          new WanderStrategy(),
          new WAuthStrategy({ provider: WAuthProviders.Google }),
          // Can also use more supported providers for web2 auth
          // new WAuthStrategy({ provider: WAuthProviders.Discord })
          // new WAuthStrategy({ provider: WAuthProviders.Github })
          // new WAuthStrategy({ provider: WAuthProviders.X })
          // If you would like to use any provider other than the ones available,
          // just raise an issue and I'll try my best to add that
          new AosyncStrategy()
        ],
        permissions: ["ACCESS_ADDRESS", "SIGNATURE", "SIGN_TRANSACTION"],
      }}
      theme={{ displayTheme: "dark" }}
    >
      <ThemeProvider defaultTheme="dark">
        <HashRouter>
          <Routes>
            <Route index element={<App />} />
            <Route path="/another-page" element={<AnotherPage />} />
          </Routes>
        </HashRouter>
      </ThemeProvider>
    </ArweaveWalletKit>
  )
}

createRoot(document.getElementById('root')!).render(<Main />)
