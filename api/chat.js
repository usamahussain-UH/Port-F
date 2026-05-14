import OpenAI from 'openai'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' })
    return
  }
  try {
    const apiKey = process.env.GROQ_API_KEY
    if (!apiKey) { res.status(500).json({ error: 'Missing GROQ_API_KEY in environment.' }); return }

    const client = new OpenAI({ apiKey, baseURL: 'https://api.groq.com/openai/v1' })
    const messages = Array.isArray(req.body?.messages) ? req.body.messages : []

    const completion = await client.chat.completions.create({
      model: process.env.GROQ_MODEL || 'llama-3.3-70b-versatile',
      messages,
      temperature: 0.7,
      max_tokens: 1024,
    })

    res.json({ content: completion.choices?.[0]?.message?.content ?? '' })
  } catch (err) {
    res.status(500).json({ error: err instanceof Error ? err.message : 'Unknown error' })
  }
}
