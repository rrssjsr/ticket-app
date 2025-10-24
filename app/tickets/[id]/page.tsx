'use client';
import { useState } from 'react';
import useSWR from 'swr';
import { useParams } from 'next/navigation';
const fetcher = (url: string) => fetch(url).then(r=>r.json());

export default function Ticket() {
  // @ts-ignore
  const { id } = useParams();
  const { data, isLoading, error, mutate } = useSWR(`/api/auctions/${id}`, fetcher, { refreshInterval: 3000 });
  const [amount, setAmount] = useState('');
  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error</p>;
  const t = data.ticket;
  return (
    <main>
      <h1>{t.title}</h1>
      <p>Event: {t.event}</p>
      <p>Verified: {t.verified ? 'Yes' : 'No'}</p>
      <p>Status: {t.status}</p>
      <p>Top bid: ₹{t.topBid ? t.topBid.amount : t.minPrice}</p>
      <form onSubmit={async e => {
        e.preventDefault();
        const res = await fetch('/api/bids', { method: 'POST', headers: {'Content-Type':'application/json'}, body: JSON.stringify({ ticketId: id, bidder: 'buyer1', amount: Number(amount) }) });
        if (!res.ok) { alert(await res.text()); return; }
        setAmount('');
        mutate();
      }}>
        <input type="number" value={amount} onChange={e=>setAmount(e.target.value)} placeholder="Bid amount" style={{marginRight:8}}/>
        <button type="submit">Place bid</button>
      </form>
      <p style={{marginTop:16}}><a href="/tickets">Back</a></p>
    </main>
  );
}
