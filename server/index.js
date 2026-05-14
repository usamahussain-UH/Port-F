import 'dotenv/config'
import express from 'express'
import OpenAI from 'openai'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
import { existsSync } from 'fs'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const app = express()
app.use(express.json({ limit: '1mb' }))

app.get('/api/health', (_req, res) => {
  res.json({ ok: true })
})

app.post('/api/chat', async (req, res) => {
  try {
    const apiKey = process.env.GROQ_API_KEY
    if (!apiKey) {
      res.status(500).json({ error: 'Missing GROQ_API_KEY in environment.' })
      return
    }

    const client = new OpenAI({
      apiKey,
      baseURL: 'https://api.groq.com/openai/v1',
    })

    const messages = Array.isArray(req.body?.messages) ? req.body.messages : []

    const completion = await client.chat.completions.create({
      model: process.env.GROQ_MODEL || 'llama-3.3-70b-versatile',
      messages,
      temperature: 0.7,
      max_tokens: 1024,
    })

    const content = completion.choices?.[0]?.message?.content ?? ''
    res.json({ content })
  } catch (err) {
    const msg = err instanceof Error ? err.message : 'Unknown error'
    res.status(500).json({ error: msg })
  }
})

app.post('/api/bias', async (req, res) => {
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
})

// Serve built frontend in production
const distPath = join(__dirname, '..', 'dist')
if (process.env.NODE_ENV === 'production' && existsSync(distPath)) {
  app.use(express.static(distPath))
  app.get('*', (_req, res) => res.sendFile(join(distPath, 'index.html')))
}

const port = Number(process.env.PORT || 8787)
app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Server listening on http://localhost:${port}`)
})
