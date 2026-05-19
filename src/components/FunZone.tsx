import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from 'chart.js'
import { Line } from 'react-chartjs-2'
import { Brain, TrendingUp, Eye, Zap, Code2, Cake } from 'lucide-react'
import { useEffect, useMemo, useRef, useState } from 'react'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Filler, Tooltip, Legend)

// ─── Shared Quiz Engine ───────────────────────────────────────────────────────

type QOpt = { text: string; id: string }
type QItem = { q: string; opts: QOpt[] }
type QResult = { name: string; emoji: string; desc: string; traits: string[] }

function QuizGame({
  title, icon, questions, results, tally,
}: {
  title: string
  icon: React.ReactNode
  questions: QItem[]
  results: Record<string, QResult>
  tally?: (ans: string[]) => string
}) {
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState<string[]>([])
  const [winner, setWinner] = useState<string | null>(null)

  function pick(id: string) {
    const next = [...answers, id]
    if (step >= questions.length - 1) {
      const fn = tally ?? defaultTally
      setAnswers(next)
      setWinner(fn(next))
    } else {
      setAnswers(next)
      setStep(step + 1)
    }
  }

  function reset() { setStep(0); setAnswers([]); setWinner(null) }

  if (winner) {
    const r = results[winner]
    if (!r) return null
    return (
      <div className="card glass hover-lift" style={{ display: 'flex', flexDirection: 'column' }}>
        <div className="card-title">{icon} {title}</div>
        <div style={{ flex: 1, textAlign: 'center', padding: '10px 0' }}>
          <div style={{ fontSize: 44, marginBottom: 8 }}>{r.emoji}</div>
          <div style={{ fontWeight: 900, fontSize: 17, color: 'var(--primary-2)', marginBottom: 8 }}>{r.name}</div>
          <div className="muted" style={{ fontSize: 13, marginBottom: 12, lineHeight: 1.6 }}>{r.desc}</div>
          <div className="chip-row" style={{ justifyContent: 'center' }}>
            {r.traits.map(t => <span key={t} className="chip">{t}</span>)}
          </div>
        </div>
        <button className="btn btn-ghost" type="button" onClick={reset} style={{ width: '100%', marginTop: 12 }}>
          Try Again
        </button>
      </div>
    )
  }

  const q = questions[step]!
  const pct = Math.round((step / questions.length) * 100)

  return (
    <div className="card glass hover-lift" style={{ display: 'flex', flexDirection: 'column' }}>
      <div className="card-title">{icon} {title}</div>
      <div className="muted" style={{ fontSize: 11, marginBottom: 6 }}>
        Question {step + 1} of {questions.length}
      </div>
      <div style={{ height: 3, borderRadius: 99, background: 'rgba(255,255,255,0.08)', marginBottom: 14, overflow: 'hidden' }}>
        <div style={{ height: '100%', width: `${pct}%`, background: 'linear-gradient(90deg, var(--primary), var(--primary-2))', transition: 'width 0.3s' }} />
      </div>
      <div style={{ fontWeight: 700, color: 'var(--text-strong)', marginBottom: 12, flex: 1 }}>{q.q}</div>
      <div style={{ display: 'grid', gap: 8 }}>
        {q.opts.map(o => (
          <button
            key={o.id + o.text}
            type="button"
            className="btn btn-ghost"
            style={{ textAlign: 'left', justifyContent: 'flex-start', fontSize: 13 }}
            onClick={() => pick(o.id)}
          >
            {o.text}
          </button>
        ))}
      </div>
    </div>
  )
}

function defaultTally(ans: string[]): string {
  const c: Record<string, number> = {}
  ans.forEach(a => { c[a] = (c[a] ?? 0) + 1 })
  return Object.entries(c).sort((a, b) => b[1] - a[1])[0]?.[0] ?? ''
}

// ─── Widget 1: ML Model Quiz ──────────────────────────────────────────────────

const ML_Q: QItem[] = [
  {
    q: 'How do you handle a messy room?',
    opts: [
      { text: 'Sort everything into neat categories', id: 'kmeans' },
      { text: 'Try random approaches until one sticks', id: 'forest' },
      { text: 'Find the simplest, most direct solution', id: 'linear' },
      { text: 'Draw a clear boundary: clean side vs messy', id: 'svm' },
    ],
  },
  {
    q: 'Pick a weekend activity:',
    opts: [
      { text: 'Chess: recognising deep patterns', id: 'neural' },
      { text: 'Hiking and grouping friends by vibe', id: 'kmeans' },
      { text: 'Archery: all about precision', id: 'linear' },
      { text: 'Debating with clear, opposing sides', id: 'svm' },
    ],
  },
  {
    q: 'When making a tough decision, you:',
    opts: [
      { text: 'Trust gut feeling built from experience', id: 'neural' },
      { text: 'Ask many people, take the majority vote', id: 'forest' },
      { text: 'Find the trend and follow it', id: 'linear' },
      { text: 'Maximise the gap between your options', id: 'svm' },
    ],
  },
  {
    q: 'Describe your thinking style:',
    opts: [
      { text: 'Layer by layer, I build on each thought', id: 'neural' },
      { text: 'Try many paths, combine the best', id: 'forest' },
      { text: 'Spot the pattern, draw the line', id: 'linear' },
      { text: 'Group by similarity, then label', id: 'kmeans' },
    ],
  },
  {
    q: 'How do you handle being wrong?',
    opts: [
      { text: 'Back-propagate: adjust and retry', id: 'neural' },
      { text: 'Consult more sources to reduce error', id: 'forest' },
      { text: 'Recalculate the slope', id: 'linear' },
      { text: 'Re-draw the decision boundary', id: 'svm' },
    ],
  },
]

const ML_R: Record<string, QResult> = {
  neural: { name: 'Neural Network', emoji: '🧠', desc: 'Deep, adaptive, and complexity-hungry. Once trained, unstoppable.', traits: ['Highly adaptive', 'Pattern obsessed', 'Experience-driven'] },
  forest: { name: 'Random Forest', emoji: '🌳', desc: 'Collaborative and robust. You aggregate opinions and almost never overfit.', traits: ['Team player', 'Low variance', 'Chaos-resistant'] },
  linear: { name: 'Linear Regression', emoji: '📈', desc: 'Elegant and straight to the point. Others say simple, you say clarity.', traits: ['Minimalist', 'Fast thinker', 'Directness'] },
  kmeans: { name: 'K-Means Clustering', emoji: '🎯', desc: 'Natural organiser. You find structure where others see chaos.', traits: ['Highly organised', 'Visual thinker', 'Pattern seeker'] },
  svm: { name: 'Support Vector Machine', emoji: '⚔️', desc: 'Precise, principled, boundary-obsessed. Maximum margin in everything.', traits: ['Sharp boundaries', 'Principled', 'Precision-first'] },
}

// ─── Widget 2: Accuracy Predictor ────────────────────────────────────────────

function simulateCurves(epochs: number, lr: number, split: number) {
  const N = 28
  const labels: number[] = []
  const trainD: number[] = []
  const valD: number[] = []
  const lrScale = Math.min(lr * 6, 1)

  for (let i = 0; i <= N; i++) {
    const t = i / N
    const e = Math.round(t * epochs)
    const growth = 1 / (1 + Math.exp(-10 * lrScale * (t - 0.25)))
    let train = 0.5 + 0.47 * growth + Math.sin(i * 5.7) * 0.005
    const overfit = Math.max(0, (t - 0.52) * (epochs / 220) * 0.38)
    let val = train - 0.035 - overfit + (split - 70) / 1000

    if (lr > 0.45) {
      const osc = Math.sin(t * 14) * 0.07 * (lr - 0.4)
      train += osc; val += osc * 0.4 - 0.06 * (lr - 0.4)
    }
    if (lr < 0.006) {
      const s = lr / 0.006
      train = 0.5 + (train - 0.5) * s
      val = 0.5 + (val - 0.5) * s * 0.88
    }

    labels.push(e)
    trainD.push(+Math.min(0.995, Math.max(0.46, train)).toFixed(3))
    valD.push(+Math.min(0.99, Math.max(0.38, val)).toFixed(3))
  }
  return { labels, trainD, valD }
}

function modelStatus(train: number[], val: number[]) {
  const t = train.at(-1) ?? 0, v = val.at(-1) ?? 0, gap = t - v
  if (t < 0.68) return { text: 'Underfitting: model not learning enough', color: '#fbbf24' }
  if (gap > 0.13) return { text: 'Overfitting detected: validation degrading', color: '#ef4444' }
  if (gap > 0.07) return { text: 'Slight overfitting: monitor validation', color: '#f97316' }
  return { text: 'Well balanced model: good generalisation', color: '#34d399' }
}

function AccuracyPredictor() {
  const [lr, setLr] = useState(0.05)
  const [epochs, setEpochs] = useState(120)
  const [split, setSplit] = useState(80)

  const { labels, trainD, valD } = useMemo(() => simulateCurves(epochs, lr, split), [epochs, lr, split])
  const status = useMemo(() => modelStatus(trainD, valD), [trainD, valD])

  const chartData = {
    labels: labels.map(String),
    datasets: [
      { label: 'Training', data: trainD, borderColor: '#8b5cf6', backgroundColor: 'rgba(139,92,246,0.12)', fill: true, tension: 0.4, pointRadius: 0, borderWidth: 2 },
      { label: 'Validation', data: valD, borderColor: '#22d3ee', backgroundColor: 'rgba(34,211,238,0.08)', fill: true, tension: 0.4, pointRadius: 0, borderWidth: 2 },
    ],
  }

  const chartOpts = useMemo(() => ({
    responsive: true, maintainAspectRatio: false,
    animation: { duration: 180 },
    plugins: {
      legend: { labels: { color: 'rgba(255,255,255,0.65)', boxWidth: 10, font: { size: 11 } } },
      tooltip: { mode: 'index' as const, intersect: false },
    },
    scales: {
      x: { ticks: { color: 'rgba(255,255,255,0.38)', maxTicksLimit: 5, font: { size: 10 } }, grid: { color: 'rgba(255,255,255,0.06)' } },
      y: {
        min: 0.35, max: 1.0,
        ticks: { color: 'rgba(255,255,255,0.38)', font: { size: 10 }, callback: ((v: unknown) => `${Math.round(Number(v) * 100)}%`) as never },
        grid: { color: 'rgba(255,255,255,0.06)' },
      },
    },
  }), [])

  return (
    <div className="card glass hover-lift">
      <div className="card-title"><TrendingUp size={18} /> Model Accuracy Predictor</div>
      <div style={{ height: 170, marginBottom: 10 }}>
        <Line data={chartData} options={chartOpts} />
      </div>
      <div style={{ display: 'grid', gap: 8, marginBottom: 10 }}>
        {[
          { label: `Learning Rate: ${lr < 0.01 ? lr.toFixed(4) : lr.toFixed(3)}`, min: 0.001, max: 1, step: 0.001, val: lr, set: setLr },
          { label: `Epochs: ${epochs}`, min: 10, max: 500, step: 10, val: epochs, set: setEpochs },
          { label: `Train Split: ${split}%`, min: 50, max: 90, step: 5, val: split, set: setSplit },
        ].map(s => (
          <div key={s.label}>
            <div style={{ fontSize: 11, color: 'var(--muted)', marginBottom: 3 }}>{s.label}</div>
            <input type="range" className="slider" min={s.min} max={s.max} step={s.step}
              value={s.val} onChange={e => s.set(Number(e.target.value) as never)} />
          </div>
        ))}
      </div>
      <div className="note" style={{ fontSize: 12, color: status.color, borderColor: `${status.color}44`, background: `${status.color}12` }}>
        {status.text}
      </div>
    </div>
  )
}

// ─── Widget 3: Bias Detector ──────────────────────────────────────────────────

type BiasResult = { score: number; type: string; explanation: string }

function BiasDetector() {
  const [text, setText] = useState('')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<BiasResult | null>(null)
  const [error, setError] = useState('')

  async function analyse() {
    if (!text.trim()) return
    setLoading(true); setError(''); setResult(null)
    try {
      const res = await fetch('/api/bias', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ text: text.trim() }),
      })
      if (!res.ok) throw new Error(`Server error ${res.status}`)
      setResult(await res.json())
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Unknown error')
    } finally {
      setLoading(false)
    }
  }

  const scoreColor = result
    ? result.score < 30 ? '#34d399' : result.score < 60 ? '#fbbf24' : '#ef4444'
    : 'var(--primary)'

  return (
    <div className="card glass hover-lift">
      <div className="card-title"><Eye size={18} /> Live Bias Detector</div>
      <div className="muted" style={{ fontSize: 12, marginBottom: 10 }}>Type any sentence. AI analyses it for hidden bias.</div>
      <textarea
        value={text}
        onChange={e => setText(e.target.value)}
        placeholder="e.g. Engineers make better leaders than teachers…"
        rows={3}
        style={{ resize: 'none', borderRadius: 12, padding: '10px 12px', border: '1px solid rgba(255,255,255,0.16)', background: 'rgba(255,255,255,0.04)', color: 'var(--text-strong)', outline: 'none', width: '100%', marginBottom: 8, fontSize: 13 }}
      />
      <button className="btn btn-primary" type="button" onClick={analyse} disabled={loading || !text.trim()} style={{ width: '100%' }}>
        {loading ? 'Analysing…' : 'Analyse →'}
      </button>
      {error && <div className="note" style={{ marginTop: 8, color: '#ef4444' }}>{error}</div>}
      {result && (
        <div style={{ marginTop: 12 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
            <span style={{ fontSize: 12, color: 'var(--muted)' }}>Bias Score</span>
            <span style={{ fontSize: 13, fontWeight: 700, color: scoreColor }}>{result.score}/100</span>
          </div>
          <div style={{ height: 8, borderRadius: 99, background: 'rgba(255,255,255,0.08)', overflow: 'hidden', marginBottom: 10 }}>
            <div style={{ height: '100%', width: `${result.score}%`, background: scoreColor, borderRadius: 99, transition: 'width 0.6s ease' }} />
          </div>
          <span className="chip" style={{ background: `${scoreColor}22`, borderColor: `${scoreColor}55`, color: scoreColor, marginBottom: 8, display: 'inline-block' }}>
            {result.type.charAt(0).toUpperCase() + result.type.slice(1)} bias
          </span>
          <div className="note" style={{ fontSize: 12 }}>{result.explanation}</div>
        </div>
      )}
    </div>
  )
}

// ─── Widget 4: Reaction Time Tester ──────────────────────────────────────────

const ROUNDS = 5

function ratingFor(ms: number) {
  if (ms < 200) return { text: 'Ninja Reflexes ⚡', color: '#34d399' }
  if (ms < 300) return { text: 'Sharp! 🎯', color: '#22d3ee' }
  if (ms < 400) return { text: 'Average 👍', color: '#fbbf24' }
  return { text: 'Keep Practising 🐢', color: '#ef4444' }
}

function ReactionTester() {
  const [phase, setPhase] = useState<'idle' | 'waiting' | 'go' | 'tooearly'>('idle')
  const [times, setTimes] = useState<number[]>([])
  const [startMs, setStartMs] = useState(0)
  const tRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => () => { if (tRef.current) clearTimeout(tRef.current) }, [])

  function scheduleGo() {
    setPhase('waiting')
    tRef.current = setTimeout(() => {
      setPhase('go')
      setStartMs(Date.now())
    }, 1000 + Math.random() * 3000)
  }

  function handleClick() {
    if (phase === 'idle') { scheduleGo(); return }
    if (phase === 'waiting') { if (tRef.current) clearTimeout(tRef.current); setPhase('tooearly'); return }
    if (phase === 'go') {
      const elapsed = Date.now() - startMs
      const next = [...times, elapsed]
      setTimes(next)
      if (next.length < ROUNDS) scheduleGo()
      else setPhase('idle')
    }
    if (phase === 'tooearly') scheduleGo()
  }

  function reset() { if (tRef.current) clearTimeout(tRef.current); setPhase('idle'); setTimes([]) }

  const avg = times.length ? Math.round(times.reduce((a, b) => a + b, 0) / times.length) : 0
  const done = times.length >= ROUNDS
  const rating = done ? ratingFor(avg) : null

  const boxBg = phase === 'go' ? '#22c55e' : phase === 'waiting' ? '#ef4444' : 'rgba(255,255,255,0.06)'
  const boxLabel = phase === 'idle' && !done ? (times.length === 0 ? 'Click to Start' : `Round ${times.length + 1}/${ROUNDS}: Click!`) :
    phase === 'waiting' ? 'Wait…' :
    phase === 'go' ? 'CLICK NOW!' :
    phase === 'tooearly' ? 'Too early! Click to retry' : ''

  return (
    <div className="card glass hover-lift">
      <div className="card-title"><Zap size={18} /> Reaction Time Tester</div>
      {!done ? (
        <>
          <button
            type="button"
            onClick={handleClick}
            style={{
              width: '100%', height: 110, borderRadius: 14, border: 'none', cursor: 'pointer',
              background: boxBg, color: '#fff', fontWeight: 900, fontSize: 16,
              transition: 'background 0.15s', marginBottom: 10,
            }}
          >
            {boxLabel}
          </button>
          <div style={{ display: 'grid', gap: 4 }}>
            {times.map((t, i) => {
              const r = ratingFor(t)
              return (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12 }}>
                  <span className="muted">Round {i + 1}</span>
                  <span style={{ color: r.color, fontWeight: 700 }}>{t} ms: {r.text}</span>
                </div>
              )
            })}
          </div>
        </>
      ) : (
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: 36, marginBottom: 6 }}>🏁</div>
          <div style={{ fontSize: 28, fontWeight: 900, color: rating!.color, marginBottom: 4 }}>{avg} ms</div>
          <div style={{ fontWeight: 700, color: rating!.color, marginBottom: 12 }}>{rating!.text}</div>
          <div style={{ display: 'grid', gap: 4, marginBottom: 12 }}>
            {times.map((t, i) => {
              const r = ratingFor(t)
              return (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12 }}>
                  <span className="muted">Round {i + 1}</span>
                  <span style={{ color: r.color }}>{t} ms</span>
                </div>
              )
            })}
          </div>
          <button className="btn btn-ghost" type="button" onClick={reset} style={{ width: '100%' }}>Play Again</button>
        </div>
      )}
    </div>
  )
}

// ─── Widget 5: Developer Type Quiz ───────────────────────────────────────────

const DEV_Q: QItem[] = [
  {
    q: 'Your app is slow. First thing you fix?',
    opts: [
      { text: 'Minify assets, reduce paint operations', id: 'frontend' },
      { text: 'Optimise DB queries and add caching', id: 'backend' },
      { text: 'Scale the cluster, add load balancing', id: 'devops' },
      { text: 'Profile the model inference pipeline', id: 'data' },
    ],
  },
  {
    q: 'Pick a superpower:',
    opts: [
      { text: 'Make anything pixel-perfect instantly', id: 'frontend' },
      { text: 'Design APIs so clean they document themselves', id: 'backend' },
      { text: 'Zero-downtime deploys at will', id: 'devops' },
      { text: 'Predict the future with data', id: 'data' },
    ],
  },
  {
    q: 'Ideal Saturday project:',
    opts: [
      { text: 'Slick UI with micro-animations', id: 'frontend' },
      { text: 'Design and test a new REST endpoint', id: 'backend' },
      { text: 'Automate my entire home lab with Ansible', id: 'devops' },
      { text: 'Train a model on my Spotify history', id: 'data' },
    ],
  },
  {
    q: 'Your worst nightmare:',
    opts: [
      { text: 'A button 1px off on Firefox', id: 'frontend' },
      { text: 'An N+1 query in production', id: 'backend' },
      { text: 'A failed deploy on a Friday at 5pm', id: 'devops' },
      { text: 'Data leakage in my training set', id: 'data' },
    ],
  },
  {
    q: 'You open a new codebase. First thing you check?',
    opts: [
      { text: 'package.json and the component tree', id: 'frontend' },
      { text: 'Database schema and API routes', id: 'backend' },
      { text: 'The CI/CD pipeline and Dockerfile', id: 'devops' },
      { text: 'Data pipeline and model training scripts', id: 'data' },
    ],
  },
]

const DEV_R: Record<string, QResult> = {
  frontend: { name: 'Frontend Developer', emoji: '🎨', desc: 'You live for pixel-perfect UIs and smooth animations. You make people feel things.', traits: ['UI obsessed', 'Animation nerd', 'User empathy'] },
  backend: { name: 'Backend Developer', emoji: '⚙️', desc: 'The invisible force that makes everything work. APIs, databases, logic: all yours.', traits: ['Systems thinker', 'API craftsman', 'Performance hawk'] },
  devops: { name: 'DevOps Engineer', emoji: '🚀', desc: 'You move fast without breaking things. When things do break, you fix them at 3am without blinking.', traits: ['Automation-first', 'Infrastructure as code', 'Reliability guardian'] },
  data: { name: 'Data Scientist', emoji: '📊', desc: 'Numbers, models, insights: your language. You find signals in noise.', traits: ['Curious by nature', 'Stats-driven', 'Model whisperer'] },
  fullstack: { name: 'Full Stack Developer', emoji: '🔧', desc: 'You do it all. Frontend? Check. Backend? Check. Deploy? Also check.', traits: ['Context switcher', 'End-to-end thinker', 'Jack of all trades'] },
}

function devTally(ans: string[]): string {
  const c: Record<string, number> = {}
  ans.forEach(a => { c[a] = (c[a] ?? 0) + 1 })
  const sorted = Object.entries(c).sort((a, b) => b[1] - a[1])
  if (sorted.length >= 2 && sorted[0]![1] === sorted[1]![1]) {
    const pair = [sorted[0]![0], sorted[1]![0]].sort().join(',')
    if (pair === 'backend,frontend') return 'fullstack'
  }
  return sorted[0]?.[0] ?? 'frontend'
}

// ─── Widget 6: Birthday Predictor ────────────────────────────────────────────

const BDAY_STEPS = [
  'Think of your birth month number. January = 1, February = 2, all the way to December = 12. Hold it firmly in your mind.',
  'Multiply your birth month by 5.',
  'Add 6 to your current result.',
  'Multiply that number by 4.',
  'Now add 9.',
  'Multiply by 5 once more.',
  'Add your birth day number. 1st = 1, the 15th = 15, the 31st = 31.',
]

const MONTHS = ['January','February','March','April','May','June','July','August','September','October','November','December']

function BirthdayPredictor() {
  const [step, setStep] = useState(0)
  const [finalInput, setFinalInput] = useState('')
  const [result, setResult] = useState<{ month: number; day: number } | null>(null)
  const [error, setError] = useState('')

  function reveal() {
    const val = parseInt(finalInput.trim(), 10)
    if (Number.isNaN(val) || val < 0) { setError('Please enter a valid positive number.'); return }
    const month = Math.floor(val / 100)
    const day = val % 100
    if (month < 1 || month > 12 || day < 1 || day > 31) { setError('Number looks off. Retrace your steps and try again.'); return }
    setError('')
    setResult({ month, day })
  }

  function reset() { setStep(0); setFinalInput(''); setResult(null); setError('') }

  if (result) {
    return (
      <div className="card glass hover-lift" style={{ textAlign: 'center' }}>
        <div className="card-title" style={{ justifyContent: 'center', display: 'flex', gap: 6 }}><Cake size={18} /> Birthday Predictor</div>
        <div style={{ padding: '16px 0' }}>
          <div style={{ fontSize: 42, marginBottom: 10 }}>🎂</div>
          <div className="muted" style={{ fontSize: 13, marginBottom: 6 }}>Your birthday is…</div>
          <div style={{ fontSize: 26, fontWeight: 900, color: 'var(--primary-2)', marginBottom: 4 }}>
            {MONTHS[result.month - 1]} {result.day}
          </div>
          <div className="muted" style={{ fontSize: 12, marginBottom: 16 }}>Am I right? Pure maths, no tricks.</div>
          <button className="btn btn-ghost" type="button" onClick={reset} style={{ width: '100%' }}>Try Again</button>
        </div>
      </div>
    )
  }

  const isLastInstruction = step === BDAY_STEPS.length - 1
  const isRevealStep = step === BDAY_STEPS.length
  const pct = Math.round((step / (BDAY_STEPS.length + 1)) * 100)

  return (
    <div className="card glass hover-lift" style={{ display: 'flex', flexDirection: 'column' }}>
      <div className="card-title"><Cake size={18} /> Birthday Predictor</div>
      <div style={{ height: 3, borderRadius: 99, background: 'rgba(255,255,255,0.08)', marginBottom: 14, overflow: 'hidden' }}>
        <div style={{ height: '100%', width: `${pct}%`, background: 'linear-gradient(90deg, var(--primary), var(--primary-2))', transition: 'width 0.3s' }} />
      </div>
      <div className="muted" style={{ fontSize: 11, marginBottom: 8 }}>
        Step {step + 1} of {BDAY_STEPS.length + 1}
      </div>

      {!isRevealStep ? (
        <>
          {step < BDAY_STEPS.length && (
            <>
              <div className="card-title" style={{ fontSize: 14, marginBottom: 6 }}>Step {step + 1}</div>
              <div className="muted" style={{ fontSize: 13, lineHeight: 1.65, flex: 1, marginBottom: 16 }}>
                {BDAY_STEPS[step]}
              </div>
              <button
                className="btn btn-primary" type="button"
                onClick={() => setStep(s => s + 1)}
                style={{ width: '100%' }}
              >
                {isLastInstruction ? 'I have my number →' : 'Got it, Next →'}
              </button>
            </>
          )}
        </>
      ) : (
        <>
          <div className="card-title" style={{ fontSize: 14, marginBottom: 6 }}>Final Step</div>
          <div className="muted" style={{ fontSize: 13, marginBottom: 12 }}>
            Subtract 165 from your current number. Enter your final result below and I will read your birthday.
          </div>
          <div className="form">
            <input
              autoFocus type="number" value={finalInput}
              onChange={e => setFinalInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && reveal()}
              placeholder="Your final number…"
            />
            {error && <div className="note" style={{ color: '#ef4444', fontSize: 12 }}>{error}</div>}
            <button className="btn btn-primary" type="button" onClick={reveal} style={{ width: '100%' }}>
              🔮 Reveal My Birthday
            </button>
          </div>
        </>
      )}
    </div>
  )
}

// ─── Widget 7: I Know Your Siblings ──────────────────────────────────────────

const SIB_STEPS = [
  { op: null,        title: 'Think of your brothers',    instruction: 'Silently count how many brothers you have. Hold that number firmly in your mind, do not say it out loud.' },
  { op: '× 2',      title: 'Multiply by 2',             instruction: 'Take your brothers number and multiply it by 2. Keep the result in your head.' },
  { op: '+ 3',      title: 'Add 3',                     instruction: 'Add 3 to whatever number you have now.' },
  { op: '× 5',      title: 'Multiply by 5',             instruction: 'Multiply your current number by 5.' },
  { op: '+ sisters', title: 'Add your sisters',         instruction: 'Count how many sisters you have and add that number to your result. (If you have none, add 0.)' },
  { op: '× 10',     title: 'Add a zero at the end',     instruction: 'Append a zero to the end of your number, in other words multiply by 10.' },
  { op: '− 150',    title: 'Subtract 150',              instruction: 'Subtract 150 from your result. This is your final number. Write it down if you need to.' },
]

function SiblingReader() {
  const [step, setStep] = useState(0)
  const [finalInput, setFinalInput] = useState('')
  const [reveal, setReveal] = useState<{ brothers: number; sisters: number } | null>(null)
  const [error, setError] = useState('')

  function readMind() {
    const val = parseInt(finalInput.trim(), 10)
    if (Number.isNaN(val)) { setError('Please enter a valid number.'); return }
    const brothers = Math.floor(val / 100)
    const sisters = Math.floor((val % 100) / 10)
    if (brothers < 0 || sisters < 0) { setError('Number looks off. Retrace your steps and try again.'); return }
    setError('')
    setReveal({ brothers, sisters })
  }

  function reset() { setStep(0); setFinalInput(''); setReveal(null); setError('') }

  const totalSteps = SIB_STEPS.length
  const isRevealStep = step === totalSteps
  const pct = Math.round((step / totalSteps) * 100)
  const current = SIB_STEPS[step]

  if (reveal) {
    return (
      <div className="card glass hover-lift" style={{ textAlign: 'center' }}>
        <div className="card-title" style={{ justifyContent: 'center', display: 'flex', gap: 6 }}>
          <Brain size={18} /> I Know Your Siblings
        </div>
        <div style={{ padding: '14px 0' }}>
          <div style={{ fontSize: 40, marginBottom: 8 }}>🧠✨</div>
          <div style={{ fontWeight: 900, fontSize: 15, color: 'var(--text-strong)', marginBottom: 12 }}>You have…</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, maxWidth: 320, margin: '0 auto 14px' }}>
            <div className="note" style={{ textAlign: 'center' }}>
              <div className="muted" style={{ fontSize: 11, marginBottom: 2 }}>Brothers</div>
              <div style={{ fontSize: 30, fontWeight: 900, color: 'var(--primary)' }}>{reveal.brothers}</div>
            </div>
            <div className="note" style={{ textAlign: 'center' }}>
              <div className="muted" style={{ fontSize: 11, marginBottom: 2 }}>Sisters</div>
              <div style={{ fontSize: 30, fontWeight: 900, color: 'var(--primary-2)' }}>{reveal.sisters}</div>
            </div>
          </div>
          <div className="muted" style={{ fontSize: 12, marginBottom: 14 }}>Pure mathematics, no guessing, no tricks.</div>
          <button className="btn btn-ghost" type="button" onClick={reset}>Try again</button>
        </div>
      </div>
    )
  }

  if (isRevealStep) {
    return (
      <div className="card glass hover-lift">
        <div className="card-title"><Brain size={18} /> I Know Your Siblings</div>
        <div style={{ height: 3, borderRadius: 99, background: 'rgba(255,255,255,0.08)', marginBottom: 14, overflow: 'hidden' }}>
          <div style={{ height: '100%', width: '100%', background: 'linear-gradient(90deg, var(--primary), var(--primary-2))' }} />
        </div>
        <div className="card-title" style={{ fontSize: 14, marginBottom: 4 }}>🔮 Your final number?</div>
        <div className="muted" style={{ fontSize: 13, marginBottom: 12 }}>
          Type in the number you ended up with. I will tell you how many brothers and sisters you have, without you saying a word.
        </div>
        <div className="form">
          <input
            autoFocus type="number" value={finalInput}
            onChange={e => setFinalInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && readMind()}
            placeholder="Your final number…"
          />
          {error && <div className="note" style={{ color: '#ef4444', fontSize: 12 }}>{error}</div>}
          <button className="btn btn-primary" type="button" onClick={readMind} style={{ width: '100%' }}>Read My Mind</button>
        </div>
      </div>
    )
  }

  return (
    <div className="card glass hover-lift" style={{ display: 'flex', flexDirection: 'column' }}>
      <div className="card-title"><Brain size={18} /> I Know Your Siblings</div>
      <div style={{ height: 3, borderRadius: 99, background: 'rgba(255,255,255,0.08)', marginBottom: 14, overflow: 'hidden' }}>
        <div style={{ height: '100%', width: `${pct}%`, background: 'linear-gradient(90deg, var(--primary), var(--primary-2))', transition: 'width 0.3s' }} />
      </div>
      <div className="muted" style={{ fontSize: 11, marginBottom: 6 }}>Step {step + 1} of {totalSteps}</div>
      {current?.op && (
        <div style={{ display: 'inline-block', fontFamily: 'monospace', fontSize: 22, fontWeight: 900, color: 'var(--primary-2)', background: 'rgba(34,211,238,0.1)', border: '1px solid rgba(34,211,238,0.25)', borderRadius: 8, padding: '4px 14px', marginBottom: 8, alignSelf: 'flex-start' }}>
          {current.op}
        </div>
      )}
      <div className="card-title" style={{ marginBottom: 6 }}>{current?.title}</div>
      <div className="muted" style={{ fontSize: 13, lineHeight: 1.65, flex: 1, marginBottom: 16 }}>{current?.instruction}</div>
      <button className="btn btn-primary" type="button" onClick={() => setStep(s => s + 1)} style={{ width: '100%' }}>
        {step < totalSteps - 1 ? 'Got it, Next Step →' : 'I have my final number →'}
      </button>
    </div>
  )
}

// ─── Main ─────────────────────────────────────────────────────────────────────

export default function FunZone() {
  return (
    <div className="grid-2">
      <QuizGame title="What ML Model Are You?" icon={<Brain size={18} />} questions={ML_Q} results={ML_R} />
      <AccuracyPredictor />
      <BiasDetector />
      <ReactionTester />
      <QuizGame title="Which Developer Are You?" icon={<Code2 size={18} />} questions={DEV_Q} results={DEV_R} tally={devTally} />
      <BirthdayPredictor />
      <div className="full-span">
        <SiblingReader />
      </div>
    </div>
  )
}
