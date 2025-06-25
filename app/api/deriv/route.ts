// app/api/deriv/route.ts
export const dynamic = 'force-dynamic';

export async function GET() {
  const token = process.env.DERIV_TOKEN;

  try {
    const response = await fetch('https://api.deriv.com/websockets/v3', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ticks: 'R_100',
      }),
    });

    if (!response.ok) {
      return new Response(JSON.stringify({ error: 'Failed to fetch from Deriv' }), { status: 500 });
    }

    const text = await response.text();
    const data = text ? JSON.parse(text) : {};
    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Unexpected error' }), { status: 500 });
  }
}
