export default function ProjectsSection() {
  const projects = [
    { title: 'AI Resume Analyzer', img: '/1st.jpg' },
    { title: 'Neural Notes', img: '/2nd.jpg' },
    { title: 'Smart Portfolio Assistant', img: '/3rd.jpg' },
    { title: 'Realtime Dashboard', img: '/4th.jpg' },
    { title: 'Vision Demo', img: '/5th.jpg' },
    { title: 'Automation Bot', img: '/6th.jpg' },
    { title: 'Automated Robort', img: '/6th.jpg' },
  ]

  return (
    <section className="container section" id="projects">
      <div className="section-head">
        <h2 className="section-title">Projects</h2>
        <p className="section-sub">Add your best 4–6 projects here (AI, web apps, automation, etc.).</p>
      </div>
      <div className="grid-3">
        {projects.map((project) => (
          <div key={project.title} className="card glass hover-lift">
            <div className="card-title">{project.title}</div>

            <div className="card-img">
              <img src={project.img} alt={project.title} />
            </div>

            <div className="muted">Short punchy description. Tech stack. One impact metric.</div>

            <div className="chip-row">
              <span className="chip">React</span>
              <span className="chip">AI</span>
              <span className="chip">TypeScript</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
