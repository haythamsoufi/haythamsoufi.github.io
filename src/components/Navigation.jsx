import { useState, useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'

function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const location = useLocation()
  const navRef = useRef(null)

  const navItems = [
    { path: '/', label: 'Home', screen: 'home' },
    { path: '/project', label: 'DataBank Project', screen: 'databank-details' },
    { path: '/about', label: 'About', screen: 'about' },
    { path: '/skills', label: 'Skills', screen: 'skills' },
    { path: '/projects', label: 'Projects', screen: 'projects' },
    { path: '/contact', label: 'Contact', screen: 'contact' }
  ]

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  // Update CSS variable with actual nav height
  useEffect(() => {
    const updateNavHeight = () => {
      if (navRef.current) {
        const height = navRef.current.offsetHeight
        document.documentElement.style.setProperty('--nav-height', `${height}px`)
      }
    }

    // Initial calculation
    updateNavHeight()

    // Update on resize
    window.addEventListener('resize', updateNavHeight)
    
    // Update when menu opens/closes (affects height on mobile)
    const timeoutId = setTimeout(updateNavHeight, 100)

    return () => {
      window.removeEventListener('resize', updateNavHeight)
      clearTimeout(timeoutId)
    }
  }, [isMenuOpen])

  useEffect(() => {
    setIsMenuOpen(false)
  }, [location])

  return (
    <nav id="navbar" ref={navRef}>
      <button 
        className="hamburger-menu" 
        id="hamburgerMenu" 
        onClick={toggleMenu}
        aria-label="Toggle navigation menu"
      >
        <span className="hamburger-line"></span>
        <span className="hamburger-line"></span>
        <span className="hamburger-line"></span>
      </button>
      <ul id="navMenu" className={isMenuOpen ? 'active' : ''}>
        {navItems.map((item) => (
          <li key={item.path}>
            <Link 
              to={item.path}
              className={location.pathname === item.path ? 'active' : ''}
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default Navigation

