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
import { useMode, type UserMode } from "@/contexts/mode-context"
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

// BWE-specific navigation with role indicators
const bweActionItems = [
  {
    title: "Create Deal",
    url: "/create-deal",
    icon: Plus,
    roles: ["Broker"],
    tooltip: "Only shows deals for their Broker account",
  },
]

const bweNavItems = [
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

const bweSharedItems = [
  {
    title: "Vaults",
    url: "/vaults",
    icon: Vault,
    roles: ["Broker", "Lender"],
    tooltip: "Shows vaults shared with both Broker and Lender accounts",
  },
]

export const teams: Team[] = [
  // BWE - 3 Design Options
  {
    name: "BWE - Design Option 1",
    logo: Landmark,
    plan: "Profile Switcher",
    types: ["Broker", "Lender"],
    designOption: 1,
    useCase: 'BWE',
  },
  {
    name: "BWE - Design Option 2",
    logo: Landmark,
    plan: "Unified Experience",
    types: ["Broker", "Lender"],
    designOption: 2,
    useCase: 'BWE',
  },
  {
    name: "BWE - Design Option 3",
    logo: Landmark,
    plan: "Person-Centric",
    types: ["Broker", "Lender"],
    designOption: 3,
    useCase: 'BWE',
  },
  
  // Convoy - 3 Design Options
  {
    name: "Convoy - Design Option 1",
    logo: Building2,
    plan: "Profile Switcher",
    types: ["Broker"],
    designOption: 1,
    useCase: 'Convoy',
  },
  {
    name: "Convoy - Design Option 2",
    logo: Building2,
    plan: "Unified Experience",
    types: ["Broker"],
    designOption: 2,
    useCase: 'Convoy',
  },
  {
    name: "Convoy - Design Option 3",
    logo: Building2,
    plan: "Person-Centric",
    types: ["Broker"],
    designOption: 3,
    useCase: 'Convoy',
  },
  
  // Leverage Companies - 3 Design Options
  {
    name: "Leverage Co - Design Option 1",
    logo: Command,
    plan: "Profile Switcher",
    types: ["Lender"],
    designOption: 1,
    useCase: 'Leverage',
  },
  {
    name: "Leverage Co - Design Option 2",
    logo: Command,
    plan: "Unified Experience",
    types: ["Lender"],
    designOption: 2,
    useCase: 'Leverage',
  },
  {
    name: "Leverage Co - Design Option 3",
    logo: Command,
    plan: "Person-Centric",
    types: ["Lender"],
    designOption: 3,
    useCase: 'Leverage',
  },
]

// Team-specific user data
const teamUsers = {
  "BWE - Design Option 1": {
    name: "Graham Gilreath",
    email: "graham.gilreath@bwe.com",
    avatar: "",
    teamIcon: Landmark,
  },
  "BWE - Design Option 2": {
    name: "Graham Gilreath",
    email: "graham.gilreath@bwe.com",
    avatar: "",
    teamIcon: Landmark,
  },
  "BWE - Design Option 3": {
    name: "Graham Gilreath",
    email: "graham.gilreath@bwe.com",
    avatar: "",
    teamIcon: Landmark,
  },
  "Convoy - Design Option 1": {
    name: "Tyler Bradford",
    email: "tyler@convoycapital.com",
    avatar: "",
    teamIcon: Building2,
  },
  "Convoy - Design Option 2": {
    name: "Tyler Bradford",
    email: "tyler@convoycapital.com",
    avatar: "",
    teamIcon: Building2,
  },
  "Convoy - Design Option 3": {
    name: "Tyler Bradford",
    email: "tyler@convoycapital.com",
    avatar: "",
    teamIcon: Building2,
  },
  "Leverage Co - Design Option 1": {
    name: "JP Helan",
    email: "jphelan@brkcty.com",
    avatar: "",
    teamIcon: Command,
  },
  "Leverage Co - Design Option 2": {
    name: "JP Helan",
    email: "jphelan@brkcty.com",
    avatar: "",
    teamIcon: Command,
  },
  "Leverage Co - Design Option 3": {
    name: "JP Helan",
    email: "jphelan@brkcty.com",
    avatar: "",
    teamIcon: Command,
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
  // BWE - All 3 design options share same user
  "BWE - Design Option 1": [
    {
      id: "graham-gilreath",
      name: "Graham Gilreath",
      email: "graham.gilreath@bwe.com",
      avatar: avatar4,
      roles: ["Broker", "Lender"],
    },
  ],
  "BWE - Design Option 2": [
    {
      id: "graham-gilreath",
      name: "Graham Gilreath",
      email: "graham.gilreath@bwe.com",
      avatar: avatar4,
      roles: ["Broker", "Lender"],
    },
  ],
  "BWE - Design Option 3": [
    {
      id: "graham-gilreath",
      name: "Graham Gilreath",
      email: "graham.gilreath@bwe.com",
      avatar: avatar4,
      roles: ["Broker", "Lender"],
    },
  ],
  
  // Convoy - All 3 design options share same user
  "Convoy - Design Option 1": [
    {
      id: "tyler-bradford",
      name: "Tyler Bradford",
      email: "tyler@convoycapital.com",
      avatar: avatar2,
      roles: ["Broker"],
    },
  ],
  "Convoy - Design Option 2": [
    {
      id: "tyler-bradford",
      name: "Tyler Bradford",
      email: "tyler@convoycapital.com",
      avatar: avatar2,
      roles: ["Broker"],
    },
  ],
  "Convoy - Design Option 3": [
    {
      id: "tyler-bradford",
      name: "Tyler Bradford",
      email: "tyler@convoycapital.com",
      avatar: avatar2,
      roles: ["Broker"],
    },
  ],
  
  // Leverage Companies - All 3 design options share same users
  "Leverage Co - Design Option 1": [
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
  "Leverage Co - Design Option 2": [
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
  "Leverage Co - Design Option 3": [
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
}

export { teams, demoTeamUsers }

const modeConfig: Record<UserMode, { label: string }> = {
  broker: { label: "Broker" },
  lender: { label: "Lender" },
  borrower: { label: "Borrower" },
}

export function AppSidebar() {
  const { activeTeam, setActiveTeam } = useTeam()
  const { activeUserId } = useActiveUser()
  const { mode, setMode } = useMode()
  
  // Get the selected demo user based on activeUserId
  const allUsers = activeTeam ? demoTeamUsers[activeTeam.name] || [] : []
  const selectedDemoUser = allUsers.find(u => u.id === activeUserId)
  
  // Footer user - use selected demo user if available, otherwise default team user
  const currentUser = selectedDemoUser 
    ? { 
        name: selectedDemoUser.name, 
        email: selectedDemoUser.email,
        avatar: selectedDemoUser.avatar,
        teamIcon: activeTeam?.logo || GalleryVerticalEnd
      }
    : (activeTeam ? (teamUsers[activeTeam.name as keyof typeof teamUsers] || teamUsers["BWE - Design Option 1"]) : teamUsers["BWE - Design Option 1"])

  const designOption = activeTeam?.designOption || 1
  const useCase = activeTeam?.useCase || 'BWE'

  // Get navigation items based on design option and use case
  let platformItems = navItems
  let actions = actionItems
  let shared = sharedItems

  if (designOption === 1) {
    // Design Option 1: Filter items by mode and update tooltips to reflect single-account data
    const modeMap: Record<UserMode, string> = {
      broker: 'Broker',
      lender: 'Lender',
      borrower: 'Broker',
    }
    const activeRole = modeMap[mode]
    
    if (useCase === 'BWE') {
      if (activeRole === 'Broker') {
        platformItems = [
          { title: "Deals", url: "/deals", icon: FileText, roles: ["Broker"], tooltip: "Shows deals from BWE Brokerage account only" },
          { title: "Network", url: "/network", icon: Network, roles: ["Broker"], tooltip: "Shows network contacts from BWE Brokerage account only" },
          { title: "Market", url: "/market", icon: Globe, roles: ["Broker"], tooltip: "Shows market data from BWE Brokerage account only" },
          { title: "Files", url: "/files", icon: Folder, roles: ["Broker"], tooltip: "Shows files from BWE Brokerage account only" },
        ]
        actions = [
          { title: "Create Deal", url: "/create-deal", icon: Plus, roles: ["Broker"], tooltip: "Creates deal under BWE Brokerage account" },
        ]
        shared = [
          { title: "Vaults", url: "/vaults", icon: Vault, roles: ["Broker"], tooltip: "Shows vaults shared with BWE Brokerage account only" },
        ]
      } else {
        // Lender mode - NO Network for lenders in D1
        platformItems = []
        actions = []
        shared = [
          { title: "Vaults", url: "/vaults", icon: Vault, roles: ["Lender"], tooltip: "Shows vaults shared with BWE Lending account only" },
        ]
      }
    } else if (useCase === 'Convoy') {
      // Convoy is broker-only, always shows broker features
      platformItems = [
        { title: "Deals", url: "/deals", icon: FileText, roles: ["Broker"], tooltip: "Shows deals from Convoy Austin account only" },
        { title: "Network", url: "/network", icon: Network, roles: ["Broker"], tooltip: "Shows network contacts from Convoy Austin account only" },
        { title: "Market", url: "/market", icon: Globe, roles: ["Broker"], tooltip: "Shows market data from Convoy Austin account only" },
        { title: "Files", url: "/files", icon: Folder, roles: ["Broker"], tooltip: "Shows files from Convoy Austin account only" },
      ]
      actions = [
        { title: "Create Deal", url: "/create-deal", icon: Plus, roles: ["Broker"], tooltip: "Creates deal under Convoy Austin account" },
      ]
      shared = [
        { title: "Vaults", url: "/vaults", icon: Vault, roles: ["Broker"], tooltip: "Shows vaults shared with Convoy Austin account only" },
      ]
    } else if (useCase === 'Leverage') {
      platformItems = []
      actions = []
      shared = [
        { title: "Vaults", url: "/vaults", icon: Vault, roles: ["Lender"], tooltip: "Shows vaults shared with their specific lender account only" },
      ]
    }
  } else if (designOption === 2 || designOption === 3) {
    // Design Option 2 & 3: Show all items with role indicators
    if (useCase === 'BWE') {
      platformItems = bweNavItems
      actions = bweActionItems
      shared = bweSharedItems
    } else if (useCase === 'Convoy') {
      // Convoy is broker-only
      platformItems = navItems
      actions = actionItems
      shared = sharedItems
    } else if (useCase === 'Leverage') {
      // Leverage is lender-only, but show with indicators
      platformItems = [
        {
          title: "Network",
          url: "/network",
          icon: Network,
          roles: ["Lender"],
          tooltip: "Shows network contacts from both lender accounts",
        },
      ]
      actions = []
      shared = [
        {
          title: "Vaults",
          url: "/vaults",
          icon: Vault,
          roles: ["Lender"],
          tooltip: "Shows vaults shared with both lender accounts",
        },
      ]
    }
  }

  // Determine available modes for Design Option 1
  const getAvailableModes = (): UserMode[] => {
    if (useCase === 'BWE') return ['broker', 'lender']
    if (useCase === 'Convoy') return ['broker']
    if (useCase === 'Leverage') return ['lender']
    return ['broker']
  }

  return (
    <Sidebar variant="inset">
      <SidebarHeader>
        <TeamSwitcher teams={teams} activeTeam={activeTeam || teams[0]} onTeamChange={setActiveTeam} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={platformItems} label="Platform" linkComponent={Link} />
        {actions.length > 0 && <NavMain items={actions} label="Actions" linkComponent={Link} />}
        <NavMain items={shared} label="Shared with Me" linkComponent={Link} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser 
          user={currentUser}
          subhead={designOption === 1 ? modeConfig[mode].label : undefined}
          profileSwitcher={designOption === 1 ? {
            availableProfiles: getAvailableModes(),
            activeProfile: mode,
            onProfileChange: setMode,
          } : undefined}
          onSignOut={() => console.log("Sign out")}
        />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
