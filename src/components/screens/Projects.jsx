import { useEffect, useRef } from 'react'

function Projects() {
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
    <section ref={sectionRef} id="projects" className="projects active">
      <h2 className="section-title fade-in">Featured Projects</h2>
      <div className="projects-grid">
        <div className="project-card fade-in">
          <div className="project-image">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" style={{width: '3rem', height: '3rem'}}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
            </svg>
          </div>
          <div className="project-content" style={{position: 'relative', zIndex: 2}}>
            <h3 style={{fontSize: '1.5rem', marginBottom: '1rem'}}>DataBank Ecosystem</h3>
            <p>A comprehensive ecosystem for humanitarian data management with form builder, analytics, and multi-language support.</p>
            <div className="project-links">
              <a href="https://github.com/haythamsoufi" target="_blank" rel="noopener noreferrer">GitHub</a>
              <a href="/project" target="_blank" rel="noopener noreferrer">Live Demo</a>
            </div>
          </div>
        </div>
        <div className="project-card fade-in">
          <div className="project-image">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" style={{width: '3rem', height: '3rem'}}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
            </svg>
          </div>
          <div className="project-content" style={{position: 'relative', zIndex: 2}}>
            <h3 style={{fontSize: '1.5rem', marginBottom: '1rem'}}>Project Name 2</h3>
            <p>Brief description of your project and what it does. Highlight key features and technologies used.</p>
            <div className="project-links">
              <a href="https://github.com/haythamsoufi" target="_blank" rel="noopener noreferrer">GitHub</a>
              <a href="#" target="_blank" rel="noopener noreferrer">Live Demo</a>
            </div>
          </div>
        </div>
        <div className="project-card fade-in">
          <div className="project-image">🌟</div>
          <div className="project-content" style={{position: 'relative', zIndex: 2}}>
            <h3 style={{fontSize: '1.5rem', marginBottom: '1rem'}}>Project Name 3</h3>
            <p>Brief description of your project and what it does. Highlight key features and technologies used.</p>
            <div className="project-links">
              <a href="https://github.com/haythamsoufi" target="_blank" rel="noopener noreferrer">GitHub</a>
              <a href="#" target="_blank" rel="noopener noreferrer">Live Demo</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Projects

