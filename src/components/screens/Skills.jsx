import { useEffect, useRef } from 'react'

function Skills() {
  const sectionRef = useRef(null)

  useEffect(() => {
    if (sectionRef.current) {
      sectionRef.current.scrollTop = 0
      // Make fade-in elements visible
      const fadeElements = sectionRef.current.querySelectorAll('.fade-in')
      fadeElements.forEach(el => el.classList.add('visible'))
    }
  }, [])

  return (
    <section ref={sectionRef} id="skills" className="active">
      <h2 className="section-title fade-in">Skills & Technologies</h2>
      <div className="skills-grid">
        <div className="skill-card fade-in">
          <h3 style={{fontSize: '1.5rem', marginBottom: '1rem'}}>💜 Vibe Coding</h3>
          <p style={{color: 'var(--text-secondary)', fontSize: '0.95rem', marginBottom: '1.5rem'}}>Building with passion and creativity</p>
          <div className="skill-tags">
            <span className="skill-tag" style={{background: 'var(--gradient-3)'}}>Python</span>
            <span className="skill-tag" style={{background: 'var(--gradient-2)'}}>React</span>
          </div>
        </div>
        <div className="skill-card fade-in">
          <h3 style={{fontSize: '1.5rem', marginBottom: '1.5rem'}}>
            <svg className="inline-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" style={{width: '1.5rem', height: '1.5rem', verticalAlign: 'middle', marginRight: '0.5rem'}}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
            </svg>
            Power Platform
          </h3>
          <div className="skill-tags">
            <span className="skill-tag" style={{background: 'var(--gradient-3)', boxShadow: '0 0 20px rgba(236, 72, 153, 0.4)'}}>Power BI</span>
            <span className="skill-tag">Power Apps</span>
            <span className="skill-tag">Power Automate</span>
            <span className="skill-tag">Power Platform</span>
          </div>
        </div>
        <div className="skill-card fade-in">
          <h3 style={{fontSize: '1.5rem', marginBottom: '1.5rem'}}>Tools & Others</h3>
          <div className="skill-tags">
            <span className="skill-tag">Git</span>
            <span className="skill-tag">Docker</span>
            <span className="skill-tag">AWS</span>
            <span className="skill-tag">Linux</span>
            <span className="skill-tag">Figma</span>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Skills

