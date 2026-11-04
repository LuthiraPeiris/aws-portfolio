"use client";

import { ArrowUp, ArrowDown, ArrowLeft, ArrowRight } from "lucide-react";
import type { Direction } from "@/lib/game/types";

type MobileControlsProps = {
  disabled?: boolean;
};

export default function MobileControls({ disabled = false }: MobileControlsProps) {
  const handlePointerDown = (direction: Direction, e: React.PointerEvent) => {
    if (disabled) return;
    e.preventDefault();

    window.dispatchEvent(
      new CustomEvent("neon-maze-move", { detail: { direction, state: "down" } })
    );

    // Keydown fallback
    const keyMap: Record<Direction, string> = {
      top: "ArrowUp",
      bottom: "ArrowDown",
      left: "ArrowLeft",
      right: "ArrowRight",
    };
    window.dispatchEvent(
      new KeyboardEvent("keydown", { key: keyMap[direction], bubbles: true })
    );

    if (typeof window !== "undefined" && "vibrate" in navigator) {
      try {
        navigator.vibrate(10);
      } catch {
        // Ignore vibration errors
      }
    }
  };

  const handlePointerUp = (direction: Direction, e: React.PointerEvent) => {
    if (disabled) return;
    e.preventDefault();

    window.dispatchEvent(
      new CustomEvent("neon-maze-move", { detail: { direction, state: "up" } })
    );

    const keyMap: Record<Direction, string> = {
      top: "ArrowUp",
      bottom: "ArrowDown",
      left: "ArrowLeft",
      right: "ArrowRight",
    };
    window.dispatchEvent(
      new KeyboardEvent("keyup", { key: keyMap[direction], bubbles: true })
    );
  };

  return (
    <div className="flex shrink-0 items-center justify-center py-2 select-none touch-none md:hidden">
      <div className="grid grid-cols-3 gap-1.5 p-1 rounded-2xl border border-cyan-500/20 bg-slate-950/80 shadow-[0_0_20px_rgba(0,245,233,0.08)] backdrop-blur-md">
        {/* Row 1 */}
        <div />
        <button
          type="button"
          aria-label="Move Up"
          disabled={disabled}
          onPointerDown={(e) => handlePointerDown("top", e)}
          onPointerUp={(e) => handlePointerUp("top", e)}
          onPointerLeave={(e) => handlePointerUp("top", e)}
          onPointerCancel={(e) => handlePointerUp("top", e)}
          className="flex h-12 w-12 items-center justify-center rounded-xl border border-cyan-500/30 bg-slate-900/90 text-cyan-300 shadow-sm transition active:scale-90 active:bg-cyan-400 active:text-slate-950 disabled:opacity-30"
        >
          <ArrowUp className="h-5 w-5" />
        </button>
        <div />

        {/* Row 2 */}
        <button
          type="button"
          aria-label="Move Left"
          disabled={disabled}
          onPointerDown={(e) => handlePointerDown("left", e)}
          onPointerUp={(e) => handlePointerUp("left", e)}
          onPointerLeave={(e) => handlePointerUp("left", e)}
          onPointerCancel={(e) => handlePointerUp("left", e)}
          className="flex h-12 w-12 items-center justify-center rounded-xl border border-cyan-500/30 bg-slate-900/90 text-cyan-300 shadow-sm transition active:scale-90 active:bg-cyan-400 active:text-slate-950 disabled:opacity-30"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>

        <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-cyan-500/10 bg-slate-950/40 text-[10px] font-mono text-cyan-400/40">
          DPAD
        </div>

        <button
          type="button"
          aria-label="Move Right"
          disabled={disabled}
          onPointerDown={(e) => handlePointerDown("right", e)}
          onPointerUp={(e) => handlePointerUp("right", e)}
          onPointerLeave={(e) => handlePointerUp("right", e)}
          onPointerCancel={(e) => handlePointerUp("right", e)}
          className="flex h-12 w-12 items-center justify-center rounded-xl border border-cyan-500/30 bg-slate-900/90 text-cyan-300 shadow-sm transition active:scale-90 active:bg-cyan-400 active:text-slate-950 disabled:opacity-30"
        >
          <ArrowRight className="h-5 w-5" />
        </button>

        {/* Row 3 */}
        <div />
        <button
          type="button"
          aria-label="Move Down"
          disabled={disabled}
          onPointerDown={(e) => handlePointerDown("bottom", e)}
          onPointerUp={(e) => handlePointerUp("bottom", e)}
          onPointerLeave={(e) => handlePointerUp("bottom", e)}
          onPointerCancel={(e) => handlePointerUp("bottom", e)}
          className="flex h-12 w-12 items-center justify-center rounded-xl border border-cyan-500/30 bg-slate-900/90 text-cyan-300 shadow-sm transition active:scale-90 active:bg-cyan-400 active:text-slate-950 disabled:opacity-30"
        >
          <ArrowDown className="h-5 w-5" />
        </button>
        <div />
      </div>
    </div>
  );
}
