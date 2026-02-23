import { Landmark, Building2, Briefcase } from "lucide-react"
import avatar4 from "@/components/avatars/avatar_4.png"

// Core data types
export type AccountType = 'broker' | 'lender'

export interface Account {
  id: string
  name: string
  type: AccountType
  accountNumber?: string
  members: number
  description: string
}

export interface Organization {
  id: string
  name: string
  logo: string
  aliases: string
  domains: string
  website: string
  location: string
  about: string
  accounts: Account[]
}

export interface User {
  id: string
  name: string
  email: string
  avatar: any
  accountMemberships: string[] // array of account IDs
  phone: string
  linkedin: string
}

// BWE Organization data
export const bweOrganization: Organization = {
  id: 'bwe',
  name: 'BWE',
  logo: 'B',
  aliases: 'Bellwether Enterprise, BELLWETHER ENT MTG INVS LLC',
  domains: 'bwecap.com, bwe.com',
  website: 'https://bwe.com',
  location: '1375 E. 9th Street Suite 2400, Cleveland, OH 44114',
  about: 'BWE (Bellwether Enterprise) is a middle-market debt fund based in Cleveland, OH. Originally categorized as "not actively lending," BWE has evolved to operate as both a lender and a broker.\n\nWhen deals don\'t fit their direct lending bucket, they broker them out to external lenders. The organization is deeply embedded in the market with 43 different accounts having BWE as a lender in their CRM.',
  accounts: [
    {
      id: 'bwe-brokerage',
      name: 'BWE Brokerage',
      type: 'broker',
      accountNumber: '10547',
      members: 4,
      description: 'Primary brokerage account for running outreach campaigns and managing placements to external lenders.',
    },
    {
      id: 'bwe-lending',
      name: 'BWE Lending',
      type: 'lender',
      accountNumber: '4381',
      members: 58,
      description: 'Receives inbound placements from other brokers when BWE provides direct financing for deals.',
    },
  ],
}

// Graham Gilreath user data
export const grahamGilreath: User = {
  id: 'graham-gilreath',
  name: 'Graham Gilreath',
  email: 'graham.gilreath@bwe.com',
  avatar: avatar4,
  accountMemberships: ['bwe-brokerage', 'bwe-lending'], // member of both accounts
  phone: '(917) 216-5517',
  linkedin: 'https://linkedin.com',
}

// All team members (for Team tab)
export const bweTeamMembers: User[] = [
  grahamGilreath,
  {
    id: 'thomas-smith',
    name: 'Thomas Smith',
    email: 'thomas.smith@bwe.com',
    avatar: avatar4, // reusing for now
    accountMemberships: ['bwe-brokerage', 'bwe-lending'],
    phone: '(615) 881-3415',
    linkedin: 'https://linkedin.com',
  },
  {
    id: 'daniel-patton',
    name: 'Daniel Patton',
    email: 'daniel.patton@bwe.com',
    avatar: avatar4, // reusing for now
    accountMemberships: ['bwe-brokerage'],
    phone: '(205) 745-1926',
    linkedin: 'https://linkedin.com',
  },
  {
    id: 'henry-high',
    name: 'Henry High',
    email: 'henry.high@bwe.com',
    avatar: avatar4, // reusing for now
    accountMemberships: ['bwe-lending'],
    phone: '(615) 208-3266',
    linkedin: 'https://linkedin.com',
  },
]

// Helper functions
export function getAccountIcon(type: AccountType) {
  return type === 'broker' ? Briefcase : Landmark
}

export function getAccountColor(type: AccountType) {
  return type === 'broker' ? 'bg-[#3E9B70]' : 'bg-[#3880E8]'
}

export function getAccountsByUser(user: User, org: Organization): Account[] {
  return org.accounts.filter(account => user.accountMemberships.includes(account.id))
}

export function getUserRole(accountId: string): string {
  const account = bweOrganization.accounts.find(a => a.id === accountId)
  if (!account) return 'Member'
  return account.type === 'broker' ? 'Admin' : 'Lender Contact'
}
