import { createTransformedChunk } from "./helpers";
import { CONSTS } from "./CONSTS";

const { BASE_CHUNK } = CONSTS;
const chunk0 = createTransformedChunk(BASE_CHUNK, [0, 0, 0], [90, 0, 0]);
const chunk1 = createTransformedChunk(BASE_CHUNK, [0, 2, 0], [90, 0, 0]);
const chunk2 = createTransformedChunk(BASE_CHUNK, [-3, 1, 0], [90, 0, -90]);
const chunk3 = createTransformedChunk(BASE_CHUNK, [-3, 3, 0], [90, 0, -90]);

//first go down
const chunk4 = createTransformedChunk(BASE_CHUNK, [3, 0, 5], [-180, 90, 0]);
const chunk5 = createTransformedChunk(BASE_CHUNK, [3, 2, 5], [-180, 90, 0]);
const chunk6 = createTransformedChunk(BASE_CHUNK, [3, 4, 5], [-180, 90, 0]);
const chunk7 = createTransformedChunk(BASE_CHUNK, [5, -2, 5], [-90, 90, 0]);
const chunk8 = createTransformedChunk(BASE_CHUNK, [5, 0, 5], [-90, 90, 0]);

// rise go up
const chunk9 = createTransformedChunk(BASE_CHUNK, [-5, -5, -2], [0, 0, 90]);
const chunk10 = createTransformedChunk(BASE_CHUNK, [-5, -3, -2], [0, 0, 90]);
const chunk11 = createTransformedChunk(BASE_CHUNK, [-5, -1, -2], [0, 0, 90]);

//last go up
const chunk12 = createTransformedChunk(BASE_CHUNK, [0, -4, -2], [0, 0, 0]);
const chunk13 = createTransformedChunk(BASE_CHUNK, [0, -2, -2], [0, 0, 0]);

//last go left
const chunk14 = createTransformedChunk(BASE_CHUNK, [1, 1, -2], [0, 0, -90]);

export const stripeMeshGeometry = [
  ...chunk0,
  ...chunk1,
  ...chunk2,
  ...chunk3,
  ...chunk4,
  ...chunk5,
  ...chunk6,
  ...chunk7,
  ...chunk8,
  ...chunk9,
  ...chunk10,
  ...chunk11,
  ...chunk12,
  ...chunk13,
  ...chunk14,
];
