// Converts pointer movement into a normalized gaze target without React rerenders.
import { useEffect, useState, type RefObject } from 'react'

import type { Vec2 } from './Halo.tsx'

export function usePointerLook(target?: RefObject<HTMLElement | null>): Vec2 {
  const [look] = useState<Vec2>(() => ({ x: 0, y: 0 }))

  useEffect(() => {
    const onMove = (event: PointerEvent) => {
      const element = target?.current
      const rect = element
        ? element.getBoundingClientRect()
        : { left: 0, top: 0, width: window.innerWidth, height: window.innerHeight }
      look.x = Math.max(-1, Math.min(1, ((event.clientX - rect.left) / rect.width) * 2 - 1))
      look.y = Math.max(-1, Math.min(1, -(((event.clientY - rect.top) / rect.height) * 2 - 1)))
    }

    const onLeave = () => {
      look.x = 0
      look.y = 0
    }

    window.addEventListener('pointermove', onMove, { passive: true })
    window.addEventListener('pointerleave', onLeave)
    return () => {
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerleave', onLeave)
    }
  }, [look, target])

  return look
}
