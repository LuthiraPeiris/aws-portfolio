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

/**
 * Checks whether movement from (row, col) in direction `dir` is permitted.
 * Verifies boundaries and ensures both the exit wall of the current cell
 * and the entrance wall of the adjacent cell are open.
 */
export function canMove(
  maze: { rows: number; cols: number; cells: Cell[][] },
  row: number,
  col: number,
  direction: Direction
): boolean {
  const deltaMap: Record<Direction, { row: number; col: number; opposite: Direction }> = {
    top: { row: -1, col: 0, opposite: "bottom" },
    bottom: { row: 1, col: 0, opposite: "top" },
    left: { row: 0, col: -1, opposite: "right" },
    right: { row: 0, col: 1, opposite: "left" },
  };

  const delta = deltaMap[direction];
  const nextRow = row + delta.row;
  const nextCol = col + delta.col;

  if (!isValidCoordinate(nextRow, nextCol, maze.rows, maze.cols)) {
    return false;
  }

  const currentCell = maze.cells[row][col];
  const nextCell = maze.cells[nextRow][nextCol];

  if (currentCell[direction] || nextCell[delta.opposite]) {
    return false;
  }

  return true;
}
