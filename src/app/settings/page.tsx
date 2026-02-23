"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { useHeader } from "@/contexts/header-context"
import { useActiveUser } from "@/contexts/active-user-context"
import { useActiveRole } from "@/contexts/mode-context"
import { bweOrganization, getAccountsByUser, getUserRole, getAccountIcon, getAccountColor, bweTeamMembers } from "@/lib/demo-data"
import Image from "next/image"
import { Building2, User, Briefcase, Users, Info, Plus, FileText, Upload } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

type SettingsTab = "details" | "org" | "team" | string // string for account IDs

export default function SettingsPage() {
  const router = useRouter()
  const { setTitle } = useHeader()
  const { user } = useActiveUser()
  const { activeRole } = useActiveRole()
  
  const [activeTab, setActiveTab] = React.useState<SettingsTab>("details")

  React.useEffect(() => {
    setTitle("Settings")
    return () => setTitle(undefined)
  }, [setTitle])

  // Get user's accounts
  const userAccounts = getAccountsByUser(user, bweOrganization)

  const renderContent = () => {
    if (activeTab === "details") {
      return (
        <div className="max-w-2xl">
          <div className="mb-6 flex items-start justify-between">
            <div>
              <h2 className="text-xl font-semibold">Personal Information</h2>
              <p className="text-sm text-muted-foreground">Update your photo & details.</p>
            </div>
            <span className="font-mono text-xs rounded-md border bg-muted px-2 py-1">
              User {user.userId}
            </span>
          </div>

          <div className="space-y-6">
            {/* Profile Picture & Name */}
            <div className="flex items-center gap-4">
              <div className="h-16 w-16 shrink-0 overflow-hidden rounded-lg border">
                <Image 
                  src={user.avatar} 
                  alt={user.name} 
                  width={64} 
                  height={64} 
                  className="h-full w-full object-cover" 
                />
              </div>
              <div className="flex-1">
                <Label htmlFor="name" className="text-sm font-medium">Name *</Label>
                <Input id="name" value={user.name} readOnly className="bg-muted mt-2" />
              </div>
            </div>

            <Separator />

            {/* Email */}
            <div>
              <Label htmlFor="email" className="text-sm font-medium">Email *</Label>
              <p className="text-xs text-muted-foreground mb-2">Contact support to change your email.</p>
              <Input id="email" value={user.email} readOnly className="bg-muted" />
            </div>

            {/* Job Title */}
            <div>
              <Label htmlFor="jobTitle" className="text-sm font-medium">Job title</Label>
              <Input id="jobTitle" value={activeRole === 'broker' ? 'Broker' : 'Lender'} readOnly className="bg-muted" />
            </div>

            {/* Mobile Phone */}
            <div>
              <Label htmlFor="mobile" className="text-sm font-medium">Mobile phone</Label>
              <Input id="mobile" value={user.phone} readOnly className="bg-muted" />
            </div>

            {/* LinkedIn */}
            <div>
              <Label htmlFor="linkedin" className="text-sm font-medium">LinkedIn</Label>
              <Input id="linkedin" value={user.linkedin} readOnly className="bg-muted" />
            </div>

            <Separator />

            {/* Account Memberships Section */}
            <div>
              <h3 className="text-sm font-semibold mb-3">Account Memberships</h3>
              <div className="rounded-lg border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Account</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead className="text-right">Your Role</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {userAccounts.map((account) => {
                      const AccountIcon = getAccountIcon(account.type)
                      const accountColor = getAccountColor(account.type)
                      
                      return (
                        <TableRow key={account.id}>
                          <TableCell>
                            <div className="flex items-center gap-3">
                              <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-md ${accountColor}/20`}>
                                <AccountIcon className={`h-4 w-4 ${accountColor.replace('bg-', 'text-')}`} />
                              </div>
                              <div>
                                <div className="font-medium">{account.name}</div>
                                {account.accountNumber && (
                                  <div className="text-xs text-muted-foreground">Account {account.accountNumber}</div>
                                )}
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <span className="inline-flex items-center gap-1.5 text-sm">
                              <span className={`h-1.5 w-1.5 rounded-full ${accountColor}`} />
                              {account.type === 'broker' ? 'Broker' : 'Lender'}
                            </span>
                          </TableCell>
                          <TableCell className="text-right font-medium">
                            {getUserRole(account.id)}
                          </TableCell>
                        </TableRow>
                      )
                    })}
                  </TableBody>
                </Table>
              </div>
            </div>
          </div>
        </div>
      )
    }

    if (activeTab === "org") {
      return (
        <div className="max-w-2xl">
          <div className="mb-6 flex items-start justify-between">
            <div>
              <h2 className="text-xl font-semibold">Organization</h2>
              <p className="text-sm text-muted-foreground">Your organization is the single Organization or Company Name that oversees all users and teams.</p>
            </div>
            <span className="font-mono text-xs rounded-md border bg-muted px-2 py-1">
              Org {bweOrganization.orgId}
            </span>
          </div>

          <div className="space-y-6">
            {/* Organization Logo & Name */}
            <div className="flex items-center gap-4">
              <div className="h-16 w-16 shrink-0 flex items-center justify-center rounded-lg border bg-muted">
                <span className="text-2xl font-bold">{bweOrganization.logo}</span>
              </div>
              <div className="flex-1">
                <Label htmlFor="orgName" className="text-sm font-medium">Name *</Label>
                <Input id="orgName" value={bweOrganization.name} readOnly className="bg-muted mt-2" />
              </div>
            </div>

            <Separator />

            {/* Aliases */}
            <div>
              <Label htmlFor="aliases" className="text-sm font-medium">Aliases</Label>
              <Input 
                id="aliases" 
                value={bweOrganization.aliases} 
                readOnly 
                className="bg-muted" 
                placeholder="Organization aliases (optional)"
              />
            </div>

            {/* Website & Domains */}
            <div>
              <Label htmlFor="website" className="text-sm font-medium">Website</Label>
              <Input 
                id="website" 
                value={bweOrganization.website} 
                readOnly 
                className="bg-muted" 
              />
              <div className="flex flex-wrap gap-2 mt-2">
                {bweOrganization.domains.split(', ').map((domain, index) => (
                  <span 
                    key={index}
                    className="inline-flex items-center rounded-full border px-3 py-1 text-sm"
                  >
                    {domain}
                  </span>
                ))}
                <button 
                  className="inline-flex items-center rounded-full border border-dashed px-3 py-1 text-sm text-muted-foreground hover:bg-muted/50 transition-colors"
                  disabled
                >
                  + Add domain
                </button>
              </div>
            </div>

            <Separator />

            {/* Teams (Accounts) Section */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Teams (accounts)</h3>
              <p className="text-sm text-muted-foreground mb-4">Teams in this organization.</p>
              
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
                    {bweOrganization.accounts.map((account) => {
                      const AccountIcon = getAccountIcon(account.type)
                      const accountColor = getAccountColor(account.type)
                      const isMember = userAccounts.find(a => a.id === account.id)
                      
                      return (
                        <TableRow key={account.id}>
                          <TableCell>
                            <div className="flex items-center gap-3">
                              <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-md ${accountColor}/20`}>
                                <AccountIcon className={`h-4 w-4 ${accountColor.replace('bg-', 'text-')}`} />
                              </div>
                              <div>
                                <div className="font-medium">{account.name}</div>
                                {account.accountNumber && (
                                  <div className="text-xs text-muted-foreground">Account {account.accountNumber}</div>
                                )}
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <span className="inline-flex items-center gap-1.5 text-sm">
                              <span className={`h-1.5 w-1.5 rounded-full ${accountColor}`} />
                              {account.type === 'broker' ? 'Broker' : 'Lender'}
                            </span>
                          </TableCell>
                          <TableCell>{account.members}</TableCell>
                          <TableCell className="text-right font-medium">
                            {isMember ? getUserRole(account.id) : '—'}
                          </TableCell>
                        </TableRow>
                      )
                    })}
                  </TableBody>
                </Table>
              </div>
            </div>
          </div>
        </div>
      )
    }

    if (activeTab === "team") {
      return (
        <div className="max-w-4xl">
          <div className="mb-6">
            <h2 className="text-xl font-semibold">Team Members</h2>
            <p className="text-sm text-muted-foreground">Members of your organization and their account access.</p>
          </div>

          <div className="rounded-lg border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Contact Information</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Accounts</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {bweTeamMembers.map((member) => {
                  const memberAccounts = getAccountsByUser(member, bweOrganization)
                  
                  return (
                    <TableRow key={member.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 shrink-0 overflow-hidden rounded-full">
                            <Image 
                              src={member.avatar} 
                              alt={member.name} 
                              width={40} 
                              height={40} 
                              className="h-full w-full object-cover" 
                            />
                          </div>
                          <div className="font-medium">{member.name}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">
                          <div>{member.email}</div>
                          {member.phone && (
                            <div className="text-muted-foreground">M: {member.phone}</div>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold">
                          Admin
                        </span>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {memberAccounts.map((account) => {
                            const accountColor = getAccountColor(account.type)
                            return (
                              <span 
                                key={account.id}
                                className="inline-flex items-center gap-1.5 rounded-full border px-2 py-0.5 text-xs"
                              >
                                <span className={`h-1.5 w-1.5 rounded-full ${accountColor}`} />
                                {account.name}
                              </span>
                            )
                          })}
                        </div>
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </div>
        </div>
      )
    }

    // Account page
    const account = bweOrganization.accounts.find(a => a.id === activeTab)
    if (!account) return null

    const AccountIcon = getAccountIcon(account.type)
    const accountColor = getAccountColor(account.type)

    return (
      <div className="max-w-2xl">
        <div className="mb-6 flex items-start justify-between">
          <div>
            <h2 className="text-xl font-semibold">Account Details</h2>
            <p className="text-sm text-muted-foreground">Information about this account.</p>
          </div>
          {account.accountNumber && (
            <span className="font-mono text-xs rounded-md border bg-muted px-2 py-1">
              Account {account.accountNumber}
            </span>
          )}
        </div>

        <div className="space-y-6">
          {/* Account Logo & Name */}
          <div className="flex items-center gap-4">
            <div className={`h-16 w-16 shrink-0 flex items-center justify-center rounded-lg ${accountColor}/20`}>
              <AccountIcon className={`h-8 w-8 ${accountColor.replace('bg-', 'text-')}`} />
            </div>
            <div className="flex-1">
              <Label htmlFor="accountName" className="text-sm font-medium">Account Name *</Label>
              <Input id="accountName" value={account.name} readOnly className="bg-muted mt-2" />
            </div>
          </div>

          <Separator />

          {/* Account Type */}
          <div>
            <Label htmlFor="accountType" className="text-sm font-medium">Account Type</Label>
            <div className="mt-2 flex items-center gap-2">
              <span className="inline-flex h-6 items-center gap-1.5 rounded-full border px-3 text-xs font-medium">
                <span className={`h-1.5 w-1.5 rounded-full ${accountColor}`} />
                {account.type === 'broker' ? 'Broker' : 'Lender'}
              </span>
            </div>
          </div>

          <Separator />

          {/* Location */}
          <div>
            <Label htmlFor="location" className="text-sm font-medium">Location</Label>
            <Input 
              id="location" 
              value={account.location} 
              readOnly 
              className="bg-muted" 
            />
          </div>

          <Separator />

          {/* About */}
          <div>
            <Label htmlFor="about" className="text-sm font-medium">About this team</Label>
            <div className="rounded-md border bg-muted p-3 text-sm text-muted-foreground leading-relaxed whitespace-pre-line">
              {account.about}
            </div>
          </div>

          {/* Lending Details - Only for Lender accounts */}
          {account.type === 'lender' && (
            <>
              <Separator />
              
              <div>
                <h3 className="text-sm font-semibold mb-3">Lending Details</h3>
                
                <div className="rounded-lg border divide-y">
                  {/* Programs */}
                  <Dialog>
                    <DialogTrigger asChild>
                      <button className="flex items-center justify-between p-4 hover:bg-muted/50 transition-colors w-full">
                        <div className="flex-1 text-left">
                          <div className="font-medium text-sm mb-1">Programs</div>
                          <div className="text-sm text-muted-foreground">Loan programs and products offered</div>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-muted-foreground">3 programs</span>
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-muted-foreground">
                            <polyline points="9 18 15 12 9 6"></polyline>
                          </svg>
                        </div>
                      </button>
                    </DialogTrigger>
                    <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                      <DialogHeader>
                        <DialogTitle>Lending Programs</DialogTitle>
                        <DialogDescription>
                          Loan programs and products offered by {account.name}
                        </DialogDescription>
                      </DialogHeader>
                      
                      <div className="grid gap-4 md:grid-cols-2 mt-4">
                        {/* Program 1 */}
                        <div className="rounded-lg border bg-card p-4">
                          <div className="flex items-center gap-2 mb-3">
                            <h3 className="font-semibold text-sm">Permanent Financing</h3>
                            <span className="inline-flex items-center rounded-full bg-green-500/10 px-2 py-0.5 text-xs font-medium text-green-700">
                              Verified Program
                            </span>
                          </div>
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Loan Amount</span>
                              <span className="font-medium">$1M-20M</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Loan Type</span>
                              <span className="font-medium">Permanent</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Property Location</span>
                              <span className="font-medium">California, Illinois +4</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Asset Type</span>
                              <span className="font-medium">Multifamily, Office +3</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Capital Source</span>
                              <span className="font-medium">Balance Sheet</span>
                            </div>
                          </div>
                        </div>

                        {/* Program 2 */}
                        <div className="rounded-lg border bg-card p-4">
                          <div className="flex items-center gap-2 mb-3">
                            <h3 className="font-semibold text-sm">Bridge Financing</h3>
                            <span className="inline-flex items-center rounded-full bg-green-500/10 px-2 py-0.5 text-xs font-medium text-green-700">
                              Verified Program
                            </span>
                          </div>
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Loan Amount</span>
                              <span className="font-medium">$500K-10M</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Loan Type</span>
                              <span className="font-medium">Bridge</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Property Location</span>
                              <span className="font-medium">Nationwide</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Asset Type</span>
                              <span className="font-medium">Multifamily, Retail</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Capital Source</span>
                              <span className="font-medium">Credit Facility</span>
                            </div>
                          </div>
                        </div>

                        {/* Program 3 */}
                        <div className="rounded-lg border bg-card p-4">
                          <div className="flex items-center gap-2 mb-3">
                            <h3 className="font-semibold text-sm">Construction Loans</h3>
                            <span className="inline-flex items-center rounded-full bg-green-500/10 px-2 py-0.5 text-xs font-medium text-green-700">
                              Verified Program
                            </span>
                          </div>
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Loan Amount</span>
                              <span className="font-medium">$2M-50M</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Loan Type</span>
                              <span className="font-medium">Construction</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Property Location</span>
                              <span className="font-medium">Texas, Florida</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Asset Type</span>
                              <span className="font-medium">Multifamily</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Capital Source</span>
                              <span className="font-medium">Balance Sheet</span>
                            </div>
                          </div>
                        </div>

                        {/* Add New Program */}
                        <button className="rounded-lg border-2 border-dashed p-4 flex flex-col items-center justify-center gap-2 hover:bg-muted/50 transition-colors min-h-[200px]">
                          <Plus className="h-6 w-6 text-muted-foreground" />
                          <span className="text-sm font-medium text-muted-foreground">Add New Program</span>
                        </button>
                      </div>
                    </DialogContent>
                  </Dialog>

                  {/* Tear Sheets */}
                  <Dialog>
                    <DialogTrigger asChild>
                      <button className="flex items-center justify-between p-4 hover:bg-muted/50 transition-colors w-full">
                        <div className="flex-1 text-left">
                          <div className="font-medium text-sm mb-1">Tear Sheets</div>
                          <div className="text-sm text-muted-foreground">Marketing materials and product sheets</div>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-muted-foreground">5 sheets</span>
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-muted-foreground">
                            <polyline points="9 18 15 12 9 6"></polyline>
                          </svg>
                        </div>
                      </button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                      <DialogHeader>
                        <DialogTitle>Tear Sheets</DialogTitle>
                        <DialogDescription>
                          Marketing materials and product sheets for {account.name}
                        </DialogDescription>
                      </DialogHeader>
                      
                      <div className="mt-4">
                        <div className="flex items-center justify-between mb-4">
                          <p className="text-sm text-muted-foreground">5 files uploaded</p>
                          <Button variant="outline" size="sm" disabled>
                            <Upload className="h-4 w-4 mr-2" />
                            Upload New
                          </Button>
                        </div>

                        <div className="space-y-2">
                          {[
                            { name: 'BWE Lending Overview 2026.pdf', size: '2.4 MB', date: 'Feb 15, 2026' },
                            { name: 'Permanent Loan Program.pdf', size: '1.8 MB', date: 'Feb 10, 2026' },
                            { name: 'Bridge Financing Terms.pdf', size: '1.2 MB', date: 'Feb 5, 2026' },
                            { name: 'Construction Loan Details.pdf', size: '3.1 MB', date: 'Jan 28, 2026' },
                            { name: 'Rate Sheet Q1 2026.pdf', size: '856 KB', date: 'Jan 15, 2026' },
                          ].map((file, index) => (
                            <div key={index} className="flex items-center gap-3 p-3 rounded-lg border bg-card hover:bg-muted/50 transition-colors">
                              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-muted">
                                <FileText className="h-5 w-5 text-muted-foreground" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="font-medium text-sm truncate">{file.name}</div>
                                <div className="text-xs text-muted-foreground">{file.size} • {file.date}</div>
                              </div>
                              <Button variant="ghost" size="sm" disabled>
                                View
                              </Button>
                            </div>
                          ))}
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    )
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
              Organization
            </button>
            <button
              onClick={() => setActiveTab("team")}
              className={`flex items-center gap-3 rounded-md px-3 py-2 text-left text-sm transition-colors ${
                activeTab === "team" ? "bg-muted font-medium" : "hover:bg-muted/50"
              }`}
            >
              <Users className="h-4 w-4" />
              Members
            </button>
            
            {/* Account Links */}
            {userAccounts.length > 0 && (
              <div className="mt-4">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="px-2 text-xs font-medium text-sidebar-foreground/70 flex items-center gap-1 cursor-help">
                      Teams (accounts)
                      <Info className="h-3 w-3" />
                    </div>
                  </TooltipTrigger>
                  <TooltipContent side="right" className="max-w-xs">
                    Teams are groups, departments, or offices within your organization with specific members and focuses
                  </TooltipContent>
                </Tooltip>
                <div className="mt-1 flex flex-col gap-0.5">
                  {userAccounts.map((account) => (
                    <button
                      key={account.id}
                      onClick={() => setActiveTab(account.id)}
                      className={`flex items-center gap-2 rounded-md px-3 py-1.5 text-left text-sm transition-colors ${
                        activeTab === account.id ? 'bg-muted font-medium' : 'hover:bg-muted/50'
                      }`}
                    >
                      {account.name}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-y-auto p-8">
          {renderContent()}
        </div>
      </div>
    </div>
  )
}
