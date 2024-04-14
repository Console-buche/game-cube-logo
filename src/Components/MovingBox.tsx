import { animated as a, easings, useSpring } from "@react-spring/three";
import { RoundedBox } from "@react-three/drei";
import { Dispatch, SetStateAction, useState } from "react";
import { MathUtils } from "three";
import { CONSTS } from "./StripeMesh/CONSTS";

const positions = [
  [0, 1, 1],
  [0, 1, 3],
  [2, 1, 3],
  [4, 1, 3],
  [6, 1, 3],
  [6, -1, 3],
  [6, -3, 3],
  [6, -5, 3],
  [6, -5, 1],
  [6, -5, -1],
  [6, -5, -3],
  [4, -5, -3],
  [2, -5, -3],
  [0, -5, -3],
  [0, -3, -3],
  [0, -1, -3],
  [2, -1, -3],
  [4, -1, -3],
  [3.5, 5, -0.5],
  [3.5, -1.5, -0.5],
] as const;

const rotations = [
  [0, 0, 90],
  [0, 0, -90],
  [0, 0, -90],
  [0, 0, -90],
  [0, 0, -90],
  [0, 0, -90],
  [0, 0, -90],
  [0, 0, -90],
  [0, 90, 0],
  [0, 90, 0],
  [0, 90, 0],
  [0, 90, 0],
  [0, 90, 0],
  [0, 90, 0],
  [90, 0, 0],
  [90, 0, 0],
  [0, 90, 0],
  [0, 90, 0],
  [0, 90, 0],
  [0, 0, 0],
] as const;

type MovingBox = {
  setStep: Dispatch<SetStateAction<number>>;
  setIsFlat: Dispatch<SetStateAction<boolean>>;
};
export const MovingBox = ({ setStep, setIsFlat }: MovingBox) => {
  const {
    COLORS: { PINK },
  } = CONSTS;
  const [index, setIndex] = useState(0);
  const [cumulativeRotation, setCumulativeRotation] = useState([0, 0, 0]);
  const [isDone, setIsDone] = useState(false);

  const nextIndex = (index + 1) % positions.length;
  const nextRotation = rotations[nextIndex].map(
    (angle, i) => cumulativeRotation[i] + MathUtils.degToRad(angle),
  );

  const { pos, rot } = useSpring({
    to: {
      pos: positions[nextIndex],
      rot: nextRotation,
    },
    from: {
      pos: positions[index],
      rot: cumulativeRotation,
    },
    onRest: () => {
      if (nextIndex === positions.length - 1) {
        setIsFlat(false);
        setIsDone(true);
        return;
      }
      setIndex(nextIndex);
      setCumulativeRotation(nextRotation);
      setStep(nextIndex + 2);
    },
    config: {
      duration: 200,
      easing: easings.easeInOutSine,
      tension: 170,
      friction: 26,
      mass: 1,
    },
  });

  const { scale } = useSpring({
    to: {
      scale: isDone ? 1.65 : 1,
    },
    config: {
      duration: 400,
      easing: easings.easeOutBack,
      tension: 250,
      mass: 3,
    },
  });

  return (
    // @ts-expect-error: rot is valid
    <a.group rotation={rot} position={pos} scale={scale}>
      <RoundedBox radius={0.05} args={[2, 2, 2]}>
        <meshPhysicalMaterial color={PINK} />
      </RoundedBox>
    </a.group>
  );
};
