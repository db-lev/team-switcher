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
import {
  Folder,
  Network,
  Globe,
  FileText,
  Command,
  AudioWaveform,
  GalleryVerticalEnd,
  Plus,
  Search,
  Sparkles,
  Vault,
  Building2,
  Landmark,
} from "lucide-react"

const actionItems = [
  {
    title: "Create Deal",
    url: "#",
    icon: Plus,
  },
  {
    title: "Search",
    url: "#",
    icon: Search,
  },
  {
    title: "Help",
    url: "#",
    icon: Sparkles,
  },
]

const navItems = [
  {
    title: "Deals",
    url: "/deals",
    icon: FileText,
    items: [
      {
        title: "Financing",
        url: "/deals/financing",
      },
      {
        title: "Acquisition",
        url: "/deals/acquisition",
      },
      {
        title: "Underwriting",
        url: "/deals/underwriting",
      },
      {
        title: "Equity",
        url: "/deals/equity",
      },
      {
        title: "Archived",
        url: "/deals/archived",
      },
    ],
  },
  {
    title: "Network",
    url: "/network",
    icon: Network,
    items: [
      {
        title: "Companies",
        url: "/network/companies",
      },
      {
        title: "People",
        url: "/network/people",
      },
    ],
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

export { teams }

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

export function AppSidebar() {
  const { activeTeam, setActiveTeam } = useTeam()
  
  // Get user data based on active team
  const currentUser = activeTeam ? (teamUsers[activeTeam.name as keyof typeof teamUsers] || teamUsers["Myers Capital"]) : teamUsers["Myers Capital"]

  return (
    <Sidebar variant="inset">
      <SidebarHeader>
        <TeamSwitcher teams={teams} activeTeam={activeTeam || teams[0]} onTeamChange={setActiveTeam} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={navItems} label="Platform" linkComponent={Link} />
        <NavMain items={actionItems} label="Actions" linkComponent={Link} />
        <NavMain items={sharedItems} label="Shared with Me" linkComponent={Link} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={currentUser} onSignOut={() => console.log("Sign out")} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
