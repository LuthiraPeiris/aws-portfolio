
import type { Cell, Maze } from "./types";

const DIRECTIONS = [
  { row: -1, col: 0, wall: "top", opposite: "bottom" },
  { row: 0, col: 1, wall: "right", opposite: "left" },
  { row: 1, col: 0, wall: "bottom", opposite: "top" },
  { row: 0, col: -1, wall: "left", opposite: "right" },
] as const;

function createCell(): Cell {
  return {
    top: true,
    right: true,
    bottom: true,
    left: true,
    visited: false,
  };
}

export function generateMaze(
  rows: number,
  cols: number,
  seed?: number
): Maze {
  let randomState = seed ?? Math.floor(Math.random() * 2147483647);

  const random = () => {
    randomState = (randomState * 16807) % 2147483647;
    return (randomState - 1) / 2147483646;
  };

  const cells: Cell[][] = Array.from(
    { length: rows },
    () => Array.from({ length: cols }, createCell)
  );

  const stack: { row: number; col: number }[] = [];

  const start = { row: 0, col: 0 };

  cells[start.row][start.col].visited = true;
  stack.push(start);

  while (stack.length > 0) {
    const current = stack[stack.length - 1];

    const neighbors = DIRECTIONS
      .map((direction) => ({
        ...direction,
        row: current.row + direction.row,
        col: current.col + direction.col,
      }))
      .filter(
        (next) =>
          next.row >= 0 &&
          next.row < rows &&
          next.col >= 0 &&
          next.col < cols &&
          !cells[next.row][next.col].visited
      );

    if (neighbors.length === 0) {
      stack.pop();
      continue;
    }

    const next = neighbors[
      Math.floor(random() * neighbors.length)
    ];

    const currentCell = cells[current.row][current.col];
    const nextCell = cells[next.row][next.col];

    currentCell[next.wall] = false;
    nextCell[next.opposite] = false;

    nextCell.visited = true;

    stack.push({
      row: next.row,
      col: next.col,
    });
  }

  // Remove visited flags after generation.
  cells.forEach((row) =>
    row.forEach((cell) => {
      cell.visited = false;
    })
  );

  return {
    rows,
    cols,
    cells,
    start,
    exit: {
      row: rows - 1,
      col: cols - 1,
    },
  };
}
