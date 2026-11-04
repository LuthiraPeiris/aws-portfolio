"use client";

import { useMemo, useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, RotateCcw, ListFilter, ChevronLeft, ChevronRight } from "lucide-react";
import MazeCanvas from "./MazeCanvas";
import GameHUD from "./GameHUD";
import GameMenu from "./GameMenu";
import LevelComplete from "./LevelComplete";
import MobileControls from "./MobileControls";
import { GAME_LEVELS } from "@/lib/game/levels";
import { generateMaze } from "@/lib/game/mazeGenerator";
import type { GameStatus } from "@/lib/game/types";

export default function NeonMaze() {
  const [levelIndex, setLevelIndex] = useState(0);
  const [gameState, setGameState] = useState<GameStatus>("menu");
  const [restartKey, setRestartKey] = useState(0);
  const [maxUnlockedLevel, setMaxUnlockedLevel] = useState(0);
  const [elapsedTime, setElapsedTime] = useState(0);

  const currentLevel = GAME_LEVELS[levelIndex];

  const maze = useMemo(
    () =>
      generateMaze(
        currentLevel.rows,
        currentLevel.cols,
        currentLevel.seed
      ),
    [currentLevel]
  );

  // Timer effect
  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;

    if (gameState === "playing") {
      timer = setInterval(() => {
        setElapsedTime((prev) => prev + 1);
      }, 1000);
    }

    return () => {
      if (timer) clearInterval(timer);
    };
  }, [gameState]);

  // Global keyboard shortcuts (Pause, Restart, Menu)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }

      if (e.key === "p" || e.key === "P" || e.key === "Escape") {
        if (gameState === "playing") {
          e.preventDefault();
          setGameState("paused");
        } else if (gameState === "paused") {
          e.preventDefault();
          setGameState("playing");
        }
      } else if (e.key === "r" || e.key === "R") {
        if (gameState === "playing" || gameState === "paused") {
          e.preventDefault();
          handleRestartLevel();
        }
      } else if (e.code === "Space" && gameState === "menu") {
        e.preventDefault();
        handleStartGame();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [gameState]);

  const handleStartGame = useCallback(() => {
    setGameState("playing");
    setElapsedTime(0);
  }, []);

  const handleSelectLevel = useCallback((index: number) => {
    setLevelIndex(index);
    setRestartKey((k) => k + 1);
    setElapsedTime(0);
    setGameState("playing");
  }, []);

  const handleComplete = useCallback(() => {
    setGameState("completed");
    setMaxUnlockedLevel((prev) => Math.max(prev, levelIndex + 1));
  }, [levelIndex]);

  const handleNextLevel = useCallback(() => {
    if (levelIndex < GAME_LEVELS.length - 1) {
      setLevelIndex((current) => current + 1);
      setRestartKey((k) => k + 1);
      setElapsedTime(0);
      setGameState("playing");
    }
  }, [levelIndex]);

  const handlePreviousLevel = useCallback(() => {
    if (levelIndex > 0) {
      setLevelIndex((current) => current - 1);
      setRestartKey((k) => k + 1);
      setElapsedTime(0);
      setGameState("playing");
    }
  }, [levelIndex]);

  const handleRestartLevel = useCallback(() => {
    setRestartKey((current) => current + 1);
    setElapsedTime(0);
    setGameState("playing");
  }, []);

  const togglePause = useCallback(() => {
    setGameState((prev) => (prev === "playing" ? "paused" : "playing"));
  }, []);

  const openMenu = useCallback(() => {
    setGameState("menu");
  }, []);

  // Determine if next level is accessible
  const isNextLevelAvailable =
    levelIndex < GAME_LEVELS.length - 1 &&
    (levelIndex < maxUnlockedLevel || gameState === "completed");

  return (
    <div className="relative flex h-full w-full flex-col overflow-hidden bg-[#090d16] text-white">
      {/* Subtle background ambient cyber light */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-32 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-cyan-500/10 blur-[130px]" />
        <div className="absolute -bottom-32 right-1/4 h-80 w-80 rounded-full bg-emerald-500/10 blur-[130px]" />
      </div>

      {gameState === "menu" ? (
        <GameMenu
          maxUnlockedLevel={maxUnlockedLevel}
          onSelectLevel={handleSelectLevel}
          onStartGame={handleStartGame}
        />
      ) : (
        <div className="flex h-full w-full flex-col overflow-hidden">
          {/* Header Game HUD */}
          <GameHUD
            levelId={currentLevel.id}
            levelName={currentLevel.name}
            levelIndex={levelIndex}
            totalLevels={GAME_LEVELS.length}
            status={gameState}
            elapsedTime={elapsedTime}
            onPauseToggle={togglePause}
            onRestart={handleRestartLevel}
            onOpenMenu={openMenu}
          />

          {/* Main Maze Canvas Arena */}
          <main className="relative flex min-h-0 flex-1 flex-col items-center justify-center p-2 sm:p-4">
            <div className="relative flex h-full max-h-[82vh] w-full max-w-4xl flex-1 flex-col items-center justify-center">
              {/* Outer neon glowing container */}
              <div className="relative flex h-full w-full items-center justify-center overflow-hidden rounded-2xl sm:rounded-3xl border border-cyan-500/30 bg-[#0c121d] p-1.5 sm:p-2.5 shadow-[0_0_35px_rgba(0,245,233,0.12)]">
                <MazeCanvas
                  key={`${levelIndex}-${restartKey}`}
                  maze={maze}
                  isPaused={gameState === "paused"}
                  onComplete={handleComplete}
                />

                {/* Pause Overlay */}
                <AnimatePresence>
                  {gameState === "paused" && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="absolute inset-0 z-40 flex items-center justify-center bg-slate-950/80 p-4 backdrop-blur-md"
                    >
                      <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.95, opacity: 0 }}
                        className="w-full max-w-sm rounded-2xl border border-cyan-500/40 bg-[#0e1624] p-6 text-center shadow-[0_0_35px_rgba(0,245,233,0.2)]"
                      >
                        <span className="text-xs font-bold tracking-[0.3em] text-cyan-400 uppercase">
                          System On Hold
                        </span>
                        <h2 className="mt-1 text-2xl font-black text-white">
                          GAME PAUSED
                        </h2>
                        <p className="mt-1 text-xs text-slate-400">
                          Sector {currentLevel.id} • {currentLevel.name}
                        </p>

                        <div className="mt-6 flex flex-col gap-2.5">
                          <button
                            type="button"
                            onClick={togglePause}
                            className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-400 to-teal-400 py-3 text-sm font-bold text-slate-950 shadow-[0_0_15px_rgba(0,245,233,0.4)] transition hover:shadow-[0_0_25px_rgba(0,245,233,0.6)] active:scale-95"
                          >
                            <Play className="h-4 w-4 fill-slate-950" />
                            <span>Resume Game</span>
                          </button>

                          <button
                            type="button"
                            onClick={handleRestartLevel}
                            className="flex w-full items-center justify-center gap-2 rounded-xl border border-slate-700 bg-slate-900/80 py-2.5 text-xs font-semibold text-slate-300 transition hover:border-slate-500 hover:text-white active:scale-95"
                          >
                            <RotateCcw className="h-3.5 w-3.5" />
                            <span>Restart Sector (R)</span>
                          </button>

                          <button
                            type="button"
                            onClick={openMenu}
                            className="flex w-full items-center justify-center gap-2 rounded-xl border border-slate-700 bg-slate-900/80 py-2.5 text-xs font-semibold text-slate-300 transition hover:border-slate-500 hover:text-white active:scale-95"
                          >
                            <ListFilter className="h-3.5 w-3.5" />
                            <span>Sector Select</span>
                          </button>
                        </div>
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Level Complete Overlay */}
                <AnimatePresence>
                  {gameState === "completed" && (
                    <LevelComplete
                      levelId={currentLevel.id}
                      levelName={currentLevel.name}
                      isLastLevel={levelIndex === GAME_LEVELS.length - 1}
                      timeSpent={elapsedTime}
                      onNextLevel={handleNextLevel}
                      onReplayLevel={handleRestartLevel}
                      onOpenMenu={openMenu}
                    />
                  )}
                </AnimatePresence>
              </div>
            </div>
          </main>

          {/* Desktop/Tablet Navigation Footer Controls */}
          <footer className="w-full shrink-0 border-t border-cyan-500/15 bg-slate-950/70 px-4 py-2 backdrop-blur-sm">
            <div className="mx-auto flex max-w-4xl items-center justify-between gap-2">
              <button
                type="button"
                onClick={handlePreviousLevel}
                disabled={levelIndex === 0}
                className="flex items-center gap-1.5 rounded-xl border border-cyan-500/30 bg-slate-900/80 px-3.5 py-1.5 text-xs font-semibold text-cyan-300 shadow-sm transition hover:border-cyan-400 hover:bg-cyan-500/10 active:scale-95 disabled:pointer-events-none disabled:opacity-30"
              >
                <ChevronLeft className="h-3.5 w-3.5" />
                <span>Prev Sector</span>
              </button>

              {/* Instructions badge */}
              <div className="hidden sm:flex items-center gap-2 text-xs text-slate-400">
                <span className="font-mono text-cyan-300">WASD / Arrows</span>
                <span>to move</span>
                <span className="text-slate-600">•</span>
                <span className="font-mono text-cyan-300">P</span>
                <span>Pause</span>
                <span className="text-slate-600">•</span>
                <span className="font-mono text-cyan-300">R</span>
                <span>Restart</span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleRestartLevel}
                  className="rounded-xl border border-slate-700 bg-slate-900/80 px-3 py-1.5 text-xs font-semibold text-slate-300 transition hover:border-slate-500 hover:text-white active:scale-95"
                >
                  Reset
                </button>

                <button
                  type="button"
                  onClick={handleNextLevel}
                  disabled={!isNextLevelAvailable}
                  className="flex items-center gap-1.5 rounded-xl border border-cyan-500/30 bg-slate-900/80 px-3.5 py-1.5 text-xs font-semibold text-cyan-300 shadow-sm transition hover:border-cyan-400 hover:bg-cyan-500/10 active:scale-95 disabled:pointer-events-none disabled:opacity-30"
                >
                  <span>Next Sector</span>
                  <ChevronRight className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>

            {/* Mobile Touch D-Pad */}
            <MobileControls disabled={gameState !== "playing"} />
          </footer>
        </div>
      )}
    </div>
  );
}
