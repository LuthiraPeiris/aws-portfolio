
"use client";

import { useMemo, useState } from "react";
import MazeCanvas from "./MazeCanvas";
import { GAME_LEVELS } from "@/lib/game/levels";
import { generateMaze } from "@/lib/game/mazeGenerator";

export default function NeonMaze() {
  const [levelIndex, setLevelIndex] = useState(0);

  const currentLevel = GAME_LEVELS[levelIndex];

  const maze = useMemo(() => {
    return generateMaze(
      currentLevel.rows,
      currentLevel.cols,
      currentLevel.seed
    );
  }, [currentLevel]);

  const goToNextLevel = () => {
    setLevelIndex((current) =>
      Math.min(current + 1, GAME_LEVELS.length - 1)
    );
  };

  const goToPreviousLevel = () => {
    setLevelIndex((current) => Math.max(current - 1, 0));
  };

  return (
    <div className="flex h-full w-full flex-col items-center overflow-hidden bg-[#111827] px-4 py-3 sm:px-6">

      {/* Game heading */}
      <header className="shrink-0 text-center">
        <p className="text-xs font-semibold tracking-[0.4em] text-cyan-400">
          NEON ARCADE
        </p>

        <h1 className="mt-1 text-3xl font-bold tracking-wide text-white sm:text-4xl">
          NEON MAZE
        </h1>

        <p className="mt-1 text-sm text-slate-400">
          Find your way through the maze.
        </p>
      </header>

      {/* Game area */}
      <section className="flex min-h-0 w-full max-w-4xl flex-1 flex-col py-3">

        {/* Level information */}
        <div className="mb-3 flex shrink-0 items-center justify-between">
          <span className="text-sm font-semibold text-cyan-400">
            LEVEL {String(currentLevel.id).padStart(2, "0")}
          </span>

          <span className="text-sm font-medium text-white">
            {currentLevel.name}
          </span>
        </div>

        {/* Maze board */}
        <div className="relative min-h-0 w-full flex-1 overflow-hidden rounded-2xl border border-cyan-500/30 bg-[#202020] p-2 shadow-[0_0_25px_rgba(0,229,212,0.08)]">
          <MazeCanvas maze={maze} />
        </div>

        {/* Level navigation */}
        <div className="mt-3 flex shrink-0 items-center justify-between gap-3">

          <button
            type="button"
            onClick={goToPreviousLevel}
            disabled={levelIndex === 0}
            className="rounded-lg border border-cyan-500/30 px-4 py-2 text-sm font-medium text-cyan-300 transition hover:bg-cyan-500/10 active:scale-95 disabled:cursor-not-allowed disabled:opacity-30"
          >
            ← Previous
          </button>

          <span className="text-xs font-medium text-slate-400">
            {levelIndex + 1} / {GAME_LEVELS.length} Levels
          </span>

          <button
            type="button"
            onClick={goToNextLevel}
            disabled={levelIndex === GAME_LEVELS.length - 1}
            className="rounded-lg border border-cyan-500/30 px-4 py-2 text-sm font-medium text-cyan-300 transition hover:bg-cyan-500/10 active:scale-95 disabled:cursor-not-allowed disabled:opacity-30"
          >
            Next →
          </button>

        </div>
      </section>
    </div>
  );
}
