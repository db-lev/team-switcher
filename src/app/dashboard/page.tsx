"use client"

import * as React from "react"
import { useHeader } from "@/contexts/header-context"
import { NavActions } from "@/components/nav-actions"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb"

export default function Page() {
  const { setHeaderContent, setHeaderActions } = useHeader()

  React.useEffect(() => {
    setHeaderContent(
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbPage className="line-clamp-1">
              Project Management & Task Tracking
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    )
    setHeaderActions(<NavActions />)

    return () => {
      setHeaderContent(undefined)
      setHeaderActions(undefined)
    }
  }, [setHeaderContent, setHeaderActions])

  return (
    <div className="flex flex-1 flex-col gap-4 px-4 py-10">
      <div className="bg-muted/50 mx-auto h-24 w-full max-w-3xl rounded-xl" />
      <div className="bg-muted/50 mx-auto h-full w-full max-w-3xl rounded-xl" />
    </div>
  )
}
