"use client";

import { Suspense, useRef, useEffect } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import {
  OrbitControls,
  Environment,
  Stage,
  PerspectiveCamera,
  Html,
  useProgress,
} from "@react-three/drei";
import * as THREE from "three";
import { useConfiguratorStore } from "@/store/configuratorStore";
import { JerseyModel } from "./JerseyModel";
import type { CameraView } from "@/types/configurator";

const cameraPositions: Record<CameraView, [number, number, number]> = {
  front: [0, 0, 4],
  back: [0, 0, -4],
  left: [-4, 0, 0],
  right: [4, 0, 0],
  top: [0, 4, 0.1],
  perspective: [2, 1.5, 3.5],
};

function Loader() {
  const { progress } = useProgress();
  return (
    <Html center>
      <div className="flex flex-col items-center gap-3">
        <div className="w-16 h-16 rounded-full border-2 border-transparent border-t-[#d4af37] animate-spin" />
        <p className="text-[#d4af37] text-sm font-medium tracking-widest">
          {Math.round(progress)}%
        </p>
      </div>
    </Html>
  );
}

function CameraController() {
  const cameraView = useConfiguratorStore((s) => s.cameraView);
  const autoRotate = useConfiguratorStore((s) => s.autoRotate);
  const { camera } = useThree();
  const controlsRef = useRef<any>(null);

  useEffect(() => {
    const pos = cameraPositions[cameraView];
    camera.position.set(...pos);
    camera.lookAt(0, 0, 0);
    if (controlsRef.current) {
      controlsRef.current.target.set(0, 0, 0);
      controlsRef.current.update();
    }
  }, [cameraView, camera]);

  return (
    <OrbitControls
      ref={controlsRef}
      enablePan={false}
      enableZoom={true}
      minDistance={2}
      maxDistance={8}
      autoRotate={false}
      minPolarAngle={Math.PI * 0.1}
      maxPolarAngle={Math.PI * 0.85}
      dampingFactor={0.08}
      enableDamping
    />
  );
}

interface SceneProps {
  onScreenshot?: (dataUrl: string) => void;
  canvasRef?: React.RefObject<HTMLCanvasElement | null>;
}

export function Scene({ onScreenshot, canvasRef }: SceneProps) {
  return (
    <Canvas
      ref={canvasRef}
      gl={{
        antialias: true,
        alpha: false,
        powerPreference: "high-performance",
        preserveDrawingBuffer: true,
      }}
      shadows
      dpr={[1, 2]}
      style={{ background: "transparent" }}
    >
      <PerspectiveCamera makeDefault position={[2, 1.5, 3.5]} fov={45} near={0.1} far={100} />

      <CameraController />

      <ambientLight intensity={0.3} />
      <directionalLight
        position={[5, 8, 5]}
        intensity={1.5}
        castShadow
        shadow-mapSize={[2048, 2048]}
        shadow-camera-near={0.1}
        shadow-camera-far={50}
        shadow-camera-left={-5}
        shadow-camera-right={5}
        shadow-camera-top={5}
        shadow-camera-bottom={-5}
      />
      <directionalLight position={[-5, 3, -5]} intensity={0.5} />
      <pointLight position={[0, 5, 0]} intensity={0.8} color="#d4af37" distance={10} />

      <Suspense fallback={<Loader />}>
        <Environment preset="studio" background={false} />
        <JerseyModel />
      </Suspense>
    </Canvas>
  );
}
