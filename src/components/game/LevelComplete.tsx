"use client";

import { motion } from "framer-motion";
import { Trophy, ArrowRight, RotateCcw, ListFilter, Sparkles } from "lucide-react";
import { formatTime } from "@/lib/game/gameEngine";

type LevelCompleteProps = {
  levelId: number;
  levelName: string;
  isLastLevel: boolean;
  timeSpent: number;
  onNextLevel: () => void;
  onReplayLevel: () => void;
  onOpenMenu: () => void;
};

export default function LevelComplete({
  levelId,
  levelName,
  isLastLevel,
  timeSpent,
  onNextLevel,
  onReplayLevel,
  onOpenMenu,
}: LevelCompleteProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-4 backdrop-blur-md">
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 10 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
        className="relative w-full max-w-md overflow-hidden rounded-3xl border border-cyan-500/40 bg-gradient-to-b from-[#131d2e] to-[#0a111c] p-6 text-center shadow-[0_0_50px_rgba(0,245,233,0.25)] sm:p-8"
      >
        {/* Glow orb */}
        <div className="pointer-events-none absolute left-1/2 -top-12 h-36 w-36 -translate-x-1/2 rounded-full bg-cyan-400/20 blur-2xl" />

        {/* Trophy icon */}
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-cyan-400/50 bg-cyan-950/60 text-cyan-300 shadow-[0_0_20px_rgba(0,245,233,0.3)]">
          {isLastLevel ? (
            <Sparkles className="h-8 w-8 text-emerald-400 animate-pulse" />
          ) : (
            <Trophy className="h-8 w-8 text-cyan-400" />
          )}
        </div>

        <span className="mt-4 block text-xs font-bold tracking-[0.3em] text-cyan-400 uppercase">
          {isLastLevel ? "Grand Victory" : "Sector Cleared"}
        </span>

        <h2 className="mt-1 text-2xl font-black text-white sm:text-3xl">
          {isLastLevel ? "ALL MAZES CONQUERED!" : `LEVEL ${levelId} COMPLETE!`}
        </h2>

        <p className="mt-1 text-sm text-slate-300 font-medium">
          {levelName}
        </p>

        {/* Stats card */}
        <div className="mt-6 flex items-center justify-center gap-6 rounded-2xl border border-slate-800 bg-slate-900/60 p-4">
          <div className="flex flex-col items-center">
            <span className="text-[11px] uppercase tracking-wider text-slate-400">
              Clear Time
            </span>
            <span className="font-mono text-xl font-black text-cyan-300">
              {formatTime(timeSpent)}
            </span>
          </div>

          <div className="h-8 w-px bg-slate-800" />

          <div className="flex flex-col items-center">
            <span className="text-[11px] uppercase tracking-wider text-slate-400">
              Status
            </span>
            <span className="text-sm font-bold text-emerald-400">
              100% Extracted
            </span>
          </div>
        </div>

        {/* Buttons */}
        <div className="mt-6 flex flex-col gap-2.5">
          {!isLastLevel ? (
            <button
              type="button"
              onClick={onNextLevel}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-400 to-teal-400 px-5 py-3 text-sm font-bold text-slate-950 shadow-[0_0_20px_rgba(0,245,233,0.4)] transition hover:shadow-[0_0_30px_rgba(0,245,233,0.6)] active:scale-95"
            >
              <span>Next Sector</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          ) : (
            <button
              type="button"
              onClick={onOpenMenu}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-400 to-teal-400 px-5 py-3 text-sm font-bold text-slate-950 shadow-[0_0_20px_rgba(34,197,94,0.4)] transition hover:shadow-[0_0_30px_rgba(34,197,94,0.6)] active:scale-95"
            >
              <span>Victory Menu</span>
              <Sparkles className="h-4 w-4" />
            </button>
          )}

          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={onReplayLevel}
              className="flex items-center justify-center gap-1.5 rounded-xl border border-slate-700 bg-slate-900/80 px-4 py-2.5 text-xs font-semibold text-slate-300 transition hover:border-slate-500 hover:text-white active:scale-95"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              <span>Replay</span>
            </button>

            <button
              type="button"
              onClick={onOpenMenu}
              className="flex items-center justify-center gap-1.5 rounded-xl border border-slate-700 bg-slate-900/80 px-4 py-2.5 text-xs font-semibold text-slate-300 transition hover:border-slate-500 hover:text-white active:scale-95"
            >
              <ListFilter className="h-3.5 w-3.5" />
              <span>Sectors</span>
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

