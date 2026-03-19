import { Landmark, Building2, Briefcase, Warehouse, Globe, type LucideIcon } from "lucide-react"
import avatar1 from "@/components/avatars/avatar_1.png"
import avatar2 from "@/components/avatars/avatar_2.png"
import avatar3 from "@/components/avatars/avatar_3.png"
import avatar4 from "@/components/avatars/avatar_4.png"

// Core data types

export interface Account {
  id: string
  name: string
  accountNumber?: string
  members: number
  description: string
  location: string
  about: string
  subscription: boolean
}

export interface Organization {
  id: string
  orgId: string
  name: string
  logo: string
  hasLenderPrograms: boolean
  accounts: Account[]
  aliases?: string
  domains?: string
  website?: string
  location?: string
  about?: string
}

export interface User {
  id: string
  userId: string
  name: string
  email: string
  avatar: any
  accountMemberships: string[]
  phone: string
  linkedin: string
}

export interface DemoScenario {
  organization: Organization
  user: User
  teamMembers: User[]
}

// Palette: deterministic per-account color + icon
export type AccountPalette = {
  bg: string
  text: string
  solid: string
  icon: LucideIcon
}

const ACCOUNT_PALETTES: AccountPalette[] = [
  { bg: 'bg-[#3E9B70]/20', text: 'text-[#3E9B70]', solid: 'bg-[#3E9B70]', icon: Briefcase },
  { bg: 'bg-[#3880E8]/20', text: 'text-[#3880E8]', solid: 'bg-[#3880E8]', icon: Landmark },
  { bg: 'bg-[#E87438]/20', text: 'text-[#E87438]', solid: 'bg-[#E87438]', icon: Building2 },
  { bg: 'bg-[#9B3E9B]/20', text: 'text-[#9B3E9B]', solid: 'bg-[#9B3E9B]', icon: Warehouse },
  { bg: 'bg-[#9B7A3E]/20', text: 'text-[#9B7A3E]', solid: 'bg-[#9B7A3E]', icon: Globe },
]

function hashString(str: string): number {
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    hash = (hash * 31 + str.charCodeAt(i)) >>> 0
  }
  return hash
}

export function getAccountPalette(accountId: string): AccountPalette {
  const index = hashString(accountId) % ACCOUNT_PALETTES.length
  return ACCOUNT_PALETTES[index]
}

// ─── Convoy Capital ───────────────────────────────────────────────────────────
// Org: has lender programs, 2 accounts (both subscribed), 1 user in both

const convoyOrg: Organization = {
  id: 'convoy',
  orgId: '9960',
  name: 'Convoy Capital',
  logo: 'C',
  hasLenderPrograms: true,
  accounts: [
    {
      id: 'convoy-boston',
      name: 'Convoy Boston',
      accountNumber: '9960',
      members: 4,
      description: 'Primary brokerage account running outreach campaigns and managing deal placements.',
      location: '3344 Peachtree Road NE, Atlanta, GA 30326',
      about: 'Convoy Capital Brokerage handles commercial real estate debt placement across the Southeast.',
      subscription: true,
    },
    {
      id: 'convoy-nyc',
      name: 'Convoy New York',
      accountNumber: '9975',
      members: 3,
      description: 'Direct lending arm providing financing for deals that fit internal credit criteria.',
      location: '3344 Peachtree Road NE, Atlanta, GA 30326',
      about: 'Convoy Capital Lending evaluates and directly underwrites commercial real estate transactions.',
      subscription: true,
    },
  ],
}

const frankiePaparella: User = {
  id: 'frankie-paparella',
  userId: '61844',
  name: 'Frankie Paparella',
  email: 'frankie@convoy-cap.com',
  avatar: avatar1,
  accountMemberships: ['convoy-boston', 'convoy-nyc'],
  phone: '(404) 555-0123',
  linkedin: 'https://linkedin.com',
}

export const convoyScenario: DemoScenario = {
  organization: convoyOrg,
  user: frankiePaparella,
  teamMembers: [frankiePaparella],
}

// ─── Custom Capital ───────────────────────────────────────────────────────────
// Org: no lender programs, 1 account (subscribed), 1 user

const customOrg: Organization = {
  id: 'custom',
  orgId: '7741',
  name: 'Custom Capital',
  logo: 'CC',
  hasLenderPrograms: false,
  accounts: [
    {
      id: 'custom-main',
      name: 'Custom Capital',
      accountNumber: '7741',
      members: 2,
      description: 'Single-account brokerage focused on mid-market commercial real estate transactions.',
      location: '200 Park Avenue, New York, NY 10166',
      about: 'Custom Capital is a boutique commercial real estate brokerage operating in the Northeast.',
      subscription: true,
    },
  ],
}

const alexMorgan: User = {
  id: 'alex-morgan',
  userId: '72301',
  name: 'Alex Morgan',
  email: 'alex@customcapital.com',
  avatar: avatar2,
  accountMemberships: ['custom-main'],
  phone: '(212) 555-0199',
  linkedin: 'https://linkedin.com',
}

export const customScenario: DemoScenario = {
  organization: customOrg,
  user: alexMorgan,
  teamMembers: [alexMorgan],
}

// ─── Scenario registry ────────────────────────────────────────────────────────

// ─── steve12@gmail.com ────────────────────────────────────────────────────────
// No org, no account — all platform features disabled, no lending section

const noOrg: Organization = {
  id: 'no-org',
  orgId: '—',
  name: '—',
  logo: '?',
  hasLenderPrograms: false,
  accounts: [],
}

const steveUser: User = {
  id: 'steve',
  userId: '00001',
  name: 'steve12@gmail.com',
  email: 'steve12@gmail.com',
  avatar: avatar3,
  accountMemberships: [],
  phone: '',
  linkedin: '',
}

export const steveScenario: DemoScenario = {
  organization: noOrg,
  user: steveUser,
  teamMembers: [steveUser],
}

// ─── Pathfinder Bank ──────────────────────────────────────────────────────────
// Has lender programs, 1 account with subscription: false

const pathfinderOrg: Organization = {
  id: 'pathfinder',
  orgId: '5521',
  name: 'Pathfinder Bank',
  logo: 'P',
  hasLenderPrograms: true,
  accounts: [
    {
      id: 'pathfinder-main',
      name: 'Pathfinder Bank',
      accountNumber: '5521',
      members: 1,
      description: 'Commercial lending division managing inbound deal flow from brokers.',
      location: '100 Federal Street, Boston, MA 02110',
      about: 'Pathfinder Bank is a regional commercial real estate lender focused on the Northeast market.',
      subscription: false,
    },
  ],
}

const alisonHa: User = {
  id: 'alison-ha',
  userId: '83712',
  name: 'Alison Xuan Ha',
  email: 'alison.ha@pathfinderbank.com',
  avatar: avatar4,
  accountMemberships: ['pathfinder-main'],
  phone: '(617) 555-0144',
  linkedin: 'https://linkedin.com',
}

export const pathfinderScenario: DemoScenario = {
  organization: pathfinderOrg,
  user: alisonHa,
  teamMembers: [alisonHa],
}

export const SCENARIOS: Record<string, DemoScenario> = {
  'Convoy Capital': convoyScenario,
  'Custom Capital': customScenario,
  'steve12@gmail.com': steveScenario,
  'Pathfinder Bank': pathfinderScenario,
}

// Helper functions
export function getAccountsByUser(user: User, org: Organization): Account[] {
  return org.accounts.filter(account => user.accountMemberships.includes(account.id))
}
