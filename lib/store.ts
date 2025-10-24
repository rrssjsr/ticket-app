export type Ticket = {
  id: string;
  title: string;
  event: string;
  minPrice: number;
  endsAt: number; // epoch ms
  seller: string;
  verified: boolean;
  topBid?: { amount: number; bidder: string; at: number };
};

export type Wallet = { user: string; balance: number };

// In-memory mock DB. Replace with PostgreSQL later.
export const tickets: Ticket[] = [
  { id: "1", title: "Coldplay - Floor", event: "Coldplay Mumbai", minPrice: 5000, endsAt: Date.now() + 1000*60*30, seller: "seller1", verified: true },
  { id: "2", title: "Arijit Singh - Gold", event: "Arijit Mumbai", minPrice: 3000, endsAt: Date.now() + 1000*60*50, seller: "seller2", verified: false },
];

export const wallets: Record<string, Wallet> = {
  buyer1: { user: "buyer1", balance: 10000 },
  buyer2: { user: "buyer2", balance: 2000 }
};

export function placeBid(ticketId: string, bidder: string, amount: number) {
  const t = tickets.find(x => x.id === ticketId);
  if (!t) throw new Error("Ticket not found");
  const min = t.topBid ? t.topBid.amount + 100 : t.minPrice;
  if (amount < min) throw new Error("Bid too low");
  const w = wallets[bidder] || { user: bidder, balance: 0 };
  if (w.balance < amount) throw new Error("Insufficient wallet balance");
  t.topBid = { amount, bidder, at: Date.now() };
  return t;
}
