import { useState } from 'react'
import { LESSONS } from '../data/grammar'

export default function GrammarPage({ readLessons, markLessonRead }) {
  const [open, setOpen] = useState(null)

  function toggle(id) {
    setOpen(prev => {
      const next = prev === id ? null : id
      if (next !== null) markLessonRead(id)
      return next
    })
  }

  return (
    <div className="page">
      <div className="page-header">
        <h1 className="page-title">Grammaire</h1>
        <p className="page-sub">{readLessons.size} / {LESSONS.length} leçons lues</p>
      </div>

      <div className="lessons-list">
        {LESSONS.map(lesson => (
          <div key={lesson.id} className={`lesson-card${open === lesson.id ? ' open' : ''}${readLessons.has(lesson.id) ? ' read' : ''}`}>
            <button className="lesson-header" onClick={() => toggle(lesson.id)}>
              <div className="lesson-icon arabic" style={{ background: lesson.color + '22', color: lesson.color }}>
                {lesson.icon}
              </div>
              <div className="lesson-meta">
                <div className="lesson-title">{lesson.title}</div>
                <div className="lesson-sub">{lesson.subtitle}</div>
              </div>
              <div className="lesson-right">
                {readLessons.has(lesson.id) && <span className="lesson-read-badge">✓ Lu</span>}
                <span className="lesson-chevron">{open === lesson.id ? '▲' : '▼'}</span>
              </div>
            </button>

            {open === lesson.id && (
              <div className="lesson-body">
                {lesson.sections.map((sec, i) => (
                  <div key={i} className="lesson-section">
                    <h3 className="sec-heading">{sec.heading}</h3>
                    <div className="sec-content">
                      {sec.content.split('\n').map((line, j) => (
                        <p key={j} className={line.trim() === '' ? 'spacer' : ''}>
                          {line || ' '}
                        </p>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
