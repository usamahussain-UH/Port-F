import { Download } from 'lucide-react'

export default function CvSection() {
  return (
    <section className="container section" id="cv">
      <div className="section-head">
        <h2 className="section-title">CV / Resume</h2>
        <p className="section-sub">Download my latest CV (replace `public/cv.pdf`).</p>
      </div>
      <div className="grid-2">
        <div className="card glass">
          <div className="card-title">Quick summary</div>
          <div className="muted">
            Add a sharp 5–7 line summary: roles, strengths, best projects, and what you're looking for.
          </div>
          <div className="chip-row">
            <span className="chip">React</span>
            <span className="chip">AI</span>
            <span className="chip">Full-stack</span>
          </div>
          <div className="hero-cta">
            <a className="btn btn-primary" href="/cv.pdf" download>
              <Download size={16} /> Download CV
            </a>
            <a className="btn btn-ghost" href="/cv.pdf" target="_blank" rel="noreferrer">
              Open
            </a>
          </div>
        </div>
        <div className="card glass">
          <div className="card-title">Highlights</div>
          <div className="muted">Skills • Tools • Impact metrics • Certifications.</div>
        </div>
      </div>
    </section>
  )
}
