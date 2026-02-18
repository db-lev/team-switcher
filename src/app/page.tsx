"use client"

import { useTeam } from "@/contexts/team-context"
import Image from "next/image"
import { Building2, Landmark, GalleryVerticalEnd, AudioWaveform, Command } from "lucide-react"
import avatar1 from "@/components/avatars/avatar_1.png"
import avatar2 from "@/components/avatars/avatar_2.png"
import avatar3 from "@/components/avatars/avatar_3.png"
import avatar4 from "@/components/avatars/avatar_4.png"
import avatar5 from "@/components/avatars/avatar_5.png"

export default function DashboardPage() {
  const { activeTeam } = useTeam()

  // Default to Myers Capital if no activeTeam
  const teamName = activeTeam?.name || "Myers Capital"

  return (
    <div className="flex flex-1 flex-col gap-6 p-6">
      {teamName === "Myers Capital" && <MyersCapitalUseCase />}
      {teamName === "Heritage Bank NA" && <HeritageBankUseCase />}
      {teamName === "Leverage Companies" && <LeverageCompaniesUseCase />}
      {teamName === "Northmarq" && <NorthmarqUseCase />}
      {teamName === "BWE" && <BWEUseCase />}
    </div>
  )
}

// Myers Capital Use Case - Scenario 1: Hybrid Lending Model
function MyersCapitalUseCase() {
  return (
    <>
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex flex-col gap-2">
          <span className="font-mono text-xs font-semibold uppercase tracking-wider text-muted-foreground">Organization</span>
          <h1 className="text-2xl font-semibold">Myers Capital</h1>
          <p className="text-muted-foreground">
            Direct lender that also brokers deals outside their lending criteria
          </p>
        </div>
        <div className="flex gap-2">
          <span className="inline-flex h-6 items-center gap-1.5 rounded-full border px-3 text-xs font-medium">
            <span className="h-1.5 w-1.5 rounded-full bg-blue-600" />
            Lender
          </span>
          <span className="inline-flex h-6 items-center gap-1.5 rounded-full border px-3 text-xs font-medium">
            <span className="h-1.5 w-1.5 rounded-full bg-purple-600" />
            Broker
          </span>
        </div>
      </div>

      {/* Accounts */}
      <div>
        <span className="mb-4 block font-mono text-xs font-semibold uppercase tracking-wider text-muted-foreground">Accounts</span>
        <div className="grid gap-4 md:grid-cols-2">
          {/* Myers Capital Lending Account */}
          <div className="rounded-lg border bg-card">
            <div className="flex items-center gap-4 p-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg border bg-muted">
                <GalleryVerticalEnd className="h-5 w-5" />
              </div>
              <div className="flex flex-1 flex-col gap-1">
                <div className="flex items-center gap-2">
                  <span className="font-medium">Myers Capital Lending</span>
                  <span className="inline-flex h-5 items-center gap-1.5 rounded-full border px-2 text-xs font-medium">
                    <span className="h-1.5 w-1.5 rounded-full bg-blue-600" />
                    Lender
                  </span>
                </div>
                <span className="text-sm text-muted-foreground">
                  Direct lending operations for deals within Myers Capital's lending criteria.
                </span>
              </div>
            </div>
          </div>

          {/* Myers Capital Brokerage Account */}
          <div className="rounded-lg border bg-card">
            <div className="flex items-center gap-4 p-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg border bg-muted">
                <GalleryVerticalEnd className="h-5 w-5" />
              </div>
              <div className="flex flex-1 flex-col gap-1">
                <div className="flex items-center gap-2">
                  <span className="font-medium">Myers Capital Brokerage</span>
                  <span className="inline-flex h-5 items-center gap-1.5 rounded-full border px-2 text-xs font-medium">
                    <span className="h-1.5 w-1.5 rounded-full bg-purple-600" />
                    Broker
                  </span>
                </div>
                <span className="text-sm text-muted-foreground">
                  Brokerage operations for deals outside direct lending parameters, placed with external partners.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Users */}
      <div>
        <span className="mb-4 block font-mono text-xs font-semibold uppercase tracking-wider text-muted-foreground">Users</span>
        <div className="grid gap-4 md:grid-cols-2">
          {/* Reed Myers */}
          <div className="rounded-lg border bg-card">
            <div className="flex items-center gap-4 p-4">
              <div className="h-12 w-12 shrink-0 overflow-hidden rounded-full">
                <Image src={avatar2} alt="Reed Myers" width={48} height={48} className="h-full w-full object-cover" />
              </div>
              <div className="flex flex-1 flex-col gap-1">
                <span className="font-medium">Reed Myers</span>
                <span className="text-sm text-muted-foreground">reed@myerscapital.com</span>
              </div>
            </div>
            <div className="border-t" />
            <div className="bg-background p-4">
              <p className="text-sm leading-relaxed text-muted-foreground">
                Evaluates incoming loan requests and directly underwrites deals that align with Myers Capital's lending criteria and portfolio strategy.
              </p>
            </div>
            <div className="border-t" />
            <div className="flex items-center justify-between bg-muted/50 px-4 py-3">
              <div className="flex items-center gap-2">
                <span className="text-xs font-medium text-muted-foreground">User Profile</span>
                <span className="inline-flex h-5 items-center gap-1.5 rounded-full border px-2 text-xs font-medium">
                  <span className="h-1.5 w-1.5 rounded-full bg-blue-600" />
                  Lender
                </span>
              </div>
              <span className="text-xs text-muted-foreground">Myers Capital Lending</span>
            </div>
          </div>

          {/* Maryann Salt */}
          <div className="rounded-lg border bg-card">
            <div className="flex items-center gap-4 p-4">
              <div className="h-12 w-12 shrink-0 overflow-hidden rounded-full">
                <Image src={avatar1} alt="Maryann Salt" width={48} height={48} className="h-full w-full object-cover" />
              </div>
              <div className="flex flex-1 flex-col gap-1">
                <span className="font-medium">Maryann Salt</span>
                <span className="text-sm text-muted-foreground">msalt@myerscapital.com</span>
              </div>
            </div>
            <div className="border-t" />
            <div className="bg-background p-4">
              <p className="text-sm leading-relaxed text-muted-foreground">
                Takes deals that Reed cannot lend on and brokers them to external lending partners, ensuring clients still receive financing solutions.
              </p>
            </div>
            <div className="border-t" />
            <div className="flex items-center justify-between bg-muted/50 px-4 py-3">
              <div className="flex items-center gap-2">
                <span className="text-xs font-medium text-muted-foreground">User Profile</span>
                <span className="inline-flex h-5 items-center gap-1.5 rounded-full border px-2 text-xs font-medium">
                  <span className="h-1.5 w-1.5 rounded-full bg-purple-600" />
                  Broker
                </span>
              </div>
              <span className="text-xs text-muted-foreground">Myers Capital Brokerage</span>
            </div>
          </div>
        </div>
      </div>

      {/* The Workflow */}
      <div>
        <h2 className="mb-3 text-lg font-semibold">The Workflow</h2>
        <div className="space-y-3 text-sm leading-relaxed">
          <p>
            Myers Capital operates as a direct lender specializing in Hawaii real estate financing. Reed evaluates incoming loan requests and directly underwrites deals that align with the company's lending criteria and portfolio strategy.
          </p>
          <p>
            When Reed identifies opportunities that fall outside Myers Capital's direct lending parameters—whether due to loan size, property type, or risk profile—these deals are seamlessly transitioned to Maryann Salt, the firm's senior broker.
          </p>
          <p>
            Maryann leverages the platform to broker these referral deals to external lending partners, ensuring clients receive financing solutions even when Myers Capital cannot directly service the loan.
          </p>
        </div>
      </div>

      {/* Why This Matters */}
      <div>
        <h2 className="mb-3 text-lg font-semibold">Why This Matters</h2>
        <div className="space-y-3 text-sm leading-relaxed">
          <p>
            This dual-capability model maximizes deal flow conversion while maintaining Myers Capital's underwriting standards. Both Reed and Maryann operate under a single Myers Capital organization account, but each needs access to different features based on their role.
          </p>
          <p>
            Reed needs deal pipeline management and underwriting tools, while Maryann requires outreach campaign features and placement tracking. The platform must support both workflows within the same organization without requiring separate accounts or complex role switching.
          </p>
        </div>
      </div>
    </>
  )
}

// Heritage Bank Use Case
function HeritageBankUseCase() {
  return (
    <>
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex flex-col gap-2">
          <span className="font-mono text-xs font-semibold uppercase tracking-wider text-muted-foreground">Organization</span>
          <h1 className="text-2xl font-semibold">Heritage Bank NA</h1>
          <p className="text-muted-foreground">
            Bank that both lends and brokers - user only acts as broker
          </p>
        </div>
        <div className="flex gap-2">
          <span className="inline-flex h-6 items-center gap-1.5 rounded-full border px-3 text-xs font-medium">
            <span className="h-1.5 w-1.5 rounded-full bg-blue-600" />
            Lender
          </span>
          <span className="inline-flex h-6 items-center gap-1.5 rounded-full border px-3 text-xs font-medium">
            <span className="h-1.5 w-1.5 rounded-full bg-purple-600" />
            Broker
          </span>
        </div>
      </div>

      {/* Users */}
      <div>
        <span className="mb-4 block font-mono text-xs font-semibold uppercase tracking-wider text-muted-foreground">Users</span>
        <div className="grid gap-4 md:grid-cols-2">
          {/* Paul Konsor */}
          <div className="rounded-lg border bg-card">
            <div className="flex items-center gap-4 p-4">
              <div className="h-12 w-12 shrink-0 overflow-hidden rounded-full">
                <Image src={avatar3} alt="Paul Konsor" width={48} height={48} className="h-full w-full object-cover" />
              </div>
              <div className="flex flex-1 flex-col gap-1">
                <span className="font-medium">Paul Konsor</span>
                <span className="text-sm text-muted-foreground">pkonsor@heritagebankna.com</span>
              </div>
            </div>
            <div className="border-t" />
            <div className="bg-background p-4">
              <p className="text-sm leading-relaxed text-muted-foreground">
                Hired by Heritage Bank to broker commercial real estate deals for clients who bank with them, generating revenue from deals the bank cannot directly service.
              </p>
            </div>
            <div className="border-t" />
            <div className="flex items-center justify-between bg-muted/50 px-4 py-3">
              <div className="flex items-center gap-2">
                <span className="text-xs font-medium text-muted-foreground">User Profile</span>
                <span className="inline-flex h-5 items-center gap-1.5 rounded-full border px-2 text-xs font-medium">
                  <span className="h-1.5 w-1.5 rounded-full bg-purple-600" />
                  Broker
                </span>
              </div>
              <span className="text-xs text-muted-foreground">Heritage Bank Brokerage</span>
            </div>
          </div>
        </div>
      </div>

      {/* The Workflow */}
      <div>
        <h2 className="mb-3 text-lg font-semibold">The Workflow</h2>
        <div className="space-y-3 text-sm leading-relaxed">
          <p>
            Heritage Bank NA operates as a traditional bank that originates loans directly. However, they recognized an opportunity to generate additional revenue from commercial real estate clients who need financing the bank cannot provide.
          </p>
          <p>
            Paul Konsor was hired specifically to act as a broker for these deals. When Heritage Bank clients need CRE financing that falls outside the bank's lending parameters, Paul steps in to broker those deals to external lenders using the platform.
          </p>
          <p>
            While Heritage Bank as an organization has both lending and brokerage capabilities, Paul's role is exclusively focused on the brokerage side. He only needs access to broker-specific features like outreach campaigns and placement tracking.
          </p>
        </div>
      </div>

      {/* Why This Matters */}
      <div>
        <h2 className="mb-3 text-lg font-semibold">Why This Matters</h2>
        <div className="space-y-3 text-sm leading-relaxed">
          <p>
            This scenario demonstrates a company that operates in both capacities (lender and broker), but individual users may only need access to one side of the platform. Paul doesn't need to see incoming placements or lending pipeline features—he only needs the broker toolkit.
          </p>
          <p>
            However, Heritage Bank theoretically has other users who might need visibility into both sides. The platform must support flexible role assignments where some users access only broker features, some only lender features, and potentially some users access both, all within the same organization.
          </p>
        </div>
      </div>
    </>
  )
}

// Leverage Companies Use Case
function LeverageCompaniesUseCase() {
  return (
    <>
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex flex-col gap-2">
          <span className="font-mono text-xs font-semibold uppercase tracking-wider text-muted-foreground">Organization</span>
          <h1 className="text-2xl font-semibold">Leverage Companies / Brick City Capital</h1>
          <p className="text-muted-foreground">
            Two companies, same ownership and team - residential DSCR lenders
          </p>
        </div>
        <div className="flex gap-2">
          <span className="inline-flex h-6 items-center gap-1.5 rounded-full border px-3 text-xs font-medium">
            <span className="h-1.5 w-1.5 rounded-full bg-blue-600" />
            Lender
          </span>
        </div>
      </div>

      {/* Users */}
      <div>
        <span className="mb-4 block font-mono text-xs font-semibold uppercase tracking-wider text-muted-foreground">Users</span>
        <div className="grid gap-4 md:grid-cols-2">
          {/* JP Helan */}
          <div className="rounded-lg border bg-card">
            <div className="flex items-center gap-4 p-4">
              <div className="h-12 w-12 shrink-0 overflow-hidden rounded-full">
                <Image src={avatar4} alt="JP Helan" width={48} height={48} className="h-full w-full object-cover" />
              </div>
              <div className="flex flex-1 flex-col gap-1">
                <span className="font-medium">JP Helan</span>
                <span className="text-sm text-muted-foreground">jphelan@brkcty.com</span>
              </div>
            </div>
            <div className="border-t" />
            <div className="bg-background p-4">
              <p className="text-sm leading-relaxed text-muted-foreground">
                Lender at Brick City Capital specializing in residential DSCR loans. Part of the shared team across both companies.
              </p>
            </div>
            <div className="border-t" />
            <div className="flex items-center justify-between bg-muted/50 px-4 py-3">
              <div className="flex items-center gap-2">
                <span className="text-xs font-medium text-muted-foreground">User Profile</span>
                <span className="inline-flex h-5 items-center gap-1.5 rounded-full border px-2 text-xs font-medium">
                  <span className="h-1.5 w-1.5 rounded-full bg-blue-600" />
                  Lender
                </span>
              </div>
              <span className="text-xs text-muted-foreground">Brick City Capital</span>
            </div>
          </div>

          {/* Ian */}
          <div className="rounded-lg border bg-card">
            <div className="flex items-center gap-4 p-4">
              <div className="h-12 w-12 shrink-0 overflow-hidden rounded-full">
                <Image src={avatar5} alt="Ian Rodriguez" width={48} height={48} className="h-full w-full object-cover" />
              </div>
              <div className="flex flex-1 flex-col gap-1">
                <span className="font-medium">Ian Rodriguez</span>
                <span className="text-sm text-muted-foreground">ian@leveragecompanies.com</span>
              </div>
            </div>
            <div className="border-t" />
            <div className="bg-background p-4">
              <p className="text-sm leading-relaxed text-muted-foreground">
                Lender at Leverage Companies specializing in residential DSCR loans. Part of the shared team across both companies.
              </p>
            </div>
            <div className="border-t" />
            <div className="flex items-center justify-between bg-muted/50 px-4 py-3">
              <div className="flex items-center gap-2">
                <span className="text-xs font-medium text-muted-foreground">User Profile</span>
                <span className="inline-flex h-5 items-center gap-1.5 rounded-full border px-2 text-xs font-medium">
                  <span className="h-1.5 w-1.5 rounded-full bg-blue-600" />
                  Lender
                </span>
              </div>
              <span className="text-xs text-muted-foreground">Leverage Companies</span>
            </div>
          </div>
        </div>
      </div>

      {/* The Workflow */}
      <div>
        <h2 className="mb-3 text-lg font-semibold">The Workflow</h2>
        <div className="space-y-3 text-sm leading-relaxed">
          <p>
            Leverage Companies owns Brick City Capital, and while they are technically two separate legal entities, they operate as a single unified team. Both companies specialize in residential DSCR (Debt Service Coverage Ratio) loans and share the same team page on their respective websites.
          </p>
          <p>
            JP and Ian work across both organizations seamlessly. They evaluate incoming loan requests, underwrite DSCR deals, and manage a shared pipeline. From an operational standpoint, the distinction between which company brand is used depends on the specific deal or client relationship, not on separate teams or workflows.
          </p>
          <p>
            The companies evaluated using Lev to broker deals they couldn't lend on directly, but ultimately determined that the volume of deals requiring brokerage didn't justify the expense at this time. For now, they operate purely as lenders across both entities.
          </p>
        </div>
      </div>

      {/* Why This Matters */}
      <div>
        <h2 className="mb-3 text-lg font-semibold">Why This Matters</h2>
        <div className="space-y-3 text-sm leading-relaxed">
          <p>
            This scenario highlights the complexity of multi-organization structures where separate legal entities share the same team, branding, and operational workflows. The platform needs to accommodate users who work across multiple organizations under common ownership without forcing them to maintain completely separate accounts or switch contexts constantly.
          </p>
          <p>
            While Ken Kaplan's scenario (from the earlier discussion) involved different businesses with distinct teams and branding, Leverage Companies represents a different pattern: unified operations across multiple corporate entities. The technical challenge is determining whether these should be treated as one organization with multiple DBA names, or separate organizations with shared team access.
          </p>
        </div>
      </div>
    </>
  )
}

// Northmarq Use Case
function NorthmarqUseCase() {
  return (
    <>
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex flex-col gap-2">
          <span className="font-mono text-xs font-semibold uppercase tracking-wider text-muted-foreground">Organization</span>
          <h1 className="text-2xl font-semibold">Northmarq</h1>
          <p className="text-muted-foreground">
            Broker who also acts as lender contact - dual role within one organization
          </p>
        </div>
        <div className="flex gap-2">
          <span className="inline-flex h-6 items-center gap-1.5 rounded-full border px-3 text-xs font-medium">
            <span className="h-1.5 w-1.5 rounded-full bg-purple-600" />
            Broker
          </span>
          <span className="inline-flex h-6 items-center gap-1.5 rounded-full border px-3 text-xs font-medium">
            <span className="h-1.5 w-1.5 rounded-full bg-blue-600" />
            Lender
          </span>
        </div>
      </div>

      {/* Accounts */}
      <div>
        <span className="mb-4 block font-mono text-xs font-semibold uppercase tracking-wider text-muted-foreground">Accounts</span>
        <div className="grid gap-4 md:grid-cols-2">
          {/* Northmarq Brokerage Account */}
          <div className="rounded-lg border bg-card">
            <div className="flex items-center gap-4 p-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg border bg-muted">
                <Building2 className="h-5 w-5" />
              </div>
              <div className="flex flex-1 flex-col gap-1">
                <div className="flex items-center gap-2">
                  <span className="font-medium">Northmarq Brokerage</span>
                  <span className="inline-flex h-5 items-center gap-1.5 rounded-full border px-2 text-xs font-medium">
                    <span className="h-1.5 w-1.5 rounded-full bg-purple-600" />
                    Broker
                  </span>
                </div>
                <span className="text-sm text-muted-foreground">
                  Primary brokerage account for running outreach campaigns and managing placements to external lenders.
                </span>
              </div>
            </div>
          </div>

          {/* Northmarq Lending Account */}
          <div className="rounded-lg border bg-card">
            <div className="flex items-center gap-4 p-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg border bg-muted">
                <Building2 className="h-5 w-5" />
              </div>
              <div className="flex flex-1 flex-col gap-1">
                <div className="flex items-center gap-2">
                  <span className="font-medium">Northmarq Lending</span>
                  <span className="inline-flex h-5 items-center gap-1.5 rounded-full border px-2 text-xs font-medium">
                    <span className="h-1.5 w-1.5 rounded-full bg-blue-600" />
                    Lender
                  </span>
                </div>
                <span className="text-sm text-muted-foreground">
                  Receives inbound placements from other brokers when Northmarq provides direct financing for deals.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Users */}
      <div>
        <span className="mb-4 block font-mono text-xs font-semibold uppercase tracking-wider text-muted-foreground">Users</span>
        <div className="grid gap-4 md:grid-cols-2">
          {/* David Henney */}
          <div className="rounded-lg border bg-card">
            <div className="flex items-center gap-4 p-4">
              <div className="h-12 w-12 shrink-0 overflow-hidden rounded-full">
                <Image src={avatar3} alt="David Henney" width={48} height={48} className="h-full w-full object-cover" />
              </div>
              <div className="flex flex-1 flex-col gap-1">
                <span className="font-medium">David Henney</span>
                <span className="text-sm text-muted-foreground">dhenney@northmarq.com</span>
              </div>
            </div>
            <div className="border-t" />
            <div className="bg-background p-4">
              <p className="text-sm leading-relaxed text-muted-foreground">
                User across both accounts. Acts as broker on brokerage deals and as lender contact when Northmarq provides direct financing.
              </p>
            </div>
            <div className="border-t" />
            <div className="flex items-center justify-between bg-muted/50 px-4 py-3">
              <div className="flex items-center gap-2">
                <span className="text-xs font-medium text-muted-foreground">User Profile</span>
                <span className="inline-flex h-5 items-center gap-1.5 rounded-full border px-2 text-xs font-medium">
                  <span className="h-1.5 w-1.5 rounded-full bg-purple-600" />
                  Broker
                </span>
              </div>
              <span className="text-xs text-muted-foreground">Northmarq Brokerage</span>
            </div>
            <div className="border-t" />
            <div className="flex items-center justify-between bg-muted/50 px-4 py-3">
              <div className="flex items-center gap-2">
                <span className="text-xs font-medium text-muted-foreground">User Profile</span>
                <span className="inline-flex h-5 items-center gap-1.5 rounded-full border px-2 text-xs font-medium">
                  <span className="h-1.5 w-1.5 rounded-full bg-blue-600" />
                  Lender
                </span>
              </div>
              <span className="text-xs text-muted-foreground">Northmarq Lending</span>
            </div>
          </div>
        </div>
      </div>

      {/* The Workflow */}
      <div>
        <h2 className="mb-3 text-lg font-semibold">The Workflow</h2>
        <div className="space-y-3 text-sm leading-relaxed">
          <p>
            Northmarq is part of the Enterprise pilot program and operates primarily as a commercial real estate broker. David Henney is a key user who works on brokered deals, running outreach campaigns and managing placements to external lenders.
          </p>
          <p>
            However, David specifically requested to be listed as a main contact for Northmarq when they act as a lender on certain deals. In these cases, other brokers send placements to Northmarq, and David needs to receive and evaluate those inbound opportunities as if he were a lender representative.
          </p>
          <p>
            This creates a unique scenario where David operates in both capacities within the same organization and same account. When brokering, he needs outreach tools and placement tracking. When acting as a lender contact, he needs to see incoming placements and respond to deal submissions. The platform must support this dual-role workflow without requiring him to switch organizations or maintain separate accounts.
          </p>
        </div>
      </div>

      {/* Why This Matters */}
      <div>
        <h2 className="mb-3 text-lg font-semibold">Why This Matters</h2>
        <div className="space-y-3 text-sm leading-relaxed">
          <p>
            This scenario demonstrates the need for flexible role assignment at the individual user level, not just at the organizational level. While Northmarq as a company may be categorized as a broker, individual users within that organization need to toggle between broker and lender features based on the specific deal context.
          </p>
          <p>
            The technical challenge is determining whether this should be handled through profile switching, deal-specific role assignment, or a unified view that dynamically shows/hides features based on the user's active context. David shouldn't have to manually "switch modes"—the system should intelligently present the right features based on whether he's working on a brokered deal or responding to an inbound placement as a lender.
          </p>
        </div>
      </div>
    </>
  )
}

// BWE Use Case
function BWEUseCase() {
  return (
    <>
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex flex-col gap-2">
          <span className="font-mono text-xs font-semibold uppercase tracking-wider text-muted-foreground">Organization</span>
          <h1 className="text-2xl font-semibold">BWE</h1>
          <p className="text-muted-foreground">
            Lender transitioning to broker - role evolution challenge
          </p>
        </div>
        <div className="flex gap-2">
          <span className="inline-flex h-6 items-center gap-1.5 rounded-full border px-3 text-xs font-medium">
            <span className="h-1.5 w-1.5 rounded-full bg-blue-600" />
            Lender
          </span>
          <span className="inline-flex h-6 items-center gap-1.5 rounded-full border px-3 text-xs font-medium">
            <span className="h-1.5 w-1.5 rounded-full bg-purple-600" />
            Broker
          </span>
        </div>
      </div>

      {/* Accounts */}
      <div>
        <span className="mb-4 block font-mono text-xs font-semibold uppercase tracking-wider text-muted-foreground">Accounts</span>
        <div className="grid gap-4 md:grid-cols-2">
          {/* BWE Lending Account */}
          <div className="rounded-lg border bg-card">
            <div className="flex items-center gap-4 p-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg border bg-muted">
                <Landmark className="h-5 w-5" />
              </div>
              <div className="flex flex-1 flex-col gap-1">
                <div className="flex items-center gap-2">
                  <span className="font-medium">BWE Lending</span>
                  <span className="inline-flex h-5 items-center gap-1.5 rounded-full border px-2 text-xs font-medium">
                    <span className="h-1.5 w-1.5 rounded-full bg-blue-600" />
                    Lender
                  </span>
                </div>
                <span className="text-sm text-muted-foreground">
                  Original account. Receives inbound placements and manages direct lending pipeline.
                </span>
              </div>
            </div>
          </div>

          {/* BWE Brokerage Account */}
          <div className="rounded-lg border bg-card">
            <div className="flex items-center gap-4 p-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg border bg-muted">
                <Landmark className="h-5 w-5" />
              </div>
              <div className="flex flex-1 flex-col gap-1">
                <div className="flex items-center gap-2">
                  <span className="font-medium">BWE Brokerage</span>
                  <span className="inline-flex h-5 items-center gap-1.5 rounded-full border px-2 text-xs font-medium">
                    <span className="h-1.5 w-1.5 rounded-full bg-purple-600" />
                    Broker
                  </span>
                </div>
                <span className="text-sm text-muted-foreground">
                  New account being evaluated. Manages outreach campaigns and placements for deals BWE brokers to other lenders.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Users */}
      <div>
        <span className="mb-4 block font-mono text-xs font-semibold uppercase tracking-wider text-muted-foreground">Users</span>
        <div className="grid gap-4 md:grid-cols-2">
          {/* Graham Gilreath */}
          <div className="rounded-lg border bg-card">
            <div className="flex items-center gap-4 p-4">
              <div className="h-12 w-12 shrink-0 overflow-hidden rounded-full">
                <Image src={avatar4} alt="Graham Gilreath" width={48} height={48} className="h-full w-full object-cover" />
              </div>
              <div className="flex flex-1 flex-col gap-1">
                <span className="font-medium">Graham Gilreath</span>
                <span className="text-sm text-muted-foreground">graham.gilreath@bwe.com</span>
              </div>
            </div>
            <div className="border-t" />
            <div className="bg-background p-4">
              <p className="text-sm leading-relaxed text-muted-foreground">
                Originally in Lev as a lender contact. BWE is now evaluating brokerage capabilities, requiring Graham to gain broker access without creating a new account.
              </p>
            </div>
            <div className="border-t" />
            <div className="flex items-center justify-between bg-muted/50 px-4 py-3">
              <div className="flex items-center gap-2">
                <span className="text-xs font-medium text-muted-foreground">User Profile</span>
                <span className="inline-flex h-5 items-center gap-1.5 rounded-full border px-2 text-xs font-medium">
                  <span className="h-1.5 w-1.5 rounded-full bg-blue-600" />
                  Lender
                </span>
              </div>
              <span className="text-xs text-muted-foreground">BWE Lending</span>
            </div>
            <div className="border-t" />
            <div className="flex items-center justify-between bg-muted/50 px-4 py-3">
              <div className="flex items-center gap-2">
                <span className="text-xs font-medium text-muted-foreground">User Profile</span>
                <span className="inline-flex h-5 items-center gap-1.5 rounded-full border px-2 text-xs font-medium">
                  <span className="h-1.5 w-1.5 rounded-full bg-purple-600" />
                  Broker
                </span>
              </div>
              <span className="text-xs text-muted-foreground">BWE Brokerage</span>
            </div>
          </div>
        </div>
      </div>

      {/* The Workflow */}
      <div>
        <h2 className="mb-3 text-lg font-semibold">The Workflow</h2>
        <div className="space-y-3 text-sm leading-relaxed">
          <p>
            Graham Gilreath's email (graham.gilreath@bwe.com) was already in Lev's system as a lender contact when BWE began evaluating the platform for brokerage services. This created an immediate technical challenge during account setup: how do you add broker capabilities to an existing lender contact without forcing a duplicate account or requiring a different email address?
          </p>
          <p>
            BWE operates as both a lender and a broker. Like many lenders, when they receive deals that don't fit their lending criteria, they broker those deals out to other lenders rather than turning away business entirely. This is a common pattern in the industry—the same company and same employees need to operate in both capacities.
          </p>
          <p>
            Graham needs access to both lender features (receiving and evaluating placements sent to BWE) and broker features (creating deals, running outreach campaigns, managing placements for deals BWE is brokering). The platform attempted to create a new account for Graham as a broker but encountered a conflict because his email already existed. The fundamental issue: one person, one email, one company, but an evolving role that requires access to different feature sets.
          </p>
        </div>
      </div>

      {/* Why This Matters */}
      <div>
        <h2 className="mb-3 text-lg font-semibold">Why This Matters</h2>
        <div className="space-y-3 text-sm leading-relaxed">
          <p>
            This represents perhaps the most common real-world scenario: users whose roles expand or shift over time. The system was designed with the assumption that roles are static and predetermined, but in practice, lenders frequently become brokers, brokers take on sponsor roles, and business models evolve.
          </p>
          <p>
            The February 17th discussion highlighted this exact pattern: "Very often we have lenders that have deals sent to them, the deal doesn't fit their bucket, and they then try to broker it out to other lenders." The proposed architectural solution is to decouple roles from user profiles entirely—one email address creates one account, and that account can have multiple roles enabled dynamically. Features are shown or hidden based on active roles, not by forcing users to maintain separate profiles or switch between artificial organizational boundaries.
          </p>
        </div>
      </div>
    </>
  )
}
