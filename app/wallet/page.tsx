'use client';
import useSWR from 'swr';
import { useState } from 'react';
const fetcher = (url: string) => fetch(url).then(r=>r.json());

export default function Wallet() {
  const { data, mutate } = useSWR('/api/wallet?user=buyer1', fetcher, { refreshInterval: 1500 });
  const [amt, setAmt] = useState('500');
  const [wd, setWd] = useState('200');
  return (
    <main>
      <h1>Wallet</h1>
      <p>User: buyer1</p>
      <p>Balance: ₹{data?.balance ?? 0}</p>
      <form onSubmit={async e => {
        e.preventDefault();
        await fetch('/api/wallet/deposit', { method: 'POST', headers: {'Content-Type':'application/json'}, body: JSON.stringify({ user: 'buyer1', amount: Number(amt) }) });
        setAmt('500');
        mutate();
      }}>
        <input type="number" value={amt} onChange={e=>setAmt(e.target.value)} />
        <button type="submit" style={{marginLeft:8}}>Mock deposit</button>
      </form>
      <form onSubmit={async e => {
        e.preventDefault();
        await fetch('/api/wallet/withdraw', { method: 'POST', headers: {'Content-Type':'application/json'}, body: JSON.stringify({ user: 'buyer1', amount: Number(wd) }) });
        setWd('200');
        mutate();
      }} style={{marginTop:12}}>
        <input type="number" value={wd} onChange={e=>setWd(e.target.value)} />
        <button type="submit" style={{marginLeft:8}}>Mock withdraw</button>
      </form>
    </main>
  );
}
