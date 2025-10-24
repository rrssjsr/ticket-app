'use client';
import { useState } from 'react';

export default function Sell() {
  const [title, setTitle] = useState('');
  const [event, setEvent] = useState('');
  const [minPrice, setMinPrice] = useState('2000');
  const [duration, setDuration] = useState('3600');
  const [verified, setVerified] = useState(true);

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">List a Ticket</h1>
      <form className="card space-y-3" onSubmit={async e=>{
        e.preventDefault();
        const endsAt = Date.now() + Number(duration)*1000;
        const res = await fetch('/api/tickets', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ title, event, minPrice:Number(minPrice), endsAt, seller:'sellerX', verified }) });
        if(!res.ok){ alert(await res.text()); return; }
        window.location.href = '/tickets';
      }}>
        <div>
          <div className="label">Title</div>
          <input className="input" value={title} onChange={e=>setTitle(e.target.value)} />
        </div>
        <div>
          <div className="label">Event</div>
          <input className="input" value={event} onChange={e=>setEvent(e.target.value)} />
        </div>
        <div>
          <div className="label">Min Price</div>
          <input className="input" type="number" value={minPrice} onChange={e=>setMinPrice(e.target.value)} />
        </div>
        <div>
          <div className="label">Duration (seconds)</div>
          <input className="input" type="number" value={duration} onChange={e=>setDuration(e.target.value)} />
        </div>
        <label className="inline-flex items-center gap-2">
          <input type="checkbox" checked={verified} onChange={e=>setVerified(e.target.checked)} />
          Verified
        </label>
        <button className="btn btn-primary w-fit" type="submit">Create auction</button>
      </form>
    </div>
  );
}
