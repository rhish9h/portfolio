// Presents Halo in a responsive 3D stage with motion and WebGL fallbacks.
import { Canvas } from '@react-three/fiber'
import { Suspense, useEffect, useRef, useState } from 'react'

import { Halo, usePointerLook, type Expression } from '../halo'

function useReducedMotion() {
  const [reduced, setReduced] = useState(false)

  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => setReduced(query.matches)
    update()
    query.addEventListener('change', update)
    return () => query.removeEventListener('change', update)
  }, [])

  return reduced
}

function supportsWebGL() {
  try {
    const canvas = document.createElement('canvas')
    return Boolean(canvas.getContext('webgl2') || canvas.getContext('webgl'))
  } catch {
    return false
  }
}

type HaloStageProps = {
  expression: Expression
  status: string
}

export function HaloStage({ expression, status }: HaloStageProps) {
  const stageRef = useRef<HTMLDivElement>(null)
  const lookAt = usePointerLook(stageRef)
  const reducedMotion = useReducedMotion()
  const [webGL] = useState(supportsWebGL)

  return (
    <section className="halo-column" aria-label={`Halo is ${status}`}>
      <div className="halo-stage" ref={stageRef}>
        <div className="halo-glow" />
        {webGL ? (
          <Canvas
            camera={{ position: [0, 0.08, 4.4], fov: 29 }}
            dpr={[1, 2]}
            gl={{ alpha: true, antialias: true }}
          >
            <ambientLight intensity={1.2} />
            <directionalLight position={[3, 4, 5]} intensity={2.7} />
            <directionalLight position={[-4, 1, 2]} intensity={0.9} color="#dcd6ff" />
            <Suspense fallback={null}>
              <Halo
                expression={expression}
                lookAt={lookAt}
                gaze={!reducedMotion}
                turnHead={!reducedMotion}
                hover={!reducedMotion}
                blink
              />
            </Suspense>
          </Canvas>
        ) : (
          <div className={`halo-fallback halo-fallback--${expression}`} aria-hidden="true">
            <span className="fallback-eye" />
            <span className="fallback-eye" />
            <span className="fallback-mouth" />
          </div>
        )}
        <div className="halo-shadow" />
      </div>
      <div className="halo-introduction">
        <p className="eyebrow">YOUR PORTFOLIO GUIDE</p>
        <h1>Hi, I’m <span>Halo.</span></h1>
        <p>I can tell you anything about Rhishabh.</p>
        <div className="voice-line" aria-hidden="true"><span /></div>
      </div>
    </section>
  )
}
