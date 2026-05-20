import { useState, useEffect, useRef } from 'react'

const LS_KEY = 'deen_reminder'

export function useNotifications() {
  const [settings, setSettings] = useState(() => {
    try { return JSON.parse(localStorage.getItem(LS_KEY)) || { enabled: false, time: '08:00' } }
    catch { return { enabled: false, time: '08:00' } }
  })
  const [permission, setPermission] = useState(
    () => 'Notification' in window ? Notification.permission : 'unsupported'
  )
  const timerRef = useRef(null)

  async function requestPermission() {
    if (!('Notification' in window)) return
    const result = await Notification.requestPermission()
    setPermission(result)
  }

  function save(next) {
    setSettings(next)
    localStorage.setItem(LS_KEY, JSON.stringify(next))
  }

  function fire() {
    const today = new Date().toISOString().slice(0, 10)
    if (localStorage.getItem('deen_last_notif') === today) return
    if (Notification.permission !== 'granted') return
    new Notification("دين — C'est l'heure d'étudier 📚", {
      body: 'Quelques minutes d\'arabe aujourd\'hui ?',
      tag: 'deen-daily',
    })
    localStorage.setItem('deen_last_notif', today)
  }

  useEffect(() => {
    clearTimeout(timerRef.current)
    if (!settings.enabled || permission !== 'granted') return

    const [h, m] = settings.time.split(':').map(Number)
    const now = new Date()
    const target = new Date()
    target.setHours(h, m, 0, 0)

    if (target <= now) {
      fire() // time already passed today — fire immediately if not done yet
    } else {
      timerRef.current = setTimeout(fire, target - now)
    }

    return () => clearTimeout(timerRef.current)
  }, [settings, permission])

  return { settings, permission, save, requestPermission }
}
