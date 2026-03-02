import { Canvas, useFrame } from '@react-three/fiber';
import { Float, PerspectiveCamera, Environment, Sky, ContactShadows, Stars, Sparkles, Cloud } from '@react-three/drei';
import { useRef, useMemo, Suspense } from 'react';
import * as THREE from 'three';

// --- Assets & Geometries ---

const LowPolyCyclist = () => {
  const group = useRef<THREE.Group>(null);
  const frontWheel = useRef<THREE.Group>(null);
  const backWheel = useRef<THREE.Group>(null);
  const pedals = useRef<THREE.Group>(null);
  
  // Animation state
  useFrame((state) => {
    if (!group.current) return;
    
    // Gentle sway
    const t = state.clock.getElapsedTime();
    group.current.rotation.z = Math.sin(t * 2) * 0.05;
    group.current.position.y = Math.sin(t * 4) * 0.02 + 0.1; // Bobbing
    
    // Calculate speed based on scroll delta would be ideal, but for now constant "moving" animation
    // when the user scrolls is hard to detect perfectly without noise.
    // So we'll keep a constant slow idle rotation and speed it up if we could detect scroll.
    // For this visual, a constant rotation makes it feel "alive" even when still.
    
    const rotationSpeed = 0.15;
    if (frontWheel.current) frontWheel.current.rotation.x -= rotationSpeed;
    if (backWheel.current) backWheel.current.rotation.x -= rotationSpeed;
    if (pedals.current) pedals.current.rotation.x -= rotationSpeed;
  });

  const frameColor = "#3b82f6"; // Primary blue
  const tireColor = "#1f2937";
  const rimColor = "#e5e7eb";
  const skinColor = "#fcd34d";
  const shirtColor = "#ffffff";
  const shortsColor = "#1f2937";

  return (
    <group ref={group} scale={0.4} position={[0, 0, 0]}>
      {/* Bicycle Frame */}
      <group>
        {/* Main Frame */}
        <mesh position={[0, 1.2, 0]} rotation={[0, 0, 0.2]}>
            <capsuleGeometry args={[0.08, 2.2, 4, 8]} />
            <meshStandardMaterial color={frameColor} roughness={0.3} metalness={0.8} />
        </mesh>
        <mesh position={[-0.8, 1.2, 0]} rotation={[0, 0, -0.2]}>
            <capsuleGeometry args={[0.07, 2, 4, 8]} />
            <meshStandardMaterial color={frameColor} roughness={0.3} metalness={0.8} />
        </mesh>
         <mesh position={[0.8, 1.2, 0]} rotation={[0, 0, -0.2]}>
            <capsuleGeometry args={[0.07, 2, 4, 8]} />
            <meshStandardMaterial color={frameColor} roughness={0.3} metalness={0.8} />
        </mesh>
         <mesh position={[0, 0.4, 0]} rotation={[0, 0, 1.57]}>
            <capsuleGeometry args={[0.08, 1.6, 4, 8]} />
            <meshStandardMaterial color={frameColor} roughness={0.3} metalness={0.8} />
        </mesh>
        
        {/* Handlebars */}
        <mesh position={[1.2, 2.1, 0]} rotation={[0, 1.57, 0]}>
            <capsuleGeometry args={[0.06, 1.2, 4, 8]} />
            <meshStandardMaterial color="#9ca3af" roughness={0.5} metalness={0.9} />
        </mesh>
        
        {/* Seat */}
        <mesh position={[-0.6, 2.3, 0]} rotation={[0, 0, 0.1]}>
            <boxGeometry args={[0.6, 0.1, 0.4]} />
            <meshStandardMaterial color="#111827" />
        </mesh>
      </group>

      {/* Wheels */}
      <group position={[1.5, 0.7, 0]} ref={frontWheel}>
        <mesh rotation={[1.57, 0, 0]}>
            <torusGeometry args={[0.7, 0.08, 16, 32]} />
            <meshStandardMaterial color={tireColor} />
        </mesh>
        <mesh rotation={[1.57, 0, 0]}>
            <torusGeometry args={[0.6, 0.02, 16, 16]} />
            <meshStandardMaterial color={rimColor} metalness={0.8} />
        </mesh>
        {/* Spokes */}
        {[0, 1.57, 0.78, -0.78].map((rot, i) => (
            <mesh key={i} rotation={[0, 0, rot]}>
                <cylinderGeometry args={[0.01, 0.01, 1.4]} />
                <meshStandardMaterial color={rimColor} />
            </mesh>
        ))}
      </group>

      <group position={[-1.5, 0.7, 0]} ref={backWheel}>
        <mesh rotation={[1.57, 0, 0]}>
            <torusGeometry args={[0.7, 0.08, 16, 32]} />
            <meshStandardMaterial color={tireColor} />
        </mesh>
        <mesh rotation={[1.57, 0, 0]}>
            <torusGeometry args={[0.6, 0.02, 16, 16]} />
            <meshStandardMaterial color={rimColor} metalness={0.8} />
        </mesh>
         {/* Spokes */}
        {[0, 1.57, 0.78, -0.78].map((rot, i) => (
            <mesh key={i} rotation={[0, 0, rot]}>
                <cylinderGeometry args={[0.01, 0.01, 1.4]} />
                <meshStandardMaterial color={rimColor} />
            </mesh>
        ))}
      </group>

       {/* Pedals */}
       <group position={[0, 0.7, 0]} ref={pedals}>
         <mesh rotation={[0, 0, 1.57]} position={[0.2, 0, 0.3]}>
            <cylinderGeometry args={[0.02, 0.02, 0.4]} />
            <meshStandardMaterial color="#9ca3af" />
         </mesh>
         <mesh rotation={[0, 0, 1.57]} position={[-0.2, 0, -0.3]}>
            <cylinderGeometry args={[0.02, 0.02, 0.4]} />
            <meshStandardMaterial color="#9ca3af" />
         </mesh>
       </group>

      {/* Rider (Simplified Low Poly) */}
      <group>
        {/* Torso */}
        <mesh position={[-0.2, 2.8, 0]} rotation={[0, 0, 0.3]}>
            <boxGeometry args={[0.5, 1.2, 0.7]} />
            <meshStandardMaterial color={shirtColor} roughness={0.9} />
        </mesh>
        {/* Head */}
        <mesh position={[0.1, 3.6, 0]} rotation={[0, 0, 0.2]}>
            <sphereGeometry args={[0.25, 16, 16]} />
            <meshStandardMaterial color={skinColor} roughness={0.5} />
        </mesh>
        {/* Helmet */}
        <mesh position={[0.1, 3.75, 0]} rotation={[0, 0, 0.2]}>
            <sphereGeometry args={[0.26, 16, 16, 0, 6.28, 0, 1.5]} />
            <meshStandardMaterial color={frameColor} roughness={0.4} />
        </mesh>
        
        {/* Legs (Static for now, but positioned to look like biking) */}
        <mesh position={[-0.3, 1.8, 0.3]} rotation={[0.5, 0, 0.2]}>
             <capsuleGeometry args={[0.12, 1.5, 4, 8]} />
             <meshStandardMaterial color={shortsColor} />
        </mesh>
        <mesh position={[-0.3, 1.8, -0.3]} rotation={[-0.5, 0, 0.2]}>
             <capsuleGeometry args={[0.12, 1.5, 4, 8]} />
             <meshStandardMaterial color={shortsColor} />
        </mesh>

        {/* Arms */}
        <mesh position={[0.4, 2.8, 0.35]} rotation={[0, 0, -0.8]}>
             <capsuleGeometry args={[0.08, 1.4, 4, 8]} />
             <meshStandardMaterial color={skinColor} />
        </mesh>
         <mesh position={[0.4, 2.8, -0.35]} rotation={[0, 0, -0.8]}>
             <capsuleGeometry args={[0.08, 1.4, 4, 8]} />
             <meshStandardMaterial color={skinColor} />
        </mesh>
      </group>
    </group>
  );
};

// --- Environment Elements ---

const Tree = ({ position, scale = 1, color = "#10b981" }: { position: [number, number, number], scale?: number, color?: string }) => {
  return (
    <group position={position} scale={scale}>
      <mesh position={[0, 0.5, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.1, 0.2, 1]} />
        <meshStandardMaterial color="#78350f" />
      </mesh>
      <mesh position={[0, 1.5, 0]} castShadow receiveShadow>
        <coneGeometry args={[0.8, 1.5, 8]} />
        <meshStandardMaterial color={color} roughness={0.8} />
      </mesh>
      <mesh position={[0, 2.2, 0]} castShadow receiveShadow>
        <coneGeometry args={[0.6, 1.2, 8]} />
        <meshStandardMaterial color={color} roughness={0.8} />
      </mesh>
    </group>
  );
};

const Rock = ({ position, scale = 1 }: { position: [number, number, number], scale?: number }) => {
  return (
    <mesh position={position} scale={scale} castShadow receiveShadow rotation={[Math.random() * Math.PI, Math.random() * Math.PI, 0]}>
      <dodecahedronGeometry args={[0.5, 0]} />
      <meshStandardMaterial color="#6b7280" flatShading />
    </mesh>
  );
};

function Landscape() {
    const group = useRef<THREE.Group>(null);
    
    // Generate landscape items once
    const items = useMemo(() => {
        const _items = [];
        // Creates a long corridor of items
        for (let i = 0; i < 100; i++) {
            const z = -i * 3; // Space them out along Z
            // Left side
            _items.push({
                x: -5 - Math.random() * 15,
                z,
                scale: 0.5 + Math.random(),
                type: Math.random() > 0.7 ? 'rock' : 'tree',
                color: Math.random() > 0.5 ? '#10b981' : '#059669'
            });
            // Right side
            _items.push({
                x: 5 + Math.random() * 15,
                z,
                scale: 0.5 + Math.random(),
                type: Math.random() > 0.7 ? 'rock' : 'tree',
                color: Math.random() > 0.5 ? '#10b981' : '#059669'
            });
        }
        return _items;
    }, []);

    useFrame((_state, delta) => {
        if (!group.current) return;
        
        // Move the entire group towards camera based on scroll
        const scrollMax = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPos = window.scrollY;
        const progress = scrollMax > 0 ? scrollPos / scrollMax : 0;
        
        // Map progress (0-1) to Z distance (0-250)
        const targetZ = progress * 250;
        
        // Smoothly interpolate current Z to target Z
        // Using lerp for smooth camera follow feel
        group.current.position.z = THREE.MathUtils.lerp(group.current.position.z, targetZ, delta * 5);
    });

    return (
        <group ref={group}>
            {/* Ground Plane - Infinite illusion by being large */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, -100]} receiveShadow>
                <planeGeometry args={[100, 400]} />
                <meshStandardMaterial color="#ecfccb" roughness={1} />
            </mesh>
            
            {/* Road */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.02, -100]} receiveShadow>
                <planeGeometry args={[4, 400]} />
                <meshStandardMaterial color="#374151" roughness={0.8} />
            </mesh>
            
             {/* Road Stripes */}
             {Array.from({ length: 100 }).map((_, i) => (
                <mesh key={i} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.03, -i * 4]} receiveShadow>
                    <planeGeometry args={[0.2, 2]} />
                    <meshStandardMaterial color="white" />
                </mesh>
             ))}

            {/* Scenery Items */}
            {items.map((item, i) => (
                <group key={i} position={[item.x, 0, item.z]}>
                   {item.type === 'tree' ? 
                     <Tree position={[0,0,0]} scale={item.scale} color={item.color} /> : 
                     <Rock position={[0,0.3,0]} scale={item.scale} />
                   }
                </group>
            ))}
        </group>
    );
}

function Scene() {
    return (
        <>
             <PerspectiveCamera makeDefault position={[0, 3, 8]} fov={50} />
             
             {/* Lighting & Environment */}
             <ambientLight intensity={0.5} />
             <directionalLight 
                position={[10, 20, 10]} 
                intensity={1.2} 
                castShadow 
                shadow-mapSize={[2048, 2048]} 
                shadow-camera-left={-20}
                shadow-camera-right={20}
                shadow-camera-top={20}
                shadow-camera-bottom={-20}
             />
             <Sky sunPosition={[100, 20, 100]} turbidity={0.3} rayleigh={0.5} mieCoefficient={0.005} mieDirectionalG={0.8} />
             <Environment preset="city" />
             <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
             <Cloud opacity={0.5} speed={0.4} bounds={[10, 2, 2]} segments={20} position={[0, 10, -20]} />
             <Cloud opacity={0.5} speed={0.4} bounds={[10, 2, 2]} segments={20} position={[10, 12, -40]} />
             
             <group position={[0, -1, 0]}>
                <Landscape />
                {/* Cyclist stays in relative view but floats */}
                <Float speed={2} rotationIntensity={0.2} floatIntensity={0.2} floatingRange={[0, 0.2]}>
                    <LowPolyCyclist />
                </Float>
             </group>
             
             <ContactShadows resolution={1024} scale={10} blur={2} opacity={0.5} far={10} color="#000000" />
             <Sparkles count={80} scale={12} size={4} speed={0.4} opacity={0.5} color="#fbbf24" position={[0, 2, 0]} />
        </>
    );
}

export function Journey3DScene() {
    return (
        <div className="fixed inset-0 z-0 pointer-events-none">
            <Canvas shadows dpr={[1, 2]} gl={{ antialias: true }}>
                <Suspense fallback={null}>
                    <Scene />
                </Suspense>
            </Canvas>
        </div>
    );
}
