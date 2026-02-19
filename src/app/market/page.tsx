"use client"

import * as React from "react"
import { useHeader } from "@/contexts/header-context"

export default function MarketPage() {
  const { setTitle } = useHeader()

  React.useEffect(() => {
    setTitle("Market")
    return () => setTitle(undefined)
  }, [setTitle])

  return (
    <div className="flex flex-1 flex-col gap-6 p-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-semibold">Market</h1>
        <p className="text-muted-foreground">Market insights and data</p>
      </div>
    </div>
  )
}
