// Exposes the public Halo component API from one module entry point.
export { Halo, HALO_MODEL_URL } from './Halo.tsx'
export type { HaloProps, HeadRotation, Vec2 } from './Halo.tsx'
export { EXPRESSIONS, POSES, FACE_CANVAS } from './expressions'
export type { Expression, FacePose, Shape } from './expressions'
export { usePointerLook } from './usePointerLook'
