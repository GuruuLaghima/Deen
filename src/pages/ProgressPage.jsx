import { VOCABULARY, CATEGORIES } from '../data/vocabulary'
import { ALPHABET } from '../data/alphabet'
import { LESSONS } from '../data/grammar'

function Bar({ value, max, color }) {
  const pct = max > 0 ? Math.round((value / max) * 100) : 0
  return (
    <div className="bar-wrap">
      <div className="bar-track">
        <div className="bar-fill" style={{ width: `${pct}%`, background: color }} />
      </div>
      <span className="bar-label">{value}/{max}</span>
    </div>
  )
}

export default function ProgressPage({ learnedWords, learnedLetters, readLessons, quizHistory, streak }) {
  const totalScore = quizHistory.reduce((s, q) => s + q.score, 0)
  const totalQ = quizHistory.reduce((s, q) => s + q.total, 0)
  const avgPct = totalQ > 0 ? Math.round((totalScore / totalQ) * 100) : null

  return (
    <div className="page">
      <div className="page-header">
        <h1 className="page-title">Progrès</h1>
        <p className="page-sub">Ta progression globale</p>
      </div>

      <div className="progress-overview">
        {streak.count > 0 && (
          <div className="streak-card">
            <span className="streak-fire">🔥</span>
            <span className="streak-num">{streak.count}</span>
            <span className="streak-text">jour{streak.count > 1 ? 's' : ''} de suite</span>
          </div>
        )}

        <div className="overview-grid">
          <div className="overview-cell">
            <div className="ov-num">{learnedLetters.size}<span className="ov-den">/{ALPHABET.length}</span></div>
            <div className="ov-label">Lettres</div>
            <Bar value={learnedLetters.size} max={ALPHABET.length} color="#2D6A4F" />
          </div>
          <div className="overview-cell">
            <div className="ov-num">{learnedWords.size}<span className="ov-den">/{VOCABULARY.length}</span></div>
            <div className="ov-label">Mots</div>
            <Bar value={learnedWords.size} max={VOCABULARY.length} color="#1565C0" />
          </div>
          <div className="overview-cell">
            <div className="ov-num">{readLessons.size}<span className="ov-den">/{LESSONS.length}</span></div>
            <div className="ov-label">Leçons</div>
            <Bar value={readLessons.size} max={LESSONS.length} color="#B7410E" />
          </div>
          <div className="overview-cell">
            <div className="ov-num">{quizHistory.length}</div>
            <div className="ov-label">Quiz faits</div>
            {avgPct != null && <div className="ov-avg">{avgPct}% de moy.</div>}
          </div>
        </div>
      </div>

      <h2 className="section-title">Mots par thème</h2>
      <div className="cat-progress-list">
        {CATEGORIES.map(cat => {
          const words = VOCABULARY.filter(w => w.category === cat.id)
          const learned = words.filter(w => learnedWords.has(w.id)).length
          return (
            <div key={cat.id} className="cat-progress-row">
              <span className="cp-icon">{cat.icon}</span>
              <span className="cp-label">{cat.label}</span>
              <Bar value={learned} max={words.length} color="#2D6A4F" />
            </div>
          )
        })}
      </div>

      {quizHistory.length > 0 && (
        <>
          <h2 className="section-title">Historique des quiz</h2>
          <div className="quiz-history">
            {quizHistory.slice(0, 8).map((q, i) => {
              const pct = Math.round((q.score / q.total) * 100)
              return (
                <div key={i} className="qh-row">
                  <span className="qh-date">{q.date}</span>
                  <div className="qh-bar">
                    <div style={{ width: `${pct}%`, background: pct >= 80 ? '#2D6A4F' : pct >= 60 ? '#D4A017' : '#c0392b' }} />
                  </div>
                  <span className="qh-score">{q.score}/{q.total}</span>
                </div>
              )
            })}
          </div>
        </>
      )}
    </div>
  )
}
