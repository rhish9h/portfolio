// Renders and animates Halo's 3D model, head movement, face, and propeller.
import { useGLTF } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useEffect, useMemo, useRef } from 'react'
import { MeshStandardMaterial, type Group, type Mesh, type Object3D } from 'three'

import { POSES, type Expression } from './expressions'
import { FaceScreen } from './faceScreen'
import { SpringRecord } from './spring'

export const HALO_MODEL_URL = `${import.meta.env.BASE_URL}halo.glb`

const HEAD_RANGE = { yaw: 0.42, pitch: 0.26, roll: 0.1 }
const PROPELLER_RPS = 2.2

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

type HeadSpring = Record<'yaw' | 'pitch' | 'roll' | 'propeller', number>

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

  useEffect(() => {
    bladesRef.current = model.getObjectByName('PropellerBlades') ?? null
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
  const headSpring = useRef(
    new SpringRecord<HeadSpring>({ yaw: 0, pitch: 0, roll: 0, propeller: 1 }),
  )

  useFrame((_state, rawDelta) => {
    const dt = Math.min(rawDelta, 1 / 30)
    clock.current += dt
    const time = clock.current
    const pose = POSES[expression]
    const look = lookAt ?? { x: 0, y: 0 }
    face.update(dt, { expression, gaze: gaze ? look : { x: 0, y: 0 }, blink })
    const track = turnHead ? look : { x: 0, y: 0 }
    const target: HeadSpring = {
      yaw: headRotation?.yaw ?? pose.head.yaw + track.x * HEAD_RANGE.yaw + Math.sin(time * 0.37) * 0.03,
      pitch:
        headRotation?.pitch ??
        pose.head.pitch - track.y * HEAD_RANGE.pitch + Math.sin(time * 0.53 + 1.2) * 0.02,
      roll:
        headRotation?.roll ??
        pose.head.roll - track.x * HEAD_RANGE.roll + Math.sin(time * 0.29 + 0.6) * 0.02,
      propeller: pose.propeller,
    }
    const head = headSpring.current.step(target, dt, 110, 15)
    const jitter = pose.jitter

    if (headRef.current) {
      headRef.current.rotation.set(
        head.pitch + (jitter ? Math.sin(time * 47) * jitter : 0),
        head.yaw + (jitter ? Math.sin(time * 39) * jitter : 0),
        head.roll + (jitter ? Math.sin(time * 53) * jitter : 0),
      )
    }
    if (rootRef.current) {
      const amplitude = hover ? pose.bob.amplitude * hoverAmount : 0
      rootRef.current.position.y = position[1] + Math.sin(time * pose.bob.speed * 2) * amplitude
    }
    spin.current += dt * head.propeller * propellerSpeed * PROPELLER_RPS * Math.PI * 2
    if (bladesRef.current) bladesRef.current.rotation.y = spin.current
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
