import { useEffect, useState } from 'react'
import Particles from '@tsparticles/react'
import { ensureParticlesEngine } from '../lib/particlesEngine'

export default function ParticlesLogo() {
  const [ready, setReady] = useState(false)

  useEffect(() => {
    ensureParticlesEngine().then(() => setReady(true))
  }, [])

  return (
    <div
      style={{
        width: 58,
        height: 58,
        position: 'relative',
        flexShrink: 0,
      }}
    >
      {/* Hex border SVG overlay */}
      <svg
        viewBox="0 0 100 100"
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
          zIndex: 2,
        }}
      >
        <defs>
          <linearGradient id="hexGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#8b5cf6" />
            <stop offset="100%" stopColor="#22d3ee" />
          </linearGradient>
          <filter id="hexGlow">
            <feGaussianBlur stdDeviation="2.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <polygon
          points="50,5 92,27.5 92,72.5 50,95 8,72.5 8,27.5"
          fill="none"
          stroke="url(#hexGrad)"
          strokeWidth="2.5"
          filter="url(#hexGlow)"
        />
      </svg>

      {/* Particles clipped to hexagon */}
      {ready && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            clipPath: 'polygon(50% 5%, 92% 27.5%, 92% 72.5%, 50% 95%, 8% 72.5%, 8% 27.5%)',
            zIndex: 1,
          }}
        >
          <Particles
            id="tsparticles-logo"
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
            options={{
              fullScreen: { enable: false },
              background: { color: { value: 'transparent' } },
              fpsLimit: 60,
              particles: {
                number: { value: 22 },
                color: { value: ['#8b5cf6', '#22d3ee', '#34d399'] },
                links: {
                  enable: true,
                  distance: 28,
                  color: '#22d3ee',
                  opacity: 0.65,
                  width: 1,
                },
                move: {
                  enable: true,
                  speed: 0.5,
                  outModes: { default: 'bounce' },
                },
                size: { value: { min: 1, max: 2 } },
                opacity: { value: 0.85 },
                shape: { type: 'circle' },
              },
              detectRetina: true,
            }}
          />
        </div>
      )}
    </div>
  )
}
