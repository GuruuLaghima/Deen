import { useState } from 'react'
import { VOCABULARY, CATEGORIES } from '../data/vocabulary'
import SpeakButton from '../components/SpeakButton'

function shuffle(arr) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

function buildQuestions(pool, mode, count = 10) {
  return shuffle(pool).slice(0, count).map(item => {
    const distractors = shuffle(pool.filter(w => w.id !== item.id)).slice(0, 3)
    return { item, options: shuffle([item, ...distractors]), mode }
  })
}

function QuizSetup({ onStart }) {
  const [category, setCategory] = useState('all')
  const [mode, setMode] = useState('ar-fr')

  function start() {
    const pool = category === 'all' ? VOCABULARY : VOCABULARY.filter(w => w.category === category)
    if (pool.length < 4) return
    onStart(buildQuestions(pool, mode))
  }

  return (
    <div className="quiz-setup">
      <h2 className="section-title">Configurer le quiz</h2>
      <div className="setup-group">
        <label className="setup-label">Thème</label>
        <div className="cat-scroll">
          <button className={`cat-btn${category === 'all' ? ' active' : ''}`} onClick={() => setCategory('all')}>Tous</button>
          {CATEGORIES.map(c => (
            <button key={c.id} className={`cat-btn${category === c.id ? ' active' : ''}`} onClick={() => setCategory(c.id)}>
              {c.icon} {c.label}
            </button>
          ))}
        </div>
      </div>
      <div className="setup-group">
        <label className="setup-label">Mode</label>
        <div className="mode-row">
          <button className={`mode-btn${mode === 'ar-fr' ? ' active' : ''}`} onClick={() => setMode('ar-fr')}>
            <span className="arabic">عَرَبِي</span> → Français
          </button>
          <button className={`mode-btn${mode === 'fr-ar' ? ' active' : ''}`} onClick={() => setMode('fr-ar')}>
            Français → <span className="arabic">عَرَبِي</span>
          </button>
        </div>
      </div>
      <button className="btn-start" onClick={start}>Commencer le quiz →</button>
    </div>
  )
}

function QuizQuestion({ question, onAnswer, answered }) {
  const { item, options, mode } = question

  return (
    <div className="quiz-question">
      <div className="q-prompt">Que signifie…</div>
      <div className="q-word">
        {mode === 'ar-fr' ? (
          <>
            <span className="q-arabic arabic">{item.arabic}</span>
            <span className="q-translit">({item.translit})</span>
            <SpeakButton text={item.arabic} rate={0.7} className="speak-quiz" />
          </>
        ) : (
          <span className="q-french">{item.french}</span>
        )}
      </div>
      <div className="q-options">
        {options.map(opt => {
          let cls = 'q-option'
          if (answered) {
            if (opt.id === item.id) cls += ' correct'
            else if (opt.id === answered) cls += ' wrong'
          }
          return (
            <button key={opt.id} className={cls} onClick={() => !answered && onAnswer(opt.id)} disabled={!!answered}>
              {mode === 'ar-fr'
                ? opt.french
                : <><span className="arabic">{opt.arabic}</span><span className="opt-translit"> ({opt.translit})</span></>}
            </button>
          )
        })}
      </div>
    </div>
  )
}

function QuizResult({ score, total, onRestart }) {
  const pct = Math.round((score / total) * 100)
  const emoji = pct >= 80 ? '🌟' : pct >= 60 ? '👍' : '💪'
  return (
    <div className="quiz-result">
      <div className="result-emoji">{emoji}</div>
      <div className="result-score">{score} / {total}</div>
      <div className="result-pct">{pct}%</div>
      <div className="result-msg">{pct >= 80 ? 'Excellent !' : pct >= 60 ? 'Bon travail !' : 'Continue à pratiquer !'}</div>
      <div className="result-btns">
        <button className="btn-start" onClick={onRestart}>Rejouer</button>
      </div>
    </div>
  )
}

export default function QuizPage({ saveQuizScore }) {
  const [questions, setQuestions] = useState(null)
  const [qi, setQi] = useState(0)
  const [answered, setAnswered] = useState(null)
  const [score, setScore] = useState(0)
  const [done, setDone] = useState(false)

  function start(qs) { setQuestions(qs); setQi(0); setAnswered(null); setScore(0); setDone(false) }

  function answer(optId) {
    setAnswered(optId)
    const correct = optId === questions[qi].item.id
    const newScore = correct ? score + 1 : score
    if (correct) setScore(newScore)
    setTimeout(() => {
      if (qi + 1 >= questions.length) { saveQuizScore(newScore, questions.length, 'mixed'); setDone(true) }
      else { setQi(i => i + 1); setAnswered(null) }
    }, 1100)
  }

  if (!questions) return (
    <div className="page">
      <div className="page-header"><h1 className="page-title">Quiz</h1><p className="page-sub">Teste tes connaissances</p></div>
      <QuizSetup onStart={start} />
    </div>
  )

  if (done) return (
    <div className="page">
      <div className="page-header"><h1 className="page-title">Quiz</h1></div>
      <QuizResult score={score} total={questions.length} onRestart={() => setQuestions(null)} />
    </div>
  )

  return (
    <div className="page">
      <div className="page-header">
        <h1 className="page-title">Quiz</h1>
        <div className="quiz-progress-row">
          <div className="quiz-progress-bar"><div style={{ width: `${(qi / questions.length) * 100}%` }} /></div>
          <span className="quiz-counter">{qi + 1} / {questions.length}</span>
        </div>
      </div>
      <QuizQuestion question={questions[qi]} onAnswer={answer} answered={answered} />
    </div>
  )
}
