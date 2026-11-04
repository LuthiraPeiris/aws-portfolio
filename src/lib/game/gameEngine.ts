import type { Direction } from "./types";

export const KEY_DIRECTION_MAP: Record<string, { row: number; col: number; wall: Direction }> = {
  ArrowUp: { row: -1, col: 0, wall: "top" },
  w: { row: -1, col: 0, wall: "top" },
  W: { row: -1, col: 0, wall: "top" },
  ArrowDown: { row: 1, col: 0, wall: "bottom" },
  s: { row: 1, col: 0, wall: "bottom" },
  S: { row: 1, col: 0, wall: "bottom" },
  ArrowLeft: { row: 0, col: -1, wall: "left" },
  a: { row: 0, col: -1, wall: "left" },
  A: { row: 0, col: -1, wall: "left" },
  ArrowRight: { row: 0, col: 1, wall: "right" },
  d: { row: 0, col: 1, wall: "right" },
  D: { row: 0, col: 1, wall: "right" },
};

export const DIRECTION_DELTA: Record<Direction, { row: number; col: number }> = {
  top: { row: -1, col: 0 },
  bottom: { row: 1, col: 0 },
  left: { row: 0, col: -1 },
  right: { row: 0, col: 1 },
};

/**
 * Format elapsed seconds to MM:SS string
 */
export function formatTime(totalSeconds: number): string {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = Math.floor(totalSeconds % 60);
  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

