import { useState } from 'react'
import { ALPHABET } from '../data/alphabet'
import WritingCanvas from '../components/WritingCanvas'

export default function AlphabetPage({ learnedLetters, toggleLetter }) {
  const [selected, setSelected] = useState(null)

  const letter = ALPHABET.find(l => l.id === selected)

  return (
    <div className="page">
      <div className="page-header">
        <h1 className="page-title">الْحُرُوف الْهِجَائِيَّة</h1>
        <p className="page-sub">L'alphabet arabe — 28 lettres</p>
        <div className="progress-pill">{learnedLetters.size} / {ALPHABET.length} maîtrisées</div>
      </div>

      <div className="alpha-grid">
        {ALPHABET.map(l => (
          <button
            key={l.id}
            className={`alpha-cell${selected === l.id ? ' selected' : ''}${learnedLetters.has(l.id) ? ' learned' : ''}`}
            onClick={() => setSelected(selected === l.id ? null : l.id)}
          >
            <span className="alpha-letter arabic">{l.letter}</span>
            <span className="alpha-translit">{l.nameTranslit}</span>
            {learnedLetters.has(l.id) && <span className="alpha-check">✓</span>}
          </button>
        ))}
      </div>

      {letter && (
        <div className="letter-detail">
          <div className="letter-detail-top">
            <div className="detail-letter arabic">{letter.letter}</div>
            <div className="detail-info">
              <div className="detail-name">
                <span className="arabic">{letter.name}</span>
                <span className="detail-translit"> — {letter.nameTranslit}</span>
              </div>
              <div className="detail-sound">
                <span className="label">Son :</span> <strong>{letter.sound}</strong>
              </div>
              <p className="detail-pronun">{letter.pronunciation}</p>
              <div className="detail-example">
                <span className="label">Exemple : </span>
                <span className="arabic ex-word">{letter.example.word}</span>
                <span className="ex-translit"> ({letter.example.translit})</span>
                <span className="ex-meaning"> = {letter.example.meaning}</span>
              </div>
              <div className="detail-connects">
                {letter.connects
                  ? '✓ Se lie des deux côtés'
                  : '⚠ Ne se lie pas à gauche'}
              </div>
              <button
                className={`btn-learn${learnedLetters.has(letter.id) ? ' learned' : ''}`}
                onClick={() => toggleLetter(letter.id)}
              >
                {learnedLetters.has(letter.id) ? '✓ Maîtrisée' : 'Marquer comme maîtrisée'}
              </button>
            </div>
          </div>

          <WritingCanvas letter={letter.letter} />
        </div>
      )}

      {!selected && (
        <div className="alpha-hint">
          <p>Clique sur une lettre pour voir sa prononciation et t'entraîner à l'écrire.</p>
        </div>
      )}
    </div>
  )
}
