import { motion } from 'framer-motion'
import { Download, Sparkles } from 'lucide-react'
import clsx from 'clsx'

type Theme = 'dark' | 'light'

type HeroSectionProps = {
  theme: Theme
  onNavigate: (id: string) => void
}

export default function HeroSection({ theme, onNavigate }: HeroSectionProps) {
  return (
    <section className="hero container">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="hero-card glass"
      >
        <div className="hero-kicker">Next-gen • AI-first • Welcome to Future</div>
        <h1 className="hero-title">
          I build <span className="grad">AI-powered</span> products and experiences.
        </h1>
        <p className="hero-sub">
          A portfolio designed like a cockpit: interactive LLM playground, fun neural games, achievements,
          guestbook, and a clean professional profile, wrapped in glass + motion.
        </p>
        <div className="hero-cta">
          <button className="btn btn-primary" type="button" onClick={() => onNavigate('ai')}>
            Launch AI Playground
          </button>
          <button className="btn btn-ghost" type="button" onClick={() => onNavigate('projects')}>
            View Projects
          </button>
        </div>

        <div className="hero-stats">
          {[
            { k: 'Focus', v: 'AI + Web' },
            { k: 'Style', v: 'Futuristic' },
            { k: 'Mode', v: theme === 'dark' ? 'Night' : 'Day' },
          ].map((s) => (
            <div key={s.k} className={clsx('stat', 'glass')}>
              <div className="stat-k">{s.k}</div>
              <div className="stat-v">{s.v}</div>
            </div>
          ))}
      </div>
    </motion.div>
  </section>
  )
}
