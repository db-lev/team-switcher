"use client"

import * as React from "react"
import { ChevronRight, type LucideIcon } from "lucide-react"

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"

export interface NavMainProps {
  items: {
    title: string
    url: string
    icon?: LucideIcon
    isActive?: boolean
    roles?: string[]
    tooltip?: string
    items?: { title: string; url: string; isActive?: boolean }[]
  }[]
  /** Optional group label rendered above the nav items */
  label?: string
  /** Optional actions rendered at the top of the group (e.g. a "Quick Create" button) */
  actions?: React.ReactNode
  /** Link component to use for navigation. Defaults to "a". Pass next/link's Link for client-side routing. */
  linkComponent?: React.ElementType
}

export function NavMain({
  items,
  label,
  actions,
  linkComponent: LinkComponent = "a",
}: NavMainProps) {
  return (
    <SidebarGroup>
      {label && <SidebarGroupLabel>{label}</SidebarGroupLabel>}
      <SidebarGroupContent className="flex flex-col gap-2">
        {actions && (
          <SidebarMenu>
            <SidebarMenuItem className="flex items-center gap-2">
              {actions}
            </SidebarMenuItem>
          </SidebarMenu>
        )}
        <SidebarMenu>
          {items.map((item) =>
            item.items?.length ? (
              <Collapsible
                key={item.title}
                asChild
                defaultOpen={item.isActive}
                className="group/collapsible"
              >
                <SidebarMenuItem>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton tooltip={item.title}>
                      {item.icon && <item.icon />}
                      <span>{item.title}</span>
                      <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <SidebarMenuSub>
                      {item.items.map((subItem) => (
                        <SidebarMenuSubItem key={subItem.title}>
                          <SidebarMenuSubButton asChild isActive={subItem.isActive}>
                            <LinkComponent href={subItem.url}>
                              <span>{subItem.title}</span>
                            </LinkComponent>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      ))}
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </SidebarMenuItem>
              </Collapsible>
            ) : (
              <SidebarMenuItem key={item.title}>
                {item.tooltip ? (
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <SidebarMenuButton asChild isActive={item.isActive}>
                        <LinkComponent href={item.url}>
                          {item.icon && <item.icon />}
                          <span>{item.title}</span>
                          {item.roles && item.roles.length > 0 && (
                            <div className="ml-auto flex items-center gap-1">
                              {item.roles.includes("Broker") && (
                                <span className="h-1.5 w-1.5 rounded-full bg-[#3E9B70]" />
                              )}
                              {item.roles.includes("Lender") && (
                                <span className="h-1.5 w-1.5 rounded-full bg-[#3880E8]" />
                              )}
                            </div>
                          )}
                        </LinkComponent>
                      </SidebarMenuButton>
                    </TooltipTrigger>
                    <TooltipContent side="right" className="max-w-xs">
                      {item.tooltip}
                    </TooltipContent>
                  </Tooltip>
                ) : (
                  <SidebarMenuButton asChild isActive={item.isActive}>
                    <LinkComponent href={item.url}>
                      {item.icon && <item.icon />}
                      <span>{item.title}</span>
                      {item.roles && item.roles.length > 0 && (
                        <div className="ml-auto flex items-center gap-1">
                          {item.roles.includes("Broker") && (
                            <span className="h-1.5 w-1.5 rounded-full bg-[#3E9B70]" />
                          )}
                          {item.roles.includes("Lender") && (
                            <span className="h-1.5 w-1.5 rounded-full bg-[#3880E8]" />
                          )}
                        </div>
                      )}
                    </LinkComponent>
                  </SidebarMenuButton>
                )}
              </SidebarMenuItem>
            )
          )}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}
