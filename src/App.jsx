import { BrowserRouter } from 'react-router-dom'
import AppRoutes from './components/AppRoutes'
import Navigation from './components/Navigation'
import ThemeToggle from './components/ThemeToggle'
import Background from './components/Background'

function App() {
  return (
    <BrowserRouter
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true,
      }}
    >
      <Background />
      <Navigation />
      <ThemeToggle />
      <AppRoutes />
    </BrowserRouter>
  )
}

export default App

