"use client";

import Link from "next/link";
import { Pause, Play, RotateCcw, Home, Clock, Sparkles } from "lucide-react";
import type { GameStatus } from "@/lib/game/types";
import { formatTime } from "@/lib/game/gameEngine";

type GameHUDProps = {
  levelId: number;
  levelName: string;
  levelIndex: number;
  totalLevels: number;
  status: GameStatus;
  elapsedTime: number;
  onPauseToggle: () => void;
  onRestart: () => void;
  onOpenMenu: () => void;
};

export default function GameHUD({
  levelId,
  levelName,
  levelIndex,
  totalLevels,
  status,
  elapsedTime,
  onPauseToggle,
  onRestart,
  onOpenMenu,
}: GameHUDProps) {
  return (
    <header className="w-full shrink-0 border-b border-cyan-500/20 bg-slate-950/80 px-3 py-2 backdrop-blur-md sm:px-6">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3">
        {/* Brand & Menu */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            type="button"
            onClick={onOpenMenu}
            aria-label="Back to main menu"
            className="group flex h-9 items-center gap-2 rounded-xl border border-cyan-500/30 bg-cyan-950/40 px-2.5 py-1 text-xs font-semibold text-cyan-300 shadow-[0_0_12px_rgba(0,245,233,0.15)] transition hover:border-cyan-400 hover:bg-cyan-900/50 hover:text-white"
          >
            <Sparkles className="h-4 w-4 text-cyan-400 transition group-hover:rotate-12" />
            <span className="hidden sm:inline tracking-wider">ARCADE</span>
          </button>

          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="text-xs font-black tracking-[0.25em] text-cyan-400">
                NEON MAZE
              </span>
              <span className="hidden text-[10px] uppercase text-slate-500 md:inline">
                // V2.0
              </span>
            </div>
            <div className="flex items-center gap-1.5 text-[11px] text-slate-300">
              <span className="font-semibold text-cyan-300">
                LVL {String(levelId).padStart(2, "0")}
              </span>
              <span className="text-slate-500">•</span>
              <span className="truncate max-w-[110px] sm:max-w-none text-slate-200">
                {levelName}
              </span>
            </div>
          </div>
        </div>

        {/* Center: Level Progress Pips */}
        <div className="hidden lg:flex flex-col items-center">
          <div className="flex items-center gap-1.5">
            {Array.from({ length: totalLevels }).map((_, i) => (
              <div
                key={i}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === levelIndex
                    ? "w-6 bg-cyan-400 shadow-[0_0_8px_#00F5E9]"
                    : i < levelIndex
                    ? "w-2.5 bg-emerald-400/80"
                    : "w-2.5 bg-slate-700/60"
                }`}
                title={`Level ${i + 1}`}
              />
            ))}
          </div>
          <span className="mt-1 text-[10px] tracking-wider text-slate-400">
            SECTOR {levelIndex + 1} OF {totalLevels}
          </span>
        </div>

        {/* Right: Stats & Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Status Badge */}
          <div className="flex items-center gap-1.5 rounded-lg border border-slate-800 bg-slate-900/90 px-2 py-1 text-xs">
            <span
              className={`h-2 w-2 rounded-full ${
                status === "playing"
                  ? "animate-pulse bg-cyan-400 shadow-[0_0_6px_#00F5E9]"
                  : status === "paused"
                  ? "bg-amber-400 shadow-[0_0_6px_#FBBF24]"
                  : "bg-emerald-400 shadow-[0_0_6px_#34D399]"
              }`}
            />
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-300">
              {status}
            </span>
          </div>

          {/* Timer */}
          <div className="flex items-center gap-1.5 rounded-lg border border-cyan-500/20 bg-slate-900/80 px-2.5 py-1 text-xs text-cyan-300">
            <Clock className="h-3.5 w-3.5 text-cyan-400" />
            <span className="font-mono text-xs font-semibold tabular-nums">
              {formatTime(elapsedTime)}
            </span>
          </div>

          {/* Pause / Resume Button */}
          <button
            type="button"
            onClick={onPauseToggle}
            aria-label={status === "paused" ? "Resume game" : "Pause game"}
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-cyan-500/30 bg-slate-900/80 text-cyan-300 shadow-sm transition hover:border-cyan-400 hover:bg-cyan-500/10 hover:text-white active:scale-95"
            title={status === "paused" ? "Resume (P)" : "Pause (P)"}
          >
            {status === "paused" ? (
              <Play className="h-3.5 w-3.5 fill-current" />
            ) : (
              <Pause className="h-3.5 w-3.5" />
            )}
          </button>

          {/* Restart Level Button */}
          <button
            type="button"
            onClick={onRestart}
            aria-label="Restart current level"
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-cyan-500/30 bg-slate-900/80 text-cyan-300 shadow-sm transition hover:border-cyan-400 hover:bg-cyan-500/10 hover:text-white active:scale-95"
            title="Restart Level (R)"
          >
            <RotateCcw className="h-3.5 w-3.5" />
          </button>

          {/* Exit to Portfolio Link */}
          <Link
            href="/"
            aria-label="Exit game and return to portfolio home"
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-700 bg-slate-900/60 text-slate-400 transition hover:border-slate-500 hover:text-white"
            title="Exit to Portfolio"
          >
            <Home className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </header>
  );
}

