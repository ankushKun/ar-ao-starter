import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { ThemeProvider } from '@/components/theme-provider.tsx'
import { ArweaveWalletKit } from "@arweave-wallet-kit/react"
import WanderStrategy from "@arweave-wallet-kit/wander-strategy"


function Main() {
  return (
    <ArweaveWalletKit
      config={{
        appInfo: {
          name: "ArAO Starter",
          logo: "t8cPU_PWjdLXRBAN89nzb9JQoRAf5ZBF2kkTZoxtJPc",
        },
        strategies: [new WanderStrategy()],
        permissions: ["ACCESS_ADDRESS", "SIGNATURE", "SIGN_TRANSACTION"],
      }}
      theme={{ displayTheme: "dark" }}
    >
      <ThemeProvider defaultTheme="dark">
        <App />
      </ThemeProvider>
    </ArweaveWalletKit>
  )
}

createRoot(document.getElementById('root')!).render(<Main />)
