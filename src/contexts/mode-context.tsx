"use client"

import * as React from "react"
import type { AccountType } from "@/lib/demo-data"

type ActiveRoleContextType = {
  activeRole: AccountType
  setActiveRole: (role: AccountType) => void
}

const ActiveRoleContext = React.createContext<ActiveRoleContextType | null>(null)

export function ActiveRoleProvider({ children }: { children: React.ReactNode }) {
  // Default to broker role
  const [activeRole, setActiveRole] = React.useState<AccountType>('broker')

  return (
    <ActiveRoleContext.Provider value={{ activeRole, setActiveRole }}>
      {children}
    </ActiveRoleContext.Provider>
  )
}

export function useActiveRole() {
  const context = React.useContext(ActiveRoleContext)
  if (!context) {
    throw new Error("useActiveRole must be used within an ActiveRoleProvider")
  }
  return context
}

// Legacy export for compatibility
export type UserMode = "broker" | "lender" | "borrower"
export const useMode = () => {
  const { activeRole, setActiveRole } = useActiveRole()
  return {
    mode: activeRole as UserMode,
    setMode: (mode: UserMode) => setActiveRole(mode === 'borrower' ? 'broker' : mode as AccountType)
  }
}
export { ActiveRoleProvider as ModeProvider }
