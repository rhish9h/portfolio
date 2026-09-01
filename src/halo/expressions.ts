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
  background: '#080a0f',
} as const

const SHAPE_ZERO: Shape = { w: 0, h: 0, r: 0, curve: 0, tilt: 0, dx: 0, dy: 0 }
const shape = (partial: Partial<Shape>): Shape => ({ ...SHAPE_ZERO, ...partial })

const BASE: Omit<FacePose, 'eyeL' | 'eyeR' | 'mouth'> = {
  ink: '#eaf2ff',
  glow: 14,
  gazeGain: 1,
  blinkEvery: [2.2, 6],
  propeller: 1,
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
    eyes: { w: 54, h: 66, r: 27 },
    mouth: { w: 88, h: 15, r: 7 },
  }),
  happy: pose({
    eyes: { w: 72, h: 33, r: 16, curve: 13 },
    mouth: { w: 110, h: 21, r: 10, curve: -33 },
    ink: '#f0ebff',
    glow: 20,
    propeller: 1.35,
    bob: { amplitude: 0.06, speed: 1.5 },
  }),
  thinking: pose({
    eyes: { w: 45, h: 51, r: 22, dx: 21, dy: -15 },
    mouth: { w: 24, h: 24, r: 12, dx: 39 },
    gazeGain: 0.25,
    blinkEvery: [3, 7],
    propeller: 0.8,
    head: { yaw: 0.16, pitch: -0.06, roll: -0.13 },
    bob: { amplitude: 0.03, speed: 0.8 },
  }),
  surprised: pose({
    eyes: { w: 86, h: 98, r: 46 },
    mouth: { w: 52, h: 52, r: 26 },
    ink: '#ffffff',
    glow: 24,
    blinkEvery: [4, 9],
    propeller: 2.1,
    head: { pitch: -0.1 },
    bob: { amplitude: 0.08, speed: 2.2 },
  }),
  bored: pose({
    eyes: { w: 63, h: 16, r: 8, dy: 6 },
    mouth: { w: 66, h: 12, r: 6, dx: -24 },
    ink: '#b9c6d8',
    glow: 8,
    gazeGain: 0.45,
    blinkEvery: [1.6, 3.4],
    propeller: 0.5,
    head: { yaw: -0.12, pitch: 0.09, roll: 0.07 },
    bob: { amplitude: 0.028, speed: 0.6 },
  }),
  confused: pose({
    eyeL: { w: 63, h: 69, r: 32 },
    eyeR: { w: 51, h: 24, r: 12, curve: 9, tilt: -0.22, dy: -12 },
    mouth: { w: 60, h: 15, r: 7, curve: 12, tilt: -0.16, dx: -9 },
    ink: '#dfe8ff',
    gazeGain: 0.7,
    propeller: 0.95,
    head: { yaw: -0.1, roll: 0.17 },
  }),
  sleepy: pose({
    eyes: { w: 63, h: 13, r: 6, curve: -9, dy: 15 },
    mouth: { w: 33, h: 22, r: 11, dy: 6 },
    ink: '#c7bcff',
    glow: 10,
    gazeGain: 0.15,
    blinkEvery: null,
    propeller: 0.32,
    head: { pitch: 0.2, roll: -0.14 },
    bob: { amplitude: 0.05, speed: 0.45 },
  }),
  panic: pose({
    eyes: { w: 90, h: 102, r: 48, tilt: 0.12 },
    mouth: { w: 78, h: 58, r: 27 },
    ink: '#ffd7cf',
    glow: 26,
    gazeGain: 1.4,
    blinkEvery: [5, 9],
    propeller: 3.2,
    head: { pitch: -0.12 },
    bob: { amplitude: 0.09, speed: 3.4 },
    jitter: 0.03,
  }),
}
