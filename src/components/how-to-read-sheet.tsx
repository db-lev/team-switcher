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
                <h3 className="font-semibold">The 3×3 Grid</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  This demo shows <strong>3 use cases</strong> across <strong>3 design options</strong> = <strong>9 total combinations</strong>. Use the team switcher to explore each one.
                </p>
                <div className="rounded-lg bg-muted/30 p-3 text-xs space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="inline-flex h-4 items-center rounded px-1 text-[10px] font-medium text-white bg-orange-500">D1</span>
                    <span className="font-medium">Profile Switcher</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="inline-flex h-4 items-center rounded px-1 text-[10px] font-medium text-white bg-blue-500">D2</span>
                    <span className="font-medium">Unified Experience</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="inline-flex h-4 items-center rounded px-1 text-[10px] font-medium text-white bg-purple-500">D3</span>
                    <span className="font-medium">Person-Centric</span>
                  </div>
                </div>
              </div>

              <div className="border-t" />

              {/* The 3 Use Cases */}
              <div className="flex flex-col gap-4">
                <h3 className="font-semibold">The 3 Use Cases</h3>
                
                <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
                  <div>
                    <strong className="text-foreground">BWE</strong> - Dual-role evolution. Lender who added brokerage. Graham belongs to both accounts.
                  </div>
                  <div>
                    <strong className="text-foreground">Convoy Capital</strong> - Multi-team broker-only. Tyler manages one of 8 broker teams.
                  </div>
                  <div>
                    <strong className="text-foreground">Leverage Companies</strong> - Multi-entity lender. Two legal companies, same team.
                  </div>
                </div>
              </div>

              <div className="border-t" />

              {/* Design Option 1 */}
              <div className="flex flex-col gap-4">
                <h3 className="font-semibold">Design Option 1: Profile Switcher</h3>
                
                <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
                  <p>
                    User is always in <strong className="text-foreground">one mode</strong> (Broker OR Lender). Mode switcher in sidebar footer changes which features are visible.
                  </p>
                  <p>
                    <strong className="text-foreground">Pro:</strong> Simplest implementation. Clean separation. <br />
                    <strong className="text-foreground">Con:</strong> Must manually switch to see other features.
                  </p>
                </div>
              </div>

              <div className="border-t" />

              {/* Design Option 2 */}
              <div className="flex flex-col gap-4">
                <h3 className="font-semibold">Design Option 2: Unified Experience</h3>
                
                <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
                  <p>
                    User sees <strong className="text-foreground">all features</strong> from both roles simultaneously. Role indicators (colored dots) show which account each feature uses.
                  </p>
                  <p>
                    <strong className="text-foreground">Pro:</strong> No mode switching, everything in one view. <br />
                    <strong className="text-foreground">Con:</strong> More complex policies and permissions.
                  </p>
                </div>
              </div>

              <div className="border-t" />

              {/* Design Option 3 */}
              <div className="flex flex-col gap-4">
                <h3 className="font-semibold">Design Option 3: Person-Centric</h3>
                
                <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
                  <p>
                    Same UX as Option 2, but <strong className="text-foreground">restructured data model</strong>. Person is central identity. "User Profile" becomes "Membership."
                  </p>
                  <p>
                    <strong className="text-foreground">Pro:</strong> Unified login story, simpler CRM contact flow. <br />
                    <strong className="text-foreground">Difference:</strong> Architecture change, not UX change.
                  </p>
                </div>
              </div>

              <div className="border-t" />

              {/* Try It */}
              <div className="rounded-lg bg-muted/50 p-4">
                <p className="text-sm text-muted-foreground leading-relaxed">
                  <strong className="text-foreground">Try it:</strong> Switch teams in the sidebar (grouped by use case). Watch how navigation and user cards change based on the design option.
                </p>
              </div>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
