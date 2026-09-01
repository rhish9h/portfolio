// Draws and smoothly animates Halo's glowing face as a canvas texture.
import { CanvasTexture, Color, LinearFilter, SRGBColorSpace } from 'three'

import { FACE_CANVAS, POSES, type Expression, type FacePose, type Shape } from './expressions'
import { SpringRecord, damp } from './spring'

const GAZE_RANGE = { x: 26, y: 17 }
const MOUTH_GAZE_RANGE = { x: 1.5, y: 0.75 }
const BLINK_CLOSE = 0.07
const BLINK_HOLD = 0.03
const BLINK_OPEN = 0.12
const BLINK_DURATION = BLINK_CLOSE + BLINK_HOLD + BLINK_OPEN

type Flat = Record<string, number>

const SHAPE_KEYS: (keyof Shape)[] = ['w', 'h', 'r', 'curve', 'tilt', 'dx', 'dy']
const PARTS = ['eyeL', 'eyeR', 'mouth'] as const

function flatten(pose: FacePose): Flat {
  const flat: Flat = {}
  for (const part of PARTS) {
    for (const key of SHAPE_KEYS) flat[`${part}.${key}`] = pose[part][key]
  }
  return flat
}

function unflatten(flat: Flat, part: (typeof PARTS)[number]): Shape {
  return {
    w: flat[`${part}.w`],
    h: flat[`${part}.h`],
    r: flat[`${part}.r`],
    curve: flat[`${part}.curve`],
    tilt: flat[`${part}.tilt`],
    dx: flat[`${part}.dx`],
    dy: flat[`${part}.dy`],
  }
}

export type FaceUpdate = {
  expression: Expression
  gaze: { x: number; y: number }
  blink: boolean
}

export class FaceScreen {
  readonly texture: CanvasTexture
  private readonly canvas: HTMLCanvasElement
  private readonly ctx: CanvasRenderingContext2D
  private readonly spring: SpringRecord<Flat>
  private readonly ink = new Color(POSES.neutral.ink)
  private readonly targetInk = new Color()
  private glow = POSES.neutral.glow
  private gaze = { x: 0, y: 0 }
  private blinkCountdown = 2
  private blinkClock = -1
  private lastSignature = ''

  constructor() {
    this.canvas = document.createElement('canvas')
    this.canvas.width = FACE_CANVAS.width
    this.canvas.height = FACE_CANVAS.height
    const context = this.canvas.getContext('2d')
    if (!context) throw new Error('FaceScreen: 2D canvas context unavailable')
    this.ctx = context
    this.spring = new SpringRecord<Flat>(flatten(POSES.neutral))
    this.texture = new CanvasTexture(this.canvas)
    this.texture.flipY = false
    this.texture.colorSpace = SRGBColorSpace
    this.texture.minFilter = LinearFilter
    this.texture.magFilter = LinearFilter
    this.texture.generateMipmaps = false
    this.texture.anisotropy = 4
    this.draw()
  }

  dispose() {
    this.texture.dispose()
  }

  update(dt: number, { expression, gaze, blink }: FaceUpdate) {
    const pose = POSES[expression]
    this.spring.step(flatten(pose), dt)
    this.targetInk.set(pose.ink)
    this.ink.lerp(this.targetInk, 1 - Math.exp(-6 * dt))
    this.glow = damp(this.glow, pose.glow, 6, dt)
    this.gaze.x = damp(this.gaze.x, gaze.x * pose.gazeGain, 7, dt)
    this.gaze.y = damp(this.gaze.y, gaze.y * pose.gazeGain, 7, dt)
    this.stepBlink(dt, blink ? pose.blinkEvery : null)
    this.draw()
  }

  private stepBlink(dt: number, every: [number, number] | null) {
    if (this.blinkClock >= 0) {
      this.blinkClock += dt
      if (this.blinkClock > BLINK_DURATION) this.blinkClock = -1
      return
    }
    if (!every) return
    this.blinkCountdown -= dt
    if (this.blinkCountdown <= 0) {
      this.blinkClock = 0
      this.blinkCountdown = every[0] + Math.random() * (every[1] - every[0])
    }
  }

  private blinkAmount(): number {
    const time = this.blinkClock
    if (time < 0) return 0
    if (time < BLINK_CLOSE) return time / BLINK_CLOSE
    if (time < BLINK_CLOSE + BLINK_HOLD) return 1
    return Math.max(0, 1 - (time - BLINK_CLOSE - BLINK_HOLD) / BLINK_OPEN)
  }

  private draw() {
    const blink = this.blinkAmount()
    const flat = this.spring.value
    const eyeL = unflatten(flat, 'eyeL')
    const eyeR = unflatten(flat, 'eyeR')
    const mouth = unflatten(flat, 'mouth')
    const lid = 1 - 0.94 * blink
    eyeL.h *= lid
    eyeR.h *= lid
    eyeL.curve *= 1 - blink
    eyeR.curve *= 1 - blink

    for (const eye of [eyeL, eyeR]) {
      eye.dx += this.gaze.x * GAZE_RANGE.x
      eye.dy += -this.gaze.y * GAZE_RANGE.y
    }
    mouth.dx += this.gaze.x * MOUTH_GAZE_RANGE.x
    mouth.dy += -this.gaze.y * MOUTH_GAZE_RANGE.y

    const signature = [eyeL, eyeR, mouth]
      .flatMap((shape) => SHAPE_KEYS.map((key) => Math.round(shape[key] * 4)))
      .concat(Math.round(this.glow), this.ink.getHex())
      .join(',')
    if (signature === this.lastSignature) return
    this.lastSignature = signature

    const { ctx } = this
    const { width, height, eyeOffsetX, eyeY, mouthY, background } = FACE_CANVAS
    ctx.setTransform(1, 0, 0, 1, 0, 0)
    ctx.fillStyle = background
    ctx.fillRect(0, 0, width, height)
    const ink = `#${this.ink.getHexString()}`
    ctx.fillStyle = ink
    ctx.strokeStyle = ink
    ctx.shadowColor = ink
    ctx.shadowBlur = this.glow
    drawShape(ctx, width / 2 - eyeOffsetX, eyeY, eyeL, -1)
    drawShape(ctx, width / 2 + eyeOffsetX, eyeY, eyeR, 1)
    drawShape(ctx, width / 2, mouthY, mouth, 1)
    ctx.shadowBlur = 0
    this.texture.needsUpdate = true
  }
}

function drawShape(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  shape: Shape,
  mirror: 1 | -1,
) {
  const width = Math.max(shape.w, 0.5)
  const height = Math.max(shape.h, 0.5)
  const radius = Math.max(Math.min(shape.r, Math.min(width, height) / 2), 0.25)
  const innerWidth = width - 2 * radius
  const innerHeight = height - 2 * radius
  const bow = shape.curve * 2
  ctx.save()
  ctx.translate(cx + shape.dx, cy + shape.dy)
  ctx.rotate(shape.tilt * mirror)
  ctx.beginPath()
  ctx.moveTo(-innerWidth / 2, -innerHeight / 2)
  ctx.quadraticCurveTo(0, -innerHeight / 2 - bow, innerWidth / 2, -innerHeight / 2)
  ctx.lineTo(innerWidth / 2, innerHeight / 2)
  ctx.quadraticCurveTo(0, innerHeight / 2 - bow, -innerWidth / 2, innerHeight / 2)
  ctx.closePath()
  ctx.lineJoin = 'round'
  ctx.lineCap = 'round'
  ctx.lineWidth = 2 * radius
  ctx.stroke()
  ctx.fill()
  ctx.restore()
}
