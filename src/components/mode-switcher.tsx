"use client"

import * as React from "react"
import { ChevronsUpDown, Building2, Landmark, User, Settings, LogOut } from "lucide-react"
import { useMode, type UserMode } from "@/contexts/mode-context"
import Image from "next/image"

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuGroup,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"

const modeConfig: Record<UserMode, { label: string; icon: React.ElementType; bgColor: string; iconColor: string; dotColor: string }> = {
  broker: {
    label: "Broker",
    icon: Building2,
    bgColor: "bg-[#3E9B70]/20",
    iconColor: "text-[#3E9B70]",
    dotColor: "bg-[#3E9B70]",
  },
  lender: {
    label: "Lender",
    icon: Landmark,
    bgColor: "bg-[#3880E8]/20",
    iconColor: "text-[#3880E8]",
    dotColor: "bg-[#3880E8]",
  },
  borrower: {
    label: "Borrower",
    icon: Building2,
    bgColor: "bg-green-600/20",
    iconColor: "text-green-600",
    dotColor: "bg-green-600",
  },
}

function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/)
  if (parts.length >= 2) {
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
  }
  return name.slice(0, 2).toUpperCase()
}

export function ModeSwitcher({ availableModes, userName, userEmail, userAvatar }: { 
  availableModes: UserMode[]
  userName: string
  userEmail: string
  userAvatar?: any
}) {
  const { isMobile } = useSidebar()
  const { mode, setMode } = useMode()

  const activeMode = modeConfig[mode]
  const initials = getInitials(userName)

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${activeMode.bgColor}`}>
                <ActiveIcon className={`h-4 w-4 ${activeMode.iconColor}`} />
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">{userName}</span>
                <span className="truncate text-xs text-muted-foreground">
                  {activeMode.label}
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
                <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${activeMode.bgColor}`}>
                  <ActiveIcon className={`h-4 w-4 ${activeMode.iconColor}`} />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">{userName}</span>
                  <span className="truncate text-xs text-muted-foreground">
                    {userEmail}
                  </span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuLabel className="text-xs text-muted-foreground">
              Profiles
            </DropdownMenuLabel>
            <DropdownMenuGroup>
              {availableModes.map((modeName) => {
                const config = modeConfig[modeName]
                const ModeIcon = config.icon
                return (
                  <DropdownMenuItem
                    key={modeName}
                    onClick={() => setMode(modeName)}
                  >
                    <div className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-md ${config.bgColor}`}>
                      <ModeIcon className={`h-4 w-4 ${config.iconColor}`} />
                    </div>
                    {config.label}
                    {mode === modeName && <span className="ml-auto">✓</span>}
                  </DropdownMenuItem>
                )
              })}
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <User />
              Account
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Settings />
              Settings
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <LogOut />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
