// geometry
const RIGHT_TRI = [-1, 0, 0, 1, 0, 0, 1, 2, 0]; // A, B, C
const LEFT_TRI = [-1, 2, 0, -1, 0, 0, 1, 2, 0]; // D, A, C

// color
const PINK = "#9370DB";
const WHITE = "white";

const COLOR_SCHEME = [
  WHITE,
  PINK,
  PINK,
  WHITE,
  WHITE,
  PINK,
  PINK,
  PINK,
  PINK,
  WHITE,
  PINK,
  PINK,
  PINK,
  PINK,
  PINK,
  PINK,
];

const BASE_CHUNK = [...RIGHT_TRI, ...LEFT_TRI];

export const CONSTS = {
  RIGHT_TRI,
  LEFT_TRI,
  BASE_CHUNK,
  COLOR_SCHEME,
  COLORS: { PINK, WHITE },
};
