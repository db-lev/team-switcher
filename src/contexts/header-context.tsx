"use client"

import * as React from "react"

type HeaderContextType = {
  title?: string
  setTitle: (title: string | undefined) => void
  headerContent?: React.ReactNode
  setHeaderContent: (content: React.ReactNode) => void
  headerActions?: React.ReactNode
  setHeaderActions: (actions: React.ReactNode) => void
}

const HeaderContext = React.createContext<HeaderContextType | undefined>(undefined)

export function HeaderProvider({ children }: { children: React.ReactNode }) {
  const [title, setTitle] = React.useState<string | undefined>(undefined)
  const [headerContent, setHeaderContent] = React.useState<React.ReactNode>(undefined)
  const [headerActions, setHeaderActions] = React.useState<React.ReactNode>(undefined)

  return (
    <HeaderContext.Provider
      value={{
        title,
        setTitle,
        headerContent,
        setHeaderContent,
        headerActions,
        setHeaderActions,
      }}
    >
      {children}
    </HeaderContext.Provider>
  )
}

export function useHeader() {
  const context = React.useContext(HeaderContext)
  if (!context) {
    throw new Error("useHeader must be used within a HeaderProvider")
  }
  return context
}
