import type { GameLevel } from "./types";

export const GAME_LEVELS: GameLevel[] = [
  {
    id: 1,
    name: "First Steps",
    rows: 7,
    cols: 7,
    seed: 101,
    difficulty: "Beginner",
    description: "Learn the ropes in a compact grid.",
  },
  {
    id: 2,
    name: "The Twisted Path",
    rows: 9,
    cols: 9,
    seed: 202,
    difficulty: "Easy",
    description: "Navigate through winding narrow corridors.",
  },
  {
    id: 3,
    name: "The Weave",
    rows: 11,
    cols: 11,
    seed: 303,
    difficulty: "Medium",
    description: "A complex matrix with tricky dead ends.",
  },
  {
    id: 4,
    name: "The Labyrinth",
    rows: 13,
    cols: 13,
    seed: 404,
    difficulty: "Hard",
    description: "Deep maze branches requiring sharp focus.",
  },
  {
    id: 5,
    name: "The Final Maze",
    rows: 15,
    cols: 15,
    seed: 505,
    difficulty: "Expert",
    description: "The ultimate trial across a 15x15 sector.",
  },
];
