"use client"

import * as React from "react"
import {
  SCENARIOS,
  getAccountsByUser,
  type User,
  type Organization,
  type Account,
} from "@/lib/demo-data"
import { useTeam } from "@/contexts/team-context"

type ActiveUserContextType = {
  user: User
  organization: Organization
  teamMembers: User[]
  activeUserId: string
  setActiveUserId: (id: string) => void
  activeAccountId: string
  setActiveAccountId: (id: string) => void
  activeAccount: Account | undefined
}

const ActiveUserContext = React.createContext<ActiveUserContextType | null>(null)

const FALLBACK_SCENARIO = Object.values(SCENARIOS)[0]

export function ActiveUserProvider({ children }: { children: React.ReactNode }) {
  const { activeTeam } = useTeam()

  const scenario = SCENARIOS[activeTeam?.name ?? ''] ?? FALLBACK_SCENARIO
  const { organization, user, teamMembers } = scenario

  const [activeUserId, setActiveUserId] = React.useState(user.id)
  const [activeAccountId, setActiveAccountId] = React.useState(user.accountMemberships[0] ?? "")

  React.useEffect(() => {
    setActiveUserId(user.id)
    setActiveAccountId(user.accountMemberships[0] ?? "")
  }, [user.id])

  const userAccounts = getAccountsByUser(user, organization)
  const activeAccount = userAccounts.find(a => a.id === activeAccountId) ?? userAccounts[0]

  return (
    <ActiveUserContext.Provider value={{
      user,
      organization,
      teamMembers,
      activeUserId,
      setActiveUserId,
      activeAccountId: activeAccount?.id ?? "",
      setActiveAccountId,
      activeAccount,
    }}>
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
