import { initParticlesEngine } from '@tsparticles/react'
import { loadFull } from 'tsparticles'

let promise: Promise<void> | null = null

export function ensureParticlesEngine(): Promise<void> {
  if (!promise) {
    promise = initParticlesEngine(async (engine) => {
      await loadFull(engine as never)
    })
  }
  return promise
}
