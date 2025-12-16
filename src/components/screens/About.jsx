import { useEffect, useRef } from 'react'

function About() {
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
    <section ref={sectionRef} id="about" className="about active">
      <h2 className="section-title fade-in">About Me</h2>
      <div className="about-intro fade-in" style={{marginBottom: '3rem', textAlign: 'center', color: 'var(--text-secondary)', maxWidth: '800px', marginLeft: 'auto', marginRight: 'auto'}}>
        <p style={{fontSize: '1.1rem', lineHeight: 1.8, marginBottom: '1.5rem'}}>
          I'm a data systems professional and humanitarian worker with extensive experience in data collection,
          analysis, and visualization. Currently working as an Officer for Federation-wide Data Collection and
          Analysis at the International Federation of Red Cross and Red Crescent Societies (IFRC) in Geneva, Switzerland.
        </p>
        <p style={{fontSize: '1.1rem', lineHeight: 1.8}}>
          With a background in mechanical engineering and hands-on experience in information management,
          I bridge the gap between technical expertise and humanitarian needs. My work spans from field data
          collection in conflict zones to creating interactive dashboards that inform global humanitarian responses.
        </p>
      </div>
      <div className="about-content">
        <div className="about-text fade-in">
          <h3 style={{color: 'var(--primary-color)', marginBottom: '1.5rem', fontSize: '1.5rem', textShadow: '0 0 20px rgba(139, 92, 246, 0.3)'}}>Core Expertise</h3>
          <ul style={{listStyle: 'none', lineHeight: 2.5}}>
            <li style={{marginBottom: '0.8rem'}}>
              <svg className="inline-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" style={{width: '1.25rem', height: '1.25rem', verticalAlign: 'middle', marginRight: '0.5rem'}}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
              </svg>
              Data Visualization & Analysis
            </li>
            <li style={{marginBottom: '0.8rem'}}>
              <svg className="inline-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" style={{width: '1.25rem', height: '1.25rem', verticalAlign: 'middle', marginRight: '0.5rem'}}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42" />
              </svg>
              Graphic Design & UI/UX
            </li>
            <li style={{marginBottom: '0.8rem'}}>
              <svg className="inline-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" style={{width: '1.25rem', height: '1.25rem', verticalAlign: 'middle', marginRight: '0.5rem'}}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655-5.653a2.548 2.548 0 010-3.586l4.94-4.94a2.548 2.548 0 013.586 0l5.653 4.655a2.548 2.548 0 010 3.586l-4.94 4.94a2.548 2.548 0 01-3.586 0z" />
              </svg>
              Information Management Systems
            </li>
            <li style={{marginBottom: '0.8rem'}}>
              <svg className="inline-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" style={{width: '1.25rem', height: '1.25rem', verticalAlign: 'middle', marginRight: '0.5rem'}}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 6.75V15m6-6v8.25m.513 3.58C21.58 15.177 22.5 13.244 22.5 12c0-1.244-.92-3.177-2.987-4.58M15 21.75c-1.5.075-3 .075-4.5 0m4.5 0V21c0 .621-.504 1.125-1.125 1.125h-2.25c-.621 0-1.125-.504-1.125-1.125v-.75m6 0h3.75c.621 0 1.125-.504 1.125-1.125V12c0-1.244-.92-3.177-2.987-4.58C15.92 6.177 15 8.244 15 12v.75m-9 0h3.75c.621 0 1.125.504 1.125 1.125V15c0 .621-.504 1.125-1.125 1.125H6m-3.75-3.75h.008v.008H2.25V12z" />
              </svg>
              Geospatial Data Analysis
            </li>
            <li style={{marginBottom: '0.8rem'}}>
              <svg className="inline-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" style={{width: '1.25rem', height: '1.25rem', verticalAlign: 'middle', marginRight: '0.5rem'}}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
              </svg>
              Full-stack Development
            </li>
          </ul>
        </div>
        <div className="about-text fade-in">
          <h3 style={{color: 'var(--primary-color)', marginBottom: '1.5rem', fontSize: '1.5rem', textShadow: '0 0 20px rgba(139, 92, 246, 0.3)'}}>Professional Highlights</h3>
          <div style={{marginTop: '1rem'}}>
            <h4 style={{color: 'var(--text-color)', marginBottom: '0.5rem', fontSize: '1.1rem'}}>
              <svg className="inline-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" style={{width: '1.25rem', height: '1.25rem', verticalAlign: 'middle', marginRight: '0.5rem'}}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.944 11.944 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
              </svg>
              Languages
            </h4>
            <ul style={{listStyle: 'none', padding: 0, margin: 0, color: 'var(--text-secondary)'}}>
              <li style={{marginBottom: '0.3rem'}}>• English (Professional)</li>
              <li style={{marginBottom: '0.3rem'}}>• Arabic (Native/Bilingual)</li>
            </ul>
          </div>
        </div>
        <div className="about-text fade-in">
          <h3 style={{color: 'var(--primary-color)', marginBottom: '1.5rem', fontSize: '1.5rem', textShadow: '0 0 20px rgba(139, 92, 246, 0.3)'}}>Professional Experience</h3>
          <div style={{marginTop: '1rem', position: 'relative'}}>
            <div style={{position: 'relative', paddingLeft: '2rem', marginBottom: '2rem'}}>
              <div style={{position: 'absolute', left: 0, top: '0.5rem', width: '8px', height: '8px', background: 'var(--gradient-1)', borderRadius: '50%', boxShadow: '0 0 10px rgba(139, 92, 246, 0.4)'}}></div>
              <div style={{borderLeft: '2px solid var(--primary-color)', opacity: 0.3, position: 'absolute', left: '3px', top: '1rem', height: 'calc(100% - 1rem)'}}></div>
              <h4 style={{color: 'var(--primary-color)', marginBottom: '0.5rem', fontSize: '1.1rem', fontWeight: 600}}>International Federation of Red Cross and Red Crescent Societies</h4>
              <div style={{marginBottom: '0.8rem'}}>
                <div style={{fontWeight: 600, color: 'var(--text-color)', fontSize: '1rem', marginBottom: '0.2rem'}}>Officer, Federation-wide Data Collection and Analysis</div>
                <div style={{color: 'var(--text-secondary)', fontSize: '0.9rem'}}>July 2023 - Present • Geneva, Switzerland</div>
              </div>
              <div style={{marginBottom: '0.8rem'}}>
                <div style={{fontWeight: 600, color: 'var(--text-color)', fontSize: '1rem', marginBottom: '0.2rem'}}>Data Analyst Intern</div>
                <div style={{color: 'var(--text-secondary)', fontSize: '0.9rem'}}>January 2022 - June 2023 • Geneva, Switzerland</div>
              </div>
            </div>
            <div style={{position: 'relative', paddingLeft: '2rem', marginBottom: '2rem'}}>
              <div style={{position: 'absolute', left: 0, top: '0.5rem', width: '8px', height: '8px', background: 'var(--gradient-1)', borderRadius: '50%', boxShadow: '0 0 10px rgba(139, 92, 246, 0.4)'}}></div>
              <h4 style={{color: 'var(--primary-color)', marginBottom: '0.5rem', fontSize: '1.1rem', fontWeight: 600}}>Syrian Arab Red Crescent (SARC)</h4>
              <div style={{marginBottom: '0.8rem'}}>
                <div style={{fontWeight: 600, color: 'var(--text-color)', fontSize: '1rem', marginBottom: '0.2rem'}}>Information Management Assistant</div>
                <div style={{color: 'var(--text-secondary)', fontSize: '0.9rem'}}>November 2018 - January 2022 • Syria</div>
              </div>
            </div>
          </div>
        </div>
        <div className="about-text fade-in" style={{textAlign: 'center', marginTop: '2rem'}}>
          <p style={{color: 'var(--text-secondary)', fontStyle: 'italic'}}>
            "I believe in the power of data to drive positive change, especially in humanitarian contexts."
          </p>
        </div>
      </div>
    </section>
  )
}

export default About

