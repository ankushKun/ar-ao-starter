import { useActiveAddress, useApi, useConnection } from "@arweave-wallet-kit/react"
import { connect as aoconnect, createSigner } from "@permaweb/aoconnect"
import gif from "@/assets/girl.gif"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { SendIcon, Loader2 } from "lucide-react"
import { useEffect, useState } from "react"
import { Skeleton } from "@/components/ui/skeleton"
import Navbar from "@/components/navbar"
import { ARIO } from "@ar.io/sdk"

export default function App() {
  const activeAddress = useActiveAddress()
  const { connect, connected, disconnect } = useConnection()
  const api = useApi()
  const ao = aoconnect({ MODE: "legacy" })
  const ario = ARIO.init({})

  const [primaryName, setPrimaryName] = useState("")

  const [formData, setFormData] = useState({
    processId: "0syT13r0s0tgPmIed95bJnuSqaD29HQNN8D3ElLSrsc",
    data: "",
    action: "Info"
  })

  const [formErrors, setFormErrors] = useState({
    processId: ""
  })

  const [output, setOutput] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  // need this smol helper when using WAuth
  useEffect(() => { if (connected && !activeAddress) disconnect() }, [connected, activeAddress])

  useEffect(() => {
    if (activeAddress) {
      ario.getPrimaryName({ address: activeAddress }).then(res => {
        setPrimaryName(res.name || "No Primary Name Assigned")
      }).catch(() => {
        setPrimaryName("Failed to load Primary Name")
      })
    }
  }, [activeAddress])

  const validateProcessId = (value: string) => {
    if (value.length === 0) return ""
    if (value.length !== 43) {
      return "Process ID must be exactly 43 characters"
    }
    return ""
  }

  const handleInputChange = (field: keyof typeof formData) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setFormData(prev => ({ ...prev, [field]: value }))

    if (field === 'processId') {
      const error = validateProcessId(value)
      setFormErrors(prev => ({ ...prev, processId: error }))
    }
  }

  const handleSubmit = async () => {
    const processIdError = validateProcessId(formData.processId)
    if (processIdError) {
      setFormErrors(prev => ({ ...prev, processId: processIdError }))
      return
    }

    setIsLoading(true)
    setOutput("")

    try {
      console.log("Form data:", formData)

      const mid = await ao.message({
        process: formData.processId,
        data: formData.data,
        tags: formData.action ? [{ name: "Action", value: formData.action }] : [],
        signer: api.id.startsWith("wauth") ? api.getAoSigner() : createSigner(api)
      })

      console.log("Message ID:", mid)
      const res = await ao.result({ process: formData.processId, message: mid })

      setOutput(JSON.stringify(res, null, 2))
    } catch (error) {
      console.error("Error:", error)
      setOutput(JSON.stringify({ error: "Failed to send message" }, null, 2))
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen text-foreground flex flex-col bg-foreground/5 items-center justify-center w-full">
      {/* Header */}
      <Navbar />

      <main className="flex flex-col items-center justify-center p-4 sm:p-5 gap-6 sm:px-6 lg:px-20 grow w-full">
        <div className="rounded-lg w-full flex flex-col sm:flex-row items-center justify-evenly gap-6">
          {connected ? (
            <>
              <img src={gif} draggable={false} alt="girl" className="w-[128px] sm:w-[256px]" />
              <div className="text-xl sm:text-2xl font-mono text-center flex flex-col gap-2">
                <div>Yayy! You are connected</div>
                <div className="text-teal-300 text-sm sm:text-base break-all px-2">{activeAddress}</div>
                <div className="text-sm text-muted-foreground">{primaryName}</div>
              </div>
              <img src={gif} draggable={false} alt="girl" className="hidden sm:block w-[256px]" />
            </>
          ) : (
            <div className="p-6 sm:p-10 text-center">
              <p>Connect your wallet to get started</p>
            </div>
          )}
        </div>

        {connected && (
          <div className="flex flex-col lg:flex-row gap-4 lg:gap-8 w-full max-w-7xl">
            {/* Input Form */}
            <Card className="lg:w-1/3">
              <CardHeader>
                <CardTitle>Send Message</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col gap-4">
                <div className="space-y-2">
                  <label htmlFor="processId" className="text-sm p-1 text-muted-foreground">Target Process ID</label>
                  <Input
                    placeholder="Target Process ID"
                    className={`font-mono ${formErrors.processId ? 'border-red-500 focus-visible:ring-red-500' : ''}`}
                    value={formData.processId}
                    onChange={handleInputChange('processId')}
                    disabled={isLoading}
                  />
                  {formErrors.processId && (
                    <p className="text-sm text-red-500 mt-1">{formErrors.processId}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <label htmlFor="data" className="text-sm p-1 text-muted-foreground">Data</label>
                  <Input
                    placeholder="Data"
                    className="font-mono"
                    value={formData.data}
                    onChange={handleInputChange('data')}
                    disabled={isLoading}
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="action" className="text-sm p-1 text-muted-foreground">Action</label>
                  <Input
                    placeholder="Action"
                    className="font-mono"
                    value={formData.action}
                    onChange={handleInputChange('action')}
                    disabled={isLoading}
                  />
                </div>
                <Button
                  className="w-full"
                  onClick={handleSubmit}
                  disabled={!!formErrors.processId || !formData.processId || isLoading}
                >
                  {isLoading ? (
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  ) : (
                    <SendIcon className="w-4 h-4 mr-2" />
                  )}
                  {isLoading ? 'Sending...' : 'Send Message'}
                </Button>
              </CardContent>
            </Card>

            {/* Output Display */}
            <Card className="lg:w-2/3">
              <CardHeader>
                <CardTitle>Response</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="min-h-[300px] rounded-md bg-muted/50 p-4">
                  {isLoading ? (
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-3/4" />
                      <Skeleton className="h-4 w-1/2" />
                      <Skeleton className="h-4 w-2/3" />
                      <Skeleton className="h-4 w-1/3" />
                    </div>
                  ) : (
                    <div className="overflow-auto font-mono text-sm">
                      <pre className="text-muted-foreground whitespace-pre">
                        {output || "Response will appear here..."}
                      </pre>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        )}
        <a href="/#/another-page" className="text-sm text-foreground/50 p-10">goto another page</a>
      </main>
    </div>
  )
}