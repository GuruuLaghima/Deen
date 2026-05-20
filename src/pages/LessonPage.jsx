import { useState, useEffect } from 'react'
import { MADINAH_BOOK1 } from '../data/madinah'
import SpeakButton from '../components/SpeakButton'
import WritingCanvas from '../components/WritingCanvas'

const hasArabic = (str) => /[؀-ۿ]/.test(str)

function ExerciseCard({ ex, done, onAnswer }) {
  const [selected, setSelected] = useState(null)
  const alreadyDone = done.has(ex.id)
  const isBinary = ex.type === 'binary'

  function choose(i) {
    if (selected !== null || alreadyDone) return
    setSelected(i)
    if (i === ex.answer) onAnswer(ex.id)
  }

  return (
    <div className={`lp-ex-card${alreadyDone ? ' ex-done' : ''}`}>
      {alreadyDone && <span className="lp-ex-tick">✓</span>}
      <p className={`lp-ex-q${hasArabic(ex.q) ? ' arabic-inline' : ''}`}>{ex.q}</p>
      <div className={`lp-ex-opts${isBinary ? ' binary' : ''}`}>
        {ex.options.map((opt, i) => {
          const answered = selected !== null || alreadyDone
          const isCorrect = i === ex.answer
          let cls = 'lp-ex-opt'
          if (hasArabic(opt)) cls += ' arabic'
          if (answered && isCorrect) cls += ' correct'
          else if (selected === i && !isCorrect) cls += ' wrong'
          return (
            <button key={i} className={cls} onClick={() => choose(i)} disabled={answered}>
              {opt}
            </button>
          )
        })}
      </div>
      {selected !== null && selected !== ex.answer && ex.type === 'complete' && (
        <div className="lp-ex-blank arabic">{ex.blank}</div>
      )}
    </div>
  )
}

export default function LessonPage({ lessonId, lessonProgress, saveExerciseDone, setPage }) {
  const [tab, setTab] = useState('vocab')
  const [selectedVocabIdx, setSelectedVocabIdx] = useState(null)
  const lesson = MADINAH_BOOK1.lessons.find(l => l.id === lessonId)

  useEffect(() => {
    setTab('vocab')
    setSelectedVocabIdx(null)
  }, [lessonId])

  if (!lesson) return null

  const done = lessonProgress[lesson.id] || new Set()
  const exTotal = lesson.exercises.length
  const exDone = done.size

  const activeWord = selectedVocabIdx !== null ? lesson.vocabulary[selectedVocabIdx] : null

  return (
    <div className="page">
      <div className="lp-header">
        <button className="lp-back" onClick={() => setPage('cours')}>← Cours</button>
        <div className="lp-title-row">
          <span className="lp-num">Leçon {lesson.id}</span>
          <h1 className="lp-ar-title arabic">{lesson.title}</h1>
        </div>
        <p className="lp-subtitle">{lesson.subtitle}</p>
        <p className="lp-concept">{lesson.concept}</p>
      </div>

      <div className="lp-tabs">
        <button className={`lp-tab${tab === 'vocab' ? ' active' : ''}`} onClick={() => setTab('vocab')}>
          Vocabulaire
        </button>
        <button className={`lp-tab${tab === 'grammar' ? ' active' : ''}`} onClick={() => setTab('grammar')}>
          Grammaire
        </button>
        <button className={`lp-tab${tab === 'ex' ? ' active' : ''}`} onClick={() => setTab('ex')}>
          Exercices {exDone > 0 && <span className="lp-ex-badge">{exDone}/{exTotal}</span>}
        </button>
      </div>

      {tab === 'vocab' && (
        <>
          <div className="lp-vocab-grid">
            {lesson.vocabulary.map((w, i) => (
              <button
                key={i}
                className={`lp-vocab-card${selectedVocabIdx === i ? ' selected' : ''}`}
                onClick={() => setSelectedVocabIdx(selectedVocabIdx === i ? null : i)}
              >
                <div className="lp-vocab-top">
                  <span className="lp-vocab-ar arabic">{w.ar}</span>
                  <SpeakButton text={w.ar} rate={0.7} className="speak-vocab" />
                </div>
                <div className="lp-vocab-translit">{w.translit}</div>
                <div className="lp-vocab-fr">{w.fr}</div>
                <div className="lp-vocab-bottom">
                  <span className={`lp-vocab-gender ${w.gender}`}>{w.gender === 'm' ? 'masc.' : 'fém.'}</span>
                  <span className="lp-vocab-write-icon">✎</span>
                </div>
              </button>
            ))}
          </div>

          {/* Writing canvas — stays mounted to preserve drawing across word switches */}
          <div style={{ display: activeWord ? 'block' : 'none' }}>
            <div className="lp-writing-caption">
              {activeWord && <>
                <span className="arabic lp-writing-ar">{activeWord.ar}</span>
                <span className="lp-writing-translit">{activeWord?.translit}</span>
                <span className="lp-writing-fr">— {activeWord?.fr}</span>
              </>}
            </div>
            <WritingCanvas text={activeWord?.ar ?? ''} />
          </div>

          {!activeWord && (
            <p className="lp-write-hint">Appuie sur un mot pour pratiquer l'écriture ✎</p>
          )}
        </>
      )}

      {tab === 'grammar' && (
        <div className="lp-gram-panel">
          <div className="lp-gram-rule-box">
            <span className={hasArabic(lesson.grammar.rule) ? 'arabic-inline' : ''}>{lesson.grammar.rule}</span>
          </div>
          <div className="lp-gram-explanation">
            {lesson.grammar.explanation.split('\n\n').map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>
          <div className="lp-gram-heading">Exemples</div>
          <div className="lp-gram-examples">
            {lesson.grammar.examples.map((ex, i) => (
              <div key={i} className="lp-gram-ex">
                <div className="lp-gram-ex-ar arabic">{ex.ar}</div>
                <div className="lp-gram-ex-fr">{ex.fr}</div>
                <SpeakButton text={ex.ar} rate={0.65} className="speak-ex" />
              </div>
            ))}
          </div>
        </div>
      )}

      {tab === 'ex' && (
        <div className="lp-exercises">
          {exDone >= exTotal && (
            <div className="lp-all-done">Leçon complétée !</div>
          )}
          {lesson.exercises.map(ex => (
            <ExerciseCard
              key={ex.id}
              ex={ex}
              done={done}
              onAnswer={(exId) => saveExerciseDone(lesson.id, exId)}
            />
          ))}
        </div>
      )}
    </div>
  )
}
