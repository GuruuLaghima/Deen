import { useState } from 'react'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import AlphabetPage from './pages/AlphabetPage'
import FlashcardsPage from './pages/FlashcardsPage'
import QuizPage from './pages/QuizPage'
import GrammarPage from './pages/GrammarPage'
import ProgressPage from './pages/ProgressPage'
import { useProgress } from './hooks/useProgress'

export default function App() {
  const [page, setPage] = useState('home')
  const progress = useProgress()

  const pages = {
    home:       <Home       setPage={setPage} learnedWords={progress.learnedWords} learnedLetters={progress.learnedLetters} readLessons={progress.readLessons} quizHistory={progress.quizHistory} streak={progress.streak} />,
    alphabet:   <AlphabetPage   learnedLetters={progress.learnedLetters} toggleLetter={progress.toggleLetter} />,
    flashcards: <FlashcardsPage learnedWords={progress.learnedWords} toggleWord={progress.toggleWord} />,
    quiz:       <QuizPage       saveQuizScore={progress.saveQuizScore} />,
    grammar:    <GrammarPage    readLessons={progress.readLessons} markLessonRead={progress.markLessonRead} />,
    progress:   <ProgressPage   learnedWords={progress.learnedWords} learnedLetters={progress.learnedLetters} readLessons={progress.readLessons} quizHistory={progress.quizHistory} streak={progress.streak} />,
  }

  return (
    <div className="app">
      <Navbar page={page} setPage={setPage} />
      <main className="main">{pages[page]}</main>
    </div>
  )
}
