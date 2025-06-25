import { NextResponse } from 'next/server';

export async function GET() {
  const token = process.env.X_BEARER_TOKEN;
  const res = await fetch('https://api.twitter.com/2/tweets?ids=1453489038376132611', {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  const data = await res.json();
  return NextResponse.json(data);
}