import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import Home from './screens/Home'
import ProjectDetails from './screens/ProjectDetails'
import About from './screens/About'
import Skills from './screens/Skills'
import Projects from './screens/Projects'
import Contact from './screens/Contact'

function AppRoutes() {
  const location = useLocation()
  
  return (
    <div className="screens-container">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/project" element={<ProjectDetails />} />
        <Route path="/about" element={<About />} />
        <Route path="/skills" element={<Skills />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  )
}

export default AppRoutes

