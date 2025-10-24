'use client';
import { useState } from 'react';

export default function Sell() {
  const [title, setTitle] = useState('');
  const [event, setEvent] = useState('');
  const [minPrice, setMinPrice] = useState('2000');
  const [duration, setDuration] = useState('3600');
  const [verified, setVerified] = useState(true);

  return (
    <main>
      <h1>List a Ticket</h1>
      <form onSubmit={async e=>{
        e.preventDefault();
        const endsAt = Date.now() + Number(duration)*1000;
        const res = await fetch('/api/tickets', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ title, event, minPrice:Number(minPrice), endsAt, seller:'sellerX', verified }) });
        if(!res.ok){ alert(await res.text()); return; }
        window.location.href = '/tickets';
      }}>
        <div><input placeholder="Title" value={title} onChange={e=>setTitle(e.target.value)} /></div>
        <div><input placeholder="Event" value={event} onChange={e=>setEvent(e.target.value)} /></div>
        <div><input type="number" placeholder="Min price" value={minPrice} onChange={e=>setMinPrice(e.target.value)} /></div>
        <div><input type="number" placeholder="Duration seconds" value={duration} onChange={e=>setDuration(e.target.value)} /></div>
        <div><label><input type="checkbox" checked={verified} onChange={e=>setVerified(e.target.checked)} /> Verified</label></div>
        <button type="submit">Create auction</button>
      </form>
    </main>
  );
}
