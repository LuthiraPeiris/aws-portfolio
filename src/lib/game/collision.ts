import type { Cell, Direction } from "./types";

/**
 * Checks if the player can move in the given direction from the current cell.
 * Returns true if a wall blocks the movement.
 */
export function checkWallCollision(cell: Cell, direction: Direction): boolean {
  return Boolean(cell[direction]);
}

/**
 * Checks if the grid coordinates are inside the maze boundaries.
 */
export function isValidCoordinate(
  row: number,
  col: number,
  rows: number,
  cols: number
): boolean {
  return row >= 0 && row < rows && col >= 0 && col < cols;
}

/**
 * Checks if the player's current position matches the exit portal.
 */
export function isExitReached(
  row: number,
  col: number,
  exit: { row: number; col: number }
): boolean {
  return row === exit.row && col === exit.col;
}

