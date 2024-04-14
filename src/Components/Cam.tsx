import { CameraControls, CameraShake } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";

export function Cam() {
  const refControls = useRef<CameraControls>(null);

  useFrame(() => {
    if (!refControls.current) {
      return;
    }

    refControls.current.setTarget(0, 0, 0, true);
  });

  return (
    <>
      <CameraControls
        touches={{
          one: 64,
          two: 64,
          three: 64,
        }}
        mouseButtons={{
          left: 0,
          wheel: 0,
          middle: 0,
          right: 0,
        }}
        distance={80}
        ref={refControls}
      />
      <CameraShake intensity={0.5} />
    </>
  );
}
