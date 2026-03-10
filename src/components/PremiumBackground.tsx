import { useRef, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Points, PointMaterial, Float, MeshDistortMaterial, Sphere } from "@react-three/drei";
import * as THREE from "three";

function Particles({ count = 1500 }) {
    const points = useRef<THREE.Points>(null!);

    const particles = useMemo(() => {
        const temp = new Float32Array(count * 3);
        for (let i = 0; i < count; i++) {
            const i3 = i * 3;
            temp[i3] = (Math.random() - 0.5) * 15;
            temp[i3 + 1] = (Math.random() - 0.5) * 15;
            temp[i3 + 2] = (Math.random() - 0.5) * 15;
        }
        return temp;
    }, [count]);

    useFrame((state) => {
        const time = state.clock.getElapsedTime();
        points.current.rotation.y = time * 0.02;
        points.current.rotation.x = time * 0.01;
    });

    return (
        <Points ref={points} positions={particles} stride={3} frustumCulled={false}>
            <PointMaterial
                transparent
                color="#4ade80"
                size={0.015}
                sizeAttenuation={true}
                depthWrite={false}
                blending={THREE.AdditiveBlending}
            />
        </Points>
    );
}

function FloatingShapes() {
    return (
        <>
            <Float speed={2} rotationIntensity={1} floatIntensity={2}>
                <Sphere args={[1, 64, 64]} position={[4, 2, -5]}>
                    <MeshDistortMaterial
                        color="#ffffff"
                        metalness={1}
                        roughness={0.1}
                        speed={2}
                        distort={0.4}
                        radius={1.2}
                    />
                </Sphere>
            </Float>
            <Float speed={1.5} rotationIntensity={2} floatIntensity={1.5}>
                <Sphere args={[1.5, 64, 64]} position={[-5, -2, -8]}>
                    <MeshDistortMaterial
                        color="#ffffff"
                        metalness={0.9}
                        roughness={0.2}
                        speed={1.5}
                        distort={0.5}
                        radius={1.5}
                    />
                </Sphere>
            </Float>
        </>
    );
}

function Scene() {
    const { mouse, camera } = useThree();

    useFrame(() => {
        camera.position.x += (mouse.x * 0.5 - camera.position.x) * 0.05;
        camera.position.y += (mouse.y * 0.5 - camera.position.y) * 0.05;
        camera.lookAt(0, 0, 0);
    });

    return (
        <>
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} intensity={1.5} color="#ffffff" />
            <pointLight position={[-10, -10, -10]} intensity={1} color="#4ade80" />
            <Particles />
            <FloatingShapes />
        </>
    );
}

const PremiumBackground = () => {
    return (
        <div className="fixed inset-0 z-0 pointer-events-none">
            <div className="absolute inset-0 bg-background" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(74,222,128,0.05),transparent_50%)]" />
            <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
                <Scene />
            </Canvas>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(74,222,128,0.03),transparent_40%)]" />
        </div>
    );
};

export default PremiumBackground;
