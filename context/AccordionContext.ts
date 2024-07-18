import { createContext } from 'react'

type ContextType = {
  expanded: string
  setExpanded: (value: string) => void
}

export const AccordionContext = createContext<ContextType | null>(null)
