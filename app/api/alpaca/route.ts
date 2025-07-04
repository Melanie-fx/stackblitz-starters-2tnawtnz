// app/api/alpaca/route.ts
import { NextResponse } from 'next/server';

export async function GET() {
  const key = process.env.ALPACA_API_KEY;
  const secret = process.env.ALPACA_SECRET_KEY;

  if (!key || !secret) {
    return NextResponse.json({ error: 'Missing Alpaca API credentials' }, { status: 500 });
  }

  const res = await fetch('https://paper-api.alpaca.markets/v2/account', {
    headers: {
      'APCA-API-KEY-ID': key,
      'APCA-API-SECRET-KEY': secret,
    } as HeadersInit,
  });

  const data = await res.json();
  return NextResponse.json(data);
}
