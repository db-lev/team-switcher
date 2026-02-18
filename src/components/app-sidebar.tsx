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
import { useTeam } from "@/contexts/team-context"
import { useActiveUser } from "@/contexts/active-user-context"
import {
  Folder,
  Network,
  Globe,
  FileText,
  Command,
  AudioWaveform,
  GalleryVerticalEnd,
  Plus,
  Vault,
  Building2,
  Landmark,
} from "lucide-react"
import avatar1 from "@/components/avatars/avatar_1.png"
import avatar2 from "@/components/avatars/avatar_2.png"
import avatar3 from "@/components/avatars/avatar_3.png"
import avatar4 from "@/components/avatars/avatar_4.png"
import avatar5 from "@/components/avatars/avatar_5.png"

const actionItems = [
  {
    title: "Create Deal",
    url: "/create-deal",
    icon: Plus,
  },
]

const navItems = [
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

// Northmarq-specific navigation with role indicators
const northmarqActionItems = [
  {
    title: "Create Deal",
    url: "/create-deal",
    icon: Plus,
    roles: ["Broker"],
    tooltip: "Only shows deals for their Broker account",
  },
]

const northmarqNavItems = [
  {
    title: "Deals",
    url: "/deals",
    icon: FileText,
    roles: ["Broker"],
    tooltip: "Only shows deals for their Broker account",
  },
  {
    title: "Network",
    url: "/network",
    icon: Network,
    roles: ["Broker", "Lender"],
    tooltip: "Shows network contacts from both Broker and Lender accounts",
  },
  {
    title: "Market",
    url: "/market",
    icon: Globe,
    roles: ["Broker"],
    tooltip: "Only shows market data for their Broker account",
  },
  {
    title: "Files",
    url: "/files",
    icon: Folder,
    roles: ["Broker"],
    tooltip: "Only shows files for their Broker account",
  },
]

const northmarqSharedItems = [
  {
    title: "Vaults",
    url: "/vaults",
    icon: Vault,
    roles: ["Broker", "Lender"],
    tooltip: "Shows vaults shared with both Broker and Lender accounts",
  },
]

export const teams: Team[] = [
  {
    name: "Myers Capital",
    logo: GalleryVerticalEnd,
    plan: "Enterprise",
    types: ["Lender", "Broker"],
  },
  {
    name: "Heritage Bank NA",
    logo: AudioWaveform,
    plan: "Startup",
    types: ["Lender", "Broker"],
  },
  {
    name: "Leverage Companies",
    logo: Command,
    plan: "Free",
    types: ["Lender"],
  },
  {
    name: "Northmarq",
    logo: Building2,
    plan: "Enterprise",
    types: ["Broker", "Lender"],
  },
  {
    name: "BWE",
    logo: Landmark,
    plan: "Enterprise",
    types: ["Lender", "Broker"],
  },
]

// Team-specific user data
const teamUsers = {
  "Myers Capital": {
    name: "Sarah Johnson",
    email: "sarah@myerscapital.com",
    avatar: "",
    teamIcon: GalleryVerticalEnd,
  },
  "Heritage Bank NA": {
    name: "Paul Konsor",
    email: "pkonsor@heritagebankna.com",
    avatar: "",
    teamIcon: AudioWaveform,
  },
  "Leverage Companies": {
    name: "JP Helan",
    email: "jphelan@brkcty.com",
    avatar: "",
    teamIcon: Command,
  },
  "Northmarq": {
    name: "David Henney",
    email: "dhenney@northmarq.com",
    avatar: "",
    teamIcon: Building2,
  },
  "BWE": {
    name: "Graham Gilreath",
    email: "graham.gilreath@bwe.com",
    avatar: "",
    teamIcon: Landmark,
  },
}

type DemoUser = {
  id: string
  name: string
  email: string
  avatar: any
  roles: string[]
}

const demoTeamUsers: Record<string, DemoUser[]> = {
  "Myers Capital": [
    {
      id: "reed-myers",
      name: "Reed Myers",
      email: "reed@myerscapital.com",
      avatar: avatar2,
      roles: ["Lender"],
    },
    {
      id: "maryann-salt",
      name: "Maryann Salt",
      email: "msalt@myerscapital.com",
      avatar: avatar1,
      roles: ["Broker"],
    },
  ],
  "Heritage Bank NA": [
    {
      id: "paul-konsor",
      name: "Paul Konsor",
      email: "pkonsor@heritagebankna.com",
      avatar: avatar3,
      roles: ["Broker"],
    },
  ],
  "Leverage Companies": [
    {
      id: "jp-helan",
      name: "JP Helan",
      email: "jphelan@brkcty.com",
      avatar: avatar4,
      roles: ["Lender"],
    },
    {
      id: "ian-rodriguez",
      name: "Ian Rodriguez",
      email: "ian@leveragecompanies.com",
      avatar: avatar5,
      roles: ["Lender"],
    },
  ],
  "Northmarq": [
    {
      id: "david-henney",
      name: "David Henney",
      email: "dhenney@northmarq.com",
      avatar: avatar3,
      roles: ["Broker", "Lender"],
    },
  ],
  "BWE": [
    {
      id: "graham-gilreath",
      name: "Graham Gilreath",
      email: "graham.gilreath@bwe.com",
      avatar: avatar4,
      roles: ["Lender", "Broker"],
    },
  ],
}

export { teams, demoTeamUsers }

export function AppSidebar() {
  const { activeTeam, setActiveTeam } = useTeam()
  const { activeUserId } = useActiveUser()
  
  // Get the selected demo user based on activeUserId
  const allUsers = activeTeam ? demoTeamUsers[activeTeam.name] || [] : []
  const selectedDemoUser = allUsers.find(u => u.id === activeUserId)
  
  // Footer user - use selected demo user if available, otherwise default team user
  const currentUser = selectedDemoUser 
    ? { 
        name: selectedDemoUser.name, 
        email: selectedDemoUser.email,
        avatar: "",
        teamIcon: activeTeam?.logo || GalleryVerticalEnd
      }
    : (activeTeam ? (teamUsers[activeTeam.name as keyof typeof teamUsers] || teamUsers["Myers Capital"]) : teamUsers["Myers Capital"])

  // Choose navigation items based on team
  const isNorthmarq = activeTeam?.name === "Northmarq"
  const platformItems = isNorthmarq ? northmarqNavItems : navItems
  const actions = isNorthmarq ? northmarqActionItems : actionItems
  const shared = isNorthmarq ? northmarqSharedItems : sharedItems

  return (
    <Sidebar variant="inset">
      <SidebarHeader>
        <TeamSwitcher teams={teams} activeTeam={activeTeam || teams[0]} onTeamChange={setActiveTeam} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={platformItems} label="Platform" linkComponent={Link} />
        <NavMain items={actions} label="Actions" linkComponent={Link} />
        <NavMain items={shared} label="Shared with Me" linkComponent={Link} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={currentUser} onSignOut={() => console.log("Sign out")} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
