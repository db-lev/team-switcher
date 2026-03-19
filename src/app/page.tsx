"use client"

import { useActiveUser } from "@/contexts/active-user-context"
import { useTeam } from "@/contexts/team-context"
import Image from "next/image"
import { Landmark, BookOpen, Info } from "lucide-react"
import { getAccountPalette, getAccountsByUser, SCENARIOS } from "@/lib/demo-data"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"

export default function DashboardPage() {
  return (
    <div className="flex flex-1 flex-col gap-6 p-6">
      <UseCaseView />
    </div>
  )
}

function UseCaseView() {
  const { organization, teamMembers } = useActiveUser()
  const { activeTeam } = useTeam()

  const scenario = SCENARIOS[activeTeam?.name ?? '']

  return (
    <>
      {/* USE CASE TITLE */}
      {scenario?.title && (
        <div className="flex items-center gap-1.5 text-sm font-light">
          <BookOpen className="h-4 w-4 shrink-0" />
          <span className="font-medium">The Use Case: </span>{scenario.title}
        </div>
      )}

      {/* ORGANIZATION */}
      <div>
        <span className="mb-3 block font-mono text-xs font-semibold uppercase tracking-wider text-muted-foreground">Organization</span>
        <div className="flex items-start justify-between">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-semibold">{organization.name}</h1>
              <span className="font-mono text-xs rounded-md border bg-muted px-1.5 py-0.5">
                Org {organization.orgId}
              </span>
            </div>
            {organization.hasLenderPrograms && (
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <Landmark className="h-3.5 w-3.5" />
                Has Lender Programs
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Info className="h-3.5 w-3.5 cursor-default" />
                  </TooltipTrigger>
                  <TooltipContent side="right" className="max-w-xs">
                    We identify a &quot;Lender&quot; via the Org&apos;s Lender Attributes. So to identify &quot;Lender Users&quot;, we need a way to match from User → Person → Org.
                  </TooltipContent>
                </Tooltip>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ACCOUNTS */}
      <div>
        <span className="mb-3 block font-mono text-xs font-semibold uppercase tracking-wider text-muted-foreground">Accounts</span>
        <div className="grid gap-3 md:grid-cols-2">
          {organization.accounts.length === 0 ? (
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="rounded-lg border border-dashed bg-[repeating-linear-gradient(45deg,transparent,transparent_6px,hsl(var(--muted)/0.4)_6px,hsl(var(--muted)/0.4)_7px)] cursor-default">
                  <div className="flex items-start gap-3 p-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-dashed bg-background" />
                    <div className="flex flex-1 flex-col gap-1.5">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-sm font-semibold text-muted-foreground">No account</span>
                      </div>
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        No account has been created for this user.
                      </p>
                    </div>
                  </div>
                </div>
              </TooltipTrigger>
              <TooltipContent side="bottom" className="max-w-xs">
                Auto Creating accounts is scary — we can&apos;t say every member of JP Morgan is added to a single Account to see the full team.
              </TooltipContent>
            </Tooltip>
          ) : (
            organization.accounts.map((account) => {
              const palette = getAccountPalette(account.id)
              const AccountIcon = palette.icon

              return (
                <div key={account.id} className="rounded-lg border bg-card">
                  <div className="flex items-start gap-3 p-4">
                    <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${palette.bg}`}>
                      <AccountIcon className={`h-5 w-5 ${palette.text}`} />
                    </div>
                    <div className="flex flex-1 flex-col gap-1.5">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-sm font-semibold">{account.name}</span>
                        {account.accountNumber && (
                          <span className="font-mono text-xs rounded-md border bg-muted px-1.5 py-0.5">
                            {account.accountNumber}
                          </span>
                        )}
                        {account.subscription ? (
                          <span className="inline-flex h-5 items-center gap-1.5 rounded-full bg-green-500/10 px-2 text-xs font-medium text-green-700">
                            <span className="relative flex h-2 w-2">
                              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75" />
                              <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
                            </span>
                            Active Subscription
                          </span>
                        ) : (
                          <span className="inline-flex h-5 items-center gap-1.5 rounded-full bg-muted px-2 text-xs font-medium text-muted-foreground">
                            <span className="h-2 w-2 rounded-full border border-muted-foreground/40" />
                            No subscription
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        {account.description}
                      </p>
                    </div>
                  </div>
                </div>
              )
            })
          )}
        </div>
      </div>

      {/* USERS */}
      <div>
        <span className="mb-3 block font-mono text-xs font-semibold uppercase tracking-wider text-muted-foreground">Users</span>
        <div className="grid gap-3 md:grid-cols-2">
          {teamMembers.map((member) => {
            const memberAccounts = getAccountsByUser(member, organization)

            return (
              <div key={member.id} className="rounded-lg border bg-card">
                <div className="flex items-center gap-3 p-4">
                  <div className="h-10 w-10 shrink-0 overflow-hidden rounded-full">
                    <Image
                      src={member.avatar}
                      alt={member.name}
                      width={40}
                      height={40}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="flex flex-1 flex-col gap-0.5">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold">{member.name}</span>
                      <span className="font-mono text-xs rounded-md border bg-muted px-1.5 py-0.5">
                        {member.userId}
                      </span>
                    </div>
                    <span className="text-xs text-muted-foreground">{member.email}</span>
                  </div>
                </div>

                {memberAccounts.length > 0 && (
                  <>
                    <div className="border-t" />
                    {memberAccounts.map((account, i) => {
                      const palette = getAccountPalette(account.id)
                      const AccountIcon = palette.icon
                      return (
                        <div
                          key={account.id}
                          className={`flex items-center justify-between px-4 py-2 bg-muted/40${i < memberAccounts.length - 1 ? ' border-b' : ''}`}
                        >
                          <div className="flex items-center gap-2">
                            <div className={`flex h-5 w-5 shrink-0 items-center justify-center rounded ${palette.bg}`}>
                              <AccountIcon className={`h-3 w-3 ${palette.text}`} />
                            </div>
                            <span className="text-xs font-medium">{account.name}</span>
                          </div>
                          {account.accountNumber && (
                            <span className="font-mono text-xs text-muted-foreground">
                              {account.accountNumber}
                            </span>
                          )}
                        </div>
                      )
                    })}
                  </>
                )}
              </div>
            )
          })}
        </div>
      </div>

      {/* USE CASE DESCRIPTION */}
      {scenario?.description && (
        <div className="rounded-lg border border-dashed bg-muted/30 px-4 py-3">
          <p className="text-sm text-muted-foreground leading-relaxed">{scenario.description}</p>
        </div>
      )}
    </>
  )
}
