import { NextResponse } from 'next/server';
import { tickets } from '@/lib/store';

type Params = { params: { id: string } };

export async function GET(_: Request, { params }: Params) {
  const t = tickets.find(x => x.id === params.id);
  if (!t) return new Response('Not found', { status: 404 });
  return NextResponse.json({ ticket: t });
}
