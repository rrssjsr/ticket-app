import { NextResponse } from 'next/server';
import { tickets, createTicket } from '@/lib/store';

export const dynamic = 'force-dynamic';

export async function GET() {
  return NextResponse.json({ tickets });
}

export async function POST(req: Request) {
  const body = await req.json();
  const { title, event, minPrice, endsAt, seller, verified } = body || {};
  if (!title || !event || typeof minPrice !== 'number' || typeof endsAt !== 'number') return new Response('Invalid payload', { status: 400 });
  const t = createTicket({ title: String(title), event: String(event), minPrice: Number(minPrice), endsAt: Number(endsAt), seller: String(seller||'sellerX'), verified: Boolean(verified) });
  return NextResponse.json({ ticket: t });
}
