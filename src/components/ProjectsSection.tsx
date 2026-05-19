import { ExternalLink } from 'lucide-react'

type Project = {
  emoji: string
  category: string
  accent: string
  title: string
  desc: string
  stack: string[]
  github: string | null
  badge: string | null
}

const PROJECTS: Project[] = [
  {
    emoji: '✂️',
    category: 'MSc Project',
    accent: 'linear-gradient(90deg, #8b5cf6, #a78bfa)',
    title: 'Real-Time Rock Paper Scissors Recognition',
    desc: 'Real-time hand gesture recognition using CNNs. Advanced data augmentation pipelines tackled limited training data and significantly improved model generalisation.',
    stack: ['Python', 'TensorFlow', 'Keras', 'OpenCV', 'CNN', 'scikit-learn'],
    github: null,
    badge: '92.03% Accuracy',
  },
  {
    emoji: '📰',
    category: 'MSc Dissertation',
    accent: 'linear-gradient(90deg, #7c3aed, #8b5cf6)',
    title: 'Predicting Online News Popularity',
    desc: 'End-to-end ML pipeline on the UCI dataset. Applied PCA for dimensionality reduction, clustering, and hyperparameter tuning to identify key drivers of article reach.',
    stack: ['Python', 'scikit-learn', 'PCA', 'Clustering', 'Pandas', 'NumPy'],
    github: null,
    badge: 'Distinction',
  },
  {
    emoji: '🍷',
    category: 'Machine Learning',
    accent: 'linear-gradient(90deg, #22d3ee, #06b6d4)',
    title: 'Wine Quality Prediction',
    desc: 'Compared multiple ML classification models to predict red and white wine quality from physicochemical properties.',
    stack: ['Python', 'scikit-learn', 'Pandas', 'Matplotlib', 'Jupyter'],
    github: 'https://github.com/usamahussain-UH/wine-quality',
    badge: null,
  },
  {
    emoji: '🩺',
    category: 'Machine Learning',
    accent: 'linear-gradient(90deg, #22d3ee, #06b6d4)',
    title: 'Breast Cancer Classification',
    desc: 'Supervised learning model for breast cancer diagnosis, trained on medical datasets with feature analysis and model evaluation.',
    stack: ['Python', 'scikit-learn', 'Pandas', 'NumPy', 'Jupyter'],
    github: 'https://github.com/usamahussain-UH/Brest-Cancer',
    badge: null,
  },
  {
    emoji: '🚢',
    category: 'Data Science',
    accent: 'linear-gradient(90deg, #34d399, #10b981)',
    title: 'Titanic Survival Prediction',
    desc: 'Predicted passenger survival using feature engineering, data cleaning, and classification models on the classic Titanic dataset.',
    stack: ['Python', 'Pandas', 'scikit-learn', 'Matplotlib', 'Jupyter'],
    github: 'https://github.com/usamahussain-UH/Titanic_survival',
    badge: null,
  },
  {
    emoji: '🌸',
    category: 'Machine Learning',
    accent: 'linear-gradient(90deg, #22d3ee, #8b5cf6)',
    title: 'Iris Classification with SVM',
    desc: 'Iris species classification using Support Vector Classifier with kernel methods and decision boundary visualisation.',
    stack: ['Python', 'SVM / SVC', 'scikit-learn', 'Matplotlib', 'Jupyter'],
    github: 'https://github.com/usamahussain-UH/Iris-Dataset-with-SVC',
    badge: null,
  },
  {
    emoji: '📊',
    category: 'Data Science',
    accent: 'linear-gradient(90deg, #34d399, #22d3ee)',
    title: 'Exploratory Data Analysis',
    desc: 'Comprehensive EDA techniques: statistical analysis, data cleaning, distribution analysis, and insight extraction across multiple real-world datasets.',
    stack: ['Python', 'Pandas', 'Matplotlib', 'Seaborn', 'Jupyter'],
    github: 'https://github.com/usamahussain-UH/Exploratory-Data-Analysis-EDA',
    badge: null,
  },
  {
    emoji: '📧',
    category: 'Machine Learning',
    accent: 'linear-gradient(90deg, #8b5cf6, #22d3ee)',
    title: 'Spam Email Detection',
    desc: 'Classifies emails as spam or ham across three preprocessing experiments: raw emails, non-letters as features, and clean text. Random Forest + XGBoost with TF-IDF and class imbalance handling achieved up to 97.91% accuracy on raw emails.',
    stack: ['Python', 'scikit-learn', 'XGBoost', 'TF-IDF', 'Pandas', 'Jupyter'],
    github: 'https://github.com/usamahussain-UH/ML-All-Casees-and-Solutions',
    badge: '97.91% Accuracy',
  },
  {
    emoji: '🩻',
    category: 'NLP · Healthcare AI',
    accent: 'linear-gradient(90deg, #06b6d4, #0ea5e9)',
    title: 'Radiology Report Summarisation',
    desc: 'Fine-tuned facebook/bart-base on 3,419 cleaned radiology reports (XML dataset of 3,955 files) to auto-generate clinical impressions from findings sections. Seq2SeqTrainer with lr 3e-5, 3 epochs, batch size 4. Achieved ROUGE-1 F1 of 0.6064 on the test set, well above the 0.3 required threshold. Addressed 545 MB model deployment via Git LFS and Railway.',
    stack: ['Python', 'PyTorch', 'Hugging Face', 'BART', 'Transformers', 'ROUGE', 'XML'],
    github: null,
    badge: 'ROUGE-1: 0.6064',
  },
  {
    emoji: '🤖',
    category: 'Web Dev · AI',
    accent: 'linear-gradient(90deg, #f97316, #f59e0b)',
    title: 'AI Futuristic Portfolio',
    desc: 'This portfolio built with React + TypeScript + Vite, featuring live Groq AI chat, tsParticles background, Chart.js ML visualisations, and 7 interactive entertainment widgets.',
    stack: ['React', 'TypeScript', 'Vite', 'Groq AI', 'Chart.js', 'tsParticles'],
    github: 'https://github.com/usamahussain-UH/Port-F',
    badge: 'Live',
  },
]

export default function ProjectsSection() {
  return (
    <section className="container section" id="projects">
      <div className="section-head">
        <h2 className="section-title">Projects</h2>
        <p className="section-sub">
          10 projects spanning MSc AI research, NLP, machine learning, data science, and full-stack web.
        </p>
      </div>

      <div className="grid-3">
        {PROJECTS.map((p) => (
          <div key={p.title} className="card glass hover-lift" style={{ display: 'flex', flexDirection: 'column', padding: 0, overflow: 'hidden' }}>
            {/* Accent bar */}
            <div style={{ height: 4, background: p.accent, flexShrink: 0 }} />

            <div style={{ padding: '14px 16px', display: 'flex', flexDirection: 'column', flex: 1, gap: 8 }}>
              {/* Category + badge row */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 6 }}>
                <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--muted)' }}>
                  {p.category}
                </span>
                {p.badge && (
                  <span style={{ fontSize: 10, fontWeight: 800, padding: '2px 8px', borderRadius: 999, background: p.accent, color: '#fff', letterSpacing: '0.05em' }}>
                    {p.badge}
                  </span>
                )}
              </div>

              {/* Title */}
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}>
                <span style={{ fontSize: 22, lineHeight: 1, flexShrink: 0, marginTop: 1 }}>{p.emoji}</span>
                <div className="card-title" style={{ margin: 0, fontSize: 14, lineHeight: 1.4 }}>{p.title}</div>
              </div>

              {/* Description */}
              <div className="muted" style={{ fontSize: 12, lineHeight: 1.65, flex: 1 }}>{p.desc}</div>

              {/* Stack chips */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
                {p.stack.map(s => (
                  <span key={s} style={{ fontSize: 10, padding: '2px 6px', borderRadius: 5, border: '1px solid rgba(255,255,255,0.12)', background: 'rgba(255,255,255,0.04)', color: 'var(--muted)' }}>
                    {s}
                  </span>
                ))}
              </div>

              {/* GitHub link */}
              {p.github && (
                <a
                  href={p.github}
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-ghost"
                  style={{ fontSize: 12, padding: '6px 10px', textDecoration: 'none', alignSelf: 'flex-start', marginTop: 2 }}
                >
                  <ExternalLink size={13} /> View on GitHub
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
