export async function GET() {
  const token = process.env.DERIV_TOKEN;

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

  const data = await response.json();
  return Response.json(data);
}