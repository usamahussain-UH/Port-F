import { GitFork, LinkIcon, Mail } from 'lucide-react'

const LINKS = [
  {
    icon: <Mail size={20} />,
    label: 'Email',
    value: 'usamahussain.org@gmail.com',
    href: 'mailto:usamahussain.org@gmail.com',
    color: 'rgba(139,92,246,0.35)',
    bg: 'rgba(139,92,246,0.08)',
  },
  {
    icon: <GitFork size={20} />,
    label: 'GitHub',
    value: 'github.com/usamahussain-UH',
    href: 'https://github.com/usamahussain-UH',
    color: 'rgba(255,255,255,0.25)',
    bg: 'rgba(255,255,255,0.05)',
  },
  {
    icon: <LinkIcon size={20} />,
    label: 'LinkedIn',
    value: 'usama-hussain-417228255',
    href: 'https://www.linkedin.com/in/usama-hussain-417228255/',
    color: 'rgba(34,211,238,0.35)',
    bg: 'rgba(34,211,238,0.08)',
  },
]

export default function ContactSection() {
  return (
    <section className="container section" id="contact">
      <div className="section-head">
        <h2 className="section-title">Contact Me</h2>
        <p className="section-sub">Open to AI/ML opportunities, collaborations, and conversations.</p>
      </div>

      <div className="grid-2">
        {/* Links card */}
        <div className="card glass">
          <div className="card-title">Get in Touch</div>
          <div className="muted" style={{ fontSize: 13, marginBottom: 18 }}>
            The best way to reach me is via email. You can also connect on LinkedIn or explore my work on GitHub.
          </div>

          <div style={{ display: 'grid', gap: 10 }}>
            {LINKS.map(l => (
              <a
                key={l.label}
                href={l.href}
                target={l.href.startsWith('mailto') ? undefined : '_blank'}
                rel="noreferrer"
                style={{
                  display: 'flex', alignItems: 'center', gap: 14,
                  padding: '12px 14px', borderRadius: 12,
                  border: `1px solid ${l.color}`,
                  background: l.bg,
                  textDecoration: 'none',
                  color: 'var(--text-strong)',
                  transition: 'transform 140ms ease, opacity 140ms ease',
                }}
                onMouseEnter={e => (e.currentTarget.style.transform = 'translateY(-2px)')}
                onMouseLeave={e => (e.currentTarget.style.transform = 'translateY(0)')}
              >
                <span style={{ color: 'var(--text-strong)', flexShrink: 0 }}>{l.icon}</span>
                <div>
                  <div style={{ fontSize: 11, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 1 }}>
                    {l.label}
                  </div>
                  <div style={{ fontSize: 13, fontWeight: 600 }}>{l.value}</div>
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* Quick message card */}
        <div className="card glass">
          <div className="card-title">Send a Message</div>
          <div className="muted" style={{ fontSize: 13, marginBottom: 16 }}>
            Have a project in mind or want to discuss AI/ML? Drop me a message directly via email.
          </div>
          <div style={{ display: 'grid', gap: 10 }}>
            <div style={{ borderRadius: 12, padding: '12px 14px', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.03)', fontSize: 13, color: 'var(--muted)', lineHeight: 1.7 }}>
              📍 Based in <strong style={{ color: 'var(--text-strong)' }}>London, UK</strong>
              <br />
              🕐 Response time: <strong style={{ color: 'var(--text-strong)' }}>within 24 hours</strong>
              <br />
              💼 Available for: <strong style={{ color: 'var(--text-strong)' }}>AI/ML roles, freelance, collaborations</strong>
            </div>
            <a
              className="btn btn-primary"
              href="mailto:usamahussain.org@gmail.com?subject=Portfolio%20Enquiry"
              style={{ justifyContent: 'center', textDecoration: 'none' }}
            >
              <Mail size={16} /> Email Me Directly
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
