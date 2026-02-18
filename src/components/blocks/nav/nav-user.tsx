"use client"

import * as React from "react"
import {
  EllipsisVertical,
  LogOut,
  type LucideIcon,
} from "lucide-react"

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

export interface NavUserProps {
  user: {
    name: string
    email: string
    avatar: string
    teamIcon?: LucideIcon
  }
  /** Dropdown menu items. When omitted, only the sign-out item renders (if onSignOut is provided). */
  menuItems?: {
    label: string
    icon?: LucideIcon
    onClick?: () => void
    href?: string
  }[]
  /** When provided, renders a "Log out" item at the bottom with a separator. */
  onSignOut?: () => void
}

export function NavUser({
  user,
  menuItems,
  onSignOut,
}: NavUserProps) {
  const { isMobile } = useSidebar()
  const initials = getInitials(user.name)
  const TeamIcon = user.teamIcon

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              {TeamIcon ? (
                <div className="flex h-8 w-8 items-center justify-center rounded-lg border bg-background">
                  <TeamIcon className="h-4 w-4" />
                </div>
              ) : (
                <Avatar className="h-8 w-8 rounded-lg grayscale">
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback className="rounded-lg">{initials}</AvatarFallback>
                </Avatar>
              )}
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">{user.name}</span>
                <span className="text-muted-foreground truncate text-xs">
                  {user.email}
                </span>
              </div>
              <EllipsisVertical className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                {TeamIcon ? (
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg border bg-background">
                    <TeamIcon className="h-4 w-4" />
                  </div>
                ) : (
                  <Avatar className="h-8 w-8 rounded-lg">
                    <AvatarImage src={user.avatar} alt={user.name} />
                    <AvatarFallback className="rounded-lg">{initials}</AvatarFallback>
                  </Avatar>
                )}
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">{user.name}</span>
                  <span className="text-muted-foreground truncate text-xs">
                    {user.email}
                  </span>
                </div>
              </div>
            </DropdownMenuLabel>
            {menuItems && menuItems.length > 0 && (
              <>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  {menuItems.map((item) => (
                    <DropdownMenuItem
                      key={item.label}
                      onClick={item.onClick}
                      asChild={!!item.href}
                    >
                      {item.href ? (
                        <a href={item.href}>
                          {item.icon && <item.icon />}
                          {item.label}
                        </a>
                      ) : (
                        <>
                          {item.icon && <item.icon />}
                          {item.label}
                        </>
                      )}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuGroup>
              </>
            )}
            {onSignOut && (
              <>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={onSignOut}>
                  <LogOut />
                  Log out
                </DropdownMenuItem>
              </>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
