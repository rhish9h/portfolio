// Renders and animates Halo's 3D model, head movement, face, and propeller.
import { useGLTF } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useEffect, useMemo, useRef } from 'react'
import {
  MeshStandardMaterial,
  Quaternion,
  Vector3,
  type Group,
  type Mesh,
  type Object3D,
} from 'three'

import { POSES, type Expression } from './expressions'
import { FaceScreen } from './faceScreen'
import { SpringRecord } from './spring'

export const HALO_MODEL_URL = `${import.meta.env.BASE_URL}halo-improved.glb`

const HEAD_RANGE = { yaw: 0.42, pitch: 0.26, roll: 0.1 }
const PROPELLER_RPS = 2.2
const FIN_EXCITEMENT_RANGE = Math.PI * (25 / 180)
const FIN_WIGGLE_RANGE = Math.PI * (2 / 180)
const FIN_AXIS = new Vector3(0, 0, 1)

export type Vec2 = { x: number; y: number }
export type HeadRotation = { yaw?: number; pitch?: number; roll?: number }

export type HaloProps = {
  expression?: Expression
  lookAt?: Vec2 | null
  propellerSpeed?: number
  gaze?: boolean
  turnHead?: boolean
  blink?: boolean
  hover?: boolean
  hoverAmount?: number
  headRotation?: HeadRotation
  position?: [number, number, number]
  scale?: number
  modelUrl?: string
}

type MotionSpring = Record<'yaw' | 'pitch' | 'roll' | 'propeller' | 'fins', number>
type FinPair = { left: Object3D | null; right: Object3D | null }
type FinRest = { left: Quaternion | null; right: Quaternion | null }

export function Halo({
  expression = 'neutral',
  lookAt = null,
  propellerSpeed = 1,
  gaze = true,
  turnHead = true,
  blink = true,
  hover = true,
  hoverAmount = 1,
  headRotation,
  position = [0, 0, 0],
  scale = 1,
  modelUrl = HALO_MODEL_URL,
}: HaloProps) {
  const { scene } = useGLTF(modelUrl)
  const face = useMemo(() => new FaceScreen(), [])
  const faceMaterial = useMemo(
    () =>
      new MeshStandardMaterial({
        map: face.texture,
        emissive: 0xffffff,
        emissiveMap: face.texture,
        emissiveIntensity: 0.8,
        roughness: 0.22,
        metalness: 0,
      }),
    [face],
  )
  const model = useMemo(() => {
    const root = scene.clone(true)
    const screen = root.getObjectByName('FaceScreen') as Mesh | undefined
    if (screen) screen.material = faceMaterial
    return root
  }, [scene, faceMaterial])
  const bladesRef = useRef<Object3D | null>(null)
  const finsRef = useRef<FinPair>({ left: null, right: null })
  const finRestRef = useRef<FinRest>({ left: null, right: null })
  const finTurnsRef = useRef({ left: new Quaternion(), right: new Quaternion() })

  useEffect(() => {
    const left = model.getObjectByName('SideFin.L') ?? null
    const right = model.getObjectByName('SideFin.R') ?? null
    bladesRef.current = model.getObjectByName('PropellerBlades') ?? null
    finsRef.current = { left, right }
    finRestRef.current = {
      left: left?.quaternion.clone() ?? null,
      right: right?.quaternion.clone() ?? null,
    }
  }, [model])

  useEffect(
    () => () => {
      face.dispose()
      faceMaterial.dispose()
    },
    [face, faceMaterial],
  )

  const rootRef = useRef<Group>(null)
  const headRef = useRef<Group>(null)
  const clock = useRef(0)
  const spin = useRef(0)
  const motionSpring = useRef(
    new SpringRecord<MotionSpring>({ yaw: 0, pitch: 0, roll: 0, propeller: 1, fins: 0 }),
  )

  useFrame((_state, rawDelta) => {
    const dt = Math.min(rawDelta, 1 / 30)
    clock.current += dt
    const time = clock.current
    const pose = POSES[expression]
    const look = lookAt ?? { x: 0, y: 0 }
    face.update(dt, { expression, gaze: gaze ? look : { x: 0, y: 0 }, blink })
    const track = turnHead ? look : { x: 0, y: 0 }
    const target: MotionSpring = {
      yaw: headRotation?.yaw ?? pose.head.yaw + track.x * HEAD_RANGE.yaw + Math.sin(time * 0.37) * 0.03,
      pitch:
        headRotation?.pitch ??
        pose.head.pitch - track.y * HEAD_RANGE.pitch + Math.sin(time * 0.53 + 1.2) * 0.02,
      roll:
        headRotation?.roll ??
        pose.head.roll - track.x * HEAD_RANGE.roll + Math.sin(time * 0.29 + 0.6) * 0.02,
      propeller: pose.propeller,
      fins: pose.fins,
    }
    const motion = motionSpring.current.step(target, dt, 110, 15)
    const jitter = pose.jitter

    if (headRef.current) {
      headRef.current.rotation.set(
        motion.pitch + (jitter ? Math.sin(time * 47) * jitter : 0),
        motion.yaw + (jitter ? Math.sin(time * 39) * jitter : 0),
        motion.roll + (jitter ? Math.sin(time * 53) * jitter : 0),
      )
    }
    if (rootRef.current) {
      const amplitude = hover ? pose.bob.amplitude * hoverAmount : 0
      rootRef.current.position.y = position[1] + Math.sin(time * pose.bob.speed * 2) * amplitude
    }
    spin.current += dt * motion.propeller * propellerSpeed * PROPELLER_RPS * Math.PI * 2
    if (bladesRef.current) bladesRef.current.rotation.y = spin.current

    const finAmount =
      motion.fins * FIN_EXCITEMENT_RANGE + Math.sin(time * 7) * pose.finWiggle * FIN_WIGGLE_RANGE
    const { left, right } = finsRef.current
    const rest = finRestRef.current
    const turns = finTurnsRef.current
    if (left && rest.left) {
      left.quaternion.copy(rest.left).multiply(turns.left.setFromAxisAngle(FIN_AXIS, -finAmount))
    }
    if (right && rest.right) {
      right.quaternion.copy(rest.right).multiply(turns.right.setFromAxisAngle(FIN_AXIS, finAmount))
    }
  })

  return (
    <group ref={rootRef} position={position} scale={scale}>
      <group ref={headRef}>
        <primitive object={model} />
      </group>
    </group>
  )
}

useGLTF.preload(HALO_MODEL_URL)
