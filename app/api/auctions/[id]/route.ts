import { NextResponse } from 'next/server';
import { tickets } from '@/lib/store';

export async function GET(req: Request, context: { params: { id: string } }) {
  const id = context.params.id;
  const t = tickets.find(x => x.id === id);
  if (!t) return new Response('Not found', { status: 404 });
  return NextResponse.json({ ticket: t });
}
