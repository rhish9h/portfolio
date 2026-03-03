import { useRef, useMemo, useEffect, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useScroll } from 'framer-motion';
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

    // Speed calculation could be based on scroll delta, but for now we'll just keep it spinning
    // Using a simple time-based animation for wheels and legs
    const time = Date.now() * 0.001;
    const speed = 6;
    // We want the rotation angle to increase over time
    const angle = time * speed;
    
    // The bicycle is facing along the X axis.
    // In ThreeJS standard orientation, to rotate a wheel that is facing along the Z axis, 
    // it needs to rotate around the Z axis.
    // If the bike is oriented along the X axis, wheels need to rotate around Z axis.
    // Since the wheel is moving forward (towards positive X), the wheels should rotate clockwise (negative Z rotation)
    // if looking from the right side, or counter-clockwise if looking from the left side depending on axis.
    // For a standard setup, a positive rotation around Z makes the top of the wheel move towards negative X.
    // A negative rotation around Z makes the top of the wheel move towards positive X.
    
    // Spin wheels
    if (rearWheelRef.current) rearWheelRef.current.rotation.z = -angle;
    if (frontWheelRef.current) frontWheelRef.current.rotation.z = -angle;
    
    // Spin crank (should spin in same direction as wheels)
    if (crankGroup.current) crankGroup.current.rotation.z = -angle;

    // Inverse Kinematics for legs
    const updateLeg = (thighGroup: THREE.Group, calfGroup: THREE.Group, footGroup: THREE.Group, isRight: boolean) => {
      // The phase defines where the pedal is in the rotation.
      // The crank rotates negatively (clockwise). We need to offset the phase depending on the leg.
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

  const frameMat = useMemo(() => new THREE.MeshStandardMaterial({ color: '#2563eb', roughness: 0.2, metalness: 0.8 }), []);
  const blackMat = useMemo(() => new THREE.MeshStandardMaterial({ color: '#111827', roughness: 0.6, metalness: 0.4 }), []);
  const metalMat = useMemo(() => new THREE.MeshStandardMaterial({ color: '#9ca3af', roughness: 0.3, metalness: 0.9 }), []);
  const tireMat = useMemo(() => new THREE.MeshStandardMaterial({ color: '#1f2937', roughness: 0.9, metalness: 0.1 }), []);
  const skinMat = useMemo(() => new THREE.MeshStandardMaterial({ color: '#fca5a5', roughness: 0.5 }), []);
  const jerseyMat = useMemo(() => new THREE.MeshStandardMaterial({ color: '#ffffff', roughness: 0.7 }), []);
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
    <group ref={group} scale={1.8}>
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

    // Camera follows closer and lower to the cyclist
    targetPos.current.set(pt.x * 0.3, pt.y + 8, pt.z + 10);
    targetLook.current.set(pt.x, pt.y, pt.z - 2);

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
