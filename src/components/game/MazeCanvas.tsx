
"use client";

import { useEffect, useRef } from "react";
import type { Maze } from "@/lib/game/types";

type MazeCanvasProps = {
  maze: Maze;
};

export default function MazeCanvas({ maze }: MazeCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");

    if (!canvas || !ctx) return;

    const width = canvas.clientWidth;
    const height = canvas.clientHeight;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    canvas.width = width * dpr;
    canvas.height = height * dpr;

    ctx.scale(dpr, dpr);

    const cellWidth = width / maze.cols;
    const cellHeight = height / maze.rows;

    // Background
    ctx.fillStyle = "#202020";
    ctx.fillRect(0, 0, width, height);

    // Maze walls
    ctx.strokeStyle = "#00E5D4";
    ctx.lineWidth = 2;
    ctx.lineCap = "round";
    ctx.shadowColor = "#00F5E9";
    ctx.shadowBlur = 7;

    for (let row = 0; row < maze.rows; row++) {
      for (let col = 0; col < maze.cols; col++) {
        const cell = maze.cells[row][col];

        const x = col * cellWidth;
        const y = row * cellHeight;

        ctx.beginPath();

        if (cell.top) {
          ctx.moveTo(x, y);
          ctx.lineTo(x + cellWidth, y);
        }

        if (cell.right) {
          ctx.moveTo(x + cellWidth, y);
          ctx.lineTo(x + cellWidth, y + cellHeight);
        }

        if (cell.bottom) {
          ctx.moveTo(x, y + cellHeight);
          ctx.lineTo(x + cellWidth, y + cellHeight);
        }

        if (cell.left) {
          ctx.moveTo(x, y);
          ctx.lineTo(x, y + cellHeight);
        }

        ctx.stroke();
      }
    }

    // Entrance and exit indicators
    ctx.shadowBlur = 12;

    ctx.fillStyle = "#22C55E";
    ctx.fillRect(3, 3, 5, 5);

    ctx.fillStyle = "#00F5E9";
    ctx.fillRect(
      (maze.cols - 1) * cellWidth + cellWidth - 8,
      (maze.rows - 1) * cellHeight + cellHeight - 8,
      5,
      5
    );

  }, [maze]);

  return (
    <canvas
      ref={canvasRef}
      className="block h-full w-full rounded-xl"
      aria-label="Neon maze game board"
      role="img"
    />
  );
}
