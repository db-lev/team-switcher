"use client"

import * as React from "react"
import { useHeader } from "@/contexts/header-context"
import { useTeam } from "@/contexts/team-context"
import { useActiveUser } from "@/contexts/active-user-context"
import { useMode } from "@/contexts/mode-context"
import { demoTeamUsers } from "@/components/app-sidebar"
import Image from "next/image"
import { Building2, Landmark, Briefcase, User } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

function extractFirstName(fullName: string): string {
  return fullName.split(" ")[0] || ""
}

function extractLastName(fullName: string): string {
  const parts = fullName.split(" ")
  return parts.length > 1 ? parts[parts.length - 1] : ""
}

export default function SettingsPage() {
  const { setTitle } = useHeader()
  const { activeTeam } = useTeam()
  const { activeUserId } = useActiveUser()
  const { mode } = useMode()
  
  const [activeTab, setActiveTab] = React.useState<"details" | "org">("details")

  React.useEffect(() => {
    setTitle("Settings")
    return () => setTitle(undefined)
  }, [setTitle])

  const useCase = activeTeam?.useCase || 'BWE'
  const designOption = activeTeam?.designOption || 1
  
  const allUsers = activeTeam ? demoTeamUsers[activeTeam.name] || [] : []
  const selectedDemoUser = allUsers.find(u => u.id === activeUserId)

  if (!selectedDemoUser) {
    return <div className="flex flex-1 items-center justify-center">User not found</div>
  }

  const firstName = extractFirstName(selectedDemoUser.name)
  const lastName = extractLastName(selectedDemoUser.name)

  // Determine job title based on design option and mode
  const getJobTitle = () => {
    if (designOption === 1) {
      // Profile switcher - show active mode
      return mode === 'broker' ? 'Broker' : 'Lender'
    } else {
      // Unified experience - show all roles
      if (selectedDemoUser.roles.length > 1) {
        return selectedDemoUser.roles.join(' & ')
      }
      return selectedDemoUser.roles[0]
    }
  }

  // Get organization name
  const getOrganizationName = () => {
    if (useCase === 'BWE') return 'BWE'
    if (useCase === 'Convoy') return 'Convoy Capital'
    if (useCase === 'Leverage') return 'Leverage Companies'
    return 'BWE'
  }
  
  // Get organization website
  const getWebsite = () => {
    if (useCase === 'BWE') return 'https://bwe.com'
    if (useCase === 'Convoy') return 'https://convoycapital.com'
    if (useCase === 'Leverage') return 'https://leveragecompanies.com'
    return 'https://bwe.com'
  }

  // Get account name based on context
  const getAccountName = () => {
    if (useCase === 'BWE') {
      if (designOption === 1) {
        return mode === 'broker' ? 'BWE Brokerage' : 'BWE Lending'
      } else {
        return selectedDemoUser.roles.length > 1 ? 'BWE Brokerage & BWE Lending' : 'BWE Brokerage'
      }
    }
    
    if (useCase === 'Convoy') {
      return 'Convoy Austin'
    }
    
    if (useCase === 'Leverage') {
      if (selectedDemoUser.id === 'jp-helan') {
        return 'Brick City Capital'
      } else {
        return 'Leverage Companies'
      }
    }
    
    return 'Account'
  }

  // Get account type
  const getAccountType = () => {
    if (designOption === 1) {
      return mode === 'broker' ? 'Broker' : 'Lender'
    } else {
      if (selectedDemoUser.roles.includes('Broker')) return 'Broker'
      if (selectedDemoUser.roles.includes('Lender')) return 'Lender'
    }
    return 'Broker'
  }

  const accountType = getAccountType()
  const accountTypeIcon = accountType === 'Broker' ? Building2 : Landmark
  const accountTypeBg = accountType === 'Broker' ? 'bg-[#3E9B70]' : 'bg-[#3880E8]'

  // Get account links for sidebar
  const getAccountLinks = () => {
    if (!selectedDemoUser) return []

    const accounts: { id: string; name: string; url: string }[] = []

    if (useCase === 'BWE') {
      if (selectedDemoUser.roles.includes('Broker')) {
        accounts.push({
          id: 'bwe-brokerage',
          name: 'BWE Brokerage',
          url: '/settings/accounts/bwe-brokerage',
        })
      }
      if (selectedDemoUser.roles.includes('Lender')) {
        accounts.push({
          id: 'bwe-lending',
          name: 'BWE Lending',
          url: '/settings/accounts/bwe-lending',
        })
      }
    } else if (useCase === 'Convoy') {
      accounts.push({
        id: 'convoy-austin',
        name: 'Convoy Austin',
        url: '/settings/accounts/convoy-austin',
      })
    } else if (useCase === 'Leverage') {
      if (selectedDemoUser.id === 'jp-helan') {
        accounts.push({
          id: 'brick-city-capital',
          name: 'Brick City Capital',
          url: '/settings/accounts/brick-city-capital',
        })
      } else if (selectedDemoUser.id === 'ian-rodriguez') {
        accounts.push({
          id: 'leverage-companies',
          name: 'Leverage Companies',
          url: '/settings/accounts/leverage-companies',
        })
      }
    }

    return accounts
  }

  return (
    <div className="flex flex-1 flex-col">
      <div className="flex h-full">
        {/* Sidebar Navigation */}
        <div className="w-56 bg-background p-6">
          <nav className="flex flex-col gap-1">
            <button
              onClick={() => setActiveTab("details")}
              className={`flex items-center gap-3 rounded-md px-3 py-2 text-left text-sm transition-colors ${
                activeTab === "details" ? "bg-muted font-medium" : "hover:bg-muted/50"
              }`}
            >
              <User className="h-4 w-4" />
              My Details
            </button>
            <button
              onClick={() => setActiveTab("org")}
              className={`flex items-center gap-3 rounded-md px-3 py-2 text-left text-sm transition-colors ${
                activeTab === "org" ? "bg-muted font-medium" : "hover:bg-muted/50"
              }`}
            >
              <Building2 className="h-4 w-4" />
              Org
            </button>
            
            {/* Account Links */}
            {getAccountLinks().length > 0 && (
              <div className="mt-4">
                <div className="px-3 py-1 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Your Accounts
                </div>
                <div className="mt-1 flex flex-col gap-0.5">
                  {getAccountLinks().map((account) => (
                    <a
                      key={account.id}
                      href={account.url}
                      className="flex items-center gap-2 rounded-md px-3 py-1.5 text-left text-sm transition-colors hover:bg-muted/50"
                    >
                      {account.name}
                    </a>
                  ))}
                </div>
              </div>
            )}
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-y-auto p-8">
          {activeTab === "details" && (
            <div className="max-w-2xl">
              <div className="mb-6">
                <h2 className="text-xl font-semibold">Personal Information</h2>
                <p className="text-sm text-muted-foreground">Update your photo & details.</p>
              </div>

              <div className="space-y-6">
                {/* Profile Picture & Name */}
                <div className="flex items-center gap-4">
                  <div className="h-16 w-16 shrink-0 overflow-hidden rounded-lg border">
                    <Image 
                      src={selectedDemoUser.avatar} 
                      alt={selectedDemoUser.name} 
                      width={64} 
                      height={64} 
                      className="h-full w-full object-cover" 
                    />
                  </div>
                  <div className="flex-1">
                    <Label htmlFor="name" className="text-sm font-medium">Name *</Label>
                    <Input id="name" value={selectedDemoUser.name} readOnly className="bg-muted mt-2" />
                  </div>
                </div>

                <Separator />

                {/* Email */}
                <div>
                  <Label htmlFor="email" className="text-sm font-medium">Email *</Label>
                  <p className="text-xs text-muted-foreground mb-2">Contact support to change your email.</p>
                  <Input id="email" value={selectedDemoUser.email} readOnly className="bg-muted" />
                </div>

                {/* Job Title */}
                <div>
                  <Label htmlFor="jobTitle" className="text-sm font-medium">Job title</Label>
                  <Input id="jobTitle" value={getJobTitle()} readOnly className="bg-muted" />
                </div>

                {/* Mobile Phone */}
                <div>
                  <Label htmlFor="mobile" className="text-sm font-medium">Mobile phone</Label>
                  <Input id="mobile" value="(917) 216-5517" readOnly className="bg-muted" />
                </div>

                {/* LinkedIn */}
                <div>
                  <Label htmlFor="linkedin" className="text-sm font-medium">LinkedIn</Label>
                  <Input id="linkedin" value="https://linkedin.com" readOnly className="bg-muted" />
                </div>

                <Separator />

                {/* Account Memberships Section */}
                <div>
                  <h3 className="text-sm font-semibold mb-3">Account Memberships</h3>
                  <div className="space-y-3">
                    {useCase === 'BWE' && selectedDemoUser.roles.includes('Broker') && (
                      <div className="rounded-lg border bg-card p-3">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <span className="font-medium text-sm">BWE Brokerage</span>
                            <span className="inline-flex h-5 items-center gap-1.5 rounded-full border px-2 text-xs font-medium">
                              <span className="h-1.5 w-1.5 rounded-full bg-[#3E9B70]" />
                              Broker
                            </span>
                          </div>
                          <span className="text-xs text-muted-foreground">Account 10547</span>
                        </div>
                        <div className="text-xs text-muted-foreground">
                          Role: <span className="font-medium">Admin</span>
                        </div>
                      </div>
                    )}
                    {useCase === 'BWE' && selectedDemoUser.roles.includes('Lender') && (
                      <div className="rounded-lg border bg-card p-3">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <span className="font-medium text-sm">BWE Lending</span>
                            <span className="inline-flex h-5 items-center gap-1.5 rounded-full border px-2 text-xs font-medium">
                              <span className="h-1.5 w-1.5 rounded-full bg-[#3880E8]" />
                              Lender
                            </span>
                          </div>
                          <span className="text-xs text-muted-foreground">Account 4381</span>
                        </div>
                        <div className="text-xs text-muted-foreground">
                          Role: <span className="font-medium">Lender Contact</span>
                        </div>
                      </div>
                    )}
                    {useCase === 'Convoy' && (
                      <div className="rounded-lg border bg-card p-3">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <span className="font-medium text-sm">Convoy Austin</span>
                            <span className="inline-flex h-5 items-center gap-1.5 rounded-full border px-2 text-xs font-medium">
                              <span className="h-1.5 w-1.5 rounded-full bg-[#3E9B70]" />
                              Broker
                            </span>
                          </div>
                        </div>
                        <div className="text-xs text-muted-foreground">
                          Role: <span className="font-medium">Admin</span>
                        </div>
                      </div>
                    )}
                    {useCase === 'Leverage' && selectedDemoUser.id === 'jp-helan' && (
                      <div className="rounded-lg border bg-card p-3">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <span className="font-medium text-sm">Brick City Capital</span>
                            <span className="inline-flex h-5 items-center gap-1.5 rounded-full border px-2 text-xs font-medium">
                              <span className="h-1.5 w-1.5 rounded-full bg-[#3880E8]" />
                              Lender
                            </span>
                          </div>
                        </div>
                        <div className="text-xs text-muted-foreground">
                          Role: <span className="font-medium">Lender</span>
                        </div>
                      </div>
                    )}
                    {useCase === 'Leverage' && selectedDemoUser.id === 'ian-rodriguez' && (
                      <div className="rounded-lg border bg-card p-3">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <span className="font-medium text-sm">Leverage Companies</span>
                            <span className="inline-flex h-5 items-center gap-1.5 rounded-full border px-2 text-xs font-medium">
                              <span className="h-1.5 w-1.5 rounded-full bg-[#3880E8]" />
                              Lender
                            </span>
                          </div>
                        </div>
                        <div className="text-xs text-muted-foreground">
                          Role: <span className="font-medium">Lender</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "accounts" && (
            <div className="max-w-4xl">
              <div className="mb-6">
                <h2 className="text-xl font-semibold">Accounts</h2>
                <p className="text-sm text-muted-foreground">Accounts you belong to in this organization.</p>
              </div>

              <div className="rounded-lg border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Account</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Members</TableHead>
                      <TableHead className="text-right">Your Role</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {useCase === 'BWE' && selectedDemoUser.roles.includes('Broker') && (
                      <TableRow>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-[#3E9B70]/20">
                              <Briefcase className="h-4 w-4 text-[#3E9B70]" />
                            </div>
                            <div>
                              <div className="font-medium">BWE Brokerage</div>
                              <div className="text-xs text-muted-foreground">Account 10547</div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <span className="inline-flex items-center gap-1.5 text-sm">
                            <span className="h-1.5 w-1.5 rounded-full bg-[#3E9B70]" />
                            Broker
                          </span>
                        </TableCell>
                        <TableCell>4</TableCell>
                        <TableCell className="text-right font-medium">Admin</TableCell>
                      </TableRow>
                    )}
                    
                    {useCase === 'BWE' && selectedDemoUser.roles.includes('Lender') && (
                      <TableRow>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-[#3880E8]/20">
                              <Landmark className="h-4 w-4 text-[#3880E8]" />
                            </div>
                            <div>
                              <div className="font-medium">BWE Lending</div>
                              <div className="text-xs text-muted-foreground">Account 4381</div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <span className="inline-flex items-center gap-1.5 text-sm">
                            <span className="h-1.5 w-1.5 rounded-full bg-[#3880E8]" />
                            Lender
                          </span>
                        </TableCell>
                        <TableCell>58</TableCell>
                        <TableCell className="text-right font-medium">Lender Contact</TableCell>
                      </TableRow>
                    )}

                    {useCase === 'Convoy' && (
                      <TableRow>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-[#3E9B70]/20">
                              <Briefcase className="h-4 w-4 text-[#3E9B70]" />
                            </div>
                            <div>
                              <div className="font-medium">Convoy Austin</div>
                              <div className="text-xs text-muted-foreground">1 of 8 teams</div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <span className="inline-flex items-center gap-1.5 text-sm">
                            <span className="h-1.5 w-1.5 rounded-full bg-[#3E9B70]" />
                            Broker
                          </span>
                        </TableCell>
                        <TableCell>—</TableCell>
                        <TableCell className="text-right font-medium">Admin</TableCell>
                      </TableRow>
                    )}

                    {useCase === 'Leverage' && selectedDemoUser.id === 'jp-helan' && (
                      <TableRow>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-[#3880E8]/20">
                              <Landmark className="h-4 w-4 text-[#3880E8]" />
                            </div>
                            <div>
                              <div className="font-medium">Brick City Capital</div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <span className="inline-flex items-center gap-1.5 text-sm">
                            <span className="h-1.5 w-1.5 rounded-full bg-[#3880E8]" />
                            Lender
                          </span>
                        </TableCell>
                        <TableCell>—</TableCell>
                        <TableCell className="text-right font-medium">Lender</TableCell>
                      </TableRow>
                    )}

                    {useCase === 'Leverage' && selectedDemoUser.id === 'ian-rodriguez' && (
                      <TableRow>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-[#3880E8]/20">
                              <Landmark className="h-4 w-4 text-[#3880E8]" />
                            </div>
                            <div>
                              <div className="font-medium">Leverage Companies</div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <span className="inline-flex items-center gap-1.5 text-sm">
                            <span className="h-1.5 w-1.5 rounded-full bg-[#3880E8]" />
                            Lender
                          </span>
                        </TableCell>
                        <TableCell>—</TableCell>
                        <TableCell className="text-right font-medium">Lender</TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </div>
          )}

          {activeTab === "org" && (
            <div className="max-w-2xl">
              <div className="mb-6">
                <h2 className="text-xl font-semibold">Organization</h2>
                <p className="text-sm text-muted-foreground">Organization-level details and settings.</p>
              </div>

              <div className="space-y-6">
                {/* Organization Logo & Name */}
                <div className="flex items-center gap-4">
                  <div className="h-16 w-16 shrink-0 flex items-center justify-center rounded-lg border bg-muted">
                    <span className="text-2xl font-bold">{getOrganizationName().charAt(0)}</span>
                  </div>
                  <div className="flex-1">
                    <Label htmlFor="orgName" className="text-sm font-medium">Name *</Label>
                    <Input id="orgName" value={getOrganizationName()} readOnly className="bg-muted mt-2" />
                  </div>
                </div>

                <Separator />

                {/* Aliases */}
                <div>
                  <Label htmlFor="aliases" className="text-sm font-medium">Aliases</Label>
                  <Input 
                    id="aliases" 
                    value={useCase === 'BWE' ? 'Bellwether Enterprise, BELLWETHER ENT MTG INVS LLC' : ''} 
                    readOnly 
                    className="bg-muted" 
                    placeholder="Organization aliases (optional)"
                  />
                </div>

                {/* Domains */}
                <div>
                  <Label htmlFor="domains" className="text-sm font-medium">Domains</Label>
                  <Input 
                    id="domains" 
                    value={useCase === 'BWE' ? 'bwecap.com, bwe.com' : useCase === 'Convoy' ? 'convoycapital.com' : 'leveragecompanies.com, brkcty.com'} 
                    readOnly 
                    className="bg-muted" 
                  />
                </div>

                {/* Website */}
                <div>
                  <Label htmlFor="website" className="text-sm font-medium">Website</Label>
                  <Input 
                    id="website" 
                    value={getWebsite()} 
                    readOnly 
                    className="bg-muted" 
                  />
                </div>

                {/* Location */}
                <div>
                  <Label htmlFor="location" className="text-sm font-medium">Location</Label>
                  <Input 
                    id="location" 
                    value={useCase === 'BWE' ? '1375 E. 9th Street Suite 2400, Cleveland, OH 44114' : useCase === 'Convoy' ? 'Austin, TX' : 'Multiple locations'} 
                    readOnly 
                    className="bg-muted" 
                  />
                </div>

                <Separator />

                {/* About */}
                <div>
                  <Label htmlFor="about" className="text-sm font-medium">About the company</Label>
                  <div className="rounded-md border bg-muted p-3 text-sm text-muted-foreground leading-relaxed">
                    {useCase === 'BWE' && (
                      <>
                        <p className="mb-2">BWE (Bellwether Enterprise) is a middle-market debt fund based in Cleveland, OH. Originally categorized as "not actively lending," BWE has evolved to operate as both a lender and a broker.</p>
                        <p>When deals don't fit their direct lending bucket, they broker them out to external lenders. The organization is deeply embedded in the market with 43 different accounts having BWE as a lender in their CRM.</p>
                      </>
                    )}
                    {useCase === 'Convoy' && "Multi-team brokerage with 8 separate broker teams under one organization. Each team maintains data privacy while enabling cross-team collaboration on co-brokered deals."}
                    {useCase === 'Leverage' && "Multi-entity lender operating under Leverage Companies parent organization with Brick City Capital and Leverage Companies as subsidiary entities. Both specialize in residential DSCR loans with a unified team."}
                  </div>
                </div>

                <Separator />

                {/* Accounts Section */}
                <div>
                  <h3 className="text-lg font-semibold mb-4">Accounts</h3>
                  <p className="text-sm text-muted-foreground mb-4">Accounts you belong to in this organization.</p>
                  
                  <div className="rounded-lg border">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Account</TableHead>
                          <TableHead>Type</TableHead>
                          <TableHead>Members</TableHead>
                          <TableHead className="text-right">Your Role</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {useCase === 'BWE' && selectedDemoUser.roles.includes('Broker') && (
                          <TableRow>
                            <TableCell>
                              <div className="flex items-center gap-3">
                                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-[#3E9B70]/20">
                                  <Briefcase className="h-4 w-4 text-[#3E9B70]" />
                                </div>
                                <div>
                                  <div className="font-medium">BWE Brokerage</div>
                                  <div className="text-xs text-muted-foreground">Account 10547</div>
                                </div>
                              </div>
                            </TableCell>
                            <TableCell>
                              <span className="inline-flex items-center gap-1.5 text-sm">
                                <span className="h-1.5 w-1.5 rounded-full bg-[#3E9B70]" />
                                Broker
                              </span>
                            </TableCell>
                            <TableCell>4</TableCell>
                            <TableCell className="text-right font-medium">Admin</TableCell>
                          </TableRow>
                        )}
                        
                        {useCase === 'BWE' && selectedDemoUser.roles.includes('Lender') && (
                          <TableRow>
                            <TableCell>
                              <div className="flex items-center gap-3">
                                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-[#3880E8]/20">
                                  <Landmark className="h-4 w-4 text-[#3880E8]" />
                                </div>
                                <div>
                                  <div className="font-medium">BWE Lending</div>
                                  <div className="text-xs text-muted-foreground">Account 4381</div>
                                </div>
                              </div>
                            </TableCell>
                            <TableCell>
                              <span className="inline-flex items-center gap-1.5 text-sm">
                                <span className="h-1.5 w-1.5 rounded-full bg-[#3880E8]" />
                                Lender
                              </span>
                            </TableCell>
                            <TableCell>58</TableCell>
                            <TableCell className="text-right font-medium">Lender Contact</TableCell>
                          </TableRow>
                        )}

                        {useCase === 'Convoy' && (
                          <TableRow>
                            <TableCell>
                              <div className="flex items-center gap-3">
                                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-[#3E9B70]/20">
                                  <Briefcase className="h-4 w-4 text-[#3E9B70]" />
                                </div>
                                <div>
                                  <div className="font-medium">Convoy Austin</div>
                                  <div className="text-xs text-muted-foreground">1 of 8 teams</div>
                                </div>
                              </div>
                            </TableCell>
                            <TableCell>
                              <span className="inline-flex items-center gap-1.5 text-sm">
                                <span className="h-1.5 w-1.5 rounded-full bg-[#3E9B70]" />
                                Broker
                              </span>
                            </TableCell>
                            <TableCell>—</TableCell>
                            <TableCell className="text-right font-medium">Admin</TableCell>
                          </TableRow>
                        )}

                        {useCase === 'Leverage' && selectedDemoUser.id === 'jp-helan' && (
                          <TableRow>
                            <TableCell>
                              <div className="flex items-center gap-3">
                                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-[#3880E8]/20">
                                  <Landmark className="h-4 w-4 text-[#3880E8]" />
                                </div>
                                <div>
                                  <div className="font-medium">Brick City Capital</div>
                                </div>
                              </div>
                            </TableCell>
                            <TableCell>
                              <span className="inline-flex items-center gap-1.5 text-sm">
                                <span className="h-1.5 w-1.5 rounded-full bg-[#3880E8]" />
                                Lender
                              </span>
                            </TableCell>
                            <TableCell>—</TableCell>
                            <TableCell className="text-right font-medium">Lender</TableCell>
                          </TableRow>
                        )}

                        {useCase === 'Leverage' && selectedDemoUser.id === 'ian-rodriguez' && (
                          <TableRow>
                            <TableCell>
                              <div className="flex items-center gap-3">
                                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-[#3880E8]/20">
                                  <Landmark className="h-4 w-4 text-[#3880E8]" />
                                </div>
                                <div>
                                  <div className="font-medium">Leverage Companies</div>
                                </div>
                              </div>
                            </TableCell>
                            <TableCell>
                              <span className="inline-flex items-center gap-1.5 text-sm">
                                <span className="h-1.5 w-1.5 rounded-full bg-[#3880E8]" />
                                Lender
                              </span>
                            </TableCell>
                            <TableCell>—</TableCell>
                            <TableCell className="text-right font-medium">Lender</TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
