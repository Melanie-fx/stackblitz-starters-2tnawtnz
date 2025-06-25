// app/api/ai-coach/route.ts

import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { prompt, user_id, token } = await req.json();

    // 1. Token Validation
    if (!token || token !== process.env.AI_COACH_TOKEN) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // 2. Basic usage logging
    console.log(`[AI COACH] User ${user_id} requested: "${prompt}" @ ${new Date().toISOString()}`);

    // 3. Simulate linking user context (Tradenova-specific)
    const userContext = {
      risk_level: 'medium',
      last_trade: 'EUR/USD',
      emotional_state: 'calm',
    };

    // 4. Smart logic — personalized trading suggestion
    const smartAdvice = `
Based on your last trade (${userContext.last_trade}) and emotional state (${userContext.emotional_state}),
you should focus on low-volatility setups this week. AI Coach recommends monitoring EUR/CHF and USD/SGD pairs.
`;

    // 5. Final AI response (simulated here, replace with OpenAI if needed)
    const reply = `Hello Trader! Here's your personalized advice: ${smartAdvice}`;

    return NextResponse.json({ reply });
  } catch (err: any) {
    console.error('AI Coach Error:', err);
    return NextResponse.json({ error: 'Server error, try again later.' }, { status: 500 });
  }
}