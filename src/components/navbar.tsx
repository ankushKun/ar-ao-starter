import { ConnectButton } from "@arweave-wallet-kit/react";
import { ThemeToggleButton } from "./theme-toggle";

export default function Navbar() {
    return (<header className="border-b w-full">
        <div className="container mx-auto px-4 sm:px-6 lg:px-10 h-16 flex items-center justify-between">
            <div className="flex items-center gap-4">
                <a href="/"><h1 className="text-lg sm:text-xl font-bold">Arweave AO Starter</h1></a>
            </div>
            <div className="flex items-center gap-2">
                <ThemeToggleButton />
                <ConnectButton />
            </div>
        </div>
    </header>)
}