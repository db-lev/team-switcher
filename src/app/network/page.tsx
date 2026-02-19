"use client"

import * as React from "react"
import { useHeader } from "@/contexts/header-context"

export default function NetworkPage() {
  const { setTitle } = useHeader()

  React.useEffect(() => {
    setTitle("Network")
    return () => setTitle(undefined)
  }, [setTitle])

  return (
    <div className="flex flex-1 flex-col gap-6 p-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-semibold">Network</h1>
        <p className="text-muted-foreground">Manage your companies and people</p>
      </div>
    </div>
  )
}
