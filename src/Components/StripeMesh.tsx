import { a, easings, useSpring } from "@react-spring/three";
import { useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  BufferAttribute,
  Color,
  DoubleSide,
  MathUtils,
  ShaderMaterial,
} from "three";
import { MovingBox } from "./MovingBox";
import { CONSTS } from "./StripeMesh/CONSTS";
import { assignColorsToChunks, calculateUVs } from "./StripeMesh/helpers";
import { shader } from "./StripeMesh/shader";
import { stripeMeshGeometry } from "./StripeMesh/StripeMeshGeometry";

export const StripeMesh = () => {
  const {
    COLOR_SCHEME,
    COLORS: { PINK },
  } = CONSTS;
  const refPositions = useRef<BufferAttribute>(null);
  const refCurrentStep = useRef<BufferAttribute>(null);
  const refMaterial = useRef<ShaderMaterial>(null);
  const [step, setStep] = useState(1);
  const [isFlat, setIsFlat] = useState(true);

  const { rot, rotx } = useSpring({
    to: {
      rot: !isFlat ? 0.2 : 0.1,
      rotx: !isFlat ? 0.8 : 0.6,
    },
    reverse: true,
    config: {
      duration: 600,
      easing: easings.easeInOutSine,
      tension: 150,
      mass: 3,
    },
  });

  const chunkies = useMemo(() => {
    return new Float32Array(stripeMeshGeometry);
  }, []);

  const normals = useMemo(() => {
    return new Float32Array(
      Array.from({ length: chunkies.length / 3 }, () => [0, 0, 1]).flat(),
    );
  }, []);

  const colors = useMemo(() => {
    return new Float32Array(
      assignColorsToChunks(stripeMeshGeometry, COLOR_SCHEME),
    );
  }, []);

  const uvs = useMemo(() => {
    return calculateUVs(stripeMeshGeometry);
  }, []);

  const stepIndices = useMemo(() => {
    const indices = [];
    for (let i = 0; i < chunkies.length; i++) {
      for (let j = 0; j < 18; j++) {
        indices.push(i + 1);
      }
    }
    return new Float32Array(indices);
  }, [chunkies]);

  const uniforms = useMemo(
    () => ({
      uLength: { value: length },
      uIsFlat: { value: isFlat },
      uStep: { value: step },
      uFlatColor: { value: new Color(PINK) },
      uTime: { value: 0 },
    }),
    [],
  );

  useEffect(() => {
    if (!refMaterial.current) {
      return;
    }
    refMaterial.current.uniforms.uIsFlat.value = isFlat;
    refMaterial.current.uniformsNeedUpdate = true;
  }, [isFlat]);

  useFrame(() => {
    if (!refMaterial.current) return;

    refMaterial.current.uniforms.uStep.value = MathUtils.lerp(
      refMaterial.current.uniforms.uStep.value,
      step,
      0.05,
    );

    if (!isFlat && refMaterial.current.uniforms.uTime.value <= 1.0) {
      refMaterial.current.uniforms.uTime.value += 0.05;
      refMaterial.current.uniformsNeedUpdate = true;
    }
  });

  return (
    <a.group rotation-z={rot} rotation-x={rotx} rotation={[0.6, -2.3, 0.1]}>
      <MovingBox setStep={setStep} setIsFlat={setIsFlat} />

      <mesh>
        <bufferGeometry>
          <bufferAttribute
            ref={refPositions}
            attach="attributes-position"
            array={chunkies}
            count={chunkies.length / 3}
            itemSize={3}
          />

          <bufferAttribute
            attach="attributes-color"
            array={colors}
            count={colors.length / 3}
            itemSize={3}
          />

          <bufferAttribute
            ref={refCurrentStep}
            attach="attributes-stepIndex"
            array={stepIndices}
            count={chunkies.length / 3}
            itemSize={3}
          />

          <bufferAttribute
            attach="attributes-normal"
            array={normals}
            count={normals.length / 3}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-uv"
            array={uvs}
            count={uvs.length / 2}
            itemSize={2}
          />
        </bufferGeometry>

        <shaderMaterial
          ref={refMaterial}
          transparent
          vertexColors
          uniforms={uniforms}
          {...shader}
          side={DoubleSide}
        />
      </mesh>
    </a.group>
  );
};
