"use client"

import * as React from "react"
import { InfoIcon } from "lucide-react"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"

export function HowToReadSheet() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon-sm">
          <InfoIcon className="h-4 w-4" />
          <span className="sr-only">How to read this</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-full sm:max-w-md p-0">
        <div className="flex h-full flex-col">
          <SheetHeader className="shrink-0">
            <SheetTitle>How to Read This</SheetTitle>
            <SheetDescription>
              Understanding the use cases and architecture planning
            </SheetDescription>
          </SheetHeader>
          
          <div className="flex-1 overflow-y-auto px-4">
            <div className="flex flex-col gap-8 py-4">
              
              {/* What This Is */}
              <div className="flex flex-col gap-3">
                <h3 className="font-semibold">What You're Looking At</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  The <strong>team switcher</strong> in the sidebar represents different real-world use cases. Each organization shows how different role combinations would work.
                </p>
              </div>

              <div className="border-t" />

              {/* Launch Reality */}
              <div className="flex flex-col gap-4">
                <h3 className="font-semibold">At Launch (Reality)</h3>
                
                <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
                  <p>
                    <strong className="text-foreground">Brokers & Borrowers</strong> get full access—all Platform and Actions features (same as always)
                  </p>
                  <p>
                    <strong className="text-foreground">Lenders & Sponsors</strong> only get Vaults (CRM users, not customers)
                  </p>
                  <p className="text-xs">
                    <em>Sponsors = borrowers in someone's CRM, basically same behavior as Lenders</em>
                  </p>
                </div>
              </div>

              <div className="border-t" />

              {/* Future Planning */}
              <div className="flex flex-col gap-4">
                <h3 className="font-semibold">Planning for the Future</h3>
                
                <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
                  <p>
                    This demo assumes that <strong className="text-foreground">ONE feature becomes accessible to non-customers</strong>.
                  </p>
                  <p>
                    We picked <strong className="text-foreground">Network</strong>. So Lenders and Sponsors can use Network + Vaults (not just Vaults).
                  </p>
                  <p className="text-xs">
                    This lets us plan the architecture for "more than just Vaults" for CRM users.
                  </p>
                </div>
              </div>

              <div className="border-t" />

              {/* Try It */}
              <div className="rounded-lg bg-muted/50 p-4">
                <p className="text-sm text-muted-foreground leading-relaxed">
                  <strong className="text-foreground">Try it:</strong> Switch teams in the sidebar and watch the navigation change. Each team shows a different account structure scenario.
                </p>
              </div>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
