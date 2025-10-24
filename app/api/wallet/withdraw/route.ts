import { NextResponse } from 'next/server';
import { wallets } from '@/lib/store';

export async function POST(req: Request) {
  const body = await req.json();
  const user = String(body.user ?? 'buyer1');
  const amount = Number(body.amount ?? 0);
  if (!wallets[user]) wallets[user] = { user, balance: 0 };
  if (wallets[user].balance < amount) return new Response('Insufficient funds', { status: 400 });
  wallets[user].balance -= amount;
  return NextResponse.json(wallets[user]);
}
