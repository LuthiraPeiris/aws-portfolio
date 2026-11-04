
"use client";

import { useState } from "react";
import MazeCanvas from "./MazeCanvas";
import { generateMaze } from "@/lib/game/mazeGenerator";
import { GAME_LEVELS } from "@/lib/game/levels";

export default function NeonMaze() {
  const [levelIndex, setLevelIndex] = useState(0);

  const level = GAME_LEVELS[levelIndex];

  const maze = generateMaze(
    level.rows,
    level.cols,
    level.seed
  );

  return (
    <section className="w-full max-w-4xl mx-auto px-4 py-12">
      <div className="mb-8 text-center">
        <p className="text-sm tracking-[0.35em] text-cyan-400">
          NEON ARCADE
        </p>

        <h1 className="mt-3 text-4xl font-bold tracking-wider text-white">
          NEON MAZE
        </h1>

        <p className="mt-3 text-sm text-slate-400">
          Find your way through the maze.
        </p>
      </div>

      <div className="mb-4 flex items-center justify-between text-sm">
        <span className="text-cyan-400">
          LEVEL {String(level.id).padStart(2, "0")}
        </span>

        <span className="text-slate-300">
          {level.name}
        </span>
      </div>

      <div
        className="overflow-hidden rounded-2xl border border-cyan-500/30 bg-[#202020] p-3 shadow-[0_0_35px_rgba(0,245,233,0.08)]"
      >
        <div className="aspect-square w-full">
          <MazeCanvas maze={maze} />
        </div>
      </div>

      <div className="mt-6 flex justify-center">
        <button
          onClick={() =>
            setLevelIndex((current) =>
              (current + 1) % GAME_LEVELS.length
            )
          }
          className="rounded-xl border border-cyan-400/40 px-6 py-3 text-sm font-semibold text-cyan-300 transition hover:bg-cyan-400/10"
        >
          Preview Next Maze
        </button>
      </div>
    </section>
  );
}
