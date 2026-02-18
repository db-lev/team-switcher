"use client"

import * as React from "react"

type ActiveUserContextType = {
  activeUserId: string | null
  setActiveUserId: (userId: string | null) => void
}

const ActiveUserContext = React.createContext<ActiveUserContextType | null>(null)

export function ActiveUserProvider({ children }: { children: React.ReactNode }) {
  const [activeUserId, setActiveUserId] = React.useState<string | null>(null)

  return (
    <ActiveUserContext.Provider value={{ activeUserId, setActiveUserId }}>
      {children}
    </ActiveUserContext.Provider>
  )
}

export function useActiveUser() {
  const context = React.useContext(ActiveUserContext)
  if (!context) {
    throw new Error("useActiveUser must be used within an ActiveUserProvider")
  }
  return context
}
