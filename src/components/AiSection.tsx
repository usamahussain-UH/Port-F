import AiPlayground from './AiPlayground'

export default function AiSection() {
  return (
    <section className="container section" id="ai">
      <div className="section-head">
        <h2 className="section-title">AI Playground (Live LLM + Demos)</h2>
        <p className="section-sub">
          Chat with a live model (optional setup) or use the built-in demo brain. Coming next: voice, code
          explain, and real-time tools.
        </p>
      </div>
      <div className="grid-2">
        <AiPlayground />
        <div className="card glass">
          <div className="card-title">Other "Live Things"</div>
          <div className="muted">
            Status, animated background, dynamic cards, and interactive panels—more live modules (visitor stats,
            mini-visualizers) will be added.
          </div>
          <div className="chip-row">
            <span className="chip">Particles</span>
            <span className="chip">Scanlines</span>
            <span className="chip">Glow</span>
          </div>
        </div>
      </div>
    </section>
  )
}
