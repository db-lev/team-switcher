"use client"

import * as React from "react"
import { useHeader } from "@/contexts/header-context"

export default function VaultsPage() {
  const { setTitle } = useHeader()

  React.useEffect(() => {
    setTitle("Vaults")
    return () => setTitle(undefined)
  }, [setTitle])

  return (
    <div className="flex flex-1 flex-col gap-6 p-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-semibold">Vaults</h1>
        <p className="text-muted-foreground">Shared vaults and documents</p>
      </div>
    </div>
  )
}
