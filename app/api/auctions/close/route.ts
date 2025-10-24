import { NextResponse } from 'next/server';
import { closeAuction } from '@/lib/store';

export async function POST(req: Request) {
  const body = await req.json();
  const id = String(body.id || '');
  if (!id) return new Response('Missing id', { status: 400 });
  const t = closeAuction(id);
  return NextResponse.json({ ticket: t });
}
