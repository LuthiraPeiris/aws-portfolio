
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

    const drawMaze = () => {
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;

      if (!width || !height) return;

      const dpr = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // Background
      ctx.fillStyle = "#202020";
      ctx.fillRect(0, 0, width, height);

      // Calculate square cell size
      const cellSize = Math.min(
        width / maze.cols,
        height / maze.rows
      );

      // Center the maze
      const mazeWidth = cellSize * maze.cols;
      const mazeHeight = cellSize * maze.rows;

      const offsetX = (width - mazeWidth) / 2;
      const offsetY = (height - mazeHeight) / 2;

      // Draw maze walls
      ctx.strokeStyle = "#00E5D4";
      ctx.lineWidth = Math.max(2, Math.min(3, cellSize * 0.055));
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.shadowColor = "#00F5E9";
      ctx.shadowBlur = 8;

      for (let row = 0; row < maze.rows; row++) {
        for (let col = 0; col < maze.cols; col++) {
          const cell = maze.cells[row][col];

          const x = offsetX + col * cellSize;
          const y = offsetY + row * cellSize;

          ctx.beginPath();

          if (cell.top) {
            ctx.moveTo(x, y);
            ctx.lineTo(x + cellSize, y);
          }

          if (cell.right) {
            ctx.moveTo(x + cellSize, y);
            ctx.lineTo(x + cellSize, y + cellSize);
          }

          if (cell.bottom) {
            ctx.moveTo(x, y + cellSize);
            ctx.lineTo(x + cellSize, y + cellSize);
          }

          if (cell.left) {
            ctx.moveTo(x, y);
            ctx.lineTo(x, y + cellSize);
          }

          ctx.stroke();
        }
      }

      // Entrance indicator
      ctx.shadowColor = "#22C55E";
      ctx.shadowBlur = 12;
      ctx.fillStyle = "#22C55E";

      ctx.beginPath();
      ctx.arc(
        offsetX + cellSize / 2,
        offsetY + cellSize / 2,
        Math.max(3, cellSize * 0.12),
        0,
        Math.PI * 2
      );
      ctx.fill();

      // Exit indicator
      ctx.shadowColor = "#00F5E9";
      ctx.shadowBlur = 14;
      ctx.fillStyle = "#00F5E9";

      ctx.beginPath();
      ctx.arc(
        offsetX + (maze.cols - 0.5) * cellSize,
        offsetY + (maze.rows - 0.5) * cellSize,
        Math.max(3, cellSize * 0.15),
        0,
        Math.PI * 2
      );
      ctx.fill();

      ctx.shadowBlur = 0;
    };

    // Initial drawing
    drawMaze();

    // Redraw when the canvas container changes size
    const resizeObserver = new ResizeObserver(drawMaze);
    resizeObserver.observe(canvas);

    return () => {
      resizeObserver.disconnect();
    };
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
