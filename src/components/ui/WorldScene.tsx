import { useRef, useMemo, useEffect, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useScroll } from 'framer-motion';
import * as THREE from 'three';

// ─── Road Path Definition ───
// Zigzag from left to right across the "world", going downhill (negative Z)
function createRoadCurve() {
  const points: THREE.Vector3[] = [];
  const segments = 7;
  const zSpacing = 18;
  const xAmplitude = 12;
  for (let i = 0; i <= segments; i++) {
    const t = i / segments;
    const x = Math.sin(t * Math.PI * 3.5) * xAmplitude;
    const z = -t * zSpacing * segments;
    const y = (1 - t) * 8; // downhill
    points.push(new THREE.Vector3(x, y, z));
  }
  return new THREE.CatmullRomCurve3(points, false, 'catmullrom', 0.5);
}

// ─── Road Mesh ───
function Road({ curve }: { curve: THREE.CatmullRomCurve3 }) {
  const mesh = useRef<THREE.Mesh>(null);
  const { geometry, edgeGeo } = useMemo(() => {
    const roadPts = curve.getPoints(200);
    const shape = new THREE.Shape();
    shape.moveTo(-1.2, 0);
    shape.lineTo(1.2, 0);
    shape.lineTo(1.2, 0.08);
    shape.lineTo(-1.2, 0.08);
    shape.closePath();

    const frames = curve.computeFrenetFrames(200);
    const geo = new THREE.BufferGeometry();
    const vertices: number[] = [];
    const uvs: number[] = [];
    const indices: number[] = [];
    const width = 1.4;

    for (let i = 0; i <= 200; i++) {
      const pt = roadPts[i];
      const binormal = frames.binormals[i];
      // left edge
      const lx = pt.x - binormal.x * width;
      const ly = pt.y - binormal.y * width + 0.05;
      const lz = pt.z - binormal.z * width;
      // right edge
      const rx = pt.x + binormal.x * width;
      const ry = pt.y + binormal.y * width + 0.05;
      const rz = pt.z + binormal.z * width;
      vertices.push(lx, ly, lz, rx, ry, rz);
      uvs.push(0, i / 200, 1, i / 200);
      if (i < 200) {
        const a = i * 2, b = i * 2 + 1, c = (i + 1) * 2, d = (i + 1) * 2 + 1;
        indices.push(a, c, b, b, c, d);
      }
    }
    geo.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
    geo.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2));
    geo.setIndex(indices);
    geo.computeVertexNormals();

    // Edge lines
    const edgeVerts: number[] = [];
    for (let i = 0; i <= 200; i++) {
      const pt = roadPts[i];
      const binormal = frames.binormals[i];
      edgeVerts.push(
        pt.x - binormal.x * width, pt.y - binormal.y * width + 0.06, pt.z - binormal.z * width,
      );
    }
    const rightEdge: number[] = [];
    for (let i = 0; i <= 200; i++) {
      const pt = roadPts[i];
      const binormal = frames.binormals[i];
      rightEdge.push(
        pt.x + binormal.x * width, pt.y + binormal.y * width + 0.06, pt.z + binormal.z * width,
      );
    }
    const eGeo = new THREE.BufferGeometry();
    eGeo.setAttribute('position', new THREE.Float32BufferAttribute([...edgeVerts, ...rightEdge], 3));
    return { geometry: geo, edgeGeo: eGeo };
  }, [curve]);

  // Dashed center line
  const centerLine = useMemo(() => {
    const pts = curve.getPoints(200);
    const arr: number[] = [];
    pts.forEach(p => arr.push(p.x, p.y + 0.08, p.z));
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.Float32BufferAttribute(arr, 3));
    const mat = new THREE.LineDashedMaterial({ color: '#fbbf24', dashSize: 0.4, gapSize: 0.3 });
    const line = new THREE.Line(g, mat);
    line.computeLineDistances();
    return line;
  }, [curve]);

  // Edge lines object
  const edgeLines = useMemo(() => {
    const mat = new THREE.LineBasicMaterial({ color: '#d1d5db' });
    return new THREE.LineSegments(edgeGeo, mat);
  }, [edgeGeo]);

  return (
    <group>
      <mesh ref={mesh} geometry={geometry} receiveShadow>
        <meshStandardMaterial color="#6b7280" roughness={0.85} />
      </mesh>
      <primitive object={edgeLines} />
      <primitive object={centerLine} />
    </group>
  );
}

// ─── 3D Tree ───
function Tree({ position, seed = 0 }: { position: [number, number, number]; seed?: number }) {
  const scale = 0.6 + (Math.abs(Math.sin(seed * 127.1)) * 0.6);
  return (
    <group position={position} scale={scale}>
      {/* Trunk */}
      <mesh position={[0, 0.6, 0]} castShadow>
        <cylinderGeometry args={[0.08, 0.12, 1.2, 6]} />
        <meshStandardMaterial color="#92400e" roughness={0.9} />
      </mesh>
      {/* Foliage layers */}
      <mesh position={[0, 1.5, 0]} castShadow>
        <coneGeometry args={[0.7, 1.2, 6]} />
        <meshStandardMaterial color="#166534" roughness={0.8} />
      </mesh>
      <mesh position={[0, 2.1, 0]} castShadow>
        <coneGeometry args={[0.5, 0.9, 6]} />
        <meshStandardMaterial color="#15803d" roughness={0.8} />
      </mesh>
      <mesh position={[0, 2.6, 0]} castShadow>
        <coneGeometry args={[0.3, 0.7, 6]} />
        <meshStandardMaterial color="#22c55e" roughness={0.7} />
      </mesh>
    </group>
  );
}

// ─── 3D Hut ───
function Hut({ position, rotation = 0 }: { position: [number, number, number]; rotation?: number }) {
  return (
    <group position={position} rotation={[0, rotation, 0]}>
      {/* Walls */}
      <mesh position={[0, 0.5, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.2, 1, 1]} />
        <meshStandardMaterial color="#fef3c7" roughness={0.9} />
      </mesh>
      {/* Roof */}
      <mesh position={[0, 1.25, 0]} castShadow>
        <coneGeometry args={[1, 0.7, 4]} />
        <meshStandardMaterial color="#dc2626" roughness={0.7} />
      </mesh>
      {/* Door */}
      <mesh position={[0, 0.3, 0.51]}>
        <boxGeometry args={[0.3, 0.6, 0.02]} />
        <meshStandardMaterial color="#78350f" />
      </mesh>
    </group>
  );
}

// ─── 3D Bicycle + Rider ───
function Cyclist({ curve, scrollProgress }: { curve: THREE.CatmullRomCurve3; scrollProgress: number }) {
  const group = useRef<THREE.Group>(null);
  const crankRef = useRef<THREE.Group>(null);
  const wheelFrontRef = useRef<THREE.Group>(null);
  const wheelRearRef = useRef<THREE.Group>(null);

  useFrame(() => {
    if (!group.current) return;
    const t = Math.min(Math.max(scrollProgress, 0), 0.999);
    const pos = curve.getPointAt(t);
    const tangent = curve.getTangentAt(t);

    group.current.position.copy(pos);
    group.current.position.y += 0.45;

    // Face direction of travel
    const lookAt = pos.clone().add(tangent);
    lookAt.y = group.current.position.y;
    group.current.lookAt(lookAt);

    // Spin wheels and cranks
    const speed = 8;
    if (crankRef.current) crankRef.current.rotation.x += 0.06 * speed * 0.016;
    if (wheelFrontRef.current) wheelFrontRef.current.rotation.x += 0.1 * speed * 0.016;
    if (wheelRearRef.current) wheelRearRef.current.rotation.x += 0.1 * speed * 0.016;
  });

  const frameMat = useMemo(() => new THREE.MeshStandardMaterial({ color: '#0f766e', roughness: 0.3, metalness: 0.6 }), []);
  const metalMat = useMemo(() => new THREE.MeshStandardMaterial({ color: '#374151', roughness: 0.4, metalness: 0.8 }), []);
  const skinMat = useMemo(() => new THREE.MeshStandardMaterial({ color: '#fbbf24', roughness: 0.6 }), []);
  const clothMat = useMemo(() => new THREE.MeshStandardMaterial({ color: '#1e40af', roughness: 0.7 }), []);
  const helmetMat = useMemo(() => new THREE.MeshStandardMaterial({ color: '#ef4444', roughness: 0.4 }), []);

  return (
    <group ref={group} scale={0.5}>
      {/* Rear wheel */}
      <group position={[-1.4, 0, 0]} ref={wheelRearRef}>
        <mesh rotation={[0, 0, Math.PI / 2]}>
          <torusGeometry args={[0.55, 0.05, 8, 24]} />
          <meshStandardMaterial color="#1f2937" roughness={0.6} />
        </mesh>
        {/* Spokes */}
        {[0, 60, 120].map(d => (
          <mesh key={d} rotation={[0, 0, (d * Math.PI) / 180]}>
            <cylinderGeometry args={[0.01, 0.01, 1.0, 4]} />
            <primitive object={metalMat} attach="material" />
          </mesh>
        ))}
        <mesh rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.06, 0.06, 0.12, 8]} />
          <primitive object={metalMat} attach="material" />
        </mesh>
      </group>

      {/* Front wheel */}
      <group position={[1.4, 0, 0]} ref={wheelFrontRef}>
        <mesh rotation={[0, 0, Math.PI / 2]}>
          <torusGeometry args={[0.55, 0.05, 8, 24]} />
          <meshStandardMaterial color="#1f2937" roughness={0.6} />
        </mesh>
        {[0, 60, 120].map(d => (
          <mesh key={d} rotation={[0, 0, (d * Math.PI) / 180]}>
            <cylinderGeometry args={[0.01, 0.01, 1.0, 4]} />
            <primitive object={metalMat} attach="material" />
          </mesh>
        ))}
        <mesh rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.06, 0.06, 0.12, 8]} />
          <primitive object={metalMat} attach="material" />
        </mesh>
      </group>

      {/* Frame tubes */}
      {/* Down tube */}
      <mesh position={[0.2, 0.5, 0]} rotation={[0, 0, -0.4]}>
        <cylinderGeometry args={[0.04, 0.04, 1.6, 8]} />
        <primitive object={frameMat} attach="material" />
      </mesh>
      {/* Seat tube */}
      <mesh position={[-0.4, 0.6, 0]} rotation={[0, 0, 0.15]}>
        <cylinderGeometry args={[0.04, 0.04, 1.3, 8]} />
        <primitive object={frameMat} attach="material" />
      </mesh>
      {/* Top tube */}
      <mesh position={[0, 1.1, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.035, 0.035, 1.4, 8]} />
        <primitive object={frameMat} attach="material" />
      </mesh>
      {/* Seat stay */}
      <mesh position={[-0.9, 0.5, 0]} rotation={[0, 0, 0.6]}>
        <cylinderGeometry args={[0.025, 0.025, 1.2, 6]} />
        <primitive object={frameMat} attach="material" />
      </mesh>
      {/* Fork */}
      <mesh position={[1.1, 0.5, 0]} rotation={[0, 0, -0.3]}>
        <cylinderGeometry args={[0.03, 0.03, 1.1, 6]} />
        <primitive object={metalMat} attach="material" />
      </mesh>

      {/* Handlebars */}
      <mesh position={[1.0, 1.2, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.02, 0.02, 0.6, 6]} />
        <primitive object={metalMat} attach="material" />
      </mesh>

      {/* Seat */}
      <mesh position={[-0.5, 1.3, 0]}>
        <boxGeometry args={[0.35, 0.06, 0.18]} />
        <meshStandardMaterial color="#1f2937" roughness={0.5} />
      </mesh>

      {/* Cranks */}
      <group position={[0, 0.15, 0]} ref={crankRef}>
        <mesh rotation={[0, 0, Math.PI / 2]}>
          <torusGeometry args={[0.12, 0.015, 8, 20]} />
          <primitive object={metalMat} attach="material" />
        </mesh>
        <mesh position={[0, 0.2, 0.08]}>
          <boxGeometry args={[0.04, 0.4, 0.02]} />
          <primitive object={metalMat} attach="material" />
        </mesh>
        <mesh position={[0, -0.2, -0.08]}>
          <boxGeometry args={[0.04, 0.4, 0.02]} />
          <primitive object={metalMat} attach="material" />
        </mesh>
      </group>

      {/* ─── Rider ─── */}
      {/* Torso */}
      <mesh position={[0, 1.7, 0]} rotation={[0, 0, -0.4]} castShadow>
        <capsuleGeometry args={[0.15, 0.55, 6, 12]} />
        <primitive object={clothMat} attach="material" />
      </mesh>
      {/* Head */}
      <mesh position={[0.35, 2.25, 0]} castShadow>
        <sphereGeometry args={[0.16, 12, 12]} />
        <primitive object={skinMat} attach="material" />
      </mesh>
      {/* Helmet */}
      <mesh position={[0.35, 2.35, 0]} castShadow>
        <sphereGeometry args={[0.18, 12, 12, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <primitive object={helmetMat} attach="material" />
      </mesh>
      {/* Arms */}
      <mesh position={[0.6, 1.65, 0.15]} rotation={[0, 0, -1.1]} castShadow>
        <capsuleGeometry args={[0.05, 0.55, 4, 8]} />
        <primitive object={skinMat} attach="material" />
      </mesh>
      <mesh position={[0.6, 1.65, -0.15]} rotation={[0, 0, -1.1]} castShadow>
        <capsuleGeometry args={[0.05, 0.55, 4, 8]} />
        <primitive object={skinMat} attach="material" />
      </mesh>
      {/* Legs */}
      <mesh position={[-0.2, 0.9, 0.1]} rotation={[0, 0, 0.3]} castShadow>
        <capsuleGeometry args={[0.07, 0.6, 4, 8]} />
        <meshStandardMaterial color="#1e293b" roughness={0.7} />
      </mesh>
      <mesh position={[-0.2, 0.9, -0.1]} rotation={[0, 0, -0.1]} castShadow>
        <capsuleGeometry args={[0.07, 0.6, 4, 8]} />
        <meshStandardMaterial color="#1e293b" roughness={0.7} />
      </mesh>
    </group>
  );
}

// ─── Environment: trees and huts scattered along the road ───
function Environment({ curve }: { curve: THREE.CatmullRomCurve3 }) {
  const items = useMemo(() => {
    const trees: [number, number, number][] = [];
    const huts: { pos: [number, number, number]; rot: number }[] = [];
    const rng = (seed: number) => {
      let s = seed;
      return () => { s = (s * 16807) % 2147483647; return (s - 1) / 2147483646; };
    };
    const rand = rng(42);

    for (let i = 0; i < 80; i++) {
      const t = rand();
      const pt = curve.getPointAt(t);
      const offset = (rand() - 0.5) * 2;
      const side = offset > 0 ? 1 : -1;
      const dist = 2.5 + rand() * 6;
      trees.push([pt.x + side * dist, pt.y - 0.1, pt.z + (rand() - 0.5) * 3]);
    }

    // Place huts at a few spots
    const hutTs = [0.12, 0.3, 0.5, 0.7, 0.88];
    hutTs.forEach(t => {
      const pt = curve.getPointAt(t);
      const side = Math.sin(t * 20) > 0 ? 1 : -1;
      huts.push({ pos: [pt.x + side * 5, pt.y, pt.z], rot: rand() * Math.PI * 2 });
    });

    return { trees, huts };
  }, [curve]);

  return (
    <group>
      {items.trees.map((pos, i) => <Tree key={`t${i}`} position={pos} seed={i} />)}
      {items.huts.map((h, i) => <Hut key={`h${i}`} position={h.pos} rotation={h.rot} />)}
    </group>
  );
}

// ─── Ground Plane ───
function Ground({ curve }: { curve: THREE.CatmullRomCurve3 }) {
  const endPt = curve.getPointAt(1);
  const startPt = curve.getPointAt(0);
  const centerZ = (startPt.z + endPt.z) / 2;
  const length = Math.abs(endPt.z - startPt.z) + 40;
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.1, centerZ]} receiveShadow>
      <planeGeometry args={[60, length]} />
      <meshStandardMaterial color="#86efac" roughness={1} />
    </mesh>
  );
}

// ─── Camera Controller ───
function CameraRig({ curve, scrollProgress }: { curve: THREE.CatmullRomCurve3; scrollProgress: number }) {
  const { camera } = useThree();
  const targetPos = useRef(new THREE.Vector3());
  const targetLook = useRef(new THREE.Vector3());

  useFrame(() => {
    const t = Math.min(Math.max(scrollProgress, 0), 0.995);
    const pt = curve.getPointAt(t);

    // Camera follows slightly above and behind the cyclist
    targetPos.current.set(pt.x * 0.3, pt.y + 14, pt.z + 16);
    targetLook.current.set(pt.x, pt.y, pt.z - 4);

    camera.position.lerp(targetPos.current, 0.05);
    const currentLook = new THREE.Vector3();
    currentLook.lerpVectors(
      camera.getWorldDirection(new THREE.Vector3()).multiplyScalar(20).add(camera.position),
      targetLook.current,
      0.05
    );
    camera.lookAt(targetLook.current);
  });

  return null;
}

// ─── Main Scene (inside Canvas) ───
function Scene({ scrollProgress }: { scrollProgress: number }) {
  const curve = useMemo(() => createRoadCurve(), []);

  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={0.5} />
      <directionalLight
        position={[15, 25, 10]}
        intensity={1.2}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-camera-far={200}
        shadow-camera-left={-30}
        shadow-camera-right={30}
        shadow-camera-top={30}
        shadow-camera-bottom={-80}
      />
      <hemisphereLight args={['#87ceeb', '#86efac', 0.4]} />

      {/* Sky color */}
      <color attach="background" args={['#e0f2fe']} />
      <fog attach="fog" args={['#e0f2fe', 30, 80]} />

      <CameraRig curve={curve} scrollProgress={scrollProgress} />
      <Ground curve={curve} />
      <Road curve={curve} />
      <Environment curve={curve} />
      <Cyclist curve={curve} scrollProgress={scrollProgress} />
    </>
  );
}

// ─── Exported Component ───
export function WorldScene() {
  const { scrollYProgress } = useScroll();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const unsub = scrollYProgress.on('change', v => setProgress(v));
    return unsub;
  }, [scrollYProgress]);

  return (
    <div className="fixed inset-0 z-0" style={{ pointerEvents: 'none' }}>
      <Canvas
        shadows="basic"
        camera={{ fov: 50, near: 0.1, far: 200, position: [0, 14, 16] }}
        style={{ pointerEvents: 'none' }}
        gl={{ antialias: true, alpha: false }}
      >
        <Scene scrollProgress={progress} />
      </Canvas>
    </div>
  );
}
