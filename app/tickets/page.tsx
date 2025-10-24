'use client';
import useSWR from 'swr';
import Link from 'next/link';
const fetcher = (url: string) => fetch(url).then(r=>r.json());

export default function Tickets() {
  const { data, error, isLoading } = useSWR('/api/tickets', fetcher, { refreshInterval: 2000 });
  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error</p>;
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">Live Auctions</h1>
      <div className="grid md:grid-cols-2 gap-4">
        {data.tickets.map((t: any) => (
          <div key={t.id} className="card">
            <div className="flex justify-between">
              <div>
                <div className="font-medium">{t.title}</div>
                <div className="text-gray-600">{t.event}</div>
                <div className="text-gray-600">Verified: {t.verified ? 'Yes' : 'No'}</div>
                <div className="text-gray-600">Status: {t.status}</div>
                <div className="mt-2">Top bid: ₹{t.topBid ? t.topBid.amount : t.minPrice}</div>
                <div className="text-sm text-gray-500">Ends in: {Math.max(0, Math.floor((t.endsAt - Date.now())/1000))}s</div>
              </div>
              <Link href={`/tickets/${t.id}`} className="btn btn-primary h-9">Open</Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
