export default function AchievementsSection() {
  return (
    <section className="container section" id="achievements">
      <div className="section-head">
        <h2 className="section-title">Achievements</h2>
        <p className="section-sub">Certifications, awards, milestones, and proud moments.</p>
      </div>
      <div className="grid-3">
        {[
          { t: 'Hackathon finalist', d: 'Top 10 finish out of 400+ teams.' },
          { t: 'Certification', d: 'AI / Cloud / Web Dev (add yours).' },
          { t: 'Open-source', d: 'Contributions and community work.' },
        ].map((x) => (
          <div key={x.t} className="card glass hover-lift">
            <div className="card-title">{x.t}</div>
            <div className="muted">{x.d}</div>
          </div>
        ))}
      </div>
    </section>
  )
}
