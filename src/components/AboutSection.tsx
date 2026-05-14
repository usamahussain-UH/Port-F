export default function AboutSection() {
  return (
    <section className="container section" id="about">
      <div className="section-head">
        <h2 className="section-title">About Me</h2>
        <p className="section-sub">London-based AI/ML Engineer building intelligent systems and modern web apps.</p>
      </div>

      <div className="grid-2">
        <div className="card glass">
          <div className="card-title">Profile</div>
          <p style={{ color: 'var(--text)', fontSize: 14, lineHeight: 1.8, margin: 0 }}>
            I'm <strong style={{ color: 'var(--text-strong)' }}>Usama Hussain</strong>, an AI & Machine Learning
            Engineer based in London. I hold an{' '}
            <strong style={{ color: 'var(--text-strong)' }}>MSc in Artificial Intelligence (Distinction)</strong> from
            London Metropolitan University and a BSc in Computer Science.
          </p>
          <p style={{ color: 'var(--text)', fontSize: 14, lineHeight: 1.8, margin: '12px 0 0' }}>
            My work spans end-to-end machine learning pipelines, computer vision, NLP, and full-stack web
            development. I'm Microsoft Certified (Azure AI-900) and have hands-on experience applying deep
            learning and transfer learning to real-world problems. I thrive in Agile teams and am always
            looking to push the boundaries of what's possible with AI.
          </p>
        </div>

        <div className="card glass">
          <div className="card-title">Interests & Hobbies</div>
          <p className="muted" style={{ fontSize: 13, lineHeight: 1.7, marginBottom: 14 }}>
            Passionate about the latest advancements in artificial intelligence and emerging technologies.
            Enjoy travelling, which has sharpened adaptability and cross-cultural communication.
            Constantly experimenting with new tools, frameworks, and ideas.
          </p>
          <div className="chip-row">
            {['AI Research', 'Computer Vision', 'Travelling', 'Open Source', 'Web Dev', 'Emerging Tech'].map(x => (
              <span key={x} className="chip">{x}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
