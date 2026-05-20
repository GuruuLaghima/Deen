import { VOCABULARY, CATEGORIES } from '../data/vocabulary'
import { ALPHABET } from '../data/alphabet'
import { LESSONS } from '../data/grammar'
import { useNotifications } from '../hooks/useNotifications'

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

export default function ProgressPage({ learnedWords, learnedLetters, readLessons, quizHistory, streak, isDark, toggleTheme }) {
  const totalScore = quizHistory.reduce((s, q) => s + q.score, 0)
  const totalQ = quizHistory.reduce((s, q) => s + q.total, 0)
  const avgPct = totalQ > 0 ? Math.round((totalScore / totalQ) * 100) : null
  const { settings, permission, save, requestPermission } = useNotifications()

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

      <h2 className="section-title">Paramètres</h2>
      <div className="settings-section">

        <div className="settings-card">
          <div className="settings-row">
            <div className="settings-info">
              <span className="settings-row-title">Mode sombre</span>
              <span className="settings-row-sub">Réduit la fatigue visuelle</span>
            </div>
            <button className={`toggle-btn${isDark ? ' on' : ''}`} onClick={toggleTheme}>
              {isDark ? '☀ Clair' : '☾ Sombre'}
            </button>
          </div>
        </div>

        <div className="settings-card">
          <div className="settings-row">
            <div className="settings-info">
              <span className="settings-row-title">Rappels quotidiens</span>
              <span className="settings-row-sub">
                {permission === 'unsupported' && 'Non supporté sur cet appareil'}
                {permission === 'denied' && 'Bloqué — autorise dans les réglages'}
                {permission === 'default' && 'Autorise les notifications pour activer'}
                {permission === 'granted' && (settings.enabled ? `Rappel à ${settings.time}` : 'Désactivé')}
              </span>
            </div>
            {permission === 'default' && (
              <button className="toggle-btn" onClick={requestPermission}>Autoriser</button>
            )}
            {permission === 'granted' && (
              <button
                className={`toggle-btn${settings.enabled ? ' on' : ''}`}
                onClick={() => save({ ...settings, enabled: !settings.enabled })}
              >
                {settings.enabled ? 'Activé' : 'Activer'}
              </button>
            )}
          </div>
          {permission === 'granted' && settings.enabled && (
            <div className="settings-row settings-row-sub-row">
              <span className="settings-row-title">Heure du rappel</span>
              <input
                type="time"
                className="time-input"
                value={settings.time}
                onChange={e => save({ ...settings, time: e.target.value })}
              />
            </div>
          )}
        </div>

      </div>
    </div>
  )
}
