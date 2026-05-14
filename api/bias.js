import OpenAI from 'openai'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' })
    return
  }
  try {
    const apiKey = process.env.GROQ_API_KEY
    if (!apiKey) { res.status(500).json({ error: 'Missing GROQ_API_KEY.' }); return }

    const { text } = req.body
    if (!text || typeof text !== 'string') { res.status(400).json({ error: 'No text provided.' }); return }

    const client = new OpenAI({ apiKey, baseURL: 'https://api.groq.com/openai/v1' })

    const completion = await client.chat.completions.create({
      model: 'llama3-8b-8192',
      messages: [
        {
          role: 'system',
          content:
            'You are a bias analysis AI. Analyse the provided text for bias. ' +
            'Respond ONLY with valid JSON, no other text: ' +
            '{"score":<integer 0-100>,"type":"<gender|racial|age|political|cultural|religious|none>","explanation":"<one concise sentence>"}. ' +
            'Score 0 = completely unbiased, 100 = extremely biased.',
        },
        { role: 'user', content: text.slice(0, 600) },
      ],
      temperature: 0.2,
      max_tokens: 180,
    })

    const raw = (completion.choices?.[0]?.message?.content ?? '').trim()
    const match = raw.match(/\{[\s\S]*\}/)
    if (!match) throw new Error('No JSON in model response')
    const parsed = JSON.parse(match[0])
    res.json({
      score: Math.max(0, Math.min(100, Number(parsed.score) || 0)),
      type: String(parsed.type || 'none'),
      explanation: String(parsed.explanation || ''),
    })
  } catch (err) {
    res.status(500).json({ error: err instanceof Error ? err.message : 'Unknown error' })
  }
}
