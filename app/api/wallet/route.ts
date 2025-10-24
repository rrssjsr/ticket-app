import { NextResponse } from 'next/server';
import { wallets } from '@/lib/store';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const user = searchParams.get('user') ?? 'buyer1';
  const w = wallets[user] || { user, balance: 0 };
  return NextResponse.json(w);
}
