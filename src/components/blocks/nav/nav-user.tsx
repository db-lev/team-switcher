"use client"

import * as React from "react"
import {
  ChevronsUpDown,
  User,
  Settings,
  LogOut,
  Building2,
  Landmark,
  type LucideIcon,
} from "lucide-react"
import Image from "next/image"
import { useRouter } from "next/navigation"

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"

function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/)
  if (parts.length >= 2) {
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
  }
  return name.slice(0, 2).toUpperCase()
}

type UserMode = 'broker' | 'lender' | 'borrower'

const modeConfig: Record<UserMode, { label: string; icon: React.ElementType; bgColor: string; iconColor: string }> = {
  broker: {
    label: "Broker",
    icon: Building2,
    bgColor: "bg-[#3E9B70]/20",
    iconColor: "text-[#3E9B70]",
  },
  lender: {
    label: "Lender",
    icon: Landmark,
    bgColor: "bg-[#3880E8]/20",
    iconColor: "text-[#3880E8]",
  },
  borrower: {
    label: "Borrower",
    icon: Building2,
    bgColor: "bg-green-600/20",
    iconColor: "text-green-600",
  },
}

export interface NavUserProps {
  user: {
    name: string
    email: string
    avatar: string | any
    teamIcon?: LucideIcon
  }
  /** Subhead text shown under name in sidebar button. If not provided, shows email. */
  subhead?: string
  /** Profile switching for Design Option 1. When provided, shows profile selector in menu. */
  profileSwitcher?: {
    availableProfiles: UserMode[]
    activeProfile: UserMode
    onProfileChange: (profile: UserMode) => void
  }
  /** When provided, renders a "Log out" item at the bottom with a separator. */
  onSignOut?: () => void
}

export function NavUser({
  user,
  subhead,
  profileSwitcher,
  onSignOut,
}: NavUserProps) {
  const { isMobile } = useSidebar()
  const router = useRouter()
  const initials = getInitials(user.name)
  
  // Get active profile config if using profile switcher
  const activeProfileConfig = profileSwitcher ? modeConfig[profileSwitcher.activeProfile] : null
  const dotColor = activeProfileConfig ? (profileSwitcher.activeProfile === 'broker' ? 'bg-[#3E9B70]' : 'bg-[#3880E8]') : null

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <div className="relative">
                {user.avatar && typeof user.avatar === 'object' ? (
                  <div className="h-8 w-8 shrink-0 overflow-hidden rounded-lg">
                    <Image src={user.avatar} alt={user.name} width={32} height={32} className="h-full w-full object-cover" />
                  </div>
                ) : (
                  <Avatar className="h-8 w-8 rounded-lg">
                    <AvatarImage src={user.avatar} alt={user.name} />
                    <AvatarFallback className="rounded-lg">{initials}</AvatarFallback>
                  </Avatar>
                )}
                {dotColor && (
                  <span className={`absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full ${dotColor} ring-2 ring-sidebar`} />
                )}
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">{user.name}</span>
                <span className="truncate text-xs text-muted-foreground">
                  {subhead || user.email}
                </span>
              </div>
              <ChevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                {user.avatar && typeof user.avatar === 'object' ? (
                  <div className="h-8 w-8 shrink-0 overflow-hidden rounded-lg">
                    <Image src={user.avatar} alt={user.name} width={32} height={32} className="h-full w-full object-cover" />
                  </div>
                ) : (
                  <Avatar className="h-8 w-8 rounded-lg">
                    <AvatarImage src={user.avatar} alt={user.name} />
                    <AvatarFallback className="rounded-lg">{initials}</AvatarFallback>
                  </Avatar>
                )}
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">{user.name}</span>
                  <span className="truncate text-xs text-muted-foreground">
                    {user.email}
                  </span>
                </div>
              </div>
            </DropdownMenuLabel>
            {profileSwitcher && profileSwitcher.availableProfiles.length > 1 && (
              <>
                <DropdownMenuSeparator />
                <DropdownMenuLabel className="text-xs text-muted-foreground">
                  Profiles
                </DropdownMenuLabel>
                <DropdownMenuGroup>
                  {profileSwitcher.availableProfiles.map((profile) => {
                    const config = modeConfig[profile]
                    const ProfileIcon = config.icon
                    return (
                      <DropdownMenuItem
                        key={profile}
                        onClick={() => profileSwitcher.onProfileChange(profile)}
                      >
                        <div className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-md ${config.bgColor}`}>
                          <ProfileIcon className={`h-4 w-4 ${config.iconColor}`} />
                        </div>
                        {config.label}
                        {profileSwitcher.activeProfile === profile && <span className="ml-auto">✓</span>}
                      </DropdownMenuItem>
                    )
                  })}
                </DropdownMenuGroup>
              </>
            )}
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => router.push('/settings')}>
              <User />
              Account
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => router.push('/settings')}>
              <Settings />
              Settings
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={onSignOut}>
              <LogOut />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
