"use client"

import * as React from "react"
import Link from "next/link"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"
import { NavMain } from "@/components/blocks/nav/nav-main"
import { NavUser } from "@/components/blocks/nav/nav-user"
import { TeamSwitcher, type Team } from "@/components/team-switcher"
import { useActiveUser } from "@/contexts/active-user-context"
import { useActiveRole } from "@/contexts/mode-context"
import {
  Folder,
  Network,
  Globe,
  FileText,
  Plus,
  Vault,
  Landmark,
} from "lucide-react"
import { bweOrganization, getAccountsByUser, type AccountType } from "@/lib/demo-data"

const actionItems = [
  {
    title: "Create Deal",
    url: "/create-deal",
    icon: Plus,
  },
]

const brokerNavItems = [
  {
    title: "Deals",
    url: "/deals",
    icon: FileText,
  },
  {
    title: "Network",
    url: "/network",
    icon: Network,
  },
  {
    title: "Market",
    url: "/market",
    icon: Globe,
  },
  {
    title: "Files",
    url: "/files",
    icon: Folder,
  },
]

const sharedItems = [
  {
    title: "Vaults",
    url: "/vaults",
    icon: Vault,
  },
]

// Simple team data for the team switcher
export const teams: Team[] = [
  {
    name: "BWE - Profile Switcher",
    logo: Landmark,
    plan: "Demo",
    types: ["Broker", "Lender"],
    designOption: 1,
    useCase: 'BWE',
  },
]

export function AppSidebar() {
  const { user } = useActiveUser()
  const { activeRole, setActiveRole } = useActiveRole()
  
  // Get user's accounts
  const userAccounts = getAccountsByUser(user, bweOrganization)
  const availableRoles: AccountType[] = userAccounts.map(acc => acc.type)
  
  // Navigation items based on active role
  const platformItems = activeRole === 'broker' ? brokerNavItems : []
  const actions = activeRole === 'broker' ? actionItems : []

  // User data for footer
  const currentUser = {
    name: user.name,
    email: user.email,
    avatar: user.avatar,
    teamIcon: Landmark,
  }

  const roleLabels: Record<AccountType, string> = {
    broker: 'Broker',
    lender: 'Lender',
  }

  return (
    <Sidebar variant="inset">
      <SidebarHeader>
        <TeamSwitcher teams={teams} activeTeam={teams[0]} onTeamChange={() => {}} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={platformItems} label="Platform" linkComponent={Link} />
        {actions.length > 0 && <NavMain items={actions} label="Actions" linkComponent={Link} />}
        <NavMain items={sharedItems} label="Shared with Me" linkComponent={Link} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser 
          user={currentUser}
          subhead={roleLabels[activeRole]}
          profileSwitcher={{
            availableProfiles: availableRoles,
            activeProfile: activeRole,
            onProfileChange: setActiveRole,
          }}
          onSignOut={() => console.log("Sign out")}
        />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
