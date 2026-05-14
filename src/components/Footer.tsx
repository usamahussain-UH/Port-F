import { GitFork, LinkIcon, Mail } from 'lucide-react'
import { scrollToId } from './utils'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-top" />
      <div className="container footer-inner2">
        <div className="footer-left">
          <div className="footer-brand">
            <span className="brand-dot" />
            <div>
              <div className="footer-title">Usama Hussain</div>
              <div className="muted">AI & ML Engineer · London, UK</div>
            </div>
          </div>

          <div className="footer-social">
            <a className="btn btn-ghost" href="mailto:usamahussain.org@gmail.com">
              <Mail size={16} /> Email
            </a>
            <a className="btn btn-ghost" href="https://github.com/usamahussain-UH" target="_blank" rel="noreferrer">
              <GitFork size={16} /> GitHub
            </a>
            <a className="btn btn-ghost" href="https://www.linkedin.com/in/usama-hussain-417228255/" target="_blank" rel="noreferrer">
              <LinkIcon size={16} /> LinkedIn
            </a>
          </div>
        </div>

        <div className="footer-right">
          <img className="footer-art" src="/ai-footer.svg" alt="" />
          <div className="footer-links">
            {[
              { id: 'ai', label: 'AI Playground' },
              { id: 'projects', label: 'Projects' },
              { id: 'cv', label: 'CV' },
              { id: 'education', label: 'Education' },
              { id: 'contact', label: 'Contact' },
            ].map((x) => (
              <button key={x.id} type="button" className="footer-link" onClick={() => scrollToId(x.id)}>
                {x.label}
              </button>
            ))}
          </div>
          <div className="footer-bottom">
            <div className="muted">© {new Date().getFullYear()} Usama Hussain · MSc AI · Azure AI-900</div>
            <button type="button" className="btn btn-ghost" onClick={() => scrollToId('top')}>
              Back to top ↑
            </button>
          </div>
        </div>
      </div>
    </footer>
  )
}
