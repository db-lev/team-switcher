"use client"

import * as React from "react"

import { cn } from "@/lib/utils"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"

const DEFAULT_SIDEBAR_WIDTH = "16rem"
const DEFAULT_HEADER_HEIGHT = "calc(var(--spacing) * 12)"

export interface AppLayoutProps
  extends Omit<React.ComponentProps<typeof SidebarProvider>, "children" | "style"> {
  children: React.ReactNode
  sidebar?: React.ReactNode
  header?: React.ReactNode
  footer?: React.ReactNode
  sidebarWidth?: string
  headerHeight?: string
  style?: React.CSSProperties
  insetClassName?: string
  contentClassName?: string
}

export function AppLayout({
  children,
  sidebar,
  header,
  footer,
  sidebarWidth = DEFAULT_SIDEBAR_WIDTH,
  headerHeight = DEFAULT_HEADER_HEIGHT,
  style,
  className,
  insetClassName,
  contentClassName,
  ...providerProps
}: AppLayoutProps) {
  const layoutStyle = {
    "--sidebar-width": sidebarWidth,
    "--header-height": headerHeight,
    ...style,
  } as React.CSSProperties

  return (
    <SidebarProvider
      {...providerProps}
      style={layoutStyle}
      className={cn(
        "h-svh overflow-hidden",
        // Smooth sidebar animations (override default linear easing)
        "[&_[data-slot=sidebar-gap]]:duration-300 [&_[data-slot=sidebar-gap]]:ease-[cubic-bezier(0.4,0,0.2,1)] [&_[data-slot=sidebar-gap]]:will-change-[width]",
        "[&_[data-slot=sidebar-container]]:duration-300 [&_[data-slot=sidebar-container]]:ease-[cubic-bezier(0.4,0,0.2,1)] [&_[data-slot=sidebar-container]]:will-change-[width]",
        className
      )}
    >
      {sidebar}
      <SidebarInset className={cn("min-h-0 overflow-hidden border border-border/50 transition-[margin] duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] md:peer-data-[variant=inset]:peer-data-[state=collapsed]:ml-0", insetClassName)}>
        {header}
        <div className={cn("flex min-h-0 flex-1 flex-col overflow-auto", contentClassName)}>
          {children}
        </div>
        {footer}
      </SidebarInset>
    </SidebarProvider>
  )
}
