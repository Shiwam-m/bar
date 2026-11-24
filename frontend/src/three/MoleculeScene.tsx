import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { MoleculeModel } from './MoleculeModel';

interface MoleculeSceneProps {
  isHome: boolean;
}

export const MoleculeScene: React.FC<MoleculeSceneProps> = ({ isHome }) => {
  return (
    <div
      aria-hidden="true"
      className={`fixed inset-0 pointer-events-none transition-opacity duration-700 z-0 ${
        isHome ? 'opacity-90' : 'opacity-20'
      }`}
    >
      <Canvas
        camera={{ position: [0, 0, 10], fov: 40 }}
        gl={{ alpha: true, antialias: true }}
        dpr={[1, 2]}
      >
        <ambientLight intensity={0.7} />
        <directionalLight position={[4, 5, 6]} intensity={1.2} color="#fff8e7" />
        <pointLight position={[-4, -3, 3]} intensity={0.5} color="#c8a45a" />
        <Suspense fallback={null}>
          <MoleculeModel isHome={isHome} />
        </Suspense>
      </Canvas>
    </div>
  );
};
