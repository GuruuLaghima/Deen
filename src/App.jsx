import { useState } from 'react'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import AlphabetPage from './pages/AlphabetPage'
import FlashcardsPage from './pages/FlashcardsPage'
import QuizPage from './pages/QuizPage'
import CoursPage from './pages/CoursPage'
import LessonPage from './pages/LessonPage'
import ProgressPage from './pages/ProgressPage'
import { useProgress } from './hooks/useProgress'
import { useTheme } from './hooks/useTheme'

export default function App() {
  const [page, setPage] = useState('home')
  const [selectedLesson, setSelectedLesson] = useState(null)
  const progress = useProgress()
  const { isDark, toggleTheme } = useTheme()

  function openLesson(lessonId) {
    setSelectedLesson(lessonId)
    setPage('lesson')
  }

  const pages = {
    home:       <Home       setPage={setPage} learnedWords={progress.learnedWords} learnedLetters={progress.learnedLetters} readLessons={progress.readLessons} quizHistory={progress.quizHistory} streak={progress.streak} />,
    alphabet:   <AlphabetPage   learnedLetters={progress.learnedLetters} toggleLetter={progress.toggleLetter} />,
    flashcards: <FlashcardsPage learnedWords={progress.learnedWords} toggleWord={progress.toggleWord} />,
    quiz:       <QuizPage       saveQuizScore={progress.saveQuizScore} />,
    cours:      <CoursPage      lessonProgress={progress.lessonProgress} openLesson={openLesson} />,
    lesson:     <LessonPage     lessonId={selectedLesson} lessonProgress={progress.lessonProgress} saveExerciseDone={progress.saveExerciseDone} setPage={setPage} />,
    progress:   <ProgressPage   learnedWords={progress.learnedWords} learnedLetters={progress.learnedLetters} readLessons={progress.readLessons} quizHistory={progress.quizHistory} streak={progress.streak} isDark={isDark} toggleTheme={toggleTheme} />,
  }

  const navPage = page === 'lesson' ? 'cours' : page

  return (
    <div className="app">
      <Navbar page={navPage} setPage={setPage} isDark={isDark} toggleTheme={toggleTheme} />
      <main className="main">{pages[page] ?? pages.home}</main>
    </div>
  )
}
