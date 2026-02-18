"use client"

import * as React from "react"
import type { Team } from "@/components/team-switcher"

type TeamContextType = {
  activeTeam: Team
  setActiveTeam: (team: Team) => void
}

const TeamContext = React.createContext<TeamContextType | null>(null)

export function TeamProvider({ children, defaultTeam }: { children: React.ReactNode; defaultTeam: Team }) {
  const [activeTeam, setActiveTeam] = React.useState<Team>(defaultTeam)

  return (
    <TeamContext.Provider value={{ activeTeam, setActiveTeam }}>
      {children}
    </TeamContext.Provider>
  )
}

export function useTeam() {
  const context = React.useContext(TeamContext)
  if (!context) {
    throw new Error("useTeam must be used within a TeamProvider")
  }
  return context
}
