import { useEffect, useMemo, useRef, useState } from 'react'
import { Bot, Download, Shield, Send, User } from 'lucide-react'

type Role = 'user' | 'assistant'
type Msg = { id: string; role: Role; content: string }

function uid() {
  return `${Date.now()}_${Math.random().toString(16).slice(2)}`
}

function demoBrain(prompt: string) {
  const p = prompt.trim().toLowerCase()
  if (!p) return 'Ask me anything about projects, skills, or how this portfolio was built.'
  if (p.includes('project'))
    return 'Projects: AI Resume Analyzer • Neural Notes • Smart Portfolio Assistant. Want a detailed breakdown of one?'
  if (p.includes('tech') || p.includes('stack'))
    return 'Stack: React + TypeScript + Vite, glass UI, motion animations. Live LLM can be added via a secure backend endpoint.'
  if (p.includes('contact')) return 'You can contact me via the Contact Me section. Add email/LinkedIn/GitHub there.'
  return `Demo reply (offline): I understood: "${prompt}". If you enable the live model, I can answer with real reasoning + up-to-date responses.`
}

export default function AiPlayground() {
  const [mode, setMode] = useState<'demo' | 'live'>('demo')
  const [busy, setBusy] = useState(false)
  const [input, setInput] = useState('')
  const [msgs, setMsgs] = useState<Msg[]>(() => [
    {
      id: uid(),
      role: 'assistant',
      content:
        'Welcome to the AI Playground. Demo mode works instantly. Live mode is a hook for your backend so API keys stay private.',
    },
  ])

  const canLive = useMemo(() => Boolean(import.meta.env.VITE_LIVE_CHAT === '1'), [])
  const listRef = useRef<HTMLDivElement | null>(null)

  async function send() {
    const text = input.trim()
    if (!text || busy) return

    setInput('')
    setBusy(true)
    const next: Msg[] = [...msgs, { id: uid(), role: 'user' as const, content: text }]
    setMsgs(next)

    try {
      if (mode === 'demo' || !canLive) {
        const reply = demoBrain(text)
        const final: Msg[] = [...next, { id: uid(), role: 'assistant' as const, content: reply }]
        setMsgs(final)
        return
      }

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ messages: next.map(({ role, content }) => ({ role, content })) }),
      })
      if (!res.ok) throw new Error(`Request failed: ${res.status}`)
      const data = (await res.json()) as { content?: string }
      const final: Msg[] = [...next, { id: uid(), role: 'assistant' as const, content: data.content ?? 'No response.' }]
      setMsgs(final)
    } catch (e) {
      const msg = e instanceof Error ? e.message : 'Unknown error'
      setMsgs((m) => [...m, { id: uid(), role: 'assistant', content: `Live chat error: ${msg}` }])
    } finally {
      setBusy(false)
      queueMicrotask(() => listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: 'smooth' }))
    }
  }

  return (
    <div className="card glass">
      <div className="row between wrap gap">
        <div>
          <div className="card-title">Chat</div>
          <div className="muted">
            <span className="chip-inline">
              <Shield size={14} /> Keys stay private (via backend)
            </span>
          </div>
        </div>

        <div className="seg">
          <button type="button" className={mode === 'demo' ? 'seg-on' : 'seg-off'} onClick={() => setMode('demo')}>
            Demo
          </button>
          <button
            type="button"
            className={mode === 'live' ? 'seg-on' : 'seg-off'}
            onClick={() => setMode('live')}
            disabled={!canLive}
            title={!canLive ? 'Enable with VITE_LIVE_CHAT=1 and /api/chat backend' : undefined}
          >
            Live
          </button>
        </div>
      </div>

      <div className="chat" ref={listRef}>
        {msgs.map((m) => (
          <div key={m.id} className={m.role === 'user' ? 'chat-row chat-row-user' : 'chat-row chat-row-bot'}>
            <div className="chat-avatar">{m.role === 'user' ? <User size={16} /> : <Bot size={16} />}</div>
            <div className="chat-bubble">
              <div className="chat-role">{m.role === 'user' ? 'You' : 'AI'}</div>
              <div className="chat-text">{m.content}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="chat-input">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => (e.key === 'Enter' ? send() : undefined)}
          placeholder={mode === 'live' && canLive ? 'Ask the live model…' : 'Ask the demo brain…'}
          disabled={busy}
        />
        <button type="button" className="btn btn-primary" onClick={send} disabled={busy || !input.trim()}>
          <Send size={16} /> Send
        </button>
      </div>
    </div>
  )
}
