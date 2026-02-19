"use client"

import * as React from "react"
import { useHeader } from "@/contexts/header-context"
import { useTeam } from "@/contexts/team-context"
import { DealsTable, baseColumns, lenderColumn, brokerColumn, daysActiveColumn, type Deal } from "@/components/deals-table"

const sampleDeals: Deal[] = [
  {
    id: "1",
    borrower: "Sunset Properties LLC",
    property: "123 Main St, Honolulu, HI",
    loanAmount: "$2.5M",
    status: "Active",
    broker: "David Henney",
    lender: "Heritage Bank NA",
    daysActive: 12,
  },
  {
    id: "2",
    borrower: "Pacific Ventures Inc",
    property: "456 Ocean Ave, San Diego, CA",
    loanAmount: "$5.2M",
    status: "Under Review",
    broker: "Maryann Salt",
    lender: "Myers Capital",
    daysActive: 5,
  },
  {
    id: "3",
    borrower: "Urban Development Co",
    property: "789 Park Blvd, Portland, OR",
    loanAmount: "$3.8M",
    status: "Active",
    broker: "Paul Konsor",
    lender: "BWE",
    daysActive: 28,
  },
  {
    id: "4",
    borrower: "Coastal Realty Group",
    property: "321 Beach Dr, Miami, FL",
    loanAmount: "$1.9M",
    status: "Closed",
    broker: "David Henney",
    lender: "Northmarq",
    daysActive: 45,
  },
]

export default function DealsPage() {
  const { setTitle } = useHeader()
  const { activeTeam } = useTeam()

  React.useEffect(() => {
    setTitle("Deals")
    return () => setTitle(undefined)
  }, [setTitle])

  // Determine columns based on team type
  const getColumns = () => {
    const teamTypes = activeTeam?.types || []
    const hasBroker = teamTypes.includes("Broker")
    const hasLender = teamTypes.includes("Lender")

    if (hasBroker && hasLender) {
      // Dual role: show both
      return [...baseColumns, lenderColumn, brokerColumn, daysActiveColumn]
    } else if (hasBroker) {
      // Broker only: show lender column (where they're sending deals)
      return [...baseColumns, lenderColumn, daysActiveColumn]
    } else {
      // Lender only: show broker column (who sent them deals)
      return [...baseColumns, brokerColumn, daysActiveColumn]
    }
  }

  return (
    <div className="flex flex-1 flex-col gap-6 p-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-semibold">Deals</h1>
        <p className="text-muted-foreground">Manage your deal pipeline</p>
      </div>
      
      <DealsTable data={sampleDeals} columns={getColumns()} />
    </div>
  )
}
