"use client";

import { useRef, useEffect, useState, useMemo } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { useGLTF, Center, ContactShadows } from "@react-three/drei";
import * as THREE from "three";
import { useConfiguratorStore } from "@/store/configuratorStore";
import { generateJerseyTexture } from "@/utils/textureGenerator";

export function JerseyModel() {
  const groupRef = useRef<THREE.Group>(null);
  const { scene } = useGLTF("/models/luxury_jersey.glb");
  const config = useConfiguratorStore((s) => s.config);
  const textureNeedsUpdate = useConfiguratorStore((s) => s.textureNeedsUpdate);
  const acknowledgeTextureUpdate = useConfiguratorStore((s) => s.acknowledgeTextureUpdate);
  const autoRotate = useConfiguratorStore((s) => s.autoRotate);

  const [jerseyTexture, setJerseyTexture] = useState<THREE.CanvasTexture | null>(null);
  const textureUpdateTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clonedScene = useMemo(() => scene.clone(true), [scene]);

  useEffect(() => {
    if (!textureNeedsUpdate) return;

    if (textureUpdateTimeout.current) {
      clearTimeout(textureUpdateTimeout.current);
    }

    textureUpdateTimeout.current = setTimeout(() => {
      const canvas = generateJerseyTexture(config);
      const tex = new THREE.CanvasTexture(canvas);
      tex.flipY = false;
      tex.colorSpace = THREE.SRGBColorSpace;
      setJerseyTexture(tex);
      acknowledgeTextureUpdate();
    }, 100);

    return () => {
      if (textureUpdateTimeout.current) {
        clearTimeout(textureUpdateTimeout.current);
      }
    };
  }, [config, textureNeedsUpdate, acknowledgeTextureUpdate]);

  useEffect(() => {
    if (!jerseyTexture) return;

    clonedScene.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        const mat = child.material;
        if (Array.isArray(mat)) {
          mat.forEach((m) => {
            if (m instanceof THREE.MeshStandardMaterial) {
              m.map = jerseyTexture;
              m.needsUpdate = true;
            }
          });
        } else if (mat instanceof THREE.MeshStandardMaterial) {
          mat.map = jerseyTexture;
          mat.needsUpdate = true;
        }
      }
    });
  }, [jerseyTexture, clonedScene]);

  useEffect(() => {
    clonedScene.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        const mat = child.material;
        const applyMat = (m: THREE.Material) => {
          if (m instanceof THREE.MeshStandardMaterial) {
            m.roughness = 0.65;
            m.metalness = 0.05;
            m.envMapIntensity = 1.2;
          }
        };
        if (Array.isArray(mat)) mat.forEach(applyMat);
        else applyMat(mat);
      }
    });
  }, [clonedScene]);

  useFrame((_state, delta) => {
    if (groupRef.current && autoRotate) {
      groupRef.current.rotation.y += delta * 0.3;
    }
  });

  return (
    <group ref={groupRef}>
      <Center>
        <primitive object={clonedScene} scale={1} />
      </Center>
      <ContactShadows
        position={[0, -1.8, 0]}
        opacity={0.6}
        scale={4}
        blur={2.5}
        far={3}
        color="#000000"
      />
    </group>
  );
}

useGLTF.preload("/models/luxury_jersey.glb");
