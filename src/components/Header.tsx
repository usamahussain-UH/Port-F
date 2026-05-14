import { Download, Moon, Sun } from 'lucide-react'
import { useMemo } from 'react'
import { scrollToId, type Theme } from './utils'
import ParticlesLogo from './ParticlesLogo'

type Props = {
  theme: Theme
  setTheme: (t: Theme) => void
}

export default function Header({ theme, setTheme }: Props) {
  const nav = useMemo(
    () => [
      { id: 'projects', label: 'Projects' },
      { id: 'education', label: 'Education' },
      { id: 'contact', label: 'Contact Me' },
      { id: 'about', label: 'About Me' },
    ],
    [],
  )

  return (
    <header className="header">
      <div className="container header-inner">
        <button className="brand" onClick={() => scrollToId('top')} type="button">
          <ParticlesLogo />
          <span className="brand-text">Usama AI/ML</span>
        </button>

        <nav className="nav">
          {nav.map((x) => (
            <button key={x.id} type="button" className="nav-link" onClick={() => scrollToId(x.id)}>
              {x.label}
            </button>
          ))}
        </nav>

        <div className="header-actions">
          <a className="btn btn-ghost" href="/Usama_Hussain.docx" download>
            <Download size={16} />
            Download CV
          </a>
          <button
            type="button"
            className="btn btn-ghost"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            aria-label="Toggle dark/light"
          >
            {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
            {theme === 'dark' ? 'Light' : 'Dark'}
          </button>
        </div>
      </div>
    </header>
  )
}
