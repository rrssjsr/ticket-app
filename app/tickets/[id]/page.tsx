'use client';
import { useState } from 'react';
import useSWR from 'swr';
import { useParams } from 'next/navigation';
import Link from 'next/link';
const fetcher = (url: string) => fetch(url).then(r=>r.json());

export default function Ticket() {
  // @ts-ignore
  const { id } = useParams();
  const { data, isLoading, error, mutate } = useSWR(`/api/auctions/${id}`, fetcher, { refreshInterval: 2000 });
  const [amount, setAmount] = useState('');
  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error</p>;
  const t = data.ticket;
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">{t.title}</h1>
      <div className="card space-y-2">
        <p>Event: {t.event}</p>
        <p>Verified: {t.verified ? 'Yes' : 'No'}</p>
        <p>Status: {t.status}</p>
        <p>Top bid: ₹{t.topBid ? t.topBid.amount : t.minPrice}</p>
        <form className="flex gap-2" onSubmit={async e => {
          e.preventDefault();
          const res = await fetch('/api/bids', { method: 'POST', headers: {'Content-Type':'application/json'}, body: JSON.stringify({ ticketId: id, bidder: 'buyer1', amount: Number(amount) }) });
          if (!res.ok) { alert(await res.text()); return; }
          setAmount('');
          mutate();
        }}>
          <input className="input max-w-[200px]" type="number" value={amount} onChange={e=>setAmount(e.target.value)} placeholder="Bid amount"/>
          <button className="btn btn-primary" type="submit">Place bid</button>
        </form>
        <Link className="btn w-fit" href="/tickets">Back</Link>
      </div>
    </div>
  );
}
