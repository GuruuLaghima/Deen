import { VOCABULARY } from '../data/vocabulary'
import { ALPHABET } from '../data/alphabet'
import { LESSONS } from '../data/grammar'

export default function Home({ setPage, learnedWords, learnedLetters, readLessons, quizHistory, streak }) {
  const wordPct = Math.round((learnedWords.size / VOCABULARY.length) * 100)
  const letterPct = Math.round((learnedLetters.size / ALPHABET.length) * 100)
  const lessonPct = Math.round((readLessons.size / LESSONS.length) * 100)
  const lastQuiz = quizHistory[0]

  const steps = [
    { id: 'alphabet', label: "Commencer par l'alphabet", icon: 'أ', desc: '28 lettres à découvrir', done: learnedLetters.size > 0, pct: letterPct },
    { id: 'flashcards', label: 'Apprendre du vocabulaire', icon: '⧉', desc: `${VOCABULARY.length} mots en 8 thèmes`, done: learnedWords.size > 0, pct: wordPct },
    { id: 'grammar', label: 'Étudier la grammaire', icon: '☷', desc: `${LESSONS.length} leçons essentielles`, done: readLessons.size > 0, pct: lessonPct },
    { id: 'quiz', label: 'Tester tes connaissances', icon: '✎', desc: 'Quiz à choix multiples', done: quizHistory.length > 0 },
  ]

  return (
    <div className="page home-page">
      <div className="home-hero">
        <div className="home-title-ar">بِسْمِ اللهِ</div>
        <h1 className="home-title">Apprends l'arabe littéraire</h1>
        <p className="home-subtitle">دَرَجَاتٍ — pas à pas</p>
      </div>

      {streak.count > 0 && (
        <div className="streak-badge">
          🔥 Série de {streak.count} jour{streak.count > 1 ? 's' : ''}
        </div>
      )}

      <div className="stats-row">
        <div className="stat-card">
          <span className="stat-num">{learnedLetters.size}</span>
          <span className="stat-label">lettres</span>
          <div className="mini-bar"><div style={{ width: `${letterPct}%` }} /></div>
        </div>
        <div className="stat-card">
          <span className="stat-num">{learnedWords.size}</span>
          <span className="stat-label">mots</span>
          <div className="mini-bar"><div style={{ width: `${wordPct}%` }} /></div>
        </div>
        <div className="stat-card">
          <span className="stat-num">{readLessons.size}</span>
          <span className="stat-label">leçons</span>
          <div className="mini-bar"><div style={{ width: `${lessonPct}%` }} /></div>
        </div>
        {lastQuiz && (
          <div className="stat-card">
            <span className="stat-num">{lastQuiz.score}/{lastQuiz.total}</span>
            <span className="stat-label">dernier quiz</span>
            <div className="mini-bar"><div style={{ width: `${Math.round((lastQuiz.score / lastQuiz.total) * 100)}%` }} /></div>
          </div>
        )}
      </div>

      <h2 className="section-title">Par où commencer ?</h2>
      <div className="steps-list">
        {steps.map((s, i) => (
          <button key={s.id} className={`step-card${s.done ? ' done' : ''}`} onClick={() => setPage(s.id)}>
            <div className="step-num">{i + 1}</div>
            <div className={`step-icon${s.id === 'alphabet' ? ' arabic' : ''}`}>{s.icon}</div>
            <div className="step-info">
              <div className="step-label">{s.label}</div>
              <div className="step-desc">{s.desc}{s.pct != null ? ` · ${s.pct}%` : ''}</div>
            </div>
            {s.done && <div className="step-check">✓</div>}
          </button>
        ))}
      </div>

      <div className="home-tip">
        <span className="tip-icon">💡</span>
        <span>L'arabe littéraire (<em>al-fuṣḥā</em>) est la langue du Coran, de la presse et de la littérature dans tout le monde arabophone.</span>
      </div>
    </div>
  )
}
