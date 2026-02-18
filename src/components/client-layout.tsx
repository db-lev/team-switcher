"use client"

import { AppLayout } from "@/components/blocks/shells/app-layout"
import { AppSidebar } from "@/components/app-sidebar"
import { SiteHeader } from "@/components/blocks/headers/site-header"

export function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <AppLayout sidebar={<AppSidebar />} header={<SiteHeader />}>
      {children}
    </AppLayout>
  )
}
