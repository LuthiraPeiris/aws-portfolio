"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Play, Sparkles, Trophy, Lock, Unlock, ArrowLeft } from "lucide-react";
import { GAME_LEVELS } from "@/lib/game/levels";

type GameMenuProps = {
  maxUnlockedLevel: number;
  onSelectLevel: (levelIndex: number) => void;
  onStartGame: () => void;
};

export default function GameMenu({
  maxUnlockedLevel,
  onSelectLevel,
  onStartGame,
}: GameMenuProps) {
  return (
    <div className="relative flex h-full w-full flex-col items-center justify-between overflow-y-auto px-4 py-6 sm:px-6 md:py-8">
      {/* Background ambient lighting */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute left-1/2 top-10 h-72 w-72 -translate-x-1/2 rounded-full bg-cyan-500/10 blur-[100px]" />
        <div className="absolute right-10 top-1/2 h-64 w-64 rounded-full bg-emerald-500/10 blur-[120px]" />
      </div>

      {/* Top bar / Back link */}
      <div className="w-full max-w-4xl flex items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-2 rounded-xl border border-slate-800 bg-slate-900/60 px-3 py-1.5 text-xs font-semibold text-slate-400 transition hover:border-slate-700 hover:text-white"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>Portfolio</span>
        </Link>

        <div className="flex items-center gap-1.5 rounded-full border border-cyan-500/30 bg-cyan-950/40 px-3 py-1 text-[11px] font-semibold text-cyan-300">
          <Sparkles className="h-3.5 w-3.5 text-cyan-400" />
          <span>CYBER ARCADE EXPERIENCE</span>
        </div>
      </div>

      {/* Hero center */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="my-auto flex w-full max-w-4xl flex-col items-center text-center py-4"
      >
        <span className="text-xs font-bold tracking-[0.4em] text-cyan-400 uppercase">
          Neural Pathway Grid
        </span>

        <h1 className="mt-2 text-4xl font-black tracking-tight text-white sm:text-5xl md:text-6xl">
          NEON <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400 drop-shadow-[0_0_25px_rgba(0,245,233,0.3)]">MAZE</span>
        </h1>

        <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-slate-300 sm:text-base">
          Guide your high-energy photonic core through dense quantum security grids.
          Evade dead ends, analyze wall topologies, and reach the extraction portal.
        </p>

        {/* Start Button */}
        <div className="mt-6 flex flex-col items-center gap-3">
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            type="button"
            onClick={onStartGame}
            className="group relative flex items-center gap-3 rounded-2xl bg-gradient-to-r from-cyan-400 via-teal-400 to-emerald-400 px-8 py-3.5 text-base font-extrabold text-slate-950 shadow-[0_0_30px_rgba(0,245,233,0.4)] transition hover:shadow-[0_0_40px_rgba(0,245,233,0.6)]"
          >
            <Play className="h-5 w-5 fill-slate-950 transition group-hover:scale-110" />
            <span>PLAY GAME</span>
          </motion.button>

          <span className="text-[11px] text-slate-400">
            Press [Space] or click to begin level {Math.min(maxUnlockedLevel + 1, GAME_LEVELS.length)}
          </span>
        </div>

        {/* Five Level Overview */}
        <div className="mt-8 w-full">
          <div className="mb-3 flex items-center justify-between text-xs text-slate-400">
            <span className="font-semibold uppercase tracking-wider text-cyan-300">
              Select Sector
            </span>
            <span>
              Unlocked: {maxUnlockedLevel + 1} / {GAME_LEVELS.length}
            </span>
          </div>

          <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-5">
            {GAME_LEVELS.map((level, idx) => {
              const isUnlocked = idx <= maxUnlockedLevel;
              return (
                <button
                  key={level.id}
                  type="button"
                  disabled={!isUnlocked}
                  onClick={() => onSelectLevel(idx)}
                  className={`group relative flex flex-col items-start rounded-xl border p-3 text-left transition-all ${
                    isUnlocked
                      ? "border-cyan-500/30 bg-slate-900/80 hover:border-cyan-400 hover:bg-slate-800/90 hover:shadow-[0_0_18px_rgba(0,245,233,0.2)]"
                      : "border-slate-800/80 bg-slate-950/50 opacity-45 cursor-not-allowed"
                  }`}
                >
                  <div className="flex w-full items-center justify-between text-xs">
                    <span className="font-mono font-bold text-cyan-400">
                      #{String(level.id).padStart(2, "0")}
                    </span>
                    {isUnlocked ? (
                      <Unlock className="h-3 w-3 text-emerald-400" />
                    ) : (
                      <Lock className="h-3 w-3 text-slate-500" />
                    )}
                  </div>

                  <p className="mt-1 text-xs font-semibold text-white group-hover:text-cyan-200 truncate w-full">
                    {level.name}
                  </p>

                  <div className="mt-2 flex w-full items-center justify-between text-[10px] text-slate-400">
                    <span>{level.rows}x{level.cols}</span>
                    <span className="rounded bg-slate-800/90 px-1 py-0.5 text-slate-300 font-medium">
                      {level.difficulty}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Controls Card */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-4 rounded-xl border border-slate-800 bg-slate-900/50 px-5 py-2.5 text-xs text-slate-300">
          <div className="flex items-center gap-2">
            <span className="rounded bg-slate-800 px-1.5 py-0.5 font-mono text-[10px] font-bold text-cyan-300">
              WASD
            </span>
            <span>or</span>
            <span className="rounded bg-slate-800 px-1.5 py-0.5 font-mono text-[10px] font-bold text-cyan-300">
              ARROWS
            </span>
            <span className="text-slate-400">to Move</span>
          </div>
          <span className="hidden sm:inline text-slate-600">•</span>
          <div className="flex items-center gap-2">
            <span className="rounded bg-slate-800 px-1.5 py-0.5 font-mono text-[10px] font-bold text-cyan-300">
              P
            </span>
            <span className="text-slate-400">Pause</span>
          </div>
          <span className="hidden sm:inline text-slate-600">•</span>
          <div className="flex items-center gap-2">
            <span className="rounded bg-slate-800 px-1.5 py-0.5 font-mono text-[10px] font-bold text-cyan-300">
              R
            </span>
            <span className="text-slate-400">Restart</span>
          </div>
          <span className="hidden sm:inline text-slate-600">•</span>
          <div className="flex items-center gap-1.5 text-slate-400">
            <span>Touch / Swipe on Mobile</span>
          </div>
        </div>
      </motion.div>

      {/* Footer Info */}
      <footer className="w-full max-w-4xl text-center text-[11px] text-slate-500 py-2">
        NeonMaze Arcade • High Performance Canvas 2D
      </footer>
    </div>
  );
}

