"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { useHeader } from "@/contexts/header-context"
import { useActiveUser } from "@/contexts/active-user-context"
import { useActiveRole } from "@/contexts/mode-context"
import { bweOrganization, getAccountsByUser, getUserRole, getAccountIcon, getAccountColor, bweTeamMembers } from "@/lib/demo-data"
import Image from "next/image"
import { Building2, User, Briefcase, Users } from "lucide-react"
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
          <div className="mb-6">
            <h2 className="text-xl font-semibold">Personal Information</h2>
            <p className="text-sm text-muted-foreground">Update your photo & details.</p>
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
              <div className="space-y-3">
                {userAccounts.map((account) => {
                  const accountColor = getAccountColor(account.type)
                  return (
                    <div key={account.id} className="rounded-lg border bg-card p-3">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-sm">{account.name}</span>
                          <span className="inline-flex h-5 items-center gap-1.5 rounded-full border px-2 text-xs font-medium">
                            <span className={`h-1.5 w-1.5 rounded-full ${accountColor}`} />
                            {account.type === 'broker' ? 'Broker' : 'Lender'}
                          </span>
                        </div>
                        {account.accountNumber && (
                          <span className="text-xs text-muted-foreground">Account {account.accountNumber}</span>
                        )}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Role: <span className="font-medium">{getUserRole(account.id)}</span>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      )
    }

    if (activeTab === "org") {
      return (
        <div className="max-w-2xl">
          <div className="mb-6">
            <h2 className="text-xl font-semibold">Organization</h2>
            <p className="text-sm text-muted-foreground">Organization-level details and settings.</p>
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

            {/* Domains */}
            <div>
              <Label htmlFor="domains" className="text-sm font-medium">Domains</Label>
              <Input 
                id="domains" 
                value={bweOrganization.domains} 
                readOnly 
                className="bg-muted" 
              />
            </div>

            {/* Website */}
            <div>
              <Label htmlFor="website" className="text-sm font-medium">Website</Label>
              <Input 
                id="website" 
                value={bweOrganization.website} 
                readOnly 
                className="bg-muted" 
              />
            </div>

            {/* Location */}
            <div>
              <Label htmlFor="location" className="text-sm font-medium">Location</Label>
              <Input 
                id="location" 
                value={bweOrganization.location} 
                readOnly 
                className="bg-muted" 
              />
            </div>

            <Separator />

            {/* About */}
            <div>
              <Label htmlFor="about" className="text-sm font-medium">About the company</Label>
              <div className="rounded-md border bg-muted p-3 text-sm text-muted-foreground leading-relaxed whitespace-pre-line">
                {bweOrganization.about}
              </div>
            </div>

            <Separator />

            {/* Accounts Section */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Accounts</h3>
              <p className="text-sm text-muted-foreground mb-4">Accounts in this organization.</p>
              
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
        <div className="mb-6">
          <h2 className="text-xl font-semibold">Account Details</h2>
          <p className="text-sm text-muted-foreground">Information about this account.</p>
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

          {/* Account Number */}
          {account.accountNumber && (
            <div>
              <Label htmlFor="accountNumber" className="text-sm font-medium">Account Number</Label>
              <Input 
                id="accountNumber" 
                value={account.accountNumber} 
                readOnly 
                className="bg-muted" 
              />
            </div>
          )}

          {/* Members */}
          <div>
            <Label htmlFor="members" className="text-sm font-medium">Members</Label>
            <Input 
              id="members" 
              value={account.members.toString()} 
              readOnly 
              className="bg-muted" 
            />
          </div>

          <Separator />

          {/* Description */}
          <div>
            <Label htmlFor="description" className="text-sm font-medium">About this account</Label>
            <div className="rounded-md border bg-muted p-3 text-sm text-muted-foreground leading-relaxed">
              {account.description}
            </div>
          </div>

          <Separator />

          {/* Organization Info */}
          <div>
            <h3 className="text-sm font-semibold mb-3">Organization</h3>
            <div>
              <Label htmlFor="orgName" className="text-sm font-medium">Organization Name</Label>
              <Input 
                id="orgName" 
                value={bweOrganization.name} 
                readOnly 
                className="bg-muted" 
              />
            </div>
          </div>
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
              Org
            </button>
            <button
              onClick={() => setActiveTab("team")}
              className={`flex items-center gap-3 rounded-md px-3 py-2 text-left text-sm transition-colors ${
                activeTab === "team" ? "bg-muted font-medium" : "hover:bg-muted/50"
              }`}
            >
              <Users className="h-4 w-4" />
              Team
            </button>
            
            {/* Account Links */}
            {userAccounts.length > 0 && (
              <div className="mt-4">
                <div className="px-2 text-xs font-medium text-sidebar-foreground/70">
                  Your Accounts
                </div>
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
