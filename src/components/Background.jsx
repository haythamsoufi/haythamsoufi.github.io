import { useEffect } from 'react'

function Background() {
  useEffect(() => {
    // Initialize particles animation
    const particles = document.getElementById('particles')
    if (!particles) return

    const createParticle = () => {
      const particle = document.createElement('div')
      particle.className = 'particle'
      particle.style.left = Math.random() * 100 + '%'
      particle.style.animationDuration = (Math.random() * 3 + 2) + 's'
      particle.style.animationDelay = Math.random() * 2 + 's'
      particles.appendChild(particle)
    }

    // Create initial particles
    for (let i = 0; i < 50; i++) {
      createParticle()
    }
  }, [])

  return (
    <>
      <div className="animated-bg"></div>
      <div className="particles" id="particles"></div>
    </>
  )
}

export default Background

