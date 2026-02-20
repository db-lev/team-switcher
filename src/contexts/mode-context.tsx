"use client"

import * as React from "react"

export type UserMode = 'broker' | 'lender' | 'borrower'

type ModeContextType = {
  mode: UserMode
  setMode: (mode: UserMode) => void
}

const ModeContext = React.createContext<ModeContextType | null>(null)

export function ModeProvider({ children }: { children: React.ReactNode }) {
  const [mode, setMode] = React.useState<UserMode>('broker')

  return (
    <ModeContext.Provider value={{ mode, setMode }}>
      {children}
    </ModeContext.Provider>
  )
}

export function useMode() {
  const context = React.useContext(ModeContext)
  if (!context) {
    throw new Error("useMode must be used within a ModeProvider")
  }
  return context
}
