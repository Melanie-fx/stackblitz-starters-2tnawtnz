export async function GET() {
  const apiKey = process.env.POLYGON_API_KEY;

  if (!apiKey) {
    return new Response(JSON.stringify({ error: 'Missing Polygon API Key' }), {
      status: 500,
    });
  }

  try {
    const url = `https://api.polygon.io/v2/aggs/ticker/AAPL/prev?adjusted=true&apiKey=${apiKey}`;
    const res = await fetch(url);

    if (!res.ok) {
      return new Response(JSON.stringify({ error: 'Polygon API Error' }), {
        status: res.status,
      });
    }

    const data = await res.json();
    return Response.json(data);
  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message || 'Unknown error' }), {
      status: 500,
    });
  }
}