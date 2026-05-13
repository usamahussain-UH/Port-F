import { Dices, Laugh, Sparkles } from 'lucide-react'
import { useMemo, useState } from 'react'

function clamp(n: number, a: number, b: number) {
  return Math.max(a, Math.min(b, n))
}

function yearsFromDob(dob: string) {
  const dt = new Date(dob)
  if (Number.isNaN(dt.getTime())) return null
  const now = new Date()
  let age = now.getFullYear() - dt.getFullYear()
  const m = now.getMonth() - dt.getMonth()
  if (m < 0 || (m === 0 && now.getDate() < dt.getDate())) age--
  return clamp(age, 0, 140)
}

export default function FunZone() {
  const reveal = useMemo(() => ({ age: 21, siblings: 2 }), [])
  const [guessAge, setGuessAge] = useState('')
  const [guessSib, setGuessSib] = useState('')
  const [result, setResult] = useState<string | null>(null)

  const [dob, setDob] = useState('')
  const computedAge = yearsFromDob(dob)

  const [lucky, setLucky] = useState<number | null>(null)
  const [fact, setFact] = useState<string | null>(null)

  const funFacts = useMemo(
    () => [
      'Your brain generates enough electricity to power a small light bulb.',
      'Octopuses have three hearts—so you can love coding three times more.',
      'Honey never spoils. Neither should your Git history.',
      'Bananas are berries. Strawberries are not.',
      'A day on Venus is longer than its year.',
    ],
    [],
  )

  function checkGuess() {
    const a = Number(guessAge)
    const s = Number(guessSib)
    if (!Number.isFinite(a) || !Number.isFinite(s)) {
      setResult('Enter valid numbers for age and siblings.')
      return
    }
    const ageDiff = Math.abs(a - reveal.age)
    const sibDiff = Math.abs(s - reveal.siblings)
    if (ageDiff === 0 && sibDiff === 0) setResult('Perfect guess. You have strong AI intuition.')
    else if (ageDiff <= 2 && sibDiff <= 1) setResult('Very close. Your prediction engine is warm.')
    else setResult('Not quite. Try again—your model will improve with more data.')
  }

  function rollLucky() {
    setLucky(1 + Math.floor(Math.random() * 99))
  }

  function nextFact() {
    setFact(funFacts[Math.floor(Math.random() * funFacts.length)] ?? null)
  }

  return (
    <div className="grid-3">
      <div className="card glass hover-lift">
        <div className="card-title">
          <Sparkles size={18} /> Guess my profile
        </div>
        <div className="muted">Try to guess my age and number of siblings (edit in code later).</div>
        <div className="form">
          <label>
            Age guess
            <input value={guessAge} onChange={(e) => setGuessAge(e.target.value)} placeholder="Age" />
          </label>
          <label>
            Siblings guess
            <input value={guessSib} onChange={(e) => setGuessSib(e.target.value)} placeholder="My Siblings" />
          </label>
          <button className="btn btn-primary" type="button" onClick={checkGuess}>
            Check
          </button>
          {result ? <div className="note">{result}</div> : null}
          <details className="muted">
            <summary>Reveal (for testing)</summary>
            Age: {reveal.age} • Siblings: {reveal.siblings}
          </details>
        </div>
      </div>

      <div className="card glass hover-lift">
        <div className="card-title">
          <Laugh size={18} /> Age calculator
        </div>
        <div className="muted">Pick your date of birth and I’ll calculate your age.</div>
        <div className="form">
          <label>
            Date of birth
            <input type="date" value={dob} onChange={(e) => setDob(e.target.value)} />
          </label>
          <div className="note">{computedAge === null ? 'Select a valid date.' : `Your age is ${computedAge}.`}</div>
        </div>
      </div>

      <div className="card glass hover-lift">
        <div className="card-title">
          <Dices size={18} /> Fun generator
        </div>
        <div className="muted">Instant entertainment: lucky number + fun fact.</div>
        <div className="form">
          <button className="btn btn-ghost" type="button" onClick={rollLucky}>
            Lucky number
          </button>
          <div className="note">{lucky === null ? '—' : `Your lucky number is ${lucky}.`}</div>

          <button className="btn btn-ghost" type="button" onClick={nextFact}>
            Fun fact
          </button>
          <div className="note">{fact ?? '—'}</div>
        </div>
      </div>
    </div>
  )
}
