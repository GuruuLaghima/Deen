export default function Navbar({ page, setPage, isDark, toggleTheme }) {
  const tabs = [
    { id: 'home',       label: 'Accueil',   icon: '⌂' },
    { id: 'alphabet',   label: 'Alphabet',  icon: 'أ',  arabic: true },
    { id: 'flashcards', label: 'Mots',      icon: '⧉' },
    { id: 'quiz',       label: 'Quiz',      icon: '✎' },
    { id: 'cours',      label: 'Cours',     icon: '☷' },
    { id: 'progress',   label: 'Progrès',   icon: '◎' },
  ]

  return (
    <nav className="navbar">
      {tabs.map(tab => (
        <button
          key={tab.id}
          className={`nav-btn${page === tab.id ? ' active' : ''}`}
          onClick={() => setPage(tab.id)}
          title={tab.label}
        >
          <span className={`nav-icon${tab.arabic ? ' arabic' : ''}`}>{tab.icon}</span>
          <span className="nav-label">{tab.label}</span>
        </button>
      ))}
      <button className="nav-theme-btn" onClick={toggleTheme} title={isDark ? 'Mode clair' : 'Mode sombre'}>
        <span className="nav-icon">{isDark ? '☀' : '☾'}</span>
        <span className="nav-label nav-theme-label">{isDark ? 'Clair' : 'Sombre'}</span>
      </button>
    </nav>
  )
}
