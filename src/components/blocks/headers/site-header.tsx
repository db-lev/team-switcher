import * as React from "react"

import { Separator } from "@/components/ui/separator"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { HowToReadSheet } from "@/components/how-to-read-sheet"

export interface SiteHeaderProps {
  /** Simple page title. If children is provided, this is ignored. */
  title?: string
  /** Custom content rendered after the sidebar trigger (e.g. breadcrumbs, popovers). Replaces title when provided. */
  children?: React.ReactNode
  /** Actions rendered on the right side of the header */
  actions?: React.ReactNode
}

export function SiteHeader({ title, children, actions }: SiteHeaderProps) {
  return (
    <header className="flex h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ml-1" />
        {children ? (
          <>
            <Separator
              orientation="vertical"
              className="mx-2 data-[orientation=vertical]:h-4"
            />
            {children}
          </>
        ) : title ? (
          <>
            <Separator
              orientation="vertical"
              className="mx-2 data-[orientation=vertical]:h-4"
            />
            <h1 className="text-base font-medium">{title}</h1>
          </>
        ) : null}
        <div className="ml-auto flex items-center gap-2">
          {actions}
          <HowToReadSheet />
        </div>
      </div>
    </header>
  )
}
