import Navbar from "@/components/navbar"

export default function AnotherPage() {
    return (
        <div className="min-h-screen text-foreground flex flex-col bg-foreground/5 items-center justify-center w-full">
            <Navbar />
            <div className="grow items-center justify-center flex">
                <div className="text-center text-2xl">Yo Guys! Use hash router for routing on permaweb apps</div>
            </div>
            <a href="/" className="text-sm text-foreground/50 p-10">back to home</a>
        </div>
    )
}