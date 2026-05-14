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
        <div className="card glass" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 12, minHeight: 180 }}>
          <div style={{ fontSize: 36 }}>🚧</div>
          <div className="card-title" style={{ margin: 0 }}>Coming Soon</div>
          <div className="muted" style={{ textAlign: 'center', fontSize: 13 }}>
            More live AI modules are on the way: voice interface, code explainer, real-time tools and more.
          </div>
          <div className="chip-row" style={{ justifyContent: 'center' }}>
            <span className="chip">Voice</span>
            <span className="chip">Code Explainer</span>
            <span className="chip">Real-time Tools</span>
          </div>
        </div>
      </div>
    </section>
  )
}
