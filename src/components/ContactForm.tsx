import { Send } from 'lucide-react'
import { useState } from 'react'

export default function ContactForm() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    setErrorMsg('')

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message }),
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || 'Failed to send message')
      }

      setStatus('success')
      setName('')
      setEmail('')
      setMessage('')
      setTimeout(() => setStatus('idle'), 5000)
    } catch (err) {
      setStatus('error')
      setErrorMsg(err instanceof Error ? err.message : 'Failed to send message')
    }
  }

  return (
    <div className="card glass">
      <div className="card-title">Send a Message</div>
      <div className="muted">Have a project in mind or want to discuss AI/ML? Drop me a message.</div>

      <form className="form" onSubmit={handleSubmit}>
        <label>
          Your name
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name"
            required
          />
        </label>
        <label>
          Your email
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
            required
          />
        </label>
        <label>
          Message
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Write your message…"
            required
            style={{ minHeight: '120px', fontFamily: 'inherit', resize: 'vertical' }}
          />
        </label>

        <button
          className="btn btn-primary"
          type="submit"
          disabled={status === 'loading' || !name.trim() || !email.trim() || !message.trim()}
        >
          <Send size={16} /> {status === 'loading' ? 'Sending...' : 'Send Message'}
        </button>

        {status === 'success' && (
          <div style={{ color: '#22c55e', fontSize: 13, padding: '8px 12px', borderRadius: 8, background: 'rgba(34, 197, 94, 0.1)', border: '1px solid rgba(34, 197, 94, 0.3)' }}>
            ✓ Message sent successfully! I'll get back to you soon.
          </div>
        )}
        {status === 'error' && (
          <div style={{ color: '#ef4444', fontSize: 13, padding: '8px 12px', borderRadius: 8, background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.3)' }}>
            ✗ {errorMsg}
          </div>
        )}
      </form>
    </div>
  )
}
