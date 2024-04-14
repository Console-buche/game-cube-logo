import { Color, MathUtils, Matrix4, Vector2, Vector3 } from "three";

/**
 * Create a transformed chunk based on the default one. apply rot too
 */
export const createTransformedChunk = (
  BASE_CHUNK: number[],
  position: [number, number, number],
  rotationAngles: [number, number, number],
) => {
  const rotationX = new Matrix4().makeRotationX(
    MathUtils.degToRad(rotationAngles[0]),
  );
  const rotationY = new Matrix4().makeRotationY(
    MathUtils.degToRad(rotationAngles[1]),
  );
  const rotationZ = new Matrix4().makeRotationZ(
    MathUtils.degToRad(rotationAngles[2]),
  );

  const rotationMatrix = new Matrix4()
    .multiplyMatrices(rotationX, rotationY)
    .multiply(rotationZ);

  const transformedChunk = [];

  // transform
  for (let i = 0; i < BASE_CHUNK.length; i += 3) {
    const vertex = new Vector3(
      BASE_CHUNK[i],
      BASE_CHUNK[i + 1],
      BASE_CHUNK[i + 2],
    );

    vertex.add(new Vector3(...position));
    vertex.applyMatrix4(rotationMatrix);
    transformedChunk.push(vertex.x, vertex.y, vertex.z);
  }

  return transformedChunk;
};

/**
 * Calculate the UVs for the chunks
 */
export const calculateUVs = (chunks: number[]) => {
  const uvArray = [];

  const uvRightTri = [new Vector2(0, 1), new Vector2(1, 1), new Vector2(1, 0)]; // -- A, B, C
  const uvLeftTri = [new Vector2(0, 0), new Vector2(0, 1), new Vector2(1, 0)]; // -- D, A, C

  for (let i = 0; i < chunks.length; i += 18) {
    uvArray.push(...uvRightTri.flatMap((uv) => [uv.x, uv.y]));
    uvArray.push(...uvLeftTri.flatMap((uv) => [uv.x, uv.y]));
  }

  return new Float32Array(uvArray);
};

/**
 * Assign colors to the chunks
 */
export const assignColorsToChunks = (
  chunks: number[],
  colorScheme: string[],
) => {
  const colors = [];
  const verticesPerChunk = 6;
  const valuesPerVertex = 3;

  for (let i = 0; i < chunks.length; i += verticesPerChunk * valuesPerVertex) {
    const index1 =
      (i / (verticesPerChunk * valuesPerVertex)) % colorScheme.length;
    const index2 =
      (i / (verticesPerChunk * valuesPerVertex) + 1) % colorScheme.length;

    const color1 = new Color(
      colorScheme[
        index1 < colorScheme.length ? index1 : colorScheme.length - 1
      ],
    ).toArray();
    const color2 = new Color(
      colorScheme[
        index2 < colorScheme.length ? index2 : colorScheme.length - 1
      ],
    ).toArray();

    colors.push(
      ...color1,
      ...color1,
      ...color2,
      ...color2,
      ...color1,
      ...color2,
    );
  }

  return colors;
};
