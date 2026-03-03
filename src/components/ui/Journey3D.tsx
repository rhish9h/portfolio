import { Canvas, useFrame } from '@react-three/fiber';
import { Cloud, ContactShadows, Environment, Float, PerspectiveCamera, Sky } from '@react-three/drei';
import { Suspense, useMemo, useRef } from 'react';
import * as THREE from 'three';

// ─── Helpers ───
function TubeBetweenPoints({ start, end, radius = 0.02, material }: { start: THREE.Vector3, end: THREE.Vector3, radius?: number, material: THREE.Material }) {
  const distance = start.distanceTo(end);
  const position = start.clone().lerp(end, 0.5);
  const quaternion = new THREE.Quaternion().setFromUnitVectors(
    new THREE.Vector3(0, 1, 0),
    end.clone().sub(start).normalize()
  );

  return (
    <mesh position={position} quaternion={quaternion} castShadow receiveShadow>
      <cylinderGeometry args={[radius, radius, distance, 12]} />
      <primitive object={material} attach="material" />
    </mesh>
  );
}

function CapsuleBetweenPoints({ start, end, radius = 0.02, material }: { start: THREE.Vector3, end: THREE.Vector3, radius?: number, material: THREE.Material }) {
  const distance = start.distanceTo(end);
  const position = start.clone().lerp(end, 0.5);
  const quaternion = new THREE.Quaternion().setFromUnitVectors(
    new THREE.Vector3(0, 1, 0),
    end.clone().sub(start).normalize()
  );

  return (
    <mesh position={position} quaternion={quaternion} castShadow receiveShadow>
      <capsuleGeometry args={[radius, distance, 16, 16]} />
      <primitive object={material} attach="material" />
    </mesh>
  );
}

const BikeAndRider = () => {
  const group = useRef<THREE.Group>(null);
  const crankGroup = useRef<THREE.Group>(null);
  const rearWheelRef = useRef<THREE.Group>(null);
  const frontWheelRef = useRef<THREE.Group>(null);
  
  // Rider refs for animation
  const leftThighRef = useRef<THREE.Group>(null);
  const leftCalfRef = useRef<THREE.Group>(null);
  const rightThighRef = useRef<THREE.Group>(null);
  const rightCalfRef = useRef<THREE.Group>(null);
  const leftFootRef = useRef<THREE.Group>(null);
  const rightFootRef = useRef<THREE.Group>(null);

  // Bike Geometry Points
  const rearAxle = useMemo(() => new THREE.Vector3(-0.5, 0.35, 0), []);
  const frontAxle = useMemo(() => new THREE.Vector3(0.55, 0.35, 0), []);
  const bb = useMemo(() => new THREE.Vector3(-0.1, 0.3, 0), []); // Bottom bracket
  const seatTop = useMemo(() => new THREE.Vector3(-0.25, 0.95, 0), []);
  const headTop = useMemo(() => new THREE.Vector3(0.38, 0.92, 0), []);
  const headBottom = useMemo(() => new THREE.Vector3(0.42, 0.7, 0), []);
  
  // Crank length
  const crankLength = 0.17;
  
  // Rider Geometry Points
  const hipPosition = useMemo(() => new THREE.Vector3(-0.25, 1.05, 0), []);
  const shoulderPosition = useMemo(() => new THREE.Vector3(0.28, 1.25, 0), []);
  
  // Leg segments lengths
  const thighLength = 0.42;
  const calfLength = 0.42;

  useFrame((state) => {
    if (!group.current) return;
    const t = state.clock.getElapsedTime();
    const cadence = 6;
    const angle = t * cadence;

    // Bounce effect
    group.current.position.y = 0.68 + Math.sin(t * cadence * 2) * 0.01;
    
    // In Journey3D, the cyclist is static in place.
    // If it needs to be rotated to face a certain way relative to the camera/scene,
    // we can set its rotation here. Assuming it should face right (+X) or away (-Z).
    // Let's set it to face slightly towards the camera or purely sideways.
    // By default it was facing +X. If it was perpendicular, let's turn it.
    // Just leaving rotation as default means it faces +X. 
    // If it needs to face -Z (away from camera):
    group.current.rotation.y = -Math.PI / 2;
    
    // Spin wheels
    if (rearWheelRef.current) rearWheelRef.current.rotation.z = -angle;
    if (frontWheelRef.current) frontWheelRef.current.rotation.z = -angle;
    
    // Spin crank
    if (crankGroup.current) crankGroup.current.rotation.z = -angle;

    // Inverse Kinematics for legs
    const updateLeg = (thighGroup: THREE.Group, calfGroup: THREE.Group, footGroup: THREE.Group, isRight: boolean) => {
      const phase = isRight ? -angle : -angle + Math.PI;
      const pedalX = bb.x + Math.cos(phase) * crankLength;
      const pedalY = bb.y + Math.sin(phase) * crankLength;
      const pedalZ = isRight ? 0.14 : -0.14;
      
      const pedalPos = new THREE.Vector3(pedalX, pedalY + 0.02, pedalZ);
      const hipPos = new THREE.Vector3(hipPosition.x, hipPosition.y, isRight ? 0.08 : -0.08);
      
      const legVec = pedalPos.clone().sub(hipPos);
      const dist = Math.min(legVec.length(), thighLength + calfLength - 0.001);
      
      let cosAngle = (thighLength*thighLength + dist*dist - calfLength*calfLength) / (2 * thighLength * dist);
      cosAngle = Math.max(-1, Math.min(1, cosAngle));
      const angleHipToKnee = Math.acos(cosAngle);
      
      const hipAngleZ = Math.atan2(legVec.y, legVec.x);
      const thighAngle = hipAngleZ + angleHipToKnee;
      
      const kneeX = hipPos.x + Math.cos(thighAngle) * thighLength;
      const kneeY = hipPos.y + Math.sin(thighAngle) * thighLength;
      const kneePos = new THREE.Vector3(kneeX, kneeY, isRight ? 0.12 : -0.12);
      
      thighGroup.position.copy(hipPos.clone().lerp(kneePos, 0.5));
      thighGroup.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), kneePos.clone().sub(hipPos).normalize());
      
      calfGroup.position.copy(kneePos.clone().lerp(pedalPos, 0.5));
      calfGroup.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), pedalPos.clone().sub(kneePos).normalize());
      
      const ankleAngle = Math.sin(phase) * 0.2;
      footGroup.position.copy(pedalPos);
      footGroup.rotation.set(0, 0, ankleAngle);
    };

    if (leftThighRef.current && leftCalfRef.current && leftFootRef.current) {
      updateLeg(leftThighRef.current, leftCalfRef.current, leftFootRef.current, false);
    }
    if (rightThighRef.current && rightCalfRef.current && rightFootRef.current) {
      updateLeg(rightThighRef.current, rightCalfRef.current, rightFootRef.current, true);
    }
  });

  const frameMat = useMemo(() => new THREE.MeshStandardMaterial({ color: '#0f766e', roughness: 0.2, metalness: 0.8 }), []);
  const blackMat = useMemo(() => new THREE.MeshStandardMaterial({ color: '#111827', roughness: 0.6, metalness: 0.4 }), []);
  const metalMat = useMemo(() => new THREE.MeshStandardMaterial({ color: '#9ca3af', roughness: 0.3, metalness: 0.9 }), []);
  const tireMat = useMemo(() => new THREE.MeshStandardMaterial({ color: '#1f2937', roughness: 0.9, metalness: 0.1 }), []);
  const skinMat = useMemo(() => new THREE.MeshStandardMaterial({ color: '#fca5a5', roughness: 0.5 }), []);
  const jerseyMat = useMemo(() => new THREE.MeshStandardMaterial({ color: '#fbbf24', roughness: 0.7 }), []);
  const shortsMat = useMemo(() => new THREE.MeshStandardMaterial({ color: '#111827', roughness: 0.8 }), []);
  const shoeMat = useMemo(() => new THREE.MeshStandardMaterial({ color: '#ffffff', roughness: 0.8 }), []);
  const helmetMat = useMemo(() => new THREE.MeshStandardMaterial({ color: '#ef4444', roughness: 0.2 }), []);

  const renderWheel = (ref: any, position: THREE.Vector3) => (
    <group position={position} ref={ref}>
      <mesh>
        <torusGeometry args={[0.33, 0.025, 16, 48]} />
        <primitive object={tireMat} attach="material" />
      </mesh>
      <mesh>
        <torusGeometry args={[0.31, 0.015, 8, 48]} />
        <primitive object={blackMat} attach="material" />
      </mesh>
      {[...Array(12)].map((_, i) => (
        <mesh key={i} rotation={[0, 0, (i * Math.PI) / 6]}>
          <cylinderGeometry args={[0.002, 0.002, 0.62, 4]} />
          <primitive object={metalMat} attach="material" />
        </mesh>
      ))}
    </group>
  );

  return (
    <group ref={group} scale={1.8} position={[0, 0.68, 0]}>
      {/* Wheels */}
      {renderWheel(rearWheelRef, rearAxle)}
      {renderWheel(frontWheelRef, frontAxle)}

      {/* Bike Frame */}
      <group>
        <TubeBetweenPoints start={bb} end={seatTop} radius={0.02} material={frameMat} />
        <TubeBetweenPoints start={seatTop} end={headTop} radius={0.018} material={frameMat} />
        <TubeBetweenPoints start={headTop} end={bb} radius={0.025} material={frameMat} />
        <TubeBetweenPoints start={headTop} end={headBottom} radius={0.02} material={frameMat} />
        
        <TubeBetweenPoints start={seatTop} end={new THREE.Vector3(rearAxle.x, rearAxle.y, 0.05)} radius={0.008} material={frameMat} />
        <TubeBetweenPoints start={seatTop} end={new THREE.Vector3(rearAxle.x, rearAxle.y, -0.05)} radius={0.008} material={frameMat} />
        
        <TubeBetweenPoints start={bb} end={new THREE.Vector3(rearAxle.x, rearAxle.y, 0.05)} radius={0.012} material={frameMat} />
        <TubeBetweenPoints start={bb} end={new THREE.Vector3(rearAxle.x, rearAxle.y, -0.05)} radius={0.012} material={frameMat} />
        
        <TubeBetweenPoints start={headBottom} end={new THREE.Vector3(frontAxle.x, frontAxle.y, 0.05)} radius={0.015} material={frameMat} />
        <TubeBetweenPoints start={headBottom} end={new THREE.Vector3(frontAxle.x, frontAxle.y, -0.05)} radius={0.015} material={frameMat} />

        <TubeBetweenPoints start={seatTop} end={new THREE.Vector3(-0.28, 1.05, 0)} radius={0.012} material={blackMat} />
        <mesh position={[-0.30, 1.05, 0]} rotation={[0, 0, 0.05]}>
          <boxGeometry args={[0.2, 0.03, 0.1]} />
          <primitive object={blackMat} attach="material" />
        </mesh>

        <TubeBetweenPoints start={headTop} end={new THREE.Vector3(0.44, 0.95, 0)} radius={0.012} material={blackMat} />
        <mesh position={[0.44, 0.95, 0]} rotation={[Math.PI/2, 0, 0]}>
          <cylinderGeometry args={[0.012, 0.012, 0.36, 8]} />
          <primitive object={blackMat} attach="material" />
        </mesh>
        
        <TubeBetweenPoints start={new THREE.Vector3(0.44, 0.95, 0.18)} end={new THREE.Vector3(0.52, 0.95, 0.18)} radius={0.014} material={blackMat} />
        <TubeBetweenPoints start={new THREE.Vector3(0.52, 0.95, 0.18)} end={new THREE.Vector3(0.52, 0.85, 0.18)} radius={0.014} material={blackMat} />
        <TubeBetweenPoints start={new THREE.Vector3(0.44, 0.95, -0.18)} end={new THREE.Vector3(0.52, 0.95, -0.18)} radius={0.014} material={blackMat} />
        <TubeBetweenPoints start={new THREE.Vector3(0.52, 0.95, -0.18)} end={new THREE.Vector3(0.52, 0.85, -0.18)} radius={0.014} material={blackMat} />
      </group>

      {/* Drivetrain */}
      <group position={bb.toArray()}>
        <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 0, 0.04]}>
          <cylinderGeometry args={[0.08, 0.08, 0.005, 24]} />
          <primitive object={blackMat} attach="material" />
        </mesh>
        
        <group ref={crankGroup}>
          <mesh position={[crankLength/2, 0, 0.06]}>
            <boxGeometry args={[crankLength, 0.02, 0.01]} />
            <primitive object={metalMat} attach="material" />
          </mesh>
          <mesh position={[crankLength, 0, 0.09]} rotation={[Math.PI/2, 0, 0]}>
            <cylinderGeometry args={[0.015, 0.015, 0.06, 8]} />
            <primitive object={blackMat} attach="material" />
          </mesh>

          <mesh position={[-crankLength/2, 0, -0.06]}>
            <boxGeometry args={[crankLength, 0.02, 0.01]} />
            <primitive object={metalMat} attach="material" />
          </mesh>
          <mesh position={[-crankLength, 0, -0.09]} rotation={[Math.PI/2, 0, 0]}>
            <cylinderGeometry args={[0.015, 0.015, 0.06, 8]} />
            <primitive object={blackMat} attach="material" />
          </mesh>
        </group>
      </group>

      {/* Rider */}
      <group>
        <CapsuleBetweenPoints start={hipPosition} end={shoulderPosition} radius={0.12} material={jerseyMat} />
        
        <group position={[shoulderPosition.x + 0.1, shoulderPosition.y + 0.2, 0]} rotation={[0, 0, -0.2]}>
          <mesh position={[-0.05, -0.1, 0]} rotation={[0, 0, 0.2]}>
            <cylinderGeometry args={[0.04, 0.05, 0.1]} />
            <primitive object={skinMat} attach="material" />
          </mesh>
          <mesh>
            <sphereGeometry args={[0.08, 16, 16]} />
            <primitive object={skinMat} attach="material" />
          </mesh>
          <mesh position={[0.01, 0.04, 0]} rotation={[0, 0, -0.1]}>
            <capsuleGeometry args={[0.085, 0.08, 16, 16]} />
            <primitive object={helmetMat} attach="material" />
          </mesh>
        </group>

        {/* Right Arm */}
        <group>
          <CapsuleBetweenPoints 
            start={new THREE.Vector3(shoulderPosition.x, shoulderPosition.y, 0.14)} 
            end={new THREE.Vector3(0.4, 1.1, 0.18)} 
            radius={0.04} material={jerseyMat} 
          />
          <CapsuleBetweenPoints 
            start={new THREE.Vector3(0.4, 1.1, 0.18)} 
            end={new THREE.Vector3(0.5, 0.97, 0.18)} 
            radius={0.035} material={skinMat} 
          />
          <mesh position={[0.5, 0.97, 0.18]} rotation={[0, 0, -Math.PI/4]}>
            <boxGeometry args={[0.05, 0.06, 0.04]} />
            <primitive object={skinMat} attach="material" />
          </mesh>
        </group>
        
        {/* Left Arm */}
        <group>
          <CapsuleBetweenPoints 
            start={new THREE.Vector3(shoulderPosition.x, shoulderPosition.y, -0.14)} 
            end={new THREE.Vector3(0.4, 1.1, -0.18)} 
            radius={0.04} material={jerseyMat} 
          />
          <CapsuleBetweenPoints 
            start={new THREE.Vector3(0.4, 1.1, -0.18)} 
            end={new THREE.Vector3(0.5, 0.97, -0.18)} 
            radius={0.035} material={skinMat} 
          />
          <mesh position={[0.5, 0.97, -0.18]} rotation={[0, 0, -Math.PI/4]}>
            <boxGeometry args={[0.05, 0.06, 0.04]} />
            <primitive object={skinMat} attach="material" />
          </mesh>
        </group>

        {/* Legs (Animated) */}
        <group ref={leftThighRef}>
          <mesh>
            <capsuleGeometry args={[0.065, thighLength, 8, 16]} />
            <primitive object={shortsMat} attach="material" />
          </mesh>
        </group>
        <group ref={leftCalfRef}>
          <mesh>
            <capsuleGeometry args={[0.045, calfLength, 8, 16]} />
            <primitive object={skinMat} attach="material" />
          </mesh>
        </group>
        <group ref={leftFootRef}>
          <mesh position={[0.02, 0, 0]}>
            <boxGeometry args={[0.14, 0.04, 0.06]} />
            <primitive object={shoeMat} attach="material" />
          </mesh>
        </group>

        <group ref={rightThighRef}>
          <mesh>
            <capsuleGeometry args={[0.065, thighLength, 8, 16]} />
            <primitive object={shortsMat} attach="material" />
          </mesh>
        </group>
        <group ref={rightCalfRef}>
          <mesh>
            <capsuleGeometry args={[0.045, calfLength, 8, 16]} />
            <primitive object={skinMat} attach="material" />
          </mesh>
        </group>
        <group ref={rightFootRef}>
          <mesh position={[0.02, 0, 0]}>
            <boxGeometry args={[0.14, 0.04, 0.06]} />
            <primitive object={shoeMat} attach="material" />
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
