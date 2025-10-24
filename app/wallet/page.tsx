'use client';
import useSWR from 'swr';
import { useState } from 'react';
const fetcher = (url: string) => fetch(url).then(res => res.json());

export default function Wallet() {
  const { data, mutate } = useSWR('/api/wallet?user=buyer1', fetcher);
  const [amt, setAmt] = useState('500');
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
    </main>
  );
}
