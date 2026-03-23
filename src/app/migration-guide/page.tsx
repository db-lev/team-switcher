"use client"

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import {
  ArrowRight,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Server,
  Monitor,
  Shield,
  Users,
} from "lucide-react"

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="font-mono text-xs font-semibold uppercase tracking-wider text-muted-foreground">
      {children}
    </span>
  )
}

function CodeBlock({ children }: { children: string }) {
  return (
    <pre className="overflow-x-auto rounded-lg border bg-muted/50 p-4 text-[13px] leading-relaxed">
      <code>{children}</code>
    </pre>
  )
}

function NewBadge() {
  return (
    <Badge className="bg-emerald-500/10 text-emerald-600 border-emerald-200 text-[10px] font-semibold uppercase">
      New
    </Badge>
  )
}

function BeforeAfterCard({
  before,
  after,
  label,
}: {
  before: string
  after: string
  label?: string
}) {
  return (
    <div className="rounded-lg border overflow-hidden">
      {label && (
        <div className="border-b bg-muted/30 px-4 py-2">
          <span className="text-xs font-medium text-muted-foreground">{label}</span>
        </div>
      )}
      <div className="grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x">
        <div className="p-4">
          <div className="mb-2 flex items-center gap-1.5">
            <XCircle className="h-3.5 w-3.5 text-red-500" />
            <span className="text-xs font-semibold text-red-600 uppercase">Before (deprecated)</span>
          </div>
          <pre className="overflow-x-auto rounded-md bg-red-50 dark:bg-red-950/20 p-3 text-[12px] leading-relaxed">
            <code>{before}</code>
          </pre>
        </div>
        <div className="p-4">
          <div className="mb-2 flex items-center gap-1.5">
            <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
            <span className="text-xs font-semibold text-emerald-600 uppercase">After (correct)</span>
          </div>
          <pre className="overflow-x-auto rounded-md bg-emerald-50 dark:bg-emerald-950/20 p-3 text-[12px] leading-relaxed">
            <code>{after}</code>
          </pre>
        </div>
      </div>
    </div>
  )
}

function RoleCard({
  role,
  description,
  color,
  faded,
}: {
  role: string
  description: string
  color: string
  faded?: boolean
}) {
  return (
    <div className={`rounded-lg border bg-card p-4 ${faded ? "opacity-40" : ""}`}>
      <div className="mb-2 flex items-center gap-2">
        <span className={`h-2 w-2 rounded-full ${color}`} />
        <code className="text-sm font-semibold">{role}</code>
      </div>
      <p className="text-xs leading-relaxed text-muted-foreground">{description}</p>
    </div>
  )
}

export default function MigrationGuidePage() {
  return (
    <Tabs defaultValue="overview" className="flex flex-col flex-1 min-h-0">
      {/* Sticky header */}
      <div className="sticky top-0 z-20 bg-background border-b">
        <div className="flex flex-col gap-3 px-6 pt-5 pb-0 max-w-5xl">
          {/* Title row */}
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                <Shield className="h-4 w-4 text-primary" />
              </div>
              <div>
                <h1 className="text-xl font-bold leading-none">Account-Scoping Migration Guide</h1>
                <p className="text-xs text-muted-foreground mt-0.5">Multi-account model &amp; company switcher</p>
              </div>
            </div>
          </div>

          {/* TL;DR */}
          <div className="rounded-lg border-l-4 border-primary bg-primary/5 px-4 py-3">
            <p className="text-xs font-medium leading-relaxed">
              <strong>TL;DR:</strong> Users can now belong to multiple accounts. The frontend sends{" "}
              <code className="rounded bg-primary/10 px-1.5 py-0.5 text-[11px] font-semibold">X-Active-Account: &lt;slug&gt;</code>{" "}
              to tell the backend which account the user is acting as. Backend code must never assume a user
              has a single account — always use <code className="rounded bg-primary/10 px-1.5 py-0.5 text-[11px] font-semibold">authorized_user</code> from
              GraphQL context.
            </p>
          </div>

          {/* Tab nav */}
          <TabsList variant="line" className="w-full justify-start gap-0 rounded-none bg-transparent p-0 h-auto">
            <TabsTrigger value="overview" className="data-[state=active]:font-semibold data-[state=active]:text-foreground data-[active]:font-semibold data-[active]:text-foreground">How It Works</TabsTrigger>
            <TabsTrigger value="migration" className="data-[state=active]:font-semibold data-[state=active]:text-foreground data-[active]:font-semibold data-[active]:text-foreground">Code Migration</TabsTrigger>
          </TabsList>
        </div>{/* /max-w-5xl */}
      </div>{/* /sticky header */}

      {/* Scrollable tab content */}
      <div className="flex-1 overflow-auto">
        <div className="max-w-5xl px-6 pb-16">

        {/* ────────────── TAB 1: HOW IT WORKS ────────────── */}
        <TabsContent value="overview" className="flex flex-col gap-10 pt-6">
          {/* What changed */}
          <div className="flex flex-col gap-4">
            <SectionLabel>What Changed</SectionLabel>
            <div className="grid gap-4 md:grid-cols-3">
              <div className="rounded-lg border bg-card p-4 flex flex-col gap-2">
                <Users className="h-5 w-5 text-muted-foreground" />
                <h3 className="text-sm font-semibold">Multi-account users</h3>
                <p className="text-xs leading-relaxed text-muted-foreground">
                  A User can have multiple UserProfile memberships across different Accounts.
                  A user can be a broker on Company A and a borrower on Company B.
                </p>
              </div>
              <div className="rounded-lg border bg-card p-4 flex flex-col gap-2">
                <Server className="h-5 w-5 text-muted-foreground" />
                <h3 className="text-sm font-semibold">Per-request account scoping</h3>
                <p className="text-xs leading-relaxed text-muted-foreground">
                  The active account is determined per-request via the <code className="text-[11px]">X-Active-Account</code> header
                  (an account slug). No more global assumptions.
                </p>
              </div>
              <div className="rounded-lg border bg-card p-4 flex flex-col gap-2">
                <AlertTriangle className="h-5 w-5 text-amber-500" />
                <h3 className="text-sm font-semibold">Deprecations</h3>
                <p className="text-xs leading-relaxed text-muted-foreground">
                  <code className="text-[11px]">user.default_user_profile</code> is removed.{" "}
                  <code className="text-[11px]">user.role</code> (UserRole enum) is deprecated for access-control branching.{" "}
                  <code className="text-[11px]">Account.account_type</code> is deprecated for role checks.
                </p>
              </div>
            </div>
          </div>

          {/* Request Lifecycle */}
          <div className="flex flex-col gap-4">
            <SectionLabel>Request Lifecycle</SectionLabel>
            <p className="text-sm text-muted-foreground">Every request now follows this flow:</p>

            <div className="rounded-lg border overflow-hidden">
              <div className="grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x">
                <div className="p-5">
                  <div className="mb-3 flex items-center gap-2">
                    <Monitor className="h-4 w-4 text-blue-500" />
                    <span className="text-sm font-semibold">Frontend Sends</span>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 rounded-md bg-muted/50 px-3 py-2 font-mono text-xs">
                      <span className="text-muted-foreground">Authorization:</span>
                      <span>Bearer &lt;jwt&gt;</span>
                    </div>
                    <div className="flex items-center gap-2 rounded-md bg-muted/50 px-3 py-2 font-mono text-xs">
                      <span className="text-muted-foreground">X-Origin-App:</span>
                      <span>borrower | lev-internal-user-app | ...</span>
                    </div>
                    <div className="flex items-center gap-2 rounded-md bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900 px-3 py-2 font-mono text-xs">
                      <span className="text-blue-600 dark:text-blue-400">X-Active-Account:</span>
                      <span className="text-blue-700 dark:text-blue-300">acme-capital</span>
                      <NewBadge />
                    </div>
                  </div>
                </div>
                <div className="p-5">
                  <div className="mb-3 flex items-center gap-2">
                    <Server className="h-4 w-4 text-emerald-500" />
                    <span className="text-sm font-semibold">Backend Resolves</span>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-3">
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-muted text-xs font-semibold">1</span>
                      <span>JWT <ArrowRight className="inline h-3 w-3 mx-1" /> User record</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-muted text-xs font-semibold">2</span>
                      <span>X-Active-Account slug <ArrowRight className="inline h-3 w-3 mx-1" /> Account <ArrowRight className="inline h-3 w-3 mx-1" /> UserProfile (membership)</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-muted text-xs font-semibold">3</span>
                      <span>Account type <ArrowRight className="inline h-3 w-3 mx-1" /> AuthorizedRole</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-muted text-xs font-semibold">4</span>
                      <span>Builds <code className="text-xs">AuthorizedUser(id, role, membership, account_user)</code> <span className="text-xs text-muted-foreground">— <code className="text-[11px]">membership</code> resolved from <code className="text-[11px]">X-Active-Account</code> header</span></span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* AuthorizedRole values */}
          <div className="flex flex-col gap-4">
            <SectionLabel>AuthorizedRole Values</SectionLabel>

            {/* Internal roles */}
            <div className="grid gap-3 md:grid-cols-3">
              <RoleCard role="admin / lev_internal_user" description="Internal Lev staff. Unchanged." color="bg-red-500" />
              <RoleCard role="guest" description="External user with zero active memberships (no accounts)." color="bg-gray-300" />
              <RoleCard role="unscoped" description="External user with 1+ memberships but no X-Active-Account header — hasn't picked a workspace yet." color="bg-amber-400" />
              <RoleCard role="soft_auth_lender" description="Lender via soft-auth token (lender portal, no full Auth0 account). Deprecating soon." color="bg-blue-400" faded />
              <RoleCard role="public_vault_viewer" description="Unauthenticated vault access via X-Vault-Hash. Leave alone." color="bg-gray-400" />
              <RoleCard role="apikey / external_client" description="API key callers and M2M Auth0 client credentials. Leave alone." color="bg-gray-400" />
            </div>

            {/* Converging external roles */}
            <div className="rounded-lg border-2 border-dashed border-border bg-muted/20 p-4 flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-semibold uppercase tracking-wider text-muted-foreground">External scoped roles — converging</span>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-foreground/5 border px-3 py-1 text-xs font-semibold">
                  Treated identically by the platform
                </span>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                These three exist today as separate values but are converging into one. No logic should branch on which of these a user has.
              </p>
              <div className="grid gap-2 sm:grid-cols-3">
                <div className="rounded-lg border bg-card p-3 flex items-center gap-2">
                  <span className="h-2 w-2 shrink-0 rounded-full bg-violet-500" />
                  <code className="text-sm font-semibold">borrower</code>
                </div>
                <div className="rounded-lg border bg-card p-3 flex items-center gap-2">
                  <span className="h-2 w-2 shrink-0 rounded-full bg-emerald-500" />
                  <code className="text-sm font-semibold">external_broker</code>
                </div>
                <div className="rounded-lg border bg-card p-3 flex items-center gap-2">
                  <span className="h-2 w-2 shrink-0 rounded-full bg-blue-500" />
                  <code className="text-sm font-semibold">lender</code>
                </div>
              </div>
            </div>

            <div className="rounded-lg border border-amber-200 bg-amber-50 dark:bg-amber-950/20 dark:border-amber-900 p-4">
              <div className="flex items-start gap-2">
                <AlertTriangle className="h-4 w-4 mt-0.5 text-amber-600" />
                <p className="text-xs leading-relaxed text-amber-800 dark:text-amber-300">
                  <strong>On branch <code className="text-[11px]">account-memberships</code>, not yet merged to master:</strong>{" "}
                  <code className="text-[11px]">X-Active-Account</code> header, <code className="text-[11px]">authorized_user.membership</code>,{" "}
                  <code className="text-[11px]">authorized_user.account_id</code>, <code className="text-[11px]">guest</code>, and <code className="text-[11px]">unscoped</code> are all implemented and ready.
                  Write new code toward this model now and migrate old <code className="text-[11px]">user.role</code> branching as you touch files.
                </p>
              </div>
            </div>
          </div>

          {/* Deal Brokered Status */}
          <div className="flex flex-col gap-4">
            <SectionLabel>Deal Brokered Status</SectionLabel>
            <p className="text-sm text-muted-foreground">
              <code>Deal.is_brokered</code> is now purely structural — based on whether the sponsor org differs from the owner org.
              Account type no longer determines deal type.
            </p>
            <CodeBlock>{`@property
def is_brokered(self) -> bool:
    """A deal is brokered when the sponsor org differs from the owner org."""
    if not self.owner_account or not self.sponsor_private_company:
        return False
    return self.owner_account.org_id != self.sponsor_private_company.org_id`}</CodeBlock>
            <div className="grid gap-3 md:grid-cols-3">
              <div className="rounded-lg border bg-card p-3">
                <p className="text-xs leading-relaxed text-muted-foreground">
                  A deal without a sponsor is <strong className="text-foreground">never</strong> brokered (even if the account type is brokerage).
                </p>
              </div>
              <div className="rounded-lg border bg-card p-3">
                <p className="text-xs leading-relaxed text-muted-foreground">
                  Deal user roles (<code className="text-[11px]">broker</code> vs <code className="text-[11px]">borrower</code>) are
                  derived from <code className="text-[11px]">deal.is_brokered</code>.
                </p>
              </div>
            </div>
          </div>
        </TabsContent>

        {/* ────────────── TAB 2: CODE MIGRATION ────────────── */}
        <TabsContent value="migration" className="flex flex-col gap-10 pt-6">
          {/* Rule 1 */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">1</span>
              <h2 className="text-lg font-semibold">Use <code>authorized_user</code>, not <code>user</code></h2>
            </div>
            <CodeBlock>{`# GraphQL resolver
user = info.context.authorized_user          # AuthorizedUser (exists today)
account_id = info.context.authorized_user.account_id  # coming — not on DTO yet
membership = info.context.authorized_user.membership  # UserProfile | None (on branch account-memberships)

# REST endpoint (after @requires_external_auth or @requires_auth)
from flask import g
authorized_user = g.authorized_user          # AuthorizedUser (exists today)`}</CodeBlock>
            <div className="rounded-lg border border-amber-200 bg-amber-50 dark:bg-amber-950/20 dark:border-amber-900 px-4 py-3">
              <div className="flex items-start gap-2">
                <AlertTriangle className="h-3.5 w-3.5 mt-0.5 shrink-0 text-amber-600" />
                <p className="text-xs leading-relaxed text-amber-800 dark:text-amber-300">
                  <code className="text-[11px]">authorized_user.membership</code> and <code className="text-[11px]">authorized_user.account_id</code> exist on branch{" "}
                  <code className="text-[11px]">account-memberships</code> but are not yet on <code className="text-[11px]">master</code>.
                  Until merged, use <code className="text-[11px]">authorized_user.profile</code> (a <code className="text-[11px]">UserProfile | Person</code>) as the closest available equivalent.
                </p>
              </div>
            </div>
          </div>

          {/* Rule 2 */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">2</span>
              <h2 className="text-lg font-semibold">Never access <code>user.default_user_profile</code></h2>
            </div>
            <div className="space-y-3">
              <BeforeAfterCard
                label="Getting account ID"
                before="user.default_user_profile.account_id"
                after="authorized_user.account_id"
              />
              <BeforeAfterCard
                label="Getting the account"
                before="user.default_user_profile.account"
                after="authorized_user.account"
              />
              <BeforeAfterCard
                label="Getting the user's role"
                before="user.default_user_profile.role"
                after="authorized_user.membership.role"
              />
              <div className="rounded-lg border border-amber-200 bg-amber-50 dark:bg-amber-950/20 dark:border-amber-900 p-4">
                <div className="flex items-start gap-2">
                  <AlertTriangle className="h-4 w-4 mt-0.5 shrink-0 text-amber-600" />
                  <div className="flex flex-col gap-1">
                    <p className="text-xs font-semibold text-amber-800 dark:text-amber-300">Do not write logic that depends on this role value</p>
                    <p className="text-xs leading-relaxed text-amber-700/80 dark:text-amber-400/80">
                      A future iteration converges <code className="text-[11px]">borrower</code>, <code className="text-[11px]">broker</code>, and <code className="text-[11px]">lender</code> into
                      a single unified role — they are treated identically by the platform. Any branching on these
                      membership role values will break. Scope behavior to the <strong>entity&apos;s account type</strong> or
                      the <strong>deal context</strong> instead.
                    </p>
                  </div>
                </div>
              </div>
              <BeforeAfterCard
                label="Checking if profile exists"
                before="user.default_user_profile is None"
                after="authorized_user.membership is None"
              />
              <div className="rounded-lg border border-blue-200 bg-blue-50 dark:bg-blue-950/20 dark:border-blue-900 p-4">
                <div className="flex items-start gap-2">
                  <HelpCircle className="h-4 w-4 mt-0.5 shrink-0 text-blue-500" />
                  <p className="text-xs leading-relaxed text-blue-800 dark:text-blue-300">
                    <code className="text-[11px]">authorized_user.membership is None</code> can mean two different things:
                    the user has <strong>no accounts at all</strong> (<code className="text-[11px]">guest</code>), or they have accounts but
                    haven&apos;t selected one yet (<code className="text-[11px]">unscoped</code>). If the distinction matters,
                    check <code className="text-[11px]">authorized_user.role</code> explicitly.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Rule 3 */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">3</span>
              <h2 className="text-lg font-semibold">Never branch on <code>user.role</code> for business logic</h2>
            </div>
            <p className="text-sm text-muted-foreground">
              Code that checks <code>user.role == UserRole.external_broker</code> assumes the user has only one role globally.
              This breaks when users belong to multiple account types. More importantly, <strong>broker/borrower/lender are converging into one</strong> —
              there is no replacement check. Remove this branching entirely.
            </p>
            <div className="space-y-3">
              <div className="rounded-lg border overflow-hidden">
                <div className="border-b bg-muted/30 px-4 py-2">
                  <span className="text-xs font-medium text-muted-foreground">Checking if user is a broker</span>
                </div>
                <div className="grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x">
                  <div className="p-4">
                    <div className="mb-2 flex items-center gap-1.5">
                      <XCircle className="h-3.5 w-3.5 text-red-500" />
                      <span className="text-xs font-semibold text-red-600 uppercase">Before (deprecated)</span>
                    </div>
                    <pre className="overflow-x-auto rounded-md bg-red-50 dark:bg-red-950/20 p-3 text-[12px] leading-relaxed">
                      <code>user.role == UserRole.external_broker</code>
                    </pre>
                  </div>
                  <div className="p-4">
                    <div className="mb-2 flex items-center gap-1.5">
                      <XCircle className="h-3.5 w-3.5 text-red-500" />
                      <span className="text-xs font-semibold text-red-600 uppercase">No replacement — delete this check</span>
                    </div>
                    <div className="rounded-md bg-red-50 dark:bg-red-950/20 p-3 text-[12px] leading-relaxed text-red-700 dark:text-red-400">
                      All external users are treated the same. Broker, borrower, and lender are converging into one role.
                      Any logic that branches on which type they are should be removed.
                    </div>
                  </div>
                </div>
              </div>
              <BeforeAfterCard
                label="Checking if user is admin"
                before="user.role in [UserRole.admin, UserRole.lev_internal_user]"
                after="authorized_user.is_lev_admin_user"
              />
            </div>
          </div>

          {/* Rule 4 */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">4</span>
              <h2 className="text-lg font-semibold">Controllers accept explicit parameters</h2>
            </div>
            <p className="text-sm text-muted-foreground">
              Controllers should accept specific data they need (<code>account_id: int</code>,{" "}
              <code>membership: UserProfile</code>) rather than a <code>User</code> object.
              The boundary (GraphQL mutation / REST handler) extracts these from <code>authorized_user</code>.
            </p>
            <CodeBlock>{`# Mutation
def mutate(root, info, data):
    authorized_user = info.context.authorized_user
    controller.do_something(
        account_id=authorized_user.account_id,
        membership=authorized_user.membership,
        ...
    )`}</CodeBlock>
          </div>

          {/* Rule 5 */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">5</span>
              <h2 className="text-lg font-semibold">For deal/placement context — remove role-based branching</h2>
            </div>
            <p className="text-sm text-muted-foreground">
              Code that branches on the user&apos;s role to pick a different template, message, or behavior for brokers vs. borrowers should be deleted — not replaced.
              Since all external roles are converging into one, these branches have no valid replacement.
            </p>
            <div className="rounded-lg border overflow-hidden">
              <div className="border-b bg-muted/30 px-4 py-2">
                <span className="text-xs font-medium text-muted-foreground">Determining email template by role</span>
              </div>
              <div className="grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x">
                <div className="p-4">
                  <div className="mb-2 flex items-center gap-1.5">
                    <XCircle className="h-3.5 w-3.5 text-red-500" />
                    <span className="text-xs font-semibold text-red-600 uppercase">Before (deprecated)</span>
                  </div>
                  <pre className="overflow-x-auto rounded-md bg-red-50 dark:bg-red-950/20 p-3 text-[12px] leading-relaxed">
                    <code>{`if user.role == UserRole.external_broker:
    template_type = EmailTemplateReferenceType\\
        .existing_relationship_outreach_broker
else:
    template_type = EmailTemplateReferenceType\\
        .existing_relationship_outreach`}</code>
                  </pre>
                </div>
                <div className="p-4">
                  <div className="mb-2 flex items-center gap-1.5">
                    <XCircle className="h-3.5 w-3.5 text-red-500" />
                    <span className="text-xs font-semibold text-red-600 uppercase">No replacement — delete this branch</span>
                  </div>
                  <div className="rounded-md bg-red-50 dark:bg-red-950/20 p-3 text-[12px] leading-relaxed text-red-700 dark:text-red-400">
                    There is no broker-vs-borrower distinction anymore. Collapse to a single template and remove the branch entirely.
                    The &ldquo;broker&rdquo; variant of a template should not exist as a separate case.
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Admin checks */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">6</span>
              <h2 className="text-lg font-semibold">Admin checks use <code>is_admin_membership</code></h2>
            </div>
            <p className="text-sm text-muted-foreground">
              <code>User.is_admin_profile</code> has been removed. It checked <code>default_user_profile.role</code> which is unreliable.
              Use <code>UserProfile.is_admin_membership</code> on the correct profile.
            </p>
            <BeforeAfterCard
              label="Checking admin status"
              before={`# Fragile — which account?
account_id = user.default_user_profile.account_id
account_type = user.default_user_profile\\
    .account.account_type`}
              after={`# Entity-scoped
owner_account_id = pending_contacts[0].account_id
account_type = self._account_repo\\
    .get_account_type(owner_account_id)

# Or membership-scoped (when no entity)
account_id = membership.account_id
is_admin = membership.is_admin_membership`}
            />
          </div>

          {/* ── Testing ── */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">7</span>
              <h2 className="text-lg font-semibold">Testing in the new world</h2>
            </div>
            <p className="text-sm text-muted-foreground">
              Most tests do <strong>not</strong> need to call <code>make_authorized_user</code> directly —
              the <code>GraphQLClient</code> resolves it automatically from the user. The focus shifts to
              explicitly building the account → membership chain instead of relying on global role factories.
            </p>
          </div>

          <div className="flex flex-col gap-8 pl-10">

            {/* Factory setup */}
            <div className="flex flex-col gap-3">
              <SectionLabel>Factory setup — what changed</SectionLabel>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="rounded-lg border border-red-200 dark:border-red-900 bg-red-50/50 dark:bg-red-950/10 p-4">
                  <div className="mb-3 flex items-center gap-2">
                    <XCircle className="h-4 w-4 text-red-500" />
                    <span className="text-sm font-semibold text-red-700 dark:text-red-400">Do NOT use</span>
                  </div>
                  <ul className="space-y-2 text-xs text-red-700/80 dark:text-red-400/80">
                    <li><code>OrganizationUserFactory</code> — auto-wires <code>default_user_profile</code></li>
                    <li><code>LenderUserFactory</code> — same problem</li>
                    <li>Any factory that creates a <code>default_user_profile</code> implicitly</li>
                  </ul>
                </div>
                <div className="rounded-lg border border-emerald-200 dark:border-emerald-900 bg-emerald-50/50 dark:bg-emerald-950/10 p-4">
                  <div className="mb-3 flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                    <span className="text-sm font-semibold text-emerald-700 dark:text-emerald-400">Build account → membership explicitly</span>
                  </div>
                  <ul className="space-y-2 text-xs text-emerald-700/80 dark:text-emerald-400/80">
                    <li><code>AccountFactory.create(account_type=...)</code></li>
                    <li><code>AccountUserFactory.create(account=account)</code></li>
                    <li><code>UserProfileFactory.create(account_id=account.id)</code></li>
                  </ul>
                </div>
              </div>
            </div>

            {/* GraphQL integration test */}
            <div className="flex flex-col gap-3">
              <SectionLabel>GraphQL integration test — the common case</SectionLabel>
              <p className="text-xs text-muted-foreground">
                Pass <code>user=</code> to <code>graphql.execute()</code> — the client calls <code>make_authorized_user</code>
                internally and resolves the role from the account type. You rarely need to pass <code>authorized_user=</code> explicitly.
              </p>
              <CodeBlock>{`def test_create_deal(graphql: GraphQLClient):
    account = AccountFactory.create(
        account_type=AccountEntityType.borrower
    )
    membership = UserProfileFactory.create(
        account_id=account.id,
        role=UserProfileRoleType.admin.value,
    )
    deal = DealFactory.create(owner_account=account)
    DealUserFactory.create(
        deal_id=deal.id,
        user_profile_id=membership.id,   # ← profile, not just user
        user_id=membership.user.id,
        deal_role=DealUsersRole.deal_lead,
    )

    response = graphql.execute(
        CREATE_DEAL_MUTATION,
        user=membership.user,  # ← client resolves authorized_user automatically
        variables={...},
    )

    assert not response.failed`}</CodeBlock>
              <p className="text-xs text-muted-foreground">
                The preferred pattern is <code>UserProfileFactory.create(account_id=account.id)</code> — you get the user via <code>membership.user</code>.
                Use <code>AccountUserFactory.create(account=account)</code> when you need the user first and will create the profile separately.
              </p>
            </div>

            {/* Explicit authorized_user override */}
            <div className="flex flex-col gap-3">
              <SectionLabel>When you need explicit authorized_user control</SectionLabel>
              <p className="text-xs text-muted-foreground">
                Pass <code>authorized_user=</code> to <code>graphql.execute()</code> only when you need to test a specific
                role edge case — guest, unscoped, or a mismatched membership. Import <code>make_authorized_user</code>
                from <code>tests.factories.auth_helpers</code>.
              </p>
              <CodeBlock>{`from tests.factories.auth_helpers import make_authorized_user

def test_guest_user_cannot_create_deal(graphql: GraphQLClient):
    # GuestAccountUserFactory = authenticated but zero memberships
    user = GuestAccountUserFactory.create()
    authorized_user = make_authorized_user(user)
    # role auto-inferred → AuthorizedRole.guest (no membership)

    response = graphql.execute(
        CREATE_DEAL_MUTATION,
        user=user,
        authorized_user=authorized_user,
        variables={...},
    )

    assert response.has_error("Permission denied")`}</CodeBlock>
            </div>

            {/* Lender contact */}
            <div className="flex flex-col gap-3">
              <SectionLabel>Lender contact — opt-in factory hook</SectionLabel>
              <p className="text-xs text-muted-foreground">
                <code>AccountUserFactory</code> has a <code>lender_contact</code> post-generation hook.
                Pass <code>lender_contact=True</code> to auto-create a lender org, or pass an existing
                <code>Organization</code>. Access the result via <code>user.person</code> and <code>user.person.lender_attributes</code>.
                The membership hook is separate — create a <code>UserProfile</code> if the test needs account access.
              </p>
              <CodeBlock>{`# auto-create a lender org
lender_user = AccountUserFactory.create(lender_contact=True)
# lender_user.person → Person, lender_user.person.lender_attributes → LenderContactAttributes

# attach to a specific org
lender_org = LenderOrganizationFactory.create()
lender_user = AccountUserFactory.create(lender_contact=lender_org)

# with an account membership too (membership hook is separate from lender_contact)
lender_account = AccountFactory.create(account_type=AccountEntityType.lender)
lender_user = AccountUserFactory.create(account=lender_account, lender_contact=lender_org)`}</CodeBlock>
            </div>

            {/* Unit test / controller factory */}
            <div className="flex flex-col gap-3">
              <SectionLabel>Unit test — controller factory fixture</SectionLabel>
              <p className="text-xs text-muted-foreground">
                Unit tests mock all deps and use a factory fixture so each test only overrides what it cares about.
                <code>make_authorized_user</code> is <strong>not needed</strong> here — if the controller takes an
                <code>authorized_user</code> param, build a minimal <code>AuthorizedUser</code> directly.
              </p>
              <CodeBlock>{`# conftest.py
@pytest.fixture
def get_my_controller():
    def _factory(deal_repo=None, placement_repo=None, notification_controller=None):
        return MyController(
            deal_repo=deal_repo or Mock(),
            placement_repo=placement_repo or Mock(),
            notification_controller=notification_controller or Mock(),
        )
    return _factory

# test file
def test_something(get_my_controller):
    controller = get_my_controller()
    result = controller.do_something(account_id=42)
    assert result is not None

# if the method takes an authorized_user directly, build one inline:
def _make_admin_user() -> AuthorizedUser:
    mock_user = Mock()
    mock_user.id = 1
    return AuthorizedUser(id=1, role=AuthorizedRole.admin, _membership=None, _account_user=mock_user)`}</CodeBlock>
            </div>

          </div>
        </TabsContent>
      </div>{/* /max-w-5xl px-6 */}
      </div>{/* /flex-1 overflow-auto */}
    </Tabs>
  )
}
