export default function Navbar({ page, setPage }) {
  const tabs = [
    { id: 'home', label: 'Accueil', icon: '⌂' },
    { id: 'alphabet', label: 'Alphabet', icon: 'أ' },
    { id: 'flashcards', label: 'Mots', icon: '⧉' },
    { id: 'quiz', label: 'Quiz', icon: '✎' },
    { id: 'grammar', label: 'Grammaire', icon: '☷' },
    { id: 'progress', label: 'Progrès', icon: '◎' },
  ]

  return (
    <nav className="navbar">
      {tabs.map(tab => (
        <button
          key={tab.id}
          className={`nav-btn${page === tab.id ? ' active' : ''}`}
          onClick={() => setPage(tab.id)}
        >
          <span className={`nav-icon${tab.id === 'alphabet' ? ' arabic' : ''}`}>{tab.icon}</span>
          <span className="nav-label">{tab.label}</span>
        </button>
      ))}
    </nav>
  )
}
