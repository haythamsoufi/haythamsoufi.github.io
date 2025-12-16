import { useState, useEffect, useRef } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

function ProjectDetails() {
  const navigate = useNavigate()
  const location = useLocation()
  const [activeSection, setActiveSection] = useState('overview')
  const sectionRef = useRef(null)
  const contentRef = useRef(null)
  
  // Initialize - scroll to top and set first section as active
  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.scrollTop = 0
    }
    setActiveSection('overview')
  }, [])

  const menuGroups = [
    {
      name: 'Website',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" style={{width: '1.25rem', height: '1.25rem'}}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.944 11.944 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
        </svg>
      ),
      features: [
        { id: 'website-overview', name: 'Overview', section: 'website-overview' },
        { id: 'form-builder', name: 'Form Builder', section: 'form-builder' },
        { id: 'multi-language', name: 'Multi-Language', section: 'multi-language' },
        { id: 'public-submission', name: 'Public Submission', section: 'public-submission' }
      ]
    },
    {
      name: 'Backoffice',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" style={{width: '1.25rem', height: '1.25rem'}}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
        </svg>
      ),
      features: [
        { id: 'backoffice-overview', name: 'Overview', section: 'backoffice-overview' },
        { id: 'analytics', name: 'Analytics & Reports', section: 'analytics' },
        { id: 'security', name: 'Security & Access', section: 'security' },
        { id: 'communication', name: 'Communication', section: 'communication' },
        { id: 'user-management', name: 'User Management', section: 'user-management' }
      ]
    },
    {
      name: 'Mobile App',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" style={{width: '1.25rem', height: '1.25rem'}}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5H5.625c-1.036 0-1.875.84-1.875 1.875v17.25c0 1.035.84 1.875 1.875 1.875h12.75c1.035 0 1.875-.84 1.875-1.875V12.75m-7.5-6v6m-4.5-6v6m7.5-6v6m-4.5 0v6m-4.5 0v6m9-3.75H9" />
        </svg>
      ),
      features: [
        { id: 'mobile-overview', name: 'Overview', section: 'mobile-overview' },
        { id: 'offline-support', name: 'Offline Support', section: 'offline-support' },
        { id: 'data-sync', name: 'Data Synchronization', section: 'data-sync' },
        { id: 'mobile-forms', name: 'Mobile Forms', section: 'mobile-forms' }
      ]
    }
  ]

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId)
    const scrollContainer = contentRef.current
    if (element && scrollContainer) {
      // Calculate scroll position relative to the scroll container
      const containerRect = scrollContainer.getBoundingClientRect()
      const elementRect = element.getBoundingClientRect()
      const currentScroll = scrollContainer.scrollTop
      const elementTopRelative = elementRect.top - containerRect.top + currentScroll
      
      scrollContainer.scrollTo({
        top: Math.max(0, elementTopRelative - 100), // 100px offset from top
        behavior: 'smooth'
      })
      setActiveSection(sectionId)
      
      // Update URL without page reload
      navigate(`/project#${sectionId}`, { replace: true })
    }
  }
  
  // Sync URL hash with active section on load
  useEffect(() => {
    if (location.hash) {
      const sectionId = location.hash.substring(1) // Remove #
      const element = document.getElementById(sectionId)
      const scrollContainer = contentRef.current
      if (element && scrollContainer) {
        setTimeout(() => {
          const containerRect = scrollContainer.getBoundingClientRect()
          const elementRect = element.getBoundingClientRect()
          const currentScroll = scrollContainer.scrollTop
          const elementTopRelative = elementRect.top - containerRect.top + currentScroll
          
          scrollContainer.scrollTo({
            top: Math.max(0, elementTopRelative - 100),
            behavior: 'smooth'
          })
          setActiveSection(sectionId)
        }, 100)
      }
    }
  }, [location.hash])

  // Track active section on scroll
  useEffect(() => {
    const scrollContainer = contentRef.current
    if (!scrollContainer) return

    const handleScroll = () => {
      const sections = document.querySelectorAll('[data-section]')
      const scrollTop = scrollContainer.scrollTop
      const offset = 250

      let currentSection = 'overview'
      sections.forEach((section) => {
        const sectionTop = section.offsetTop - offset
        if (scrollTop >= sectionTop) {
          currentSection = section.getAttribute('data-section')
        }
      })

      setActiveSection(currentSection)
    }

    scrollContainer.addEventListener('scroll', handleScroll)
    handleScroll() // Initial check
    return () => scrollContainer.removeEventListener('scroll', handleScroll)
  }, [])

  // Make fade-in elements visible and initialize
  useEffect(() => {
    if (sectionRef.current) {
      const fadeElements = sectionRef.current.querySelectorAll('.fade-in')
      fadeElements.forEach(el => el.classList.add('visible'))
    }
    
    // Initialize scroll position
    if (contentRef.current) {
      contentRef.current.scrollTop = 0
    }
    setActiveSection('overview')
  }, [])

  return (
    <section ref={sectionRef} id="databank-details" className="project-detail active project-detail-with-sidebar">
      <div className="project-detail-layout">
        {/* Sidebar Menu */}
        <aside className="project-sidebar">
          <div className="sidebar-header">
            <h2 className="sidebar-title">DataBank Project</h2>
          </div>
          <nav className="sidebar-nav">
            {menuGroups.map((group) => (
              <div key={group.name} className="sidebar-group">
                <div className="sidebar-group-header">
                  {group.icon}
                  <span className="sidebar-group-name">{group.name}</span>
                </div>
                <ul className="sidebar-features">
                  {group.features.map((feature) => (
                    <li key={feature.id}><button
                      type="button"
                      className={`sidebar-feature-link ${activeSection === feature.section ? 'active' : ''}`}
                      onClick={(e) => {
                        e.preventDefault()
                        e.stopPropagation()
                        scrollToSection(feature.section)
                      }}
                    >
                      {feature.name}
                    </button></li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        <main ref={contentRef} className="project-content-scrollable">
          {/* Overview Section */}
          <section id="overview" data-section="overview" className="project-feature-section">
            <h2 className="section-title fade-in">DataBank Ecosystem</h2>
            <div className="overview-content fade-in">
              <div className="overview-intro">
                <p style={{fontSize: '1.1rem', lineHeight: 1.7, color: 'var(--text-secondary)', marginBottom: '1.5rem'}}>
                  A comprehensive ecosystem designed to streamline data collection, management, and reporting 
                  for humanitarian organizations. Built with the needs of NGOs, international organizations, and field teams 
                  in mind, this ecosystem enables teams to work more efficiently, make data-driven decisions, and improve 
                  collaboration across organizational levels.
                </p>
                <p style={{fontSize: '1rem', lineHeight: 1.6, color: 'var(--text-secondary)'}}>
                  The ecosystem consists of three main interfaces: a powerful backoffice for administrators, a public-facing 
                  website for data submission, and native mobile applications for field teams working in remote locations.
                </p>
              </div>
              <div className="overview-mockups">
              <div className="laptop-mockup">
                <div className="laptop-mockup-3d">
                  <div className="laptop-frame">
                    <div className="laptop-screen">
                      <img src="/features/backoffice.jpg" alt="Backoffice" className="laptop-screen-content" />
                    </div>
                  </div>
                  <div className="laptop-base"></div>
                </div>
              </div>
              <div className="laptop-mockup">
                <div className="laptop-mockup-3d">
                  <div className="laptop-frame">
                    <div className="laptop-screen">
                      <img src="/features/public-website.jpg" alt="Public Website" className="laptop-screen-content" />
                    </div>
                  </div>
                  <div className="laptop-base"></div>
                </div>
              </div>
              <div className="phone-mockup">
                <div className="phone-mockup-3d">
                  <div className="phone-frame">
                    <div className="phone-notch"></div>
                    <div className="phone-screen">
                      <img src="/features/mobile-app.jpg" alt="Mobile App" className="phone-screen-content" />
                    </div>
                  </div>
                </div>
              </div>
              </div>
            </div>
          </section>

          {/* Website Group */}
          <section id="website-overview" data-section="website-overview" className="project-feature-section">
            <div className="feature-header">
              <h2 className="feature-group-title">Website</h2>
              <p className="feature-group-description">
                The public-facing website allows organizations to collect data from external sources, 
                enabling public submissions and form-based data entry through a user-friendly interface.
              </p>
            </div>
          </section>

          <section id="form-builder" data-section="form-builder" className="project-feature-section">
            <div className="feature-content">
              <div className="feature-image">
                <div className="laptop-mockup">
                  <div className="laptop-mockup-3d">
                    <div className="laptop-frame">
                      <div className="laptop-screen">
                        <img src="/features/form-builder.jpg" alt="Form Builder" className="laptop-screen-content" />
                      </div>
                    </div>
                    <div className="laptop-base"></div>
                  </div>
                </div>
              </div>
              <div className="feature-info">
                <h3>
                  <svg className="inline-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42" />
                  </svg>
                  Powerful Form Builder
                </h3>
                <p>Create sophisticated data collection forms without programming. Features conditional logic, 
                dynamic sections, multi-language support, and validation rules. Build complex forms with drag-and-drop 
                interface and real-time preview.</p>
                <ul className="feature-list">
                  <li>Drag-and-drop form builder</li>
                  <li>Conditional logic and branching</li>
                  <li>Real-time form preview</li>
                  <li>Custom validation rules</li>
                  <li>Dynamic sections and repeat groups</li>
                </ul>
              </div>
            </div>
          </section>

          <section id="multi-language" data-section="multi-language" className="project-feature-section">
            <div className="feature-content">
              <div className="feature-image">
                <div className="laptop-mockup">
                  <div className="laptop-mockup-3d">
                    <div className="laptop-frame">
                      <div className="laptop-screen">
                        <img src="/features/multi-language.jpg" alt="Multi-Language Support" className="laptop-screen-content" />
                      </div>
                    </div>
                    <div className="laptop-base"></div>
                  </div>
                </div>
              </div>
              <div className="feature-info">
                <h3>
                  <svg className="inline-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.944 11.944 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
                  </svg>
                  Multi-Language Support
                </h3>
                <p>Available in 7 languages (English, French, Spanish, Arabic, Chinese, Russian, Hindi) with 
                full right-to-left support for Arabic. Seamless language switching and localized content management 
                for global teams.</p>
                <ul className="feature-list">
                  <li>7 supported languages</li>
                  <li>Right-to-left (RTL) support for Arabic</li>
                  <li>Seamless language switching</li>
                  <li>Localized content management</li>
                  <li>Multi-language form submissions</li>
                </ul>
              </div>
            </div>
          </section>

          <section id="public-submission" data-section="public-submission" className="project-feature-section">
            <div className="feature-content">
              <div className="feature-image">
                <div className="laptop-mockup">
                  <div className="laptop-mockup-3d">
                    <div className="laptop-frame">
                      <div className="laptop-screen">
                        <img src="/features/public-website.jpg" alt="Public Submission" className="laptop-screen-content" />
                      </div>
                    </div>
                    <div className="laptop-base"></div>
                  </div>
                </div>
              </div>
              <div className="feature-info">
                <h3>
                  <svg className="inline-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h11.25c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z" />
                  </svg>
                  Public Submission Portal
                </h3>
                <p>Enable public data submissions through a secure, user-friendly web interface. Organizations can 
                collect data from external sources, beneficiaries, or the general public with customizable forms and 
                validation.</p>
                <ul className="feature-list">
                  <li>Public-facing submission forms</li>
                  <li>Secure data collection</li>
                  <li>Customizable submission workflows</li>
                  <li>Email confirmations and notifications</li>
                  <li>Submission tracking and management</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Backoffice Group */}
          <section id="backoffice-overview" data-section="backoffice-overview" className="project-feature-section">
            <div className="feature-header">
              <h2 className="feature-group-title">Backoffice</h2>
              <p className="feature-group-description">
                The administrative backoffice provides comprehensive tools for data management, analytics, 
                user administration, and system configuration for organizations.
              </p>
            </div>
          </section>

          <section id="analytics" data-section="analytics" className="project-feature-section">
            <div className="feature-content">
              <div className="feature-image">
                <div className="laptop-mockup">
                  <div className="laptop-mockup-3d">
                    <div className="laptop-frame">
                      <div className="laptop-screen">
                        <img src="/features/analytics.jpg" alt="Advanced Analytics" className="laptop-screen-content" />
                      </div>
                    </div>
                    <div className="laptop-base"></div>
                  </div>
                </div>
              </div>
              <div className="feature-info">
                <h3>
                  <svg className="inline-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
                  </svg>
                  Advanced Analytics & Reports
                </h3>
                <p>Comprehensive analytics including disaggregation analysis, indicator tracking, and 
                customizable reports for data-driven decision making. Real-time dashboards with interactive 
                charts and exportable insights.</p>
                <ul className="feature-list">
                  <li>Real-time dashboards</li>
                  <li>Interactive charts and visualizations</li>
                  <li>Disaggregation analysis</li>
                  <li>Indicator tracking</li>
                  <li>Customizable reports</li>
                  <li>Data export capabilities</li>
                </ul>
              </div>
            </div>
          </section>

          <section id="security" data-section="security" className="project-feature-section">
            <div className="feature-content">
              <div className="feature-image">
                <div className="laptop-mockup">
                  <div className="laptop-mockup-3d">
                    <div className="laptop-frame">
                      <div className="laptop-screen">
                        <img src="/features/security.jpg" alt="Enterprise Security" className="laptop-screen-content" />
                      </div>
                    </div>
                    <div className="laptop-base"></div>
                  </div>
                </div>
              </div>
              <div className="feature-info">
                <h3>
                  <svg className="inline-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                  </svg>
                  Security & Access Control
                </h3>
                <p>Enterprise-grade security with role-based access control and optional Azure AD integration 
                for single sign-on. End-to-end encryption and compliance with international data protection standards.</p>
                <ul className="feature-list">
                  <li>Role-based access control (RBAC)</li>
                  <li>Azure AD integration (SSO)</li>
                  <li>End-to-end encryption</li>
                  <li>Data protection compliance</li>
                  <li>Audit logs and monitoring</li>
                  <li>Two-factor authentication</li>
                </ul>
              </div>
            </div>
          </section>

          <section id="communication" data-section="communication" className="project-feature-section">
            <div className="feature-content">
              <div className="feature-image">
                <div className="laptop-mockup">
                  <div className="laptop-mockup-3d">
                    <div className="laptop-frame">
                      <div className="laptop-screen">
                        <img src="/features/communication.jpg" alt="Smart Communication" className="laptop-screen-content" />
                      </div>
                    </div>
                    <div className="laptop-base"></div>
                  </div>
                </div>
              </div>
              <div className="feature-info">
                <h3>
                  <svg className="inline-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155" />
                  </svg>
                  Smart Communication System
                </h3>
                <p>Intelligent notification system and email campaigns that reach the right people at the 
                right organizational level. Automated workflows and targeted messaging based on roles and responsibilities.</p>
                <ul className="feature-list">
                  <li>Automated notifications</li>
                  <li>Email campaigns</li>
                  <li>Targeted messaging by role</li>
                  <li>Workflow automation</li>
                  <li>Notification preferences</li>
                </ul>
              </div>
            </div>
          </section>

          <section id="user-management" data-section="user-management" className="project-feature-section">
            <div className="feature-content">
              <div className="feature-info">
                <h3>
                  <svg className="inline-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
                  </svg>
                  User Management
                </h3>
                <p>Comprehensive user administration tools for managing team members, roles, permissions, and 
                organizational structure. Streamline user onboarding and access management.</p>
                <ul className="feature-list">
                  <li>User role management</li>
                  <li>Permission configuration</li>
                  <li>Organizational hierarchy</li>
                  <li>User onboarding workflows</li>
                  <li>Activity monitoring</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Mobile App Group */}
          <section id="mobile-overview" data-section="mobile-overview" className="project-feature-section">
            <div className="feature-header">
              <h2 className="feature-group-title">Mobile App</h2>
              <p className="feature-group-description">
                Native mobile applications for iOS and Android enable field teams to collect data offline 
                and synchronize when connectivity is available, perfect for remote and challenging environments.
              </p>
            </div>
          </section>

          <section id="offline-support" data-section="offline-support" className="project-feature-section">
            <div className="feature-content">
              <div className="feature-image">
                <div className="phone-mockup">
                  <div className="phone-mockup-3d">
                    <div className="phone-frame">
                      <div className="phone-notch"></div>
                      <div className="phone-screen">
                        <img src="/features/mobile-app.jpg" alt="Offline Support" className="phone-screen-content" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="feature-info">
                <h3>
                  <svg className="inline-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.288 15.036a5.25 5.25 0 017.424 0M5.106 11.856c3.807-3.808 9.98-3.808 13.788 0M1.924 8.674c5.565-5.565 14.587-5.565 20.152 0M12.53 18.22l-.53.53-.53-.53a.75.75 0 011.06 0z" />
                  </svg>
                  Offline Support
                </h3>
                <p>Work seamlessly without internet connectivity. The mobile app stores data locally and 
                automatically syncs when connection is restored, ensuring no data loss even in remote areas.</p>
                <ul className="feature-list">
                  <li>Full offline functionality</li>
                  <li>Local data storage</li>
                  <li>Automatic sync when online</li>
                  <li>Conflict resolution</li>
                  <li>Offline form validation</li>
                </ul>
              </div>
            </div>
          </section>

          <section id="data-sync" data-section="data-sync" className="project-feature-section">
            <div className="feature-content">
              <div className="feature-info">
                <h3>
                  <svg className="inline-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.25 18.002h9.75m-9.75 0a9 9 0 01-1.5-4.314 9 9 0 011.5-4.314m9.75 0a9 9 0 019.75 9M2.25 18.002l3.181-.393a9.081 9.081 0 003.461.564m.007-.239l-3.181-.393m-3.181.393a9 9 0 01-1.5-4.314m3.181.393a9.081 9.081 0 003.461.564m-3.461.564l3.181.393m9.75-9l-3.181-.393a9.081 9.081 0 00-3.461.564m3.461.564l3.181.393m-3.181.393a9 9 0 01-1.5-4.314m3.181.393c.181.309.29.65.29 1 0 .414-.336.75-.75.75h-4.5a.75.75 0 01-.75-.75 2.25 2.25 0 00.29-1m-3.181-.393l9.75-9" />
                  </svg>
                  Data Synchronization
                </h3>
                <p>Intelligent synchronization system that handles data conflicts, ensures data integrity, 
                and provides real-time updates across all devices and platforms.</p>
                <ul className="feature-list">
                  <li>Automatic background sync</li>
                  <li>Conflict resolution</li>
                  <li>Data integrity checks</li>
                  <li>Real-time updates</li>
                  <li>Sync status indicators</li>
                </ul>
              </div>
            </div>
          </section>

          <section id="mobile-forms" data-section="mobile-forms" className="project-feature-section">
            <div className="feature-content">
              <div className="feature-info">
                <h3>
                  <svg className="inline-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5H5.625c-1.036 0-1.875.84-1.875 1.875v17.25c0 1.035.84 1.875 1.875 1.875h12.75c1.035 0 1.875-.84 1.875-1.875V12.75m-7.5-6v6m-4.5-6v6m7.5-6v6m-4.5 0v6m-4.5 0v6m9-3.75H9" />
                  </svg>
                  Mobile-Optimized Forms
                </h3>
                <p>Forms designed specifically for mobile devices with touch-friendly interfaces, 
                optimized layouts, and intuitive navigation for field data collection.</p>
                <ul className="feature-list">
                  <li>Touch-optimized interface</li>
                  <li>Mobile-friendly layouts</li>
                  <li>GPS and camera integration</li>
                  <li>Barcode/QR code scanning</li>
                  <li>Voice input support</li>
                </ul>
              </div>
            </div>
          </section>
        </main>
      </div>
    </section>
  )
}

export default ProjectDetails
