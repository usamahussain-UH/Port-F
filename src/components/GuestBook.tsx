import { MessageSquarePlus, Send } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'

type Entry = { id: string; name: string; remark: string; createdAt: number }
const STORAGE_KEY = 'guestbook_entries_v1'

function uid() {
  return `${Date.now()}_${Math.random().toString(16).slice(2)}`
}

export default function GuestBook() {
  const [name, setName] = useState('')
  const [remark, setRemark] = useState('')
  const [entries, setEntries] = useState<Entry[]>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (!raw) return []
      const parsed = JSON.parse(raw) as Entry[]
      return Array.isArray(parsed) ? parsed : []
    } catch {
      return []
    }
  })

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(entries))
  }, [entries])

  const sorted = useMemo(() => [...entries].sort((a, b) => b.createdAt - a.createdAt), [entries])

  function add() {
    const n = name.trim() || 'Anonymous'
    const r = remark.trim()
    if (!r) return
    setEntries((e) => [{ id: uid(), name: n, remark: r, createdAt: Date.now() }, ...e].slice(0, 50))
    setRemark('')
  }

  return (
    <div className="card glass">
      <div className="row between wrap gap">
        <div>
          <div className="card-title">
            <MessageSquarePlus size={18} /> Guest Book
          </div>
          <div className="muted">Leave a remark. (Saved locally for now; can be upgraded to Supabase.)</div>
        </div>
        <div className="muted">{sorted.length} remarks</div>
      </div>

      <div className="form">
        <label>
          Your name
          <input value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Usama" />
        </label>
        <label>
          Remark
          <input value={remark} onChange={(e) => setRemark(e.target.value)} placeholder="Write something awesome…" />
        </label>
        <button className="btn btn-primary" type="button" onClick={add} disabled={!remark.trim()}>
          <Send size={16} /> Submit
        </button>
      </div>

      <div className="remarks">
        {sorted.length === 0 ? (
          <div className="muted">No remarks yet. Be the first.</div>
        ) : (
          sorted.map((e) => (
            <div key={e.id} className="remark glass">
              <div className="remark-top">
                <div className="remark-name">{e.name}</div>
                <div className="remark-time">{new Date(e.createdAt).toLocaleString()}</div>
              </div>
              <div className="remark-text">{e.remark}</div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
