import { useState, useEffect } from 'react'

export function useTheme() {
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem('deen_theme') === 'dark'
    // Apply immediately to avoid flash of wrong theme
    document.documentElement.setAttribute('data-theme', saved ? 'dark' : 'light')
    return saved
  })

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light')
    localStorage.setItem('deen_theme', isDark ? 'dark' : 'light')
  }, [isDark])

  return { isDark, toggleTheme: () => setIsDark(d => !d) }
}
