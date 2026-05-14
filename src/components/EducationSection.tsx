const MSC_MODULES = [
  'Artificial Intelligence',
  'Machine Learning',
  'Computer Vision',
  'Information Security',
  'Cloud Computing & Internet of Things',
  'Data Warehousing & Big Data',
  'MSc Project (Dissertation)',
]

const BSC_AREAS = [
  'Algorithms & Data Structures',
  'Software Engineering',
  'Database Management',
  'Web Development',
  'Object-Oriented Programming',
  'Operating Systems',
  'Computer Networks',
  'Mathematics for Computing',
  'Cybersecurity Fundamentals',
  'Human-Computer Interaction',
  '30+ further CS modules',
]

export default function EducationSection() {
  return (
    <section className="container section" id="education">
      <div className="section-head">
        <h2 className="section-title">Education</h2>
        <p className="section-sub">Academic background: MSc Artificial Intelligence (Distinction) + BSc Computer Science.</p>
      </div>

      <div style={{ display: 'grid', gap: 14 }}>

        {/* MSc Card */}
        <div className="card glass">
          {/* Header row */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 10, marginBottom: 12 }}>
            <div>
              <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--primary-2)', marginBottom: 4 }}>
                Postgraduate · 2024 – 2025
              </div>
              <div className="card-title" style={{ margin: 0, fontSize: 18 }}>
                Master of Science in Artificial Intelligence
              </div>
              <div style={{ color: 'var(--muted)', fontSize: 13, marginTop: 3 }}>
                London Metropolitan University, London, UK
              </div>
            </div>
            <div style={{ textAlign: 'right', flexShrink: 0 }}>
              <div style={{
                display: 'inline-block',
                fontWeight: 900,
                fontSize: 13,
                padding: '6px 14px',
                borderRadius: 999,
                background: 'linear-gradient(90deg, rgba(139,92,246,0.25), rgba(34,211,238,0.2))',
                border: '1px solid rgba(139,92,246,0.45)',
                color: 'var(--text-strong)',
                letterSpacing: '0.05em',
              }}>
                🏅 Distinction
              </div>
              <div style={{ fontSize: 11, color: 'var(--muted)', marginTop: 5 }}>Awarded 03 July 2025</div>
            </div>
          </div>

          {/* Divider */}
          <div style={{ height: 1, background: 'rgba(255,255,255,0.08)', marginBottom: 12 }} />

          {/* Modules */}
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--primary-2)', marginBottom: 8 }}>
            Modules Studied
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(210px, 1fr))', gap: '6px 12px', marginBottom: 14 }}>
            {MSC_MODULES.map(m => (
              <div key={m} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: 'var(--text)' }}>
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--primary)', flexShrink: 0 }} />
                {m}
              </div>
            ))}
          </div>

          {/* Dissertation highlight */}
          <div style={{ borderRadius: 12, padding: '10px 14px', background: 'rgba(139,92,246,0.08)', border: '1px solid rgba(139,92,246,0.2)' }}>
            <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--primary)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Dissertation · Distinction</span>
            <p style={{ margin: '4px 0 0', fontSize: 13, color: 'var(--text)', lineHeight: 1.65 }}>
              <strong style={{ color: 'var(--text-strong)' }}>Predicting Online News Popularity</strong>: end-to-end ML pipeline on the UCI dataset using PCA, clustering, and hyperparameter tuning. Recognised for innovation in ML pipeline design.
            </p>
          </div>
        </div>

        {/* BSc Card */}
        <div className="card glass">
          {/* Header row */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 10, marginBottom: 12 }}>
            <div>
              <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--primary-2)', marginBottom: 4 }}>
                Undergraduate · 2018 – 2022
              </div>
              <div className="card-title" style={{ margin: 0, fontSize: 18 }}>
                Bachelor of Science in Computer Science
              </div>
              <div style={{ color: 'var(--muted)', fontSize: 13, marginTop: 3 }}>
                NFC Institute of Engineering and Fertilizer Research, Pakistan
              </div>
            </div>
            <div style={{ textAlign: 'right', flexShrink: 0 }}>
              <div style={{
                display: 'inline-block',
                fontWeight: 900,
                fontSize: 13,
                padding: '6px 14px',
                borderRadius: 999,
                background: 'rgba(34,211,238,0.12)',
                border: '1px solid rgba(34,211,238,0.3)',
                color: 'var(--primary-2)',
              }}>
                40+ Courses
              </div>
            </div>
          </div>

          {/* Divider */}
          <div style={{ height: 1, background: 'rgba(255,255,255,0.08)', marginBottom: 12 }} />

          {/* Core areas */}
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--primary-2)', marginBottom: 8 }}>
            Core Areas Covered
          </div>
          <div className="chip-row" style={{ marginTop: 0 }}>
            {BSC_AREAS.map(a => (
              <span key={a} className="chip">{a}</span>
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}
