"use client"

import * as React from "react"
import { grahamGilreath, type User } from "@/lib/demo-data"

type ActiveUserContextType = {
  user: User
}

const ActiveUserContext = React.createContext<ActiveUserContextType | null>(null)

export function ActiveUserProvider({ children }: { children: React.ReactNode }) {
  // For now, always Graham Gilreath
  const user = grahamGilreath

  return (
    <ActiveUserContext.Provider value={{ user }}>
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
