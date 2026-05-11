export default function AboutSection() {
  return (
    <section className="container section" id="about">
      <div className="section-head">
        <h2 className="section-title">About Me</h2>
        <p className="section-sub">A crisp intro + strengths + what you're building next.</p>
      </div>
      <div className="grid-2">
        <div className="card glass">
          <div className="card-title">Profile</div>
          <div className="muted">
            Replace this with your story: who you are, what you love building, and what roles you want.
          </div>
        </div>
        <div className="card glass">
          <div className="card-title">Hobbies</div>
          <div className="chip-row">
            {['Coding', 'AI experiments', 'Gaming', 'Design', 'Reading', 'Music'].map((x) => (
              <span key={x} className="chip">
                {x}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
