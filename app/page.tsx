import Link from 'next/link';

export default function Page() {
  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-bold">Ticket Marketplace</h1>
      <p className="text-gray-700">Buy and sell verified tickets with live bidding. SVKM-first rollout.</p>
      <ul className="list-disc pl-6 text-gray-700">
        <li>List tickets</li>
        <li>Bid in live auctions</li>
        <li>Wallet with preload-only bidding</li>
      </ul>
      <Link href="/tickets" className="btn btn-primary w-fit">Go to Tickets</Link>
    </div>
  );
}
