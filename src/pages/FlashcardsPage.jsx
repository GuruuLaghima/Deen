import { useState, useMemo } from 'react'
import { VOCABULARY, CATEGORIES } from '../data/vocabulary'

function shuffle(arr) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

export default function FlashcardsPage({ learnedWords, toggleWord }) {
  const [category, setCategory] = useState('all')
  const [index, setIndex] = useState(0)
  const [flipped, setFlipped] = useState(false)
  const [isShuffled, setIsShuffled] = useState(false)
  const [shuffledList, setShuffledList] = useState([])

  const filtered = useMemo(() =>
    category === 'all' ? VOCABULARY : VOCABULARY.filter(w => w.category === category),
    [category]
  )

  const deck = isShuffled ? shuffledList : filtered

  const word = deck[index]

  function changeCategory(cat) {
    setCategory(cat)
    setIndex(0)
    setFlipped(false)
    setIsShuffled(false)
  }

  function prev() {
    setIndex(i => (i - 1 + deck.length) % deck.length)
    setFlipped(false)
  }

  function next() {
    setIndex(i => (i + 1) % deck.length)
    setFlipped(false)
  }

  function handleShuffle() {
    const sl = shuffle(filtered)
    setShuffledList(sl)
    setIsShuffled(true)
    setIndex(0)
    setFlipped(false)
  }

  const learnedInDeck = deck.filter(w => learnedWords.has(w.id)).length

  if (!word) return null

  return (
    <div className="page">
      <div className="page-header">
        <h1 className="page-title">Vocabulaire</h1>
        <p className="page-sub">{learnedWords.size} / {VOCABULARY.length} mots appris</p>
      </div>

      <div className="cat-scroll">
        <button className={`cat-btn${category === 'all' ? ' active' : ''}`} onClick={() => changeCategory('all')}>
          Tous
        </button>
        {CATEGORIES.map(c => (
          <button
            key={c.id}
            className={`cat-btn${category === c.id ? ' active' : ''}`}
            onClick={() => changeCategory(c.id)}
          >
            {c.icon} {c.label}
          </button>
        ))}
      </div>

      <div className="deck-info">
        <span>{index + 1} / {deck.length}</span>
        <span>{learnedInDeck} / {deck.length} appris</span>
        <button className="btn-shuffle" onClick={handleShuffle}>⇌ Mélanger</button>
      </div>

      <div className={`flashcard${flipped ? ' flipped' : ''}`} onClick={() => setFlipped(f => !f)}>
        <div className="card-inner">
          <div className="card-front">
            <div className="card-arabic arabic">{word.arabic}</div>
            <div className="card-translit">{word.translit}</div>
            <div className="card-hint">Clique pour retourner</div>
          </div>
          <div className="card-back">
            <div className="card-french">{word.french}</div>
            <div className="card-arabic-small arabic">{word.arabic}</div>
            <div className="card-translit">{word.translit}</div>
          </div>
        </div>
      </div>

      <div className="card-controls">
        <button className="btn-nav" onClick={prev}>← Précédent</button>
        <button
          className={`btn-learn${learnedWords.has(word.id) ? ' learned' : ''}`}
          onClick={() => toggleWord(word.id)}
        >
          {learnedWords.has(word.id) ? '✓ Appris' : '+ Marquer appris'}
        </button>
        <button className="btn-nav" onClick={next}>Suivant →</button>
      </div>

      <div className="deck-progress-bar">
        <div style={{ width: `${(learnedInDeck / deck.length) * 100}%` }} />
      </div>
    </div>
  )
}
