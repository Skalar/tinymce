/**
 * Adds two numbers, and wrap to a range.
 * If the result overflows to the right, snap to the left.
 * If the result overflows to the left, snap to the right.
 */
export const cycleBy = (value: number, delta: number, min: number, max: number): number => {
  const r = value + delta;
  if (r > max) {
    return min;
  } else if (r < min) {
    return max;
  } else {
    return r;
  }
};

// ASSUMPTION: Max will always be larger than min
export const clamp = (value: number, min: number, max: number): number =>
  Math.min(Math.max(value, min), max);

// this is from this example: https://github.com/gkouziik/eslint-plugin-security-node/blob/master/docs/rules/detect-insecure-randomness.md
// quoting the link above: "Divide a random UInt32 by the maximum value (2^32 -1) to get a result between 0 and 1"
export const random = (): number => window.self.crypto.getRandomValues(new Uint32Array(1))[0] / 4294967295;
