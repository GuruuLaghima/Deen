import { MADINAH_BOOK1 } from '../data/madinah'

export default function CoursPage({ lessonProgress, openLesson }) {
  const lessons = MADINAH_BOOK1.lessons
  const completedCount = lessons.filter(l => {
    const done = lessonProgress[l.id]
    return done && done.size >= l.exercises.length
  }).length

  return (
    <div className="page">
      <div className="page-header">
        <h1 className="page-title arabic">{MADINAH_BOOK1.ar}</h1>
        <p className="page-sub">Méthode de Médine — Livre 1</p>
        <div className="progress-pill">{completedCount} / {lessons.length} leçons complétées</div>
      </div>

      <div className="cours-list">
        {lessons.map(l => {
          const done = lessonProgress[l.id] ? lessonProgress[l.id].size : 0
          const total = l.exercises.length
          const pct = total > 0 ? Math.round((done / total) * 100) : 0
          const completed = done >= total

          return (
            <button
              key={l.id}
              className={`cours-card${completed ? ' completed' : ''}`}
              onClick={() => openLesson(l.id)}
            >
              <div className="cours-num">{l.id}</div>
              <div className="cours-info">
                <div className="cours-ar arabic">{l.title}</div>
                <div className="cours-subtitle">{l.subtitle}</div>
                <div className="cours-concept">{l.concept}</div>
                {done > 0 && !completed && (
                  <div className="cours-bar"><div style={{ width: `${pct}%` }} /></div>
                )}
              </div>
              <div className="cours-badge">
                {completed
                  ? <span className="cours-check">✓</span>
                  : done > 0 ? <span className="cours-pct">{pct}%</span> : null}
                <span className="cours-arrow">›</span>
              </div>
            </button>
          )
        })}
      </div>
    </div>
  )
}
