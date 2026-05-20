import { useState, useCallback } from 'react'

const LS_KEYS = {
  words: 'deen_learned_words',
  letters: 'deen_learned_letters',
  lessons: 'deen_read_lessons',
  quizHistory: 'deen_quiz_history',
  streak: 'deen_streak',
  lessonProgress: 'deen_lesson_progress',
}

function readSet(key) {
  try {
    return new Set(JSON.parse(localStorage.getItem(key) || '[]'))
  } catch {
    return new Set()
  }
}

function writeSet(key, set) {
  localStorage.setItem(key, JSON.stringify([...set]))
}

function today() {
  return new Date().toISOString().slice(0, 10)
}

function updateStreak() {
  try {
    const raw = JSON.parse(localStorage.getItem(LS_KEYS.streak) || '{}')
    const t = today()
    if (raw.lastDate === t) return raw
    const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10)
    const count = raw.lastDate === yesterday ? (raw.count || 0) + 1 : 1
    const next = { lastDate: t, count }
    localStorage.setItem(LS_KEYS.streak, JSON.stringify(next))
    return next
  } catch {
    return { count: 1, lastDate: today() }
  }
}

export function useProgress() {
  const [learnedWords, setLearnedWords] = useState(() => readSet(LS_KEYS.words))
  const [learnedLetters, setLearnedLetters] = useState(() => readSet(LS_KEYS.letters))
  const [readLessons, setReadLessons] = useState(() => readSet(LS_KEYS.lessons))
  const [quizHistory, setQuizHistory] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(LS_KEYS.quizHistory) || '[]')
    } catch {
      return []
    }
  })
  const [lessonProgress, setLessonProgress] = useState(() => {
    try {
      const raw = JSON.parse(localStorage.getItem(LS_KEYS.lessonProgress) || '{}')
      const result = {}
      for (const [k, v] of Object.entries(raw)) result[k] = new Set(v)
      return result
    } catch { return {} }
  })

  const [streak, setStreak] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(LS_KEYS.streak) || '{"count":0,"lastDate":""}')
    } catch {
      return { count: 0, lastDate: '' }
    }
  })

  const toggleWord = useCallback((id) => {
    setLearnedWords(prev => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      writeSet(LS_KEYS.words, next)
      return next
    })
    setStreak(updateStreak())
  }, [])

  const toggleLetter = useCallback((id) => {
    setLearnedLetters(prev => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      writeSet(LS_KEYS.letters, next)
      return next
    })
    setStreak(updateStreak())
  }, [])

  const markLessonRead = useCallback((id) => {
    setReadLessons(prev => {
      const next = new Set(prev)
      next.add(id)
      writeSet(LS_KEYS.lessons, next)
      return next
    })
    setStreak(updateStreak())
  }, [])

  const saveExerciseDone = useCallback((lessonId, exerciseId) => {
    setLessonProgress(prev => {
      const key = String(lessonId)
      const set = new Set(prev[key] || [])
      set.add(exerciseId)
      const next = { ...prev, [key]: set }
      const toStore = {}
      for (const [k, v] of Object.entries(next)) toStore[k] = [...v]
      localStorage.setItem(LS_KEYS.lessonProgress, JSON.stringify(toStore))
      return next
    })
    setStreak(updateStreak())
  }, [])

  const saveQuizScore = useCallback((score, total, category) => {
    const entry = { date: today(), score, total, category }
    setQuizHistory(prev => {
      const next = [entry, ...prev].slice(0, 20)
      localStorage.setItem(LS_KEYS.quizHistory, JSON.stringify(next))
      return next
    })
    setStreak(updateStreak())
  }, [])

  return { learnedWords, learnedLetters, readLessons, lessonProgress, quizHistory, streak, toggleWord, toggleLetter, markLessonRead, saveExerciseDone, saveQuizScore }
}
