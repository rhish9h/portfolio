// Provides lightweight spring and damping helpers for Halo's animations.
export type Springy = Record<string, number>

const STIFFNESS = 240
const DAMPING = 22
const MAX_STEP = 1 / 30

export function stepScalar(
  current: number,
  velocity: number,
  target: number,
  dt: number,
  stiffness = STIFFNESS,
  damping = DAMPING,
): [value: number, velocity: number] {
  const acceleration = (target - current) * stiffness - velocity * damping
  const nextVelocity = velocity + acceleration * dt
  return [current + nextVelocity * dt, nextVelocity]
}

export class SpringRecord<T extends Springy> {
  value: T
  private velocity: T

  constructor(initial: T) {
    this.value = { ...initial }
    this.velocity = Object.fromEntries(Object.keys(initial).map((key) => [key, 0])) as T
  }

  step(target: T, dt: number, stiffness = STIFFNESS, damping = DAMPING): T {
    const nextStep = Math.min(dt, MAX_STEP)
    for (const key of Object.keys(this.value) as (keyof T)[]) {
      const [value, velocity] = stepScalar(
        this.value[key],
        this.velocity[key],
        target[key],
        nextStep,
        stiffness,
        damping,
      )
      this.value[key] = value as T[keyof T]
      this.velocity[key] = velocity as T[keyof T]
    }
    return this.value
  }
}

export function damp(current: number, target: number, rate: number, dt: number): number {
  return current + (target - current) * (1 - Math.exp(-rate * Math.min(dt, MAX_STEP)))
}
