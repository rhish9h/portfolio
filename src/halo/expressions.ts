// Defines Halo's facial poses and mood-specific movement characteristics.
export const EXPRESSIONS = [
  'neutral',
  'happy',
  'thinking',
  'surprised',
  'bored',
  'confused',
  'sleepy',
  'panic',
] as const

export type Expression = (typeof EXPRESSIONS)[number]

export type Shape = {
  w: number
  h: number
  r: number
  curve: number
  tilt: number
  dx: number
  dy: number
}

export type FacePose = {
  eyeL: Shape
  eyeR: Shape
  mouth: Shape
  ink: string
  glow: number
  gazeGain: number
  blinkEvery: [number, number] | null
  propeller: number
  fins: number
  finWiggle: number
  head: { yaw: number; pitch: number; roll: number }
  bob: { amplitude: number; speed: number }
  jitter: number
}

export const FACE_CANVAS = {
  width: 480,
  height: 256,
  eyeOffsetX: 104,
  eyeY: 96,
  mouthY: 190,
  background: '#0a0e1a',
} as const

const SHAPE_ZERO: Shape = { w: 0, h: 0, r: 0, curve: 0, tilt: 0, dx: 0, dy: 0 }
const shape = (partial: Partial<Shape>): Shape => ({ ...SHAPE_ZERO, ...partial })

const BASE: Omit<FacePose, 'eyeL' | 'eyeR' | 'mouth'> = {
  ink: '#eaf2ff',
  glow: 14,
  gazeGain: 1,
  blinkEvery: [2.2, 6],
  propeller: 1,
  fins: 0,
  finWiggle: 0,
  head: { yaw: 0, pitch: 0, roll: 0 },
  bob: { amplitude: 0.045, speed: 1.1 },
  jitter: 0,
}

type PoseInput = Partial<Omit<FacePose, 'eyeL' | 'eyeR' | 'mouth' | 'head' | 'bob'>> & {
  head?: Partial<FacePose['head']>
  bob?: Partial<FacePose['bob']>
  eyes?: Partial<Shape>
  eyeL?: Partial<Shape>
  eyeR?: Partial<Shape>
  mouth: Partial<Shape>
}

function pose({ eyes, eyeL, eyeR, mouth, ...rest }: PoseInput): FacePose {
  return {
    ...BASE,
    ...rest,
    head: { ...BASE.head, ...rest.head },
    bob: { ...BASE.bob, ...rest.bob },
    eyeL: shape({ ...eyes, ...eyeL }),
    eyeR: shape({ ...eyes, ...eyeR }),
    mouth: shape(mouth),
  }
}

export const POSES: Record<Expression, FacePose> = {
  neutral: pose({
    eyes: { w: 56, h: 64, r: 28 },
    mouth: { w: 82, h: 14, r: 7, curve: -5 },
  }),
  happy: pose({
    eyes: { w: 68, h: 34, r: 17, curve: 12 },
    mouth: { w: 100, h: 20, r: 10, curve: -28 },
    ink: '#f0ebff',
    glow: 17,
    propeller: 1.4,
    fins: 1,
    finWiggle: 1,
    bob: { amplitude: 0.065, speed: 1.6 },
  }),
  thinking: pose({
    eyes: { w: 47, h: 52, r: 23, dx: 18, dy: -12 },
    mouth: { w: 28, h: 18, r: 9, curve: -3, dx: 34 },
    gazeGain: 0.25,
    blinkEvery: [3, 7],
    propeller: 0.8,
    fins: 0.12,
    head: { yaw: 0.16, pitch: -0.06, roll: -0.13 },
    bob: { amplitude: 0.03, speed: 0.8 },
  }),
  surprised: pose({
    eyes: { w: 68, h: 80, r: 34 },
    mouth: { w: 36, h: 32, r: 16 },
    ink: '#f6f2ff',
    glow: 18,
    blinkEvery: [2.8, 5.8],
    propeller: 1.85,
    fins: 0.7,
    finWiggle: 0.25,
    head: { pitch: -0.08 },
    bob: { amplitude: 0.065, speed: 1.9 },
  }),
  bored: pose({
    eyes: { w: 62, h: 18, r: 9, dy: 5 },
    mouth: { w: 58, h: 12, r: 6, dx: -18 },
    ink: '#b9c6d8',
    glow: 8,
    gazeGain: 0.4,
    blinkEvery: [1.8, 3.6],
    propeller: 0.5,
    head: { yaw: -0.12, pitch: 0.09, roll: 0.07 },
    bob: { amplitude: 0.028, speed: 0.6 },
  }),
  confused: pose({
    eyeL: { w: 58, h: 62, r: 29 },
    eyeR: { w: 54, h: 42, r: 21, curve: 6, tilt: -0.14, dy: -7 },
    mouth: { w: 54, h: 14, r: 7, curve: 10, tilt: -0.12, dx: -6 },
    ink: '#dfe8ff',
    glow: 12,
    gazeGain: 0.55,
    propeller: 0.95,
    fins: 0.25,
    head: { yaw: -0.1, roll: 0.13 },
  }),
  sleepy: pose({
    eyes: { w: 60, h: 14, r: 7, curve: -8, dy: 14 },
    mouth: { w: 30, h: 18, r: 9, dy: 5 },
    ink: '#c7bcff',
    glow: 9,
    gazeGain: 0.15,
    blinkEvery: null,
    propeller: 0.32,
    head: { pitch: 0.18, roll: -0.12 },
    bob: { amplitude: 0.045, speed: 0.45 },
  }),
  panic: pose({
    eyes: { w: 74, h: 84, r: 37, tilt: 0.08 },
    mouth: { w: 50, h: 38, r: 19 },
    ink: '#ffdcd6',
    glow: 20,
    gazeGain: 1.1,
    blinkEvery: [2, 4],
    propeller: 2.7,
    fins: 1,
    finWiggle: 1.4,
    head: { pitch: -0.1 },
    bob: { amplitude: 0.075, speed: 2.8 },
    jitter: 0.018,
  }),
}
