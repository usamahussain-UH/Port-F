import { Download } from 'lucide-react'

const HIGHLIGHTS: { cat: string; skills: string[] }[] = [
  {
    cat: 'AI & Machine Learning',
    skills: ['Python', 'TensorFlow', 'Keras', 'scikit-learn', 'Deep Learning', 'CNNs', 'NLP',"PyTorch", 'Transfer Learning', 'Data Augmentation', 'Hyperparameter Tuning'],
  },
  {
    cat: 'Data Science',
    skills: ['Pandas', 'NumPy', 'PCA', 'Clustering', 'Feature Engineering', 'Statistical Modelling', 'Data Visualisation'],
  },
  {
    cat: 'Cloud & DevOps',
    skills: ['Microsoft Azure', 'Azure ML', 'Git', 'GitHub', 'RESTful APIs', 'API Development'],
  },
  {
    cat: 'Web Development',
    skills: ['React', 'TypeScript', 'JavaScript', 'MERN Stack', 'Node.js', 'Express.js', 'HTML5', 'CSS3'],
  },
]

export default function CvSection() {
  return (
    <section className="container section" id="cv">
      <div className="section-head">
        <h2 className="section-title">CV / Resume</h2>
        <p className="section-sub">MSc AI Engineer Python · TensorFlow · Azure · Machine Learning · ANN</p>
      </div>

      <div className="grid-2">
        {/* Quick Summary */}
        <div className="card glass">
          <div className="card-title">Quick Summary</div>
          <p style={{ color: 'var(--text)', fontSize: 14, lineHeight: 1.8, margin: '0 0 14px' }}>
            London-based <strong style={{ color: 'var(--text-strong)' }}>AI and Machine Learning Engineer</strong> with
            an <strong style={{ color: 'var(--text-strong)' }}>MSc in Artificial Intelligence (Distinction)</strong> from
            London Metropolitan University and <strong style={{ color: 'var(--text-strong)' }}>Microsoft Azure AI Fundamentals</strong> certification.
            Experienced across the full AI/ML spectrum, designing Neural Networks (ANN/CNN) for computer vision,
            building end-to-end data science pipelines with PCA, clustering, and predictive modelling on complex datasets.
            Proficient in <strong style={{ color: 'var(--primary-2)' }}>Python, TensorFlow, Keras, PyTorch, scikit-learn, OpenCV, Pandas, NumPy</strong>, and Azure Machine Learning.
            Strong in full-stack development (MERN Stack) and Agile team collaboration.
            Committed to delivering AI solutions that are accurate, scalable, and impactful.
          </p>

          <div className="chip-row" style={{ marginBottom: 18 }}>
            {['MSc AI · Distinction', 'Azure AI-900', 'Machine Learning',"ANN","CNN",].map(c => (
              <span key={c} className="chip" style={{ borderColor: 'rgba(139,92,246,0.35)', background: 'rgba(139,92,246,0.1)' }}>{c}</span>
            ))}
          </div>

          <div className="hero-cta">
            <a className="btn btn-primary" href="/Usama_Hussain.docx" download="Usama_Hussain.docx">
              <Download size={16} /> Download CV
            </a>
          </div>
        </div>

        {/* Highlights */}
        <div className="card glass">
          <div className="card-title">Skill Highlights</div>
          <div style={{ display: 'grid', gap: 0, marginTop: 4 }}>
            {HIGHLIGHTS.map(({ cat, skills }) => (
              <div key={cat}>
                <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--primary-2)', marginBottom: 4, marginTop: 8 }}>
                  {cat}
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 3, marginTop: 0 }}>
                  {skills.map(s => (
                    <span key={s} style={{ fontSize: 11, padding: '2px 7px', borderRadius: 6, border: '1px solid rgba(255,255,255,0.12)', background: 'rgba(255,255,255,0.04)', color: 'var(--text)' }}>
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
