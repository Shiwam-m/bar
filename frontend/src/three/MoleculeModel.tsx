import React, { useRef, useMemo, useEffect, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface MoleculeModelProps {
  isHome: boolean;
}

export const MoleculeModel: React.FC<MoleculeModelProps> = ({ isHome }) => {
  const groupRef = useRef<THREE.Group>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [targetPos, setTargetPos] = useState({ x: 3.2, s: 1 });
  const currentPos = useRef({ x: 3.2, s: 1 });

  // Update target based on window width and active route
  useEffect(() => {
    const handleResize = () => {
      const isWide = window.innerWidth > 800;
      if (isHome) {
        setTargetPos({ x: isWide ? 3.2 : 0, s: isWide ? 1 : 0.8 });
      } else {
        setTargetPos({ x: isWide ? 3.6 : 0, s: isWide ? 0.7 : 0.5 });
      }
    };

    const handlePointerMove = (e: PointerEvent) => {
      const x = e.clientX / window.innerWidth - 0.5;
      const y = e.clientY / window.innerHeight - 0.5;
      setMousePos({ x, y });
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    window.addEventListener('pointermove', handlePointerMove);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('pointermove', handlePointerMove);
    };
  }, [isHome]);

  // Atom configurations matching original Three.js implementation
  const atomsConfig = useMemo(() => [
    { pos: [0, 0, 0] as [number, number, number], r: 0.55, type: 'gold' },
    { pos: [1.7, 0.8, 0.3] as [number, number, number], r: 0.35, type: 'pale' },
    { pos: [-1.5, 1.1, -0.4] as [number, number, number], r: 0.35, type: 'pale' },
    { pos: [0.2, -1.7, 0.6] as [number, number, number], r: 0.35, type: 'pale' },
    { pos: [-1.3, -1.1, 1.1] as [number, number, number], r: 0.28, type: 'gold' },
    { pos: [2.9, -0.2, -0.5] as [number, number, number], r: 0.28, type: 'gold' },
    { pos: [1.9, 2.1, -0.9] as [number, number, number], r: 0.25, type: 'pale' },
  ], []);

  // Bond connections: [[0,1],[0,2],[0,3],[3,4],[1,5],[1,6]]
  const bonds = useMemo(() => {
    const pairs = [
      [0, 1], [0, 2], [0, 3],
      [3, 4], [1, 5], [1, 6],
    ];

    return pairs.map(([i, j]) => {
      const p = new THREE.Vector3(...atomsConfig[i].pos);
      const q = new THREE.Vector3(...atomsConfig[j].pos);
      const dir = q.clone().sub(p);
      const len = dir.length();
      const mid = p.clone().add(q).multiplyScalar(0.5);
      const quat = new THREE.Quaternion().setFromUnitVectors(
        new THREE.Vector3(0, 1, 0),
        dir.clone().normalize()
      );
      return { len, mid, quat };
    });
  }, [atomsConfig]);

  useFrame((state, delta) => {
    if (!groupRef.current) return;

    // Smooth lerp positioning
    currentPos.current.x += (targetPos.x - currentPos.current.x) * 0.06;
    currentPos.current.s += (targetPos.s - currentPos.current.s) * 0.06;

    groupRef.current.position.set(currentPos.current.x, 0, 0);
    groupRef.current.scale.setScalar(currentPos.current.s);

    // Continuous rotation + pointer parallax
    const t = state.clock.getElapsedTime();
    groupRef.current.rotation.y = t * 0.2 + mousePos.x * 0.5;
    groupRef.current.rotation.x = mousePos.y * 0.3;
  });

  return (
    <group ref={groupRef}>
      {/* Atoms */}
      {atomsConfig.map((atom, index) => (
        <mesh key={`atom-${index}`} position={atom.pos}>
          <sphereGeometry args={[atom.r, 32, 24]} />
          {atom.type === 'gold' ? (
            <meshStandardMaterial
              color="#c8a45a"
              metalness={0.65}
              roughness={0.25}
              envMapIntensity={1.2}
            />
          ) : (
            <meshStandardMaterial
              color="#f1ede4"
              metalness={0.15}
              roughness={0.35}
            />
          )}
        </mesh>
      ))}

      {/* Bonds */}
      {bonds.map((bond, index) => (
        <mesh
          key={`bond-${index}`}
          position={bond.mid}
          quaternion={bond.quat}
        >
          <cylinderGeometry args={[0.07, 0.07, bond.len, 16]} />
          <meshStandardMaterial
            color="#6d6a63"
            metalness={0.4}
            roughness={0.5}
          />
        </mesh>
      ))}
    </group>
  );
};
