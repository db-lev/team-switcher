"use client"

import { AppLayout } from "@/components/blocks/shells/app-layout"
import { AppSidebar } from "@/components/app-sidebar"
import { SiteHeader } from "@/components/blocks/headers/site-header"
import { HeaderProvider, useHeader } from "@/contexts/header-context"
import { ModeProvider } from "@/contexts/mode-context"

function DynamicHeader() {
  const { title, headerContent, headerActions } = useHeader()
  
  return (
    <SiteHeader title={title} actions={headerActions}>
      {headerContent}
    </SiteHeader>
  )
}

export function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <HeaderProvider>
      <ModeProvider>
        <AppLayout sidebar={<AppSidebar />} header={<DynamicHeader />}>
          {children}
        </AppLayout>
      </ModeProvider>
    </HeaderProvider>
  )
}
