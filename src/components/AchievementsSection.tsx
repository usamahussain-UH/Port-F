const ACHIEVEMENTS = [
  {
    emoji: '🎓',
    t: 'MSc AI Distinction',
    d: 'Graduated with Distinction from London Metropolitan University (2024–2025). Final dissertation recognised for innovation in end-to-end ML pipeline design.',
    tag: 'Education',
  },
  {
    emoji: '☁️',
    t: 'Microsoft Azure AI-900',
    d: 'Microsoft Certified: Azure AI Fundamentals (AI-900), validates knowledge of ML workloads, AI concepts, and Azure AI services. Achieved 2025.',
    tag: 'Certification',
  },
  {
    emoji: '🤖',
    t: '92% CNN Accuracy',
    d: 'Engineered a real-time Rock Paper Scissors hand-gesture recognition system using Computer Vision and Convolutional Neural Networks, achieving 92.03% classification accuracy.',
    tag: 'MSc Project',
  },
]

export default function AchievementsSection() {
  return (
    <section className="container section" id="achievements">
      <div className="section-head">
        <h2 className="section-title">Achievements</h2>
        <p className="section-sub">Certifications, academic milestones, and standout project results.</p>
      </div>
      <div className="grid-3">
        {ACHIEVEMENTS.map(x => (
          <div key={x.t} className="card glass hover-lift">
            <div style={{ fontSize: 28, marginBottom: 8 }}>{x.emoji}</div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6, flexWrap: 'wrap', gap: 6 }}>
              <div className="card-title" style={{ margin: 0 }}>{x.t}</div>
              <span className="chip" style={{ fontSize: 11, borderColor: 'rgba(34,211,238,0.3)', background: 'rgba(34,211,238,0.08)', color: 'var(--primary-2)' }}>
                {x.tag}
              </span>
            </div>
            <div className="muted" style={{ fontSize: 13, lineHeight: 1.65 }}>{x.d}</div>
          </div>
        ))}
      </div>
    </section>
  )
}
