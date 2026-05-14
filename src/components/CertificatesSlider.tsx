type CertItem = {
  org: string
  type: string
  title: string
  emoji: string
}

const TRACK_1: CertItem[] = [
  { org: 'Microsoft', type: 'Certification', title: 'Azure AI Fundamentals (AI-900)', emoji: '☁️' },
  { org: 'Codecademy', type: 'Career Path', title: 'Machine Learning / AI Engineer', emoji: '🤖' },
  { org: 'Codecademy', type: 'Skill Path', title: 'Data & Programming Foundations for AI', emoji: '📊' },
  { org: 'Codecademy', type: 'Skill Path', title: 'Build Deep Learning Models with TensorFlow', emoji: '🧠' },
  { org: 'Codecademy', type: 'Skill Path', title: 'Build Chatbots with Python', emoji: '🐍' },
  { org: 'Codecademy', type: 'Skill Path', title: 'Natural Language Processing with Python', emoji: '💬' },
  { org: 'Codecademy', type: 'Skill Path', title: 'Master Statistics with Python', emoji: '📈' },
  { org: 'Codecademy', type: 'Skill Path', title: 'Generative AI for Everyone', emoji: '✨' },
  { org: 'Codecademy', type: 'Skill Path', title: 'Fundamental Math for Data Science', emoji: '📐' },
  { org: 'Codecademy', type: 'Skill Path', title: 'Code Foundations', emoji: '💻' },
]

const TRACK_2: CertItem[] = [
  { org: 'Codecademy', type: 'Course', title: 'Intro to Deep Learning with TensorFlow', emoji: '🧠' },
  { org: 'Codecademy', type: 'Course', title: 'Deep Learning: Image Classification with TensorFlow', emoji: '🖼️' },
  { org: 'Codecademy', type: 'Course', title: 'Intro to Large Language Models (LLMs)', emoji: '🗣️' },
  { org: 'Codecademy', type: 'Course', title: 'Intro to OpenAI API', emoji: '✨' },
  { org: 'Codecademy', type: 'Course', title: 'OpenAI API Coding with Python', emoji: '🐍' },
  { org: 'Codecademy', type: 'Course', title: 'OpenAI APIs: Fine-tuning, Assistants & Embeddings', emoji: '🔧' },
  { org: 'Codecademy', type: 'Course', title: 'OpenAI APIs: Accessing from Python', emoji: '🔧' },
  { org: 'Codecademy', type: 'Course', title: 'Learn How To Build Your Own GPT', emoji: '🤖' },
  { org: 'Codecademy', type: 'Course', title: 'Learn Git & GitHub', emoji: '🔗' },
  { org: 'Codecademy', type: 'Course', title: 'Learn JavaScript', emoji: '🌐' },
  { org: 'Codecademy', type: 'Course', title: 'Learn CSS', emoji: '🎨' },
  { org: 'Codecademy', type: 'Course', title: 'Learn HTML', emoji: '📄' },
  { org: 'Codecademy', type: 'Course', title: 'Learn Statistics with R', emoji: '📊' },
  { org: 'Codecademy', type: 'Course', title: 'Learn Statistics with Python', emoji: '📈' },
  { org: 'Codecademy', type: 'Course', title: 'Exploratory Data Analysis in Python', emoji: '🔍' },
  { org: 'Codecademy', type: 'Course', title: 'Probability', emoji: '🎲' },
  { org: 'Codecademy', type: 'Course', title: 'Discrete Math', emoji: '🧮' },
  { org: 'Codecademy', type: 'Course', title: 'Learn SQL', emoji: '🗄️' },
  { org: 'Codecademy', type: 'Course', title: 'Learn Flask', emoji: '🌶️' },
  { org: 'Codecademy', type: 'Course', title: 'Intro to Cloud Computing', emoji: '☁️' },
  { org: 'Codecademy', type: 'Course', title: 'Learn R', emoji: '📊' },
  { org: 'Codecademy', type: 'Course', title: 'Learn Intermediate Python 3', emoji: '🐍' },
  { org: 'Codecademy', type: 'Course', title: 'Learn Python 3', emoji: '🐍' },
  { org: 'Codecademy', type: 'Course', title: 'Choosing a Career in Tech', emoji: '🧭' },
  { org: 'Codecademy', type: 'Course', title: 'Learn How to Code', emoji: '💻' },
]

const TYPE_COLORS: Record<string, string> = {
  Certification: 'rgba(0,120,212,0.85)',
  'Career Path': 'rgba(139,92,246,0.85)',
  'Skill Path': 'rgba(34,211,238,0.75)',
  Course: 'rgba(52,211,153,0.75)',
}

function CertCard({ item }: { item: CertItem }) {
  const isMicrosoft = item.org === 'Microsoft'
  return (
    <div style={{
      flexShrink: 0,
      display: 'flex',
      flexDirection: 'column',
      gap: 6,
      padding: '10px 14px',
      borderRadius: 12,
      border: `1px solid ${isMicrosoft ? 'rgba(0,120,212,0.45)' : 'rgba(255,255,255,0.1)'}`,
      background: isMicrosoft ? 'rgba(0,120,212,0.09)' : 'rgba(255,255,255,0.03)',
      minWidth: 190,
      maxWidth: 250,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 6 }}>
        <span style={{ fontSize: 10, fontWeight: 700, color: isMicrosoft ? '#3b9edd' : 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
          {item.org}
        </span>
        <span style={{
          fontSize: 9, fontWeight: 800, padding: '2px 6px', borderRadius: 999,
          background: TYPE_COLORS[item.type] ?? 'rgba(255,255,255,0.1)',
          color: '#fff', letterSpacing: '0.06em', textTransform: 'uppercase', flexShrink: 0,
        }}>
          {item.type}
        </span>
      </div>
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}>
        <span style={{ fontSize: 18, lineHeight: 1, flexShrink: 0, marginTop: 1 }}>{item.emoji}</span>
        <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-strong)', lineHeight: 1.35 }}>{item.title}</span>
      </div>
    </div>
  )
}

export default function CertificatesSlider() {
  return (
    <section className="container section" id="certificates">
      <div className="section-head">
        <h2 className="section-title">Certifications &amp; Courses</h2>
        <p className="section-sub">
          Microsoft · Codecademy: 1 certification, 1 career path, 8 skill paths, 25 courses.
        </p>
      </div>

      <div style={{
        overflow: 'hidden',
        maskImage: 'linear-gradient(to right, transparent 0%, black 7%, black 93%, transparent 100%)',
        WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 7%, black 93%, transparent 100%)',
        display: 'flex',
        flexDirection: 'column',
        gap: 10,
      }}>
        <div
          className="cert-track"
          style={{ animation: 'cert-scroll 40s linear infinite' }}
        >
          {[...TRACK_1, ...TRACK_1].map((item, i) => <CertCard key={i} item={item} />)}
        </div>

        <div
          className="cert-track"
          style={{ animation: 'cert-scroll 70s linear infinite' }}
        >
          {[...TRACK_2, ...TRACK_2].map((item, i) => <CertCard key={i} item={item} />)}
        </div>
      </div>
    </section>
  )
}
