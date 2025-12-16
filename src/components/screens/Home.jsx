import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'

function Home() {
  const typingTextRef = useRef(null)

  useEffect(() => {
    // Typing effect
    const typingText = typingTextRef.current
    if (!typingText) return

    const text = typingText.textContent
    typingText.textContent = ''
    let i = 0

    const typeWriter = () => {
      if (i < text.length) {
        typingText.textContent += text.charAt(i)
        i++
        setTimeout(typeWriter, 50)
      }
    }

    typeWriter()

    // Make fade-in elements visible
    const section = document.getElementById('home')
    if (section) {
      const fadeElements = section.querySelectorAll('.fade-in')
      fadeElements.forEach(el => el.classList.add('visible'))
    }
  }, [])

  return (
    <section id="home" className="hero active" role="region" aria-label="Home">
      <div className="hero-content">
        <div className="hero-intro">
          <div className="hero-greeting">
            <span className="greeting-text">Hello, I'm</span>
            <h1 className="hero-name">Haytham Alsoufi</h1>
            <h2 className="hero-subtitle">Data Passionate & Humanitarian</h2>
          </div>
          <p className="typing-text" ref={typingTextRef}>
            Data Collection | Data Systems | Data Visualization | Vibe Coding
          </p>
          <div className="hero-description">
            <p>
              I'm a passionate <span className="highlight">data systems specialist</span> and <span className="highlight">humanitarian professional</span> who loves creating solutions that drive positive change.
              With expertise in <span className="highlight">data collection systems</span>, information management, and humanitarian data analysis, I combine
              technical skills with field experience to support global humanitarian responses.
            </p>
            <p>
              I believe in the power of data to drive positive change, especially in humanitarian contexts.
              Whether it's producing impactful reports for international organizations, ensuring data quality in conflict zones,
              or creating interactive dashboards that inform global decision-making, I approach every project with enthusiasm and attention to detail.
            </p>
          </div>
        </div>

        <div className="hero-main">
          <div className="hero-project">
            <div className="project-label">Featured Project</div>
            <h3 className="project-title">DataBank Ecosystem</h3>
            <p className="project-description">
              A comprehensive ecosystem designed to streamline data collection, management, and reporting
              for humanitarian organizations. Built with the needs of NGOs, international organizations, and field teams
              in mind, this ecosystem enables teams to work more efficiently and make data-driven decisions.
            </p>
            <div className="project-features-preview">
              <span className="feature-badge">Form Builder</span>
              <span className="feature-badge">Multi-Language</span>
              <span className="feature-badge">Analytics</span>
              <span className="feature-badge">Mobile Apps</span>
            </div>
            <Link to="/project" className="project-cta" aria-label="Explore DataBank Ecosystem project">
              <span>Explore Project</span>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path d="M7.5 15L12.5 10L7.5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Home

