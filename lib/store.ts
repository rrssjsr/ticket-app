// lib/store.ts
import { create } from 'zustand'

interface WalletState {
  balance: number
  deposit: (amount: number) => void
  withdraw: (amount: number) => boolean
  reset: () => void
}

interface TicketState {
  tickets: any[]
  addTicket: (ticket: any) => void
  removeTicket: (id: string) => void
  setTickets: (tickets: any[]) => void
  reset: () => void
}

export const useWalletStore = create<WalletState>((set, get) => ({
  balance: 0,
  deposit: (amount) => set({ balance: get().balance + amount }),
  withdraw: (amount) => {
    if (get().balance >= amount) {
      set({ balance: get().balance - amount })
      return true
    }
    return false
  },
  reset: () => set({ balance: 0 }),
}))

export const useTicketStore = create<TicketState>((set, get) => ({
  tickets: [],
  addTicket: (ticket) => set({ tickets: [...get().tickets, ticket] }),
  removeTicket: (id) =>
    set({ tickets: get().tickets.filter((t) => t.id !== id) }),
  setTickets: (tickets) => set({ tickets }),
  reset: () => set({ tickets: [] }),
}))

// Temporary direct export for server routes expecting 'tickets'
export const tickets = []

