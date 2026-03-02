import { Canvas, useFrame } from '@react-three/fiber';
import { Cloud, ContactShadows, Environment, Float, PerspectiveCamera, Sky } from '@react-three/drei';
import { Suspense, useMemo, useRef } from 'react';
import * as THREE from 'three';

type TubeProps = {
  start: THREE.Vector3;
  end: THREE.Vector3;
  radius: number;
  material: THREE.Material;
};

const FrameTube = ({ start, end, radius, material }: TubeProps) => {
  const direction = useMemo(() => new THREE.Vector3().subVectors(end, start), [end, start]);
  const midpoint = useMemo(() => new THREE.Vector3().addVectors(start, end).multiplyScalar(0.5), [end, start]);
  const quaternion = useMemo(() => {
    const axis = new THREE.Vector3(0, 1, 0);
    const target = direction.clone().normalize();
    return new THREE.Quaternion().setFromUnitVectors(axis, target);
  }, [direction]);

  return (
    <mesh position={midpoint} quaternion={quaternion} castShadow>
      <cylinderGeometry args={[radius, radius, direction.length(), 14]} />
      <primitive object={material} />
    </mesh>
  );
};

const Wheel = ({ position }: { position: [number, number, number] }) => {
  const wheelRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (!wheelRef.current) return;
    wheelRef.current.rotation.z -= delta * 7.5;
  });

  return (
    <group ref={wheelRef} position={position}>
      <mesh castShadow>
        <torusGeometry args={[0.72, 0.055, 18, 56]} />
        <meshStandardMaterial color="#111827" roughness={0.75} />
      </mesh>
      <mesh>
        <torusGeometry args={[0.66, 0.03, 16, 48]} />
        <meshStandardMaterial color="#cbd5e1" metalness={0.9} roughness={0.2} />
      </mesh>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.035, 0.035, 0.14, 16]} />
        <meshStandardMaterial color="#475569" />
      </mesh>
      {Array.from({ length: 12 }).map((_, index) => {
        const angle = (Math.PI * 2 * index) / 12;
        return (
          <mesh key={`spoke-front-${index}`} position={[Math.cos(angle) * 0.29, Math.sin(angle) * 0.29, 0.025]} rotation={[0, 0, angle]}>
            <boxGeometry args={[0.58, 0.008, 0.008]} />
            <meshStandardMaterial color="#94a3b8" metalness={0.65} roughness={0.28} />
          </mesh>
        );
      })}
      {Array.from({ length: 12 }).map((_, index) => {
        const angle = (Math.PI * 2 * index) / 12 + Math.PI / 12;
        return (
          <mesh key={`spoke-back-${index}`} position={[Math.cos(angle) * 0.29, Math.sin(angle) * 0.29, -0.025]} rotation={[0, 0, angle]}>
            <boxGeometry args={[0.58, 0.008, 0.008]} />
            <meshStandardMaterial color="#94a3b8" metalness={0.65} roughness={0.28} />
          </mesh>
        );
      })}
    </group>
  );
};

const BikeAndRider = () => {
  const leftThigh = useRef<THREE.Group>(null);
  const leftCalf = useRef<THREE.Group>(null);
  const rightThigh = useRef<THREE.Group>(null);
  const rightCalf = useRef<THREE.Group>(null);
  const crankRef = useRef<THREE.Group>(null);
  const torsoRef = useRef<THREE.Group>(null);

  const frameMaterial = useMemo(
    () => new THREE.MeshStandardMaterial({ color: '#0f766e', roughness: 0.3, metalness: 0.65 }),
    [],
  );

  const rearAxle = useMemo(() => new THREE.Vector3(-1.45, 0.75, 0), []);
  const frontAxle = useMemo(() => new THREE.Vector3(1.55, 0.75, 0), []);
  const bottomBracket = useMemo(() => new THREE.Vector3(-0.3, 0.8, 0), []);
  const seatTop = useMemo(() => new THREE.Vector3(-0.45, 1.72, 0), []);
  const headTop = useMemo(() => new THREE.Vector3(1.02, 1.72, 0), []);
  const headBottom = useMemo(() => new THREE.Vector3(0.98, 1.35, 0), []);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    const cadence = 5.8;

    if (crankRef.current) {
      crankRef.current.rotation.z = -t * cadence;
    }

    if (leftThigh.current && leftCalf.current && rightThigh.current && rightCalf.current) {
      leftThigh.current.rotation.z = Math.sin(t * cadence) * 0.48 + 0.14;
      leftCalf.current.rotation.z = Math.sin(t * cadence - 1.2) * 0.62 - 0.42;

      rightThigh.current.rotation.z = Math.sin(t * cadence + Math.PI) * 0.48 + 0.14;
      rightCalf.current.rotation.z = Math.sin(t * cadence + Math.PI - 1.2) * 0.62 - 0.42;
    }

    if (torsoRef.current) {
      torsoRef.current.rotation.z = -0.58 + Math.sin(t * cadence * 0.55) * 0.02;
      torsoRef.current.position.y = 1.75 + Math.sin(t * cadence * 0.55) * 0.01;
    }
  });

  return (
    <group scale={0.52} position={[0, 0.68, 0]}>
      <Wheel position={[-1.45, 0.75, 0]} />
      <Wheel position={[1.55, 0.75, 0]} />

      <FrameTube start={seatTop} end={headTop} radius={0.035} material={frameMaterial} />
      <FrameTube start={bottomBracket} end={headBottom} radius={0.04} material={frameMaterial} />
      <FrameTube start={seatTop} end={bottomBracket} radius={0.034} material={frameMaterial} />
      <FrameTube start={headTop} end={headBottom} radius={0.035} material={frameMaterial} />

      <FrameTube start={seatTop} end={new THREE.Vector3(rearAxle.x, rearAxle.y, 0.08)} radius={0.016} material={frameMaterial} />
      <FrameTube start={seatTop} end={new THREE.Vector3(rearAxle.x, rearAxle.y, -0.08)} radius={0.016} material={frameMaterial} />
      <FrameTube start={bottomBracket} end={new THREE.Vector3(rearAxle.x, rearAxle.y, 0.09)} radius={0.02} material={frameMaterial} />
      <FrameTube start={bottomBracket} end={new THREE.Vector3(rearAxle.x, rearAxle.y, -0.09)} radius={0.02} material={frameMaterial} />

      <FrameTube start={headBottom} end={new THREE.Vector3(frontAxle.x, frontAxle.y, 0.08)} radius={0.02} material={frameMaterial} />
      <FrameTube start={headBottom} end={new THREE.Vector3(frontAxle.x, frontAxle.y, -0.08)} radius={0.02} material={frameMaterial} />

      <mesh position={[-0.47, 1.92, 0]} rotation={[0, 0, -0.08]} castShadow>
        <cylinderGeometry args={[0.022, 0.022, 0.32, 16]} />
        <meshStandardMaterial color="#0f172a" />
      </mesh>
      <mesh position={[-0.58, 2.08, 0]} rotation={[0, 0, 0.04]} castShadow>
        <boxGeometry args={[0.46, 0.08, 0.2]} />
        <meshStandardMaterial color="#111827" roughness={0.4} />
      </mesh>

      <mesh position={[1.08, 1.84, 0]} rotation={[0, 0, 1.05]} castShadow>
        <cylinderGeometry args={[0.026, 0.026, 0.42, 14]} />
        <meshStandardMaterial color="#111827" metalness={0.35} roughness={0.45} />
      </mesh>
      <mesh position={[1.25, 1.95, 0]} rotation={[0, 0, 0.05]} castShadow>
        <cylinderGeometry args={[0.023, 0.023, 0.74, 14]} />
        <meshStandardMaterial color="#111827" />
      </mesh>
      <mesh position={[1.56, 1.92, 0.3]} rotation={[0, 0, -0.6]} castShadow>
        <capsuleGeometry args={[0.028, 0.24, 6, 10]} />
        <meshStandardMaterial color="#111827" />
      </mesh>
      <mesh position={[1.56, 1.92, -0.3]} rotation={[0, 0, -0.6]} castShadow>
        <capsuleGeometry args={[0.028, 0.24, 6, 10]} />
        <meshStandardMaterial color="#111827" />
      </mesh>

      <group position={[-0.3, 0.8, 0]} ref={crankRef}>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.15, 0.016, 12, 28]} />
          <meshStandardMaterial color="#e2e8f0" metalness={0.9} roughness={0.22} />
        </mesh>
        <mesh position={[0.02, 0.28, 0.11]} castShadow>
          <boxGeometry args={[0.045, 0.56, 0.03]} />
          <meshStandardMaterial color="#1e293b" />
        </mesh>
        <mesh position={[-0.02, -0.28, -0.11]} castShadow>
          <boxGeometry args={[0.045, 0.56, 0.03]} />
          <meshStandardMaterial color="#1e293b" />
        </mesh>
      </group>

      <group ref={torsoRef} position={[-0.37, 1.75, 0]}>
        <mesh position={[0, 0, 0]} castShadow>
          <capsuleGeometry args={[0.14, 0.24, 8, 16]} />
          <meshStandardMaterial color="#0f172a" />
        </mesh>
        <mesh position={[0.5, 0.14, 0]} rotation={[0, 0, -0.58]} castShadow>
          <capsuleGeometry args={[0.17, 0.8, 10, 20]} />
          <meshStandardMaterial color="#f8fafc" roughness={0.36} />
        </mesh>
        <group position={[0.96, 0.28, 0]}>
          <mesh castShadow>
            <sphereGeometry args={[0.15, 24, 24]} />
            <meshStandardMaterial color="#fbbf24" />
          </mesh>
          <mesh position={[0.02, 0.08, 0]} scale={[1.06, 0.74, 1]} castShadow>
            <sphereGeometry args={[0.165, 24, 24]} />
            <meshStandardMaterial color="#ef4444" roughness={0.3} />
          </mesh>
        </group>
        <mesh position={[0.92, 0.07, 0.18]} rotation={[0, 0, -0.94]} castShadow>
          <capsuleGeometry args={[0.052, 0.58, 8, 14]} />
          <meshStandardMaterial color="#fbbf24" />
        </mesh>
        <mesh position={[0.92, 0.07, -0.18]} rotation={[0, 0, -0.94]} castShadow>
          <capsuleGeometry args={[0.052, 0.58, 8, 14]} />
          <meshStandardMaterial color="#fbbf24" />
        </mesh>
      </group>

      <group position={[-0.34, 1.68, 0.11]} ref={leftThigh}>
        <mesh position={[0.08, -0.3, 0]} rotation={[0, 0, 0.04]} castShadow>
          <capsuleGeometry args={[0.09, 0.62, 8, 16]} />
          <meshStandardMaterial color="#0f172a" />
        </mesh>
        <group position={[0.16, -0.64, 0]} ref={leftCalf}>
          <mesh position={[0.05, -0.28, 0]} castShadow>
            <capsuleGeometry args={[0.07, 0.56, 8, 16]} />
            <meshStandardMaterial color="#fbbf24" />
          </mesh>
          <mesh position={[0.12, -0.62, 0]} rotation={[0, 0, 1.2]} castShadow>
            <boxGeometry args={[0.16, 0.06, 0.12]} />
            <meshStandardMaterial color="#0f172a" />
          </mesh>
        </group>
      </group>

      <group position={[-0.34, 1.68, -0.11]} ref={rightThigh}>
        <mesh position={[0.08, -0.3, 0]} rotation={[0, 0, 0.04]} castShadow>
          <capsuleGeometry args={[0.09, 0.62, 8, 16]} />
          <meshStandardMaterial color="#0f172a" />
        </mesh>
        <group position={[0.16, -0.64, 0]} ref={rightCalf}>
          <mesh position={[0.05, -0.28, 0]} castShadow>
            <capsuleGeometry args={[0.07, 0.56, 8, 16]} />
            <meshStandardMaterial color="#fbbf24" />
          </mesh>
          <mesh position={[0.12, -0.62, 0]} rotation={[0, 0, 1.2]} castShadow>
            <boxGeometry args={[0.16, 0.06, 0.12]} />
            <meshStandardMaterial color="#0f172a" />
          </mesh>
        </group>
      </group>
    </group>
  );
};

const Tree = ({ position, scale = 1, color = '#15803d' }: { position: [number, number, number]; scale?: number; color?: string }) => (
  <group position={position} scale={scale}>
    <mesh position={[0, 0.45, 0]} castShadow receiveShadow>
      <cylinderGeometry args={[0.1, 0.24, 0.9, 12]} />
      <meshStandardMaterial color="#7c2d12" roughness={0.85} />
    </mesh>
    <mesh position={[0, 1.25, 0]} castShadow receiveShadow>
      <coneGeometry args={[0.78, 1.45, 10]} />
      <meshStandardMaterial color={color} roughness={0.84} />
    </mesh>
  </group>
);

function Landscape() {
  const groupRef = useRef<THREE.Group>(null);
  const roadside = useMemo(() => {
    const features: Array<{ x: number; z: number; scale: number; color: string }> = [];
    for (let i = 0; i < 120; i += 1) {
      const z = -i * 3.2;
      features.push({ x: -7 - (i % 5) * 2.5, z, scale: 0.7 + (i % 3) * 0.14, color: i % 2 ? '#166534' : '#15803d' });
      features.push({ x: 7 + (i % 6) * 2.3, z, scale: 0.68 + (i % 4) * 0.12, color: i % 2 ? '#15803d' : '#166534' });
    }
    return features;
  }, []);

  useFrame((_, delta) => {
    if (!groupRef.current) return;
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    const progress = maxScroll > 0 ? window.scrollY / maxScroll : 0;
    const targetZ = progress * 300;
    groupRef.current.position.z = THREE.MathUtils.lerp(groupRef.current.position.z, targetZ, delta * 4.8);
  });

  return (
    <group ref={groupRef}>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.02, -105]} receiveShadow>
        <planeGeometry args={[130, 520]} />
        <meshStandardMaterial color="#dcfce7" roughness={1} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.04, -105]} receiveShadow>
        <planeGeometry args={[5.5, 520]} />
        <meshStandardMaterial color="#1f2937" roughness={0.86} />
      </mesh>
      {Array.from({ length: 120 }).map((_, index) => (
        <mesh key={index} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.05, -index * 4.2]} receiveShadow>
          <planeGeometry args={[0.24, 2]} />
          <meshStandardMaterial color="#f8fafc" />
        </mesh>
      ))}
      {roadside.map((feature, index) => (
        <Tree key={index} position={[feature.x, 0, feature.z]} scale={feature.scale} color={feature.color} />
      ))}
    </group>
  );
}

function Scene() {
  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 3.1, 8.2]} fov={48} />
      <fog attach="fog" args={['#fef3c7', 9, 52]} />
      <ambientLight intensity={0.58} />
      <directionalLight
        position={[18, 26, 18]}
        intensity={1.4}
        castShadow
        shadow-mapSize={[2048, 2048]}
        shadow-camera-left={-26}
        shadow-camera-right={26}
        shadow-camera-top={26}
        shadow-camera-bottom={-26}
        shadow-bias={-0.00015}
      />
      <Sky sunPosition={[90, 22, 120]} turbidity={1.5} rayleigh={0.8} mieCoefficient={0.007} mieDirectionalG={0.82} />
      <Environment preset="sunset" />
      <Cloud opacity={0.45} speed={0.14} bounds={[16, 2, 2]} segments={24} position={[0, 10, -22]} color="#fff7ed" />
      <Cloud opacity={0.4} speed={0.1} bounds={[14, 2, 2]} segments={20} position={[10, 12, -36]} color="#fff7ed" />

      <group position={[0, -1.02, 0]}>
        <Landscape />
        <Float speed={1.4} rotationIntensity={0.02} floatIntensity={0.02} floatingRange={[0, 0.03]}>
          <BikeAndRider />
        </Float>
      </group>

      <ContactShadows resolution={1024} scale={15} blur={2.2} opacity={0.55} far={2} color="#111827" position={[0, -1.01, 0]} />
    </>
  );
}

export function Journey3DScene() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0">
      <Canvas shadows dpr={[1, 2]} gl={{ antialias: true, toneMapping: THREE.ACESFilmicToneMapping }}>
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      </Canvas>
    </div>
  );
}
