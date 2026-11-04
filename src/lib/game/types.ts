export type Cell = {
  top: boolean;
  right: boolean;
  bottom: boolean;
  left: boolean;
  visited: boolean;
};

export type Maze = {
  rows: number;
  cols: number;
  cells: Cell[][];
  start: { row: number; col: number };
  exit: { row: number; col: number };
};

export type GameLevel = {
  id: number;
  name: string;
  rows: number;
  cols: number;
  seed: number;
  difficulty?: "Beginner" | "Easy" | "Medium" | "Hard" | "Expert";
  description?: string;
};

export type GameStatus = "menu" | "playing" | "paused" | "completed";
export type Direction = "top" | "bottom" | "left" | "right";
