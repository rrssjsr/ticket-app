'use client';
import useSWR from 'swr';
import { useState } from 'react';
const fetcher = (url: string) => fetch(url).then(r=>r.json());

export default function Wallet() {
  const { data, mutate } = useSWR('/api/wallet?user=buyer1', fetcher, { refreshInterval: 1500 });
  const [amt, setAmt] = useState('500');
  const [wd, setWd] = useState('200');
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">Wallet</h1>
      <div className="card space-y-3">
        <p>User: buyer1</p>
        <p>Balance: ₹{data?.balance ?? 0}</p>
        <form className="flex gap-2" onSubmit={async e => {
          e.preventDefault();
          await fetch('/api/wallet/deposit', { method: 'POST', headers: {'Content-Type':'application/json'}, body: JSON.stringify({ user: 'buyer1', amount: Number(amt) }) });
          setAmt('500');
          mutate();
        }}>
          <input className="input max-w-[200px]" type="number" value={amt} onChange={e=>setAmt(e.target.value)} />
          <button className="btn btn-primary" type="submit">Mock deposit</button>
        </form>
        <form className="flex gap-2" onSubmit={async e => {
          e.preventDefault();
          await fetch('/api/wallet/withdraw', { method: 'POST', headers: {'Content-Type':'application/json'}, body: JSON.stringify({ user: 'buyer1', amount: Number(wd) }) });
          setWd('200');
          mutate();
        }}>
          <input className="input max-w-[200px]" type="number" value={wd} onChange={e=>setWd(e.target.value)} />
          <button className="btn" type="submit">Mock withdraw</button>
        </form>
      </div>
    </div>
  );
}
