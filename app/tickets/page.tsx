'use client';
import useSWR from 'swr';
const fetcher = (url: string) => fetch(url).then(r=>r.json());

export default function Tickets() {
  const { data, error, isLoading } = useSWR('/api/tickets', fetcher, { refreshInterval: 3000 });
  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error</p>;
  return (
    <main>
      <h1>Live Auctions</h1>
      <ul>
        {data.tickets.map((t: any) => (
          <li key={t.id} style={{padding:12, border:'1px solid #ddd', marginBottom:12, borderRadius:8}}>
            <div style={{display:'flex', justifyContent:'space-between', gap:12}}>
              <div>
                <div><strong>{t.title}</strong> — {t.event}</div>
                <div>Verified: {t.verified ? 'Yes' : 'No'}</div>
                <div>Status: {t.status}</div>
                <div>Top bid: ₹{t.topBid ? t.topBid.amount : t.minPrice}</div>
                <div>Ends in: {Math.max(0, Math.floor((t.endsAt - Date.now())/1000))}s</div>
              </div>
              <a href={`/tickets/${t.id}`}>Open</a>
            </div>
          </li>
        ))}
      </ul>
    </main>
  );
}
