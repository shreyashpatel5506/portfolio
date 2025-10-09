"use client";
import React, { Suspense, useRef, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, Stars, Html, useGLTF } from "@react-three/drei";
import { MeshWobbleMaterial } from "@react-three/drei";
import * as THREE from "three";

// Floating shape component (cube/sphere/cone)
function FloatingShape({ type = "box", color = "#00ffd5", position = [0, 0, 0], speed = 0.5, scale = 1 }) {
    const mesh = useRef();
    const [, yOff] = position;
    const hover = useRef(false);
    const baseScale = scale;

    // Pointer handlers
    const onPointerOver = (e) => {
        e.stopPropagation();
        hover.current = true;
        // enable pointer events when hovered
        e.target.style.cursor = 'pointer';
    };
    const onPointerOut = (e) => {
        e.stopPropagation();
        hover.current = false;
    };

    useFrame((state, delta) => {
        if (!mesh.current) return;
        // rotations
        mesh.current.rotation.x += 0.18 * delta * speed;
        mesh.current.rotation.y += 0.12 * delta * speed;
        // floating motion
        mesh.current.position.y = yOff + Math.sin(state.clock.elapsedTime * speed) * 0.28;

        // smooth scale and emissive intensity lerp
        const targetScale = hover.current ? baseScale * 1.18 : baseScale;
        mesh.current.scale.x += (targetScale - mesh.current.scale.x) * Math.min(0.1, delta * 6);
        mesh.current.scale.y += (targetScale - mesh.current.scale.y) * Math.min(0.1, delta * 6);
        mesh.current.scale.z += (targetScale - mesh.current.scale.z) * Math.min(0.1, delta * 6);
        if (mesh.current.material) {
            const targetEmissive = hover.current ? 0.45 : 0.12;
            mesh.current.material.emissiveIntensity += (targetEmissive - mesh.current.material.emissiveIntensity) * Math.min(0.08, delta * 6);
        }
    });

    return (
        <mesh
            ref={mesh}
            position={position}
            scale={scale}
            castShadow
            receiveShadow
            onPointerOver={onPointerOver}
            onPointerOut={onPointerOut}
            onClick={(e) => e.stopPropagation()}
            raycast={(...args) => THREE.Mesh.prototype.raycast.apply(this, args)}
        >
            {type === "box" && <boxGeometry args={[1, 1, 1]} />}
            {type === "sphere" && <sphereGeometry args={[0.7, 32, 32]} />}
            {type === "cone" && <coneGeometry args={[0.8, 1.2, 4]} />}
            <meshStandardMaterial color={color} metalness={0.6} roughness={0.2} emissive={color} emissiveIntensity={0.12} />
        </mesh>
    );
}

// Small performant particle field using points
function ParticleField({ count = 400 }) {
    const particles = useMemo(() => {
        const positions = new Float32Array(count * 3);
        for (let i = 0; i < count * 3; i++) positions[i] = (Math.random() - 0.5) * 40;
        return positions;
    }, [count]);

    return (
        <points>
            <bufferGeometry>
                <bufferAttribute attach="attributes-position" count={particles.length / 3} array={particles} itemSize={3} />
            </bufferGeometry>
            <pointsMaterial size={0.06} color="#9be7ff" sizeAttenuation={true} depthWrite={false} transparent opacity={0.8} />
        </points>
    );
}

export default function ThreeBackground() {
    // Responsive pixel ratio clamp for perf
    const DPR = typeof window !== "undefined" ? Math.min(1.5, window.devicePixelRatio || 1) : 1;

    return (
        <div className="three-bg absolute inset-0 -z-10">
            <Canvas shadows dpr={DPR} camera={{ position: [0, 0, 12], fov: 50 }}>
                <ambientLight intensity={0.6} />
                <directionalLight position={[5, 10, 5]} intensity={0.6} />
                <Suspense fallback={null}>
                    <group>
                        <FloatingShape type="box" position={[-3, -0.5, -2]} scale={1.4} color="#7CFFEA" speed={0.6} />
                        <FloatingShape type="sphere" position={[2.5, 0.5, -1]} scale={1.1} color="#A78BFA" speed={0.9} />
                        <FloatingShape type="cone" position={[0, -1.2, -3]} scale={1.2} color="#60A5FA" speed={0.5} />

                        <ParticleField count={450} />
                    </group>

                    <Stars radius={80} depth={20} count={4000} factor={4} saturation={0} fade />
                </Suspense>

                {/* Minimal controls for accessibility on large screens only */}
                <OrbitControls enableZoom={false} enablePan={false} enableRotate={false} />
            </Canvas>
            <div className="three-overlay pointer-events-none" />
        </div>
    );
}
