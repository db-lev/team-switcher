"use client"

import * as React from "react"
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  type ColumnDef,
} from "@tanstack/react-table"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

export type Deal = {
  id: string
  borrower: string
  property: string
  loanAmount: string
  status: string
  lender?: string
  broker?: string
  daysActive?: number
}

export const baseColumns: ColumnDef<Deal>[] = [
  {
    accessorKey: "borrower",
    header: "Borrower",
  },
  {
    accessorKey: "property",
    header: "Property",
  },
  {
    accessorKey: "loanAmount",
    header: () => <div className="text-right">Loan Amount</div>,
    cell: ({ row }) => <div className="text-right">{row.getValue("loanAmount")}</div>,
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string
      return (
        <Badge 
          variant={status === "Active" ? "default" : status === "Closed" ? "secondary" : "outline"}
          className="text-xs"
        >
          {status}
        </Badge>
      )
    },
  },
]

export const lenderColumn: ColumnDef<Deal> = {
  accessorKey: "broker",
  header: "Broker",
  cell: ({ row }) => row.getValue("broker") || "-",
}

export const brokerColumn: ColumnDef<Deal> = {
  accessorKey: "lender",
  header: "Lender",
  cell: ({ row }) => row.getValue("lender") || "-",
}

export const daysActiveColumn: ColumnDef<Deal> = {
  accessorKey: "daysActive",
  header: () => <div className="text-right">Days Active</div>,
  cell: ({ row }) => <div className="text-right">{row.getValue("daysActive") || "-"}</div>,
}

interface DealsTableProps {
  data: Deal[]
  columns: ColumnDef<Deal>[]
}

export function DealsTable({ data, columns }: DealsTableProps) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  return (
    <div className="rounded-lg border">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id} className="text-sm">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No deals found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}
