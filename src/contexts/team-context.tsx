"use client"

import * as React from "react"
import type { Team } from "@/components/team-switcher"
import { Landmark } from "lucide-react"

// Simple BWE team for backward compatibility
const bweTeam: Team = {
  name: "BWE - Profile Switcher",
  logo: Landmark,
  plan: "Demo",
  types: ["Broker", "Lender"],
  designOption: 1,
  useCase: 'BWE',
}

type TeamContextType = {
  activeTeam: Team
  setActiveTeam: (team: Team) => void
}

const TeamContext = React.createContext<TeamContextType | null>(null)

export function TeamProvider({ children }: { children: React.ReactNode }) {
  const [activeTeam, setActiveTeam] = React.useState<Team>(bweTeam)

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
