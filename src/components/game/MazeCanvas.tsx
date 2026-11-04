"use client";

import { useEffect, useRef } from "react";
import type { Maze, Direction } from "@/lib/game/types";
import { checkWallCollision, isValidCoordinate, isExitReached } from "@/lib/game/collision";
import { KEY_DIRECTION_MAP, DIRECTION_DELTA } from "@/lib/game/gameEngine";

type MazeCanvasProps = {
  maze: Maze;
  isPaused?: boolean;
  onComplete?: () => void;
};

type TrailPoint = {
  x: number;
  y: number;
  time: number;
};

type WallSpark = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
};

// Movement constants
const CELL_DURATION_MS = 145; // Smooth transit time per cell (~6.9 cells/sec)
const INPUT_BUFFER_WINDOW_MS = 320; // Window for queueing turns before intersection
const TRAIL_DURATION_MS = 380; // Smooth trail fade duration

export default function MazeCanvas({
  maze,
  isPaused = false,
  onComplete,
}: MazeCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const completeRef = useRef(onComplete);
  const isPausedRef = useRef(isPaused);

  useEffect(() => {
    completeRef.current = onComplete;
  }, [onComplete]);

  useEffect(() => {
    isPausedRef.current = isPaused;
  }, [isPaused]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");

    if (!canvas || !ctx) return;

    let animationFrame = 0;
    let previousTime = 0;
    let completed = false;

    // Player state
    const player = {
      row: maze.start.row,
      col: maze.start.col,
      x: maze.start.col + 0.5,
      y: maze.start.row + 0.5,
      fromX: maze.start.col + 0.5,
      fromY: maze.start.row + 0.5,
      targetX: maze.start.col + 0.5,
      targetY: maze.start.row + 0.5,
      targetRow: maze.start.row,
      targetCol: maze.start.col,
      currentDir: null as Direction | null,
      moving: false,
      progress: 0,
      trail: [] as TrailPoint[],
    };

    let sparks: WallSpark[] = [];

    // Direction holding and input buffer
    const activeKeys = new Set<string>();
    const heldDirections: Direction[] = [];
    let bufferedInput: { dir: Direction; time: number } | null = null;

    const pushHeldDirection = (dir: Direction) => {
      const idx = heldDirections.indexOf(dir);
      if (idx !== -1) {
        heldDirections.splice(idx, 1);
      }
      heldDirections.push(dir);
    };

    const removeHeldDirection = (dir: Direction) => {
      const idx = heldDirections.indexOf(dir);
      if (idx !== -1) {
        heldDirections.splice(idx, 1);
      }
    };

    const spawnWallSparks = (dir: Direction) => {
      const delta = DIRECTION_DELTA[dir];
      const sparkX = player.col + 0.5 + delta.col * 0.44;
      const sparkY = player.row + 0.5 + delta.row * 0.44;

      for (let i = 0; i < 6; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = 0.003 + Math.random() * 0.005;
        sparks.push({
          x: sparkX,
          y: sparkY,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          life: 1,
          maxLife: 240,
        });
      }
    };

    const getOppositeDirection = (dir: Direction): Direction => {
      switch (dir) {
        case "top":
          return "bottom";
        case "bottom":
          return "top";
        case "left":
          return "right";
        case "right":
          return "left";
      }
    };

    const startMoveTo = (dir: Direction, initialProgress = 0) => {
      const delta = DIRECTION_DELTA[dir];
      const nextRow = player.row + delta.row;
      const nextCol = player.col + delta.col;

      // Prevent movement outside the maze.
      if (!isValidCoordinate(nextRow, nextCol, maze.rows, maze.cols)) {
        return false;
      }

      const currentCell = maze.cells[player.row][player.col];
      const nextCell = maze.cells[nextRow][nextCol];

      // Both sides of the connecting passage must be open.
      if (
        checkWallCollision(currentCell, dir) ||
        checkWallCollision(nextCell, getOppositeDirection(dir))
      ) {
        return false;
      }

      player.currentDir = dir;
      player.fromX = player.col + 0.5;
      player.fromY = player.row + 0.5;
      player.targetX = nextCol + 0.5;
      player.targetY = nextRow + 0.5;
      player.targetRow = nextRow;
      player.targetCol = nextCol;
      player.progress = Math.max(0, Math.min(1, initialProgress));
      player.moving = true;

      // Use the same interpolation as the animation loop.
      player.x =
        player.fromX + (player.targetX - player.fromX) * player.progress;

      player.y =
        player.fromY + (player.targetY - player.fromY) * player.progress;

      return true;
    };

    const onDirectionInput = (dir: Direction) => {
      if (completed || isPausedRef.current) return;

      pushHeldDirection(dir);

      if (!player.moving) {
        // From rest: check wall collision
        const currentCell = maze.cells[player.row][player.col];
        if (checkWallCollision(currentCell, dir)) {
          spawnWallSparks(dir);
          return;
        }
        startMoveTo(dir, 0);
      } else if (player.currentDir) {
        // If moving, check for instant reverse
        const opposite = getOppositeDirection(player.currentDir);
        if (dir === opposite) {
          // Instant smooth reverse back towards previous cell
          player.currentDir = dir;
          const tempX = player.fromX;
          const tempY = player.fromY;
          player.fromX = player.targetX;
          player.fromY = player.targetY;
          player.targetX = tempX;
          player.targetY = tempY;
          player.targetRow = player.row;
          player.targetCol = player.col;
          player.progress = Math.max(0, 1 - player.progress);
          bufferedInput = null;
        } else {
          // Buffer input for the upcoming intersection
          bufferedInput = {
            dir,
            time: performance.now(),
          };
        }
      }
    };

    // Keyboard handlers
    const handleKeyDown = (event: KeyboardEvent) => {
      if (isPausedRef.current || completed) return;

      const map = KEY_DIRECTION_MAP[event.key];
      if (map) {
        event.preventDefault();
        activeKeys.add(event.key.toLowerCase());
        onDirectionInput(map.wall);
      }
    };

    const handleKeyUp = (event: KeyboardEvent) => {
      const lower = event.key.toLowerCase();
      activeKeys.delete(lower);

      const map = KEY_DIRECTION_MAP[event.key];
      if (map) {
        // Check if any other key holding this direction is still pressed
        let stillHeld = false;
        for (const [k, v] of Object.entries(KEY_DIRECTION_MAP)) {
          if (v.wall === map.wall && activeKeys.has(k.toLowerCase())) {
            stillHeld = true;
            break;
          }
        }
        if (!stillHeld) {
          removeHeldDirection(map.wall);
        }
      }
    };

    const handleWindowBlur = () => {
      activeKeys.clear();
      heldDirections.length = 0;
      bufferedInput = null;
    };

    // Custom events for mobile buttons
    const handleCustomInput = (event: Event) => {
      if (isPausedRef.current || completed) return;
      const customEvent = event as CustomEvent<{ direction: Direction; state?: "down" | "up" }>;
      const { direction, state } = customEvent.detail || {};

      if (!direction) return;

      if (state === "up") {
        removeHeldDirection(direction);
      } else {
        onDirectionInput(direction);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    window.addEventListener("blur", handleWindowBlur);
    window.addEventListener("neon-maze-move", handleCustomInput);

    // Touch swipe gestures on the canvas
    let touchStartX = 0;
    let touchStartY = 0;
    let touchStartTime = 0;

    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        touchStartX = e.touches[0].clientX;
        touchStartY = e.touches[0].clientY;
        touchStartTime = performance.now();
      }
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (isPausedRef.current || completed) return;
      if (e.changedTouches.length === 1) {
        const dx = e.changedTouches[0].clientX - touchStartX;
        const dy = e.changedTouches[0].clientY - touchStartY;
        const duration = performance.now() - touchStartTime;

        if (duration < 650) {
          const absX = Math.abs(dx);
          const absY = Math.abs(dy);
          const threshold = 18;

          if (absX > threshold || absY > threshold) {
            e.preventDefault();
            const swipeDir = absX > absY ? (dx > 0 ? "right" : "left") : (dy > 0 ? "bottom" : "top");
            onDirectionInput(swipeDir);
          }
        }
      }
    };

    canvas.addEventListener("touchstart", handleTouchStart, { passive: true });
    canvas.addEventListener("touchend", handleTouchEnd, { passive: false });

    const resizeCanvas = () => {
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);

      if (!width || !height) return;

      const pixelWidth = Math.round(width * dpr);
      const pixelHeight = Math.round(height * dpr);

      if (canvas.width !== pixelWidth || canvas.height !== pixelHeight) {
        canvas.width = pixelWidth;
        canvas.height = pixelHeight;
      }

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    // Canvas drawing helpers
    const drawBackground = (width: number, height: number) => {
      const background = ctx.createLinearGradient(0, 0, width, height);
      background.addColorStop(0, "#0e1522");
      background.addColorStop(0.5, "#0a101a");
      background.addColorStop(1, "#060a12");

      ctx.fillStyle = background;
      ctx.fillRect(0, 0, width, height);

      // Ambient radial cyber glow
      const ambient = ctx.createRadialGradient(
        width / 2,
        height / 2,
        0,
        width / 2,
        height / 2,
        Math.max(width, height) * 0.65
      );
      ambient.addColorStop(0, "rgba(0, 245, 233, 0.05)");
      ambient.addColorStop(1, "rgba(0, 0, 0, 0)");

      ctx.fillStyle = ambient;
      ctx.fillRect(0, 0, width, height);

      // Vignette
      const vignette = ctx.createRadialGradient(
        width / 2,
        height / 2,
        Math.min(width, height) * 0.25,
        width / 2,
        height / 2,
        Math.max(width, height) * 0.72
      );
      vignette.addColorStop(0, "rgba(0,0,0,0)");
      vignette.addColorStop(1, "rgba(0,0,0,0.45)");

      ctx.fillStyle = vignette;
      ctx.fillRect(0, 0, width, height);
    };

    const drawMaze = (cellSize: number, offsetX: number, offsetY: number) => {
      ctx.lineCap = "round";
      ctx.lineJoin = "round";

      // Outer soft glow for neon walls
      ctx.strokeStyle = "rgba(0, 245, 233, 0.18)";
      ctx.lineWidth = Math.max(4, cellSize * 0.14);
      ctx.shadowColor = "#00F5E9";
      ctx.shadowBlur = 14;

      ctx.beginPath();
      for (let row = 0; row < maze.rows; row++) {
        for (let col = 0; col < maze.cols; col++) {
          const cell = maze.cells[row][col];
          const x = offsetX + col * cellSize;
          const y = offsetY + row * cellSize;

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
        }
      }
      ctx.stroke();

      // Sharp bright neon core
      ctx.shadowBlur = 5;
      ctx.strokeStyle = "#22FFF0";
      ctx.lineWidth = Math.max(1.8, cellSize * 0.04);
      ctx.stroke();
      ctx.shadowBlur = 0;
    };

    const drawExit = (time: number, cellSize: number, offsetX: number, offsetY: number) => {
      const x = offsetX + (maze.exit.col + 0.5) * cellSize;
      const y = offsetY + (maze.exit.row + 0.5) * cellSize;

      const pulse = 0.85 + Math.sin(time * 0.005) * 0.15;
      const radius = cellSize * 0.26 * pulse;

      // Outer portal aura
      ctx.beginPath();
      ctx.arc(x, y, radius * 2.1, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(34, 197, 94, 0.12)";
      ctx.fill();

      // Outer spinning ring
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.strokeStyle = "#4DFFAA";
      ctx.lineWidth = Math.max(2, cellSize * 0.05);
      ctx.shadowColor = "#4DFFAA";
      ctx.shadowBlur = 20;
      ctx.stroke();

      // Inner portal core
      ctx.beginPath();
      ctx.arc(x, y, radius * 0.48, 0, Math.PI * 2);
      ctx.fillStyle = "#E0FFE9";
      ctx.fill();

      ctx.shadowBlur = 0;
    };

    const drawTrail = (
      time: number,
      offsetX: number,
      offsetY: number,
      cellSize: number
    ) => {
      player.trail = player.trail.filter((point) => time - point.time < TRAIL_DURATION_MS);

      if (player.trail.length < 2) return;

      // Soft glow pass
      ctx.lineCap = "round";
      ctx.lineJoin = "round";

      for (let i = 1; i < player.trail.length; i++) {
        const p1 = player.trail[i - 1];
        const p2 = player.trail[i];
        const age = time - p2.time;
        const normAge = Math.min(1, Math.max(0, age / TRAIL_DURATION_MS));
        const alpha = Math.pow(1 - normAge, 1.4) * 0.65;

        const x1 = offsetX + p1.x * cellSize;
        const y1 = offsetY + p1.y * cellSize;
        const x2 = offsetX + p2.x * cellSize;
        const y2 = offsetY + p2.y * cellSize;

        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.strokeStyle = `rgba(0, 245, 233, ${alpha * 0.4})`;
        ctx.lineWidth = Math.max(2, cellSize * 0.2 * (1 - normAge));
        ctx.shadowColor = "#00F5E9";
        ctx.shadowBlur = 10;
        ctx.stroke();

        // Inner bright line
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.strokeStyle = `rgba(180, 255, 250, ${alpha * 0.8})`;
        ctx.lineWidth = Math.max(1, cellSize * 0.08 * (1 - normAge));
        ctx.shadowBlur = 4;
        ctx.stroke();
      }

      ctx.shadowBlur = 0;
    };

    const drawSparks = (
      delta: number,
      offsetX: number,
      offsetY: number,
      cellSize: number
    ) => {
      sparks = sparks.filter((s) => s.life > 0);

      for (const spark of sparks) {
        spark.x += spark.vx * delta;
        spark.y += spark.vy * delta;
        spark.life -= delta / spark.maxLife;

        const alpha = Math.max(0, spark.life);
        const px = offsetX + spark.x * cellSize;
        const py = offsetY + spark.y * cellSize;

        ctx.beginPath();
        ctx.arc(px, py, Math.max(1, cellSize * 0.03 * alpha), 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 120, 80, ${alpha * 0.9})`;
        ctx.shadowColor = "#FF5533";
        ctx.shadowBlur = 6;
        ctx.fill();
      }
      ctx.shadowBlur = 0;
    };

    const drawPlayer = (
      offsetX: number,
      offsetY: number,
      cellSize: number,
      time: number
    ) => {
      const x = offsetX + player.x * cellSize;
      const y = offsetY + player.y * cellSize;

      const radius = cellSize * 0.24;
      const pulse = 1 + Math.sin(time * 0.007) * 0.035;

      // Outer ambient player halo
      const glow = ctx.createRadialGradient(
        x,
        y,
        radius * 0.2,
        x,
        y,
        radius * 3.2
      );
      glow.addColorStop(0, "rgba(0, 245, 233, 0.35)");
      glow.addColorStop(0.4, "rgba(0, 229, 212, 0.12)");
      glow.addColorStop(1, "rgba(0, 229, 212, 0)");

      ctx.fillStyle = glow;
      ctx.beginPath();
      ctx.arc(x, y, radius * 3.2, 0, Math.PI * 2);
      ctx.fill();

      // Main glowing ball
      const ballGradient = ctx.createRadialGradient(
        x - radius * 0.35,
        y - radius * 0.4,
        radius * 0.05,
        x,
        y,
        radius
      );
      ballGradient.addColorStop(0, "#FFFFFF");
      ballGradient.addColorStop(0.3, "#C3FFFC");
      ballGradient.addColorStop(0.7, "#00E5D4");
      ballGradient.addColorStop(1, "#007A85");

      ctx.beginPath();
      ctx.arc(x, y, radius * pulse, 0, Math.PI * 2);
      ctx.fillStyle = ballGradient;
      ctx.shadowColor = "#00FFF0";
      ctx.shadowBlur = 24;
      ctx.fill();

      // Specular shine
      ctx.beginPath();
      ctx.arc(
        x - radius * 0.3,
        y - radius * 0.35,
        radius * 0.2,
        0,
        Math.PI * 2
      );
      ctx.fillStyle = "rgba(255, 255, 255, 0.95)";
      ctx.shadowBlur = 4;
      ctx.fill();

      ctx.shadowBlur = 0;
    };

    // Main animation loop with smooth time-based interpolation
    const draw = (currentTime: number) => {
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;

      if (!width || !height) {
        animationFrame = requestAnimationFrame(draw);
        return;
      }

      resizeCanvas();

      // Delta time capped to 50ms for consistent physics even on tab switch
      const delta = previousTime ? Math.min(currentTime - previousTime, 50) : 16.6;
      previousTime = currentTime;

      // Update movement physics if not paused and not completed
      if (!isPausedRef.current && !completed) {
        if (player.moving) {
          player.progress += delta / CELL_DURATION_MS;

          if (player.progress >= 1) {
            // Reached target cell
            const overflowMs = (player.progress - 1) * CELL_DURATION_MS;

            player.row = player.targetRow;
            player.col = player.targetCol;
            player.x = player.col + 0.5;
            player.y = player.row + 0.5;

            // Check if exit is reached
            if (isExitReached(player.row, player.col, maze.exit)) {
              completed = true;
              player.moving = false;
              completeRef.current?.();
            } else {
              // Determine next direction seamlessly
              const currentCell = maze.cells[player.row][player.col];
              let nextDir: Direction | null = null;

              // 1. Check buffered input if still fresh
              if (bufferedInput) {
                if (currentTime - bufferedInput.time <= INPUT_BUFFER_WINDOW_MS) {
                  if (!checkWallCollision(currentCell, bufferedInput.dir)) {
                    nextDir = bufferedInput.dir;
                  }
                }
                bufferedInput = null;
              }

              // 2. Check most recently pressed held direction
              if (!nextDir && heldDirections.length > 0) {
                for (let i = heldDirections.length - 1; i >= 0; i--) {
                  const candidate = heldDirections[i];
                  if (!checkWallCollision(currentCell, candidate)) {
                    nextDir = candidate;
                    break;
                  }
                }
              }

              // 3. Check if current direction can continue gliding
              if (!nextDir && player.currentDir && heldDirections.includes(player.currentDir)) {
                if (!checkWallCollision(currentCell, player.currentDir)) {
                  nextDir = player.currentDir;
                }
              }

              if (nextDir) {
                // Seamlessly continue into next cell carrying forward any delta overflow
                const initialProgress = overflowMs / CELL_DURATION_MS;
                startMoveTo(nextDir, initialProgress);
              } else {
                // Came to a full stop at cell center
                player.moving = false;
                player.currentDir = null;
                player.progress = 0;

                // If player was holding keys into a wall, spawn subtle sparks
                if (heldDirections.length > 0) {
                  const lastHeld = heldDirections[heldDirections.length - 1];
                  if (checkWallCollision(currentCell, lastHeld)) {
                    spawnWallSparks(lastHeld);
                  }
                }
              }
            }
          } else {
             // Constant-speed linear interpolation for continuous movement.
              const p = Math.max(0, Math.min(1, player.progress));

              player.x = player.fromX + (player.targetX - player.fromX) * p;
              player.y = player.fromY + (player.targetY - player.fromY) * p;
          }
        } else {
          // Player is at rest: check if any held key can start movement
          if (heldDirections.length > 0) {
            const currentCell = maze.cells[player.row][player.col];
            for (let i = heldDirections.length - 1; i >= 0; i--) {
              const candidate = heldDirections[i];
              if (!checkWallCollision(currentCell, candidate)) {
                startMoveTo(candidate, 0);
                break;
              }
            }
          }
        }

        // Record trail points only during movement or smooth transitions
        if (player.moving) {
          const lastPoint = player.trail[player.trail.length - 1];
          const distSq = lastPoint
            ? Math.pow(player.x - lastPoint.x, 2) + Math.pow(player.y - lastPoint.y, 2)
            : 1;

          if (distSq > 0.001 || !lastPoint) {
            player.trail.push({
              x: player.x,
              y: player.y,
              time: currentTime,
            });
          }
        }
      }

      const cellSize = Math.min((width - 24) / maze.cols, (height - 24) / maze.rows);
      const offsetX = (width - cellSize * maze.cols) / 2;
      const offsetY = (height - cellSize * maze.rows) / 2;

      drawBackground(width, height);
      drawMaze(cellSize, offsetX, offsetY);
      drawExit(currentTime, cellSize, offsetX, offsetY);
      drawTrail(currentTime, offsetX, offsetY, cellSize);
      drawSparks(delta, offsetX, offsetY, cellSize);
      drawPlayer(offsetX, offsetY, cellSize, currentTime);

      animationFrame = requestAnimationFrame(draw);
    };

    resizeCanvas();
    animationFrame = requestAnimationFrame(draw);

    const resizeObserver = new ResizeObserver(resizeCanvas);
    resizeObserver.observe(canvas);

    return () => {
      cancelAnimationFrame(animationFrame);
      resizeObserver.disconnect();
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
      window.removeEventListener("blur", handleWindowBlur);
      window.removeEventListener("neon-maze-move", handleCustomInput);
      canvas.removeEventListener("touchstart", handleTouchStart);
      canvas.removeEventListener("touchend", handleTouchEnd);
    };
  }, [maze]);

  return (
    <canvas
      ref={canvasRef}
      className="block h-full w-full touch-none select-none rounded-xl"
      aria-label="Neon maze game. Use arrow keys or WASD to move."
      role="img"
    />
  );
}
