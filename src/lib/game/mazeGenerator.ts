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

  // Remove visited flags after generation
  cells.forEach((row) =>
    row.forEach((cell) => {
      cell.visited = false;
    })
  );

  // Guarantee outer boundaries are always closed
  for (let c = 0; c < cols; c++) {
    cells[0][c].top = true;
    cells[rows - 1][c].bottom = true;
  }
  for (let r = 0; r < rows; r++) {
    cells[r][0].left = true;
    cells[r][cols - 1].right = true;
  }

  // Guarantee adjacent cells have matching wall states
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (c + 1 < cols) {
        const closed = cells[r][c].right || cells[r][c + 1].left;
        cells[r][c].right = closed;
        cells[r][c + 1].left = closed;
      }
      if (r + 1 < rows) {
        const closed = cells[r][c].bottom || cells[r + 1][c].top;
        cells[r][c].bottom = closed;
        cells[r + 1][c].top = closed;
      }
    }
  }

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

/**
 * Validates that the generated maze satisfies all structural requirements:
 * 1. Adjacent cells have matching wall states
 * 2. Outer boundary walls are fully closed
 * 3. Every cell is reachable from the start (fully connected)
 * 4. The exit portal is reachable
 */
export function validateMaze(maze: Maze): boolean {
  const { rows, cols, cells, start, exit } = maze;

  // 1. Boundary checks
  for (let c = 0; c < cols; c++) {
    if (!cells[0][c].top || !cells[rows - 1][c].bottom) return false;
  }
  for (let r = 0; r < rows; r++) {
    if (!cells[r][0].left || !cells[r][cols - 1].right) return false;
  }

  // 2. Consistency checks
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (c + 1 < cols && cells[r][c].right !== cells[r][c + 1].left) {
        return false;
      }
      if (r + 1 < rows && cells[r][c].bottom !== cells[r + 1][c].top) {
        return false;
      }
    }
  }

  // 3. Reachability (BFS)
  const visited = new Set<string>();
  const queue: [number, number][] = [[start.row, start.col]];
  visited.add(`${start.row},${start.col}`);

  while (queue.length > 0) {
    const [r, c] = queue.shift()!;
    const cell = cells[r][c];

    if (!cell.top && r > 0 && !visited.has(`${r - 1},${c}`)) {
      visited.add(`${r - 1},${c}`);
      queue.push([r - 1, c]);
    }
    if (!cell.bottom && r < rows - 1 && !visited.has(`${r + 1},${c}`)) {
      visited.add(`${r + 1},${c}`);
      queue.push([r + 1, c]);
    }
    if (!cell.left && c > 0 && !visited.has(`${r},${c - 1}`)) {
      visited.add(`${r},${c - 1}`);
      queue.push([r, c - 1]);
    }
    if (!cell.right && c < cols - 1 && !visited.has(`${r},${c + 1}`)) {
      visited.add(`${r},${c + 1}`);
      queue.push([r, c + 1]);
    }
  }

  if (visited.size !== rows * cols) return false;
  if (!visited.has(`${exit.row},${exit.col}`)) return false;

  return true;
}
