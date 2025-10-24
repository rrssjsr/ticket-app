import { NextResponse } from 'next/server';
import { placeBid } from '@/lib/store';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { ticketId, bidder, amount } = body;
    if (!ticketId || !bidder || typeof amount !== 'number') return new Response('Invalid payload', { status: 400 });
    const updated = placeBid(String(ticketId), String(bidder), Number(amount));
    return NextResponse.json({ ticket: updated });
  } catch (e: any) {
    return new Response(e.message ?? 'Error', { status: 400 });
  }
}
