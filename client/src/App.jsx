import { MotionConfig } from 'framer-motion'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Admin from './pages/Admin'
import useTheme from './hooks/useTheme'

export default function App() {
  const [theme, toggleTheme] = useTheme()
  return (
    <MotionConfig reducedMotion="user">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home theme={theme} toggleTheme={toggleTheme} />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="*" element={<Home theme={theme} toggleTheme={toggleTheme} />} />
        </Routes>
      </BrowserRouter>
    </MotionConfig>
  )
}
