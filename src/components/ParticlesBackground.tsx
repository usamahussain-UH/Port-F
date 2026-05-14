import { useEffect, useState } from 'react'
import Particles from '@tsparticles/react'
import { ensureParticlesEngine } from '../lib/particlesEngine'

export default function ParticlesBackground() {
  const [ready, setReady] = useState(false)

  useEffect(() => {
    ensureParticlesEngine().then(() => setReady(true))
  }, [])

  if (!ready) return null

  return (
    <Particles
      id="tsparticles-bg"
      style={{ position: 'absolute', inset: 0 }}
      options={{
        fullScreen: { enable: false },
        background: { color: { value: 'transparent' } },
        fpsLimit: 60,
        particles: {
          number: { value: 72, density: { enable: true, area: 900 } },
          color: { value: ['#8b5cf6', '#22d3ee', '#34d399'] },
          links: {
            enable: true,
            distance: 155,
            color: '#8b5cf6',
            opacity: 0.28,
            width: 1,
          },
          move: {
            enable: true,
            speed: 0.65,
            outModes: { default: 'bounce' },
            random: true,
          },
          size: { value: { min: 1, max: 3 } },
          opacity: { value: { min: 0.2, max: 0.6 } },
          shape: { type: 'circle' },
        },
        interactivity: {
          detectsOn: 'window',
          events: {
            onHover: { enable: true, mode: 'repulse' },
          },
          modes: {
            repulse: {
              distance: 130,
              duration: 0.5,
              factor: 100,
              speed: 1,
              maxSpeed: 50,
              easing: 'ease-out-quad',
            },
          },
        },
        detectRetina: true,
      }}
    />
  )
}
