export async function generateTextViaApi(prompt: string, options?: { model?: string; temperature?: number; max_tokens?: number }): Promise<string> {
  const res = await fetch('/api/generate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ prompt, ...options }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Failed to generate text');
  return data.result;
} 