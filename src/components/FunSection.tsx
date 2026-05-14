import FunZone from './FunZone'

export default function FunSection() {
  return (
    <section className="container section" id="fun">
      <div className="section-head">
        <h2 className="section-title">🎮 Entertainment Zone</h2>
        <p className="section-sub">Six interactive widgets: quizzes, AI tools, mind tricks and reflex games.</p>
      </div>
      <FunZone />
    </section>
  )
}
