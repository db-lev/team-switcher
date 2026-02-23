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
  location: string
  about: string
}

export interface Organization {
  id: string
  orgId: string // Display ID like "4381"
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
  userId: string // Display ID like "54642"
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
  orgId: '4381',
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
      location: '1375 E. 9th Street Suite 2400, Cleveland, OH 44114',
      about: 'BWE Brokerage specializes in commercial real estate debt placement services. Our team works with borrowers to find optimal financing solutions across a wide network of lenders.\n\nWhen deals don\'t fit our direct lending criteria through BWE Lending, our brokerage team brokers them out to external lenders, ensuring clients receive the best possible financing terms.',
    },
    {
      id: 'bwe-lending',
      name: 'BWE Lending',
      type: 'lender',
      accountNumber: '4381',
      members: 58,
      description: 'Receives inbound placements from other brokers when BWE provides direct financing for deals.',
      location: '1375 E. 9th Street Suite 2400, Cleveland, OH 44114',
      about: 'BWE Lending is a middle-market debt fund providing direct financing for commercial real estate transactions. We focus on deals that align with our lending criteria and portfolio strategy.\n\nOur lending team evaluates incoming loan requests and directly underwrites deals, while maintaining strong relationships with brokers across the market. We are deeply embedded in the CRE lending ecosystem with 43 different accounts having BWE as a lender in their CRM.',
    },
  ],
}

// Graham Gilreath user data
export const grahamGilreath: User = {
  id: 'graham-gilreath',
  userId: '54642',
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
    userId: '54643',
    name: 'Thomas Smith',
    email: 'thomas.smith@bwe.com',
    avatar: avatar4, // reusing for now
    accountMemberships: ['bwe-brokerage', 'bwe-lending'],
    phone: '(615) 881-3415',
    linkedin: 'https://linkedin.com',
  },
  {
    id: 'daniel-patton',
    userId: '54644',
    name: 'Daniel Patton',
    email: 'daniel.patton@bwe.com',
    avatar: avatar4, // reusing for now
    accountMemberships: ['bwe-brokerage'],
    phone: '(205) 745-1926',
    linkedin: 'https://linkedin.com',
  },
  {
    id: 'henry-high',
    userId: '54645',
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
