Deployed on Vercel. No env vars required. In-memory mock store.

Pages:
- /tickets            list auctions
- /tickets/[id]       bid page
- /sell               create auction
- /wallet             mock wallet

API:
- GET/POST /api/tickets
- GET /api/auctions/:id
- POST /api/bids { ticketId, bidder, amount }
- GET /api/wallet?user=buyer1
- POST /api/wallet/deposit { user, amount }
- POST /api/wallet/withdraw { user, amount }
- POST /api/auctions/close { id }
