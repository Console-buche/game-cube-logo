import { Center, StatsGl } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Cam } from "./Cam";
import { StripeMesh } from "./StripeMesh";

export function Scene() {
  return (
    <Canvas
      gl={{ alpha: true, antialias: true }}
      camera={{ fov: 12 }}
      flat
      linear
      style={{ height: "100vh", width: "100vw" }}
    >
      <color attach="background" args={["#000"]} />
      <Cam />

      <directionalLight intensity={3} position={[-10, 10, 10]} />

      <Center>
        <StripeMesh />
      </Center>

      <StatsGl />
    </Canvas>
  );
}
