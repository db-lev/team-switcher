"use client"

import * as React from "react"
import { ChevronsUpDown, Command } from "lucide-react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { useActiveUser } from "@/contexts/active-user-context"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"

import { demoTeamUsers } from "@/components/app-sidebar"

export type Team = {
  name: string
  logo: React.ElementType
  plan: string
  types?: string[]
}

export function TeamSwitcher({
  teams,
  activeTeam,
  onTeamChange,
}: {
  teams: Team[]
  activeTeam: Team
  onTeamChange: (team: Team) => void
}) {
  const { isMobile } = useSidebar()
  const router = useRouter()
  const { activeUserId, setActiveUserId } = useActiveUser()

  const users = activeTeam ? demoTeamUsers[activeTeam.name] || [] : []
  const selectedUser = users.find(u => u.id === activeUserId)

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <div className="flex items-center gap-2">
          <button
            onClick={() => router.push("/")}
            className="flex flex-1 items-center gap-2 rounded-md px-2 py-1.5 hover:bg-sidebar-accent"
          >
            <div className="flex aspect-square size-8 items-center justify-center rounded-lg border bg-background">
              <activeTeam.logo className="size-4" />
            </div>
            <div className="grid flex-1 text-left text-sm leading-tight">
              <span className="truncate font-semibold">{activeTeam.name}</span>
              <span className="truncate text-xs text-muted-foreground">
                {selectedUser ? `${selectedUser.name} - ${selectedUser.roles.join(", ")}` : (activeTeam.types ? activeTeam.types.join(", ") : activeTeam.plan)}
              </span>
            </div>
          </button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex h-8 w-8 items-center justify-center rounded-md hover:bg-sidebar-accent">
                <ChevronsUpDown className="size-4" />
              </button>
            </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-64 rounded-lg"
            align="start"
            side={isMobile ? "bottom" : "right"}
            sideOffset={4}
          >
            <DropdownMenuLabel className="text-xs text-muted-foreground">
              Teams
            </DropdownMenuLabel>
            {teams.map((team, index) => {
              const teamUserList = demoTeamUsers[team.name] || []
              
              if (teamUserList.length > 1) {
                // Team with multiple users - show as submenu
                return (
                  <DropdownMenuSub key={team.name}>
                    <DropdownMenuSubTrigger className="gap-2 p-2">
                      <div className="flex size-6 items-center justify-center rounded-sm border">
                        <team.logo className="size-4 shrink-0" />
                      </div>
                      {team.name}
                    </DropdownMenuSubTrigger>
                    <DropdownMenuSubContent className="min-w-48">
                      {teamUserList.map((user) => (
                        <DropdownMenuItem
                          key={user.id}
                          onClick={() => {
                            onTeamChange(team)
                            setActiveUserId(user.id)
                          }}
                          className="gap-2 p-2"
                        >
                          <div className="h-6 w-6 shrink-0 overflow-hidden rounded-full">
                            <Image src={user.avatar} alt={user.name} width={24} height={24} className="h-full w-full object-cover" />
                          </div>
                          <div className="flex flex-1 flex-col">
                            <span className="text-sm">{user.name}</span>
                            <span className="text-xs text-muted-foreground">{user.roles.join(", ")}</span>
                          </div>
                          {activeUserId === user.id && activeTeam.name === team.name && <span className="ml-auto text-xs">✓</span>}
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuSubContent>
                  </DropdownMenuSub>
                )
              } else if (teamUserList.length === 1) {
                // Team with single user - direct selection
                const user = teamUserList[0]
                return (
                  <DropdownMenuItem
                    key={team.name}
                    onClick={() => {
                      onTeamChange(team)
                      setActiveUserId(user.id)
                    }}
                    className="gap-2 p-2"
                  >
                    <div className="flex size-6 items-center justify-center rounded-sm border">
                      <team.logo className="size-4 shrink-0" />
                    </div>
                    {team.name}
                    <DropdownMenuShortcut>⌘{index + 1}</DropdownMenuShortcut>
                  </DropdownMenuItem>
                )
              } else {
                // Team with no users - just show team
                return (
                  <DropdownMenuItem
                    key={team.name}
                    onClick={() => {
                      onTeamChange(team)
                      setActiveUserId(null)
                    }}
                    className="gap-2 p-2"
                  >
                    <div className="flex size-6 items-center justify-center rounded-sm border">
                      <team.logo className="size-4 shrink-0" />
                    </div>
                    {team.name}
                    <DropdownMenuShortcut>⌘{index + 1}</DropdownMenuShortcut>
                  </DropdownMenuItem>
                )
              }
            })}
            
            <DropdownMenuSeparator />
            <DropdownMenuItem className="gap-2 p-2">
              <div className="flex size-6 items-center justify-center rounded-md border bg-background">
                <Command className="size-4" />
              </div>
              <div className="font-medium text-muted-foreground">Add team</div>
            </DropdownMenuItem>
          </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
