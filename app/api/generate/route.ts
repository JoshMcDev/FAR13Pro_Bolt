import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';
import { createServerSupabaseClient } from '@/lib/supabaseServer';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// Simple in-memory rate limiter (per IP, resets on server restart)
const rateLimitMap = new Map<string, { count: number; last: number }>();
const RATE_LIMIT = 10; // max requests
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute

function getClientIp(req: NextRequest): string {
  return (
    req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    req.headers.get('x-real-ip') ||
    'unknown'
  );
}

export async function POST(req: NextRequest) {
  const supabase = createServerSupabaseClient();
  try {
    const body = await req.json();
    const prompt = typeof body.prompt === 'string' ? body.prompt.trim() : '';
    const model = typeof body.model === 'string' ? body.model : 'gpt-4';
    const temperature = typeof body.temperature === 'number' ? Math.max(0, Math.min(1, body.temperature)) : 0.7;
    const max_tokens = typeof body.max_tokens === 'number' ? Math.max(1, Math.min(4000, body.max_tokens)) : 1500;

    // Input validation
    if (!prompt || prompt.length < 2) {
      return NextResponse.json({ error: 'Prompt is required.' }, { status: 400 });
    }
    if (prompt.length > 2000) {
      return NextResponse.json({ error: 'Prompt is too long (max 2000 chars).' }, { status: 400 });
    }

    // Rate limiting
    const ip = getClientIp(req);
    const now = Date.now();
    const rl = rateLimitMap.get(ip) || { count: 0, last: now };
    if (now - rl.last > RATE_LIMIT_WINDOW) {
      rl.count = 0;
      rl.last = now;
    }
    rl.count++;
    rl.last = now;
    rateLimitMap.set(ip, rl);
    if (rl.count > RATE_LIMIT) {
      return NextResponse.json({ error: 'Rate limit exceeded. Please wait and try again.' }, { status: 429 });
    }

    // OpenAI call
    const completion = await openai.chat.completions.create({
      model,
      messages: [
        { role: 'system', content: 'You are an expert government contracting officer.' },
        { role: 'user', content: prompt }
      ],
      temperature,
      max_tokens
    });
    const result = completion.choices[0]?.message?.content || '';

    // Log to Supabase (non-blocking)
    supabase.from('ai_logs').insert({
      prompt,
      response: result,
      ip
    }).then(() => {}).catch((e) => console.error('Supabase log error:', e));

    return NextResponse.json({ result });
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Unknown error' }, { status: 500 });
  }
} 