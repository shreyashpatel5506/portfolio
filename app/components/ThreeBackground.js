"use client";
import React, { useRef, useMemo } from "react";
import { Canvas, useFrame, useThree } from "react-three-fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";

// --- Vanta-like "Net" Effect Component ---
// This component generates the points and the lines connecting them.
function NetEffect({
    color = 0x260dd2,
    points = 7.0,
    maxDistance = 14.0,
    spacing = 20.0,
    mouseControls = true,
}) {
    const { size, mouse } = useThree(); // Access viewport size and mouse coordinates
    const pointsRef = useRef();
    const linesRef = useRef();

    // Memoize the particles to avoid re-calculating on every render
    const particles = useMemo(() => {
        const numPoints = points * (size.width / 100);
        const particles = [];
        for (let i = 0; i < numPoints; i++) {
            const x = (Math.random() - 0.5) * spacing * (size.width / 100);
            const y = (Math.random() - 0.5) * spacing * (size.height / 100);
            const z = (Math.random() - 0.5) * spacing;
            particles.push({
                position: new THREE.Vector3(x, y, z),
                velocity: new THREE.Vector3((Math.random() - 0.5) * 0.1, (Math.random() - 0.5) * 0.1, (Math.random() - 0.5) * 0.1),
            });
        }
        return particles;
    }, [points, size.width, size.height, spacing]);

    // Animation loop
    useFrame((state, delta) => {
        if (!pointsRef.current || !linesRef.current) return;

        const pointPositions = pointsRef.current.geometry.attributes.position;
        const linePositions = linesRef.current.geometry.attributes.position;

        // --- Mouse Interaction ---
        // Create a 3D vector for the mouse position
        const mousePosition = new THREE.Vector3(
            mouse.x * size.width / 2,
            mouse.y * size.height / 2,
            0
        );

        let lineVertexIndex = 0;

        // --- Update Particle Positions and Calculate Lines ---
        for (let i = 0; i < particles.length; i++) {
            const p = particles[i];

            // Update position based on velocity
            p.position.add(p.velocity.clone().multiplyScalar(delta * 20));

            // Boundary checks
            const boundaryX = (spacing * size.width / 100) / 2;
            const boundaryY = (spacing * size.height / 100) / 2;
            if (p.position.x > boundaryX || p.position.x < -boundaryX) p.velocity.x *= -1;
            if (p.position.y > boundaryY || p.position.y < -boundaryY) p.velocity.y *= -1;
            if (p.position.z > spacing / 2 || p.position.z < -spacing / 2) p.velocity.z *= -1;

            // Update the buffer attribute
            pointPositions.setXYZ(i, p.position.x, p.position.y, p.position.z);

            // --- Calculate lines between nearby points ---
            for (let j = i + 1; j < particles.length; j++) {
                const p2 = particles[j];
                const distance = p.position.distanceTo(p2.position);

                if (distance < maxDistance) {
                    if (lineVertexIndex < (particles.length * particles.length * 2) - 1) {
                        linePositions.setXYZ(lineVertexIndex++, p.position.x, p.position.y, p.position.z);
                        linePositions.setXYZ(lineVertexIndex++, p2.position.x, p2.position.y, p2.position.z);
                    }
                }
            }
        }

        // --- Update Geometries ---
        linesRef.current.geometry.setDrawRange(0, lineVertexIndex);
        pointPositions.needsUpdate = true;
        linePositions.needsUpdate = true;
    });

    // Prepare initial geometry buffers
    const initialPointPositions = useMemo(() => new Float32Array(particles.map(p => p.position.toArray()).flat()), [particles]);
    const maxLineSegments = particles.length * particles.length;
    const initialLinePositions = useMemo(() => new Float32Array(maxLineSegments * 3 * 2), [maxLineSegments]);

    return (
        <>
            <points ref={pointsRef}>
                <bufferGeometry>
                    <bufferAttribute
                        attach="attributes-position"
                        count={particles.length}
                        array={initialPointPositions}
                        itemSize={3}
                    />
                </bufferGeometry>
                <pointsMaterial size={3} color={color} sizeAttenuation={false} />
            </points>
            <lineSegments ref={linesRef}>
                <bufferGeometry>
                    <bufferAttribute
                        attach="attributes-position"
                        count={maxLineSegments * 2}
                        array={initialLinePositions}
                        itemSize={3}
                    />
                </bufferGeometry>
                <lineBasicMaterial color={color} transparent opacity={0.5} />
            </lineSegments>
        </>
    );
}

// --- Main Component ---
export default function ThreeBackground() {
    const DPR = typeof window !== "undefined" ? Math.min(1.5, window.devicePixelRatio || 1) : 1;

    // Configuration object similar to Vanta.js
    const vantaConfig = {
        mouseControls: true,
        touchControls: true,
        gyroControls: false,
        minHeight: 200.00,
        minWidth: 200.00,
        scale: 1.00,
        scaleMobile: 1.00,
        color: 0x260dd2,
        points: 7.00,
        maxDistance: 14.00,
        spacing: 20.00
    };

    return (
        <div className="three-bg absolute inset-0 -z-10 bg-black">
            <Canvas
                shadows
                dpr={DPR}
                camera={{ position: [0, 0, 80], fov: 50 }}
                onCreated={({ gl }) => {
                    gl.setClearColor(new THREE.Color('#000000'));
                }}
            >
                <ambientLight intensity={0.8} />
                <pointLight position={[10, 10, 10]} />

                <NetEffect {...vantaConfig} />

                {/* Use OrbitControls to replicate mouse interaction */}
                <OrbitControls
                    enableZoom={false}
                    enablePan={false}
                    enableRotate={vantaConfig.mouseControls}
                    autoRotate
                    autoRotateSpeed={0.5}
                />
            </Canvas>
            <div className="three-overlay pointer-events-none" />
        </div>
    );
}

