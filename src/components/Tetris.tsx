import { useEffect, useRef, useCallback, useState } from "react";

const BOARD_WIDTH = 10;
const BOARD_HEIGHT = 20;
const CELL_SIZE = 30;

type Color = string;
type Board = (Color | null)[][];

const TETROMINOS: { [key: string]: { shape: number[][]; color: string } } = {
  I: { shape: [[1, 1, 1, 1]], color: "#00f0f0" },
  O: { shape: [[1, 1], [1, 1]], color: "#f0f000" },
  T: { shape: [[0, 1, 0], [1, 1, 1]], color: "#a000f0" },
  S: { shape: [[0, 1, 1], [1, 1, 0]], color: "#00f000" },
  Z: { shape: [[1, 1, 0], [0, 1, 1]], color: "#f00000" },
  J: { shape: [[1, 0, 0], [1, 1, 1]], color: "#0000f0" },
  L: { shape: [[0, 0, 1], [1, 1, 1]], color: "#f0a000" },
};

const PIECES = Object.keys(TETROMINOS);

function createEmptyBoard(): Board {
  return Array.from({ length: BOARD_HEIGHT }, () => Array(BOARD_WIDTH).fill(null));
}

function rotate(matrix: number[][]): number[][] {
  const rows = matrix.length;
  const cols = matrix[0].length;
  const result: number[][] = Array.from({ length: cols }, () => Array(rows).fill(0));
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      result[c][rows - 1 - r] = matrix[r][c];
    }
  }
  return result;
}

function isValidPosition(board: Board, shape: number[][], x: number, y: number): boolean {
  for (let r = 0; r < shape.length; r++) {
    for (let c = 0; c < shape[r].length; c++) {
      if (shape[r][c]) {
        const nx = x + c;
        const ny = y + r;
        if (nx < 0 || nx >= BOARD_WIDTH || ny >= BOARD_HEIGHT) return false;
        if (ny >= 0 && board[ny][nx]) return false;
      }
    }
  }
  return true;
}

function placePiece(board: Board, shape: number[][], x: number, y: number, color: string): Board {
  const newBoard = board.map((row) => [...row]);
  for (let r = 0; r < shape.length; r++) {
    for (let c = 0; c < shape[r].length; c++) {
      if (shape[r][c] && y + r >= 0) {
        newBoard[y + r][x + c] = color;
      }
    }
  }
  return newBoard;
}

function clearLines(board: Board): { board: Board; linesCleared: number } {
  const newBoard = board.filter((row) => row.some((cell) => !cell));
  const linesCleared = BOARD_HEIGHT - newBoard.length;
  const emptyRows = Array.from({ length: linesCleared }, () => Array(BOARD_WIDTH).fill(null));
  return { board: [...emptyRows, ...newBoard], linesCleared };
}

function getDropY(board: Board, shape: number[][], x: number, y: number): number {
  let dy = y;
  while (isValidPosition(board, shape, x, dy + 1)) dy++;
  return dy;
}

function getScore(lines: number, level: number): number {
  const base = [0, 100, 300, 500, 800];
  return (base[lines] || 0) * (level + 1);
}

const randomPiece = () => {
  const key = PIECES[Math.floor(Math.random() * PIECES.length)];
  return { key, ...TETROMINOS[key] };
};

export default function Tetris() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const ghostCanvasRef = useRef<boolean>(false);
  const gameStateRef = useRef({
    board: createEmptyBoard(),
    currentPiece: randomPiece(),
    nextPiece: randomPiece(),
    x: 3,
    y: -1,
    score: 0,
    lines: 0,
    level: 0,
    gameOver: false,
    paused: false,
    started: false,
  });
  const [display, setDisplay] = useState({
    score: 0,
    lines: 0,
    level: 0,
    gameOver: false,
    started: false,
    paused: false,
    nextPiece: gameStateRef.current.nextPiece,
  });
  const animFrameRef = useRef<number | null>(null);
  const lastDropRef = useRef(0);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const gs = gameStateRef.current;

    ctx.fillStyle = "#0a0a1a";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Grid lines
    ctx.strokeStyle = "rgba(255,255,255,0.04)";
    ctx.lineWidth = 0.5;
    for (let r = 0; r < BOARD_HEIGHT; r++) {
      for (let c = 0; c < BOARD_WIDTH; c++) {
        ctx.strokeRect(c * CELL_SIZE, r * CELL_SIZE, CELL_SIZE, CELL_SIZE);
      }
    }

    // Draw placed cells
    for (let r = 0; r < BOARD_HEIGHT; r++) {
      for (let c = 0; c < BOARD_WIDTH; c++) {
        const color = gs.board[r][c];
        if (color) {
          drawCell(ctx, c, r, color);
        }
      }
    }

    // Draw ghost piece
    if (gs.started && !gs.gameOver) {
      const ghostY = getDropY(gs.board, gs.currentPiece.shape, gs.x, gs.y);
      if (ghostY !== gs.y) {
        for (let r = 0; r < gs.currentPiece.shape.length; r++) {
          for (let c = 0; c < gs.currentPiece.shape[r].length; c++) {
            if (gs.currentPiece.shape[r][c]) {
              const gx = gs.x + c;
              const gy = ghostY + r;
              if (gy >= 0 && gy < BOARD_HEIGHT) {
                ctx.fillStyle = "rgba(255,255,255,0.1)";
                ctx.fillRect(gx * CELL_SIZE + 1, gy * CELL_SIZE + 1, CELL_SIZE - 2, CELL_SIZE - 2);
                ctx.strokeStyle = gs.currentPiece.color + "44";
                ctx.lineWidth = 1;
                ctx.strokeRect(gx * CELL_SIZE + 1, gy * CELL_SIZE + 1, CELL_SIZE - 2, CELL_SIZE - 2);
              }
            }
          }
        }
      }

      // Draw active piece
      for (let r = 0; r < gs.currentPiece.shape.length; r++) {
        for (let c = 0; c < gs.currentPiece.shape[r].length; c++) {
          if (gs.currentPiece.shape[r][c]) {
            const px = gs.x + c;
            const py = gs.y + r;
            if (py >= 0) drawCell(ctx, px, py, gs.currentPiece.color);
          }
        }
      }
    }

    ghostCanvasRef.current = true;
  }, []);

  function drawCell(ctx: CanvasRenderingContext2D, c: number, r: number, color: string) {
    const x = c * CELL_SIZE;
    const y = r * CELL_SIZE;
    ctx.fillStyle = color;
    ctx.fillRect(x + 1, y + 1, CELL_SIZE - 2, CELL_SIZE - 2);

    // Highlight
    ctx.fillStyle = "rgba(255,255,255,0.25)";
    ctx.fillRect(x + 1, y + 1, CELL_SIZE - 2, 4);
    ctx.fillRect(x + 1, y + 1, 4, CELL_SIZE - 2);

    // Shadow
    ctx.fillStyle = "rgba(0,0,0,0.3)";
    ctx.fillRect(x + 1, y + CELL_SIZE - 5, CELL_SIZE - 2, 4);
  }

  const spawnPiece = useCallback(() => {
    const gs = gameStateRef.current;
    gs.currentPiece = gs.nextPiece;
    gs.nextPiece = randomPiece();
    gs.x = Math.floor((BOARD_WIDTH - gs.currentPiece.shape[0].length) / 2);
    gs.y = -gs.currentPiece.shape.length + 1;

    if (!isValidPosition(gs.board, gs.currentPiece.shape, gs.x, gs.y)) {
      gs.gameOver = true;
      setDisplay((d) => ({ ...d, gameOver: true }));
    } else {
      setDisplay((d) => ({ ...d, nextPiece: gs.nextPiece }));
    }
  }, []);

  const lockPiece = useCallback(() => {
    const gs = gameStateRef.current;
    gs.board = placePiece(gs.board, gs.currentPiece.shape, gs.x, gs.y, gs.currentPiece.color);
    const { board: newBoard, linesCleared } = clearLines(gs.board);
    gs.board = newBoard;
    gs.score += getScore(linesCleared, gs.level);
    gs.lines += linesCleared;
    gs.level = Math.floor(gs.lines / 10);
    setDisplay((d) => ({
      ...d,
      score: gs.score,
      lines: gs.lines,
      level: gs.level,
    }));
    spawnPiece();
  }, [spawnPiece]);

  const moveDown = useCallback(() => {
    const gs = gameStateRef.current;
    if (!gs.started || gs.gameOver || gs.paused) return;
    if (isValidPosition(gs.board, gs.currentPiece.shape, gs.x, gs.y + 1)) {
      gs.y += 1;
    } else {
      lockPiece();
    }
  }, [lockPiece]);

  const hardDrop = useCallback(() => {
    const gs = gameStateRef.current;
    if (!gs.started || gs.gameOver || gs.paused) return;
    gs.y = getDropY(gs.board, gs.currentPiece.shape, gs.x, gs.y);
    lockPiece();
  }, [lockPiece]);

  const startGame = useCallback(() => {
    const gs = gameStateRef.current;
    gs.board = createEmptyBoard();
    gs.currentPiece = randomPiece();
    gs.nextPiece = randomPiece();
    gs.x = Math.floor((BOARD_WIDTH - gs.currentPiece.shape[0].length) / 2);
    gs.y = -gs.currentPiece.shape.length + 1;
    gs.score = 0;
    gs.lines = 0;
    gs.level = 0;
    gs.gameOver = false;
    gs.paused = false;
    gs.started = true;
    lastDropRef.current = 0;
    setDisplay({
      score: 0,
      lines: 0,
      level: 0,
      gameOver: false,
      started: true,
      paused: false,
      nextPiece: gs.nextPiece,
    });
  }, []);

  const togglePause = useCallback(() => {
    const gs = gameStateRef.current;
    if (!gs.started || gs.gameOver) return;
    gs.paused = !gs.paused;
    setDisplay((d) => ({ ...d, paused: gs.paused }));
  }, []);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      const gs = gameStateRef.current;
      if (!gs.started || gs.gameOver) return;
      if (e.key === "p" || e.key === "P" || e.key === "Escape") {
        togglePause();
        return;
      }
      if (gs.paused) return;
      switch (e.key) {
        case "ArrowLeft":
          e.preventDefault();
          if (isValidPosition(gs.board, gs.currentPiece.shape, gs.x - 1, gs.y)) gs.x--;
          break;
        case "ArrowRight":
          e.preventDefault();
          if (isValidPosition(gs.board, gs.currentPiece.shape, gs.x + 1, gs.y)) gs.x++;
          break;
        case "ArrowDown":
          e.preventDefault();
          moveDown();
          break;
        case "ArrowUp":
        case "x":
        case "X": {
          e.preventDefault();
          const rotated = rotate(gs.currentPiece.shape);
          if (isValidPosition(gs.board, rotated, gs.x, gs.y)) {
            gs.currentPiece = { ...gs.currentPiece, shape: rotated };
          } else if (isValidPosition(gs.board, rotated, gs.x - 1, gs.y)) {
            gs.x--;
            gs.currentPiece = { ...gs.currentPiece, shape: rotated };
          } else if (isValidPosition(gs.board, rotated, gs.x + 1, gs.y)) {
            gs.x++;
            gs.currentPiece = { ...gs.currentPiece, shape: rotated };
          }
          break;
        }
        case " ":
          e.preventDefault();
          hardDrop();
          break;
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [moveDown, hardDrop, togglePause]);

  useEffect(() => {
    let lastTime = 0;
    const loop = (time: number) => {
      const gs = gameStateRef.current;
      const interval = Math.max(100, 800 - gs.level * 70);
      if (gs.started && !gs.gameOver && !gs.paused) {
        if (time - lastDropRef.current > interval) {
          moveDown();
          lastDropRef.current = time;
        }
      }
      draw();
      animFrameRef.current = requestAnimationFrame(loop);
      lastTime = time;
    };
    animFrameRef.current = requestAnimationFrame(loop);
    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [draw, moveDown]);

  // Next piece preview canvas
  const nextCanvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = nextCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.fillStyle = "#0a0a1a";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    const np = display.nextPiece;
    if (!np) return;
    const cellSize = 24;
    const offsetX = Math.floor((4 - np.shape[0].length) / 2);
    const offsetY = Math.floor((4 - np.shape.length) / 2);
    for (let r = 0; r < np.shape.length; r++) {
      for (let c = 0; c < np.shape[r].length; c++) {
        if (np.shape[r][c]) {
          const x = (offsetX + c) * cellSize;
          const y = (offsetY + r) * cellSize;
          ctx.fillStyle = np.color;
          ctx.fillRect(x + 1, y + 1, cellSize - 2, cellSize - 2);
          ctx.fillStyle = "rgba(255,255,255,0.25)";
          ctx.fillRect(x + 1, y + 1, cellSize - 2, 3);
          ctx.fillRect(x + 1, y + 1, 3, cellSize - 2);
        }
      }
    }
  }, [display.nextPiece]);

  // Touch controls
  const touchStartRef = useRef<{ x: number; y: number } | null>(null);
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
  };
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!touchStartRef.current) return;
    const dx = e.changedTouches[0].clientX - touchStartRef.current.x;
    const dy = e.changedTouches[0].clientY - touchStartRef.current.y;
    const gs = gameStateRef.current;
    if (!gs.started || gs.gameOver || gs.paused) return;
    if (Math.abs(dx) > Math.abs(dy)) {
      if (Math.abs(dx) > 20) {
        if (dx > 0) {
          if (isValidPosition(gs.board, gs.currentPiece.shape, gs.x + 1, gs.y)) gs.x++;
        } else {
          if (isValidPosition(gs.board, gs.currentPiece.shape, gs.x - 1, gs.y)) gs.x--;
        }
      }
    } else {
      if (dy > 30) {
        hardDrop();
      } else if (dy < -20) {
        const rotated = rotate(gs.currentPiece.shape);
        if (isValidPosition(gs.board, rotated, gs.x, gs.y)) {
          gs.currentPiece = { ...gs.currentPiece, shape: rotated };
        }
      }
    }
    touchStartRef.current = null;
  };

  return (
    <div className="flex flex-col items-center gap-4 w-full">
      <div className="flex flex-col md:flex-row gap-4 items-start justify-center w-full">
        {/* Game Board */}
        <div className="relative" style={{ touchAction: "none" }} onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
          <canvas
            ref={canvasRef}
            width={BOARD_WIDTH * CELL_SIZE}
            height={BOARD_HEIGHT * CELL_SIZE}
            className="border-2 border-purple-500/50 rounded-lg shadow-[0_0_30px_rgba(168,85,247,0.3)]"
            style={{ display: "block" }}
          />
          {!display.started && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/80 rounded-lg">
              <div className="text-5xl font-black text-white mb-2 tracking-widest" style={{ textShadow: "0 0 20px #a855f7" }}>
                TETRIS
              </div>
              <p className="text-purple-300 text-sm mb-6">Classic Block Puzzle Game</p>
              <button
                onClick={startGame}
                className="px-8 py-3 bg-purple-600 hover:bg-purple-500 text-white font-bold rounded-full text-lg transition-all shadow-lg hover:shadow-purple-500/40"
              >
                Start Game
              </button>
              <p className="text-gray-400 text-xs mt-4">Arrow keys to move · Space to drop</p>
            </div>
          )}
          {display.gameOver && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/85 rounded-lg">
              <div className="text-3xl font-black text-red-400 mb-1">GAME OVER</div>
              <div className="text-yellow-400 text-xl font-bold mb-1">Score: {display.score}</div>
              <div className="text-gray-400 text-sm mb-5">Lines: {display.lines} · Level: {display.level}</div>
              <button
                onClick={startGame}
                className="px-8 py-3 bg-purple-600 hover:bg-purple-500 text-white font-bold rounded-full text-lg transition-all"
              >
                Play Again
              </button>
            </div>
          )}
          {display.paused && !display.gameOver && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/80 rounded-lg">
              <div className="text-3xl font-black text-white mb-4">PAUSED</div>
              <button
                onClick={togglePause}
                className="px-8 py-3 bg-purple-600 hover:bg-purple-500 text-white font-bold rounded-full text-lg transition-all"
              >
                Resume
              </button>
            </div>
          )}
        </div>

        {/* Side Panel */}
        <div className="flex flex-col gap-4 min-w-[140px]">
          {/* Next Piece */}
          <div className="bg-gray-900/80 border border-purple-500/30 rounded-xl p-3">
            <div className="text-xs text-purple-400 font-semibold uppercase tracking-wider mb-2">Next</div>
            <canvas ref={nextCanvasRef} width={96} height={96} />
          </div>

          {/* Stats */}
          <div className="bg-gray-900/80 border border-purple-500/30 rounded-xl p-3 space-y-3">
            <div>
              <div className="text-xs text-purple-400 font-semibold uppercase tracking-wider">Score</div>
              <div className="text-xl font-black text-white">{display.score.toLocaleString()}</div>
            </div>
            <div>
              <div className="text-xs text-purple-400 font-semibold uppercase tracking-wider">Level</div>
              <div className="text-xl font-black text-white">{display.level}</div>
            </div>
            <div>
              <div className="text-xs text-purple-400 font-semibold uppercase tracking-wider">Lines</div>
              <div className="text-xl font-black text-white">{display.lines}</div>
            </div>
          </div>

          {/* Controls */}
          {display.started && !display.gameOver && (
            <button
              onClick={togglePause}
              className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white text-sm font-semibold rounded-lg transition-all"
            >
              {display.paused ? "Resume" : "Pause"}
            </button>
          )}
          {display.started && (
            <button
              onClick={startGame}
              className="px-4 py-2 bg-red-900/60 hover:bg-red-800/80 text-red-300 text-sm font-semibold rounded-lg transition-all"
            >
              Restart
            </button>
          )}
        </div>
      </div>

      {/* Mobile touch controls */}
      <div className="flex gap-3 md:hidden mt-2">
        <button
          className="w-14 h-14 bg-gray-800 border border-gray-600 rounded-xl text-white text-xl font-bold active:bg-gray-700"
          onClick={() => {
            const gs = gameStateRef.current;
            if (!gs.started || gs.gameOver || gs.paused) return;
            if (isValidPosition(gs.board, gs.currentPiece.shape, gs.x - 1, gs.y)) gs.x--;
          }}
        >
          ←
        </button>
        <button
          className="w-14 h-14 bg-purple-800 border border-purple-600 rounded-xl text-white text-lg font-bold active:bg-purple-700"
          onClick={() => {
            const gs = gameStateRef.current;
            if (!gs.started || gs.gameOver || gs.paused) return;
            const rotated = rotate(gs.currentPiece.shape);
            if (isValidPosition(gs.board, rotated, gs.x, gs.y)) {
              gs.currentPiece = { ...gs.currentPiece, shape: rotated };
            }
          }}
        >
          ↻
        </button>
        <button
          className="w-14 h-14 bg-gray-800 border border-gray-600 rounded-xl text-white text-xl font-bold active:bg-gray-700"
          onClick={() => {
            const gs = gameStateRef.current;
            if (!gs.started || gs.gameOver || gs.paused) return;
            if (isValidPosition(gs.board, gs.currentPiece.shape, gs.x + 1, gs.y)) gs.x++;
          }}
        >
          →
        </button>
        <button
          className="w-14 h-14 bg-yellow-800 border border-yellow-600 rounded-xl text-white text-xl font-bold active:bg-yellow-700"
          onClick={hardDrop}
        >
          ↓
        </button>
      </div>

      {/* Keyboard hints */}
      <div className="hidden md:flex gap-6 text-xs text-gray-500 mt-1">
        <span>← → Move</span>
        <span>↑ / X Rotate</span>
        <span>↓ Soft Drop</span>
        <span>Space Hard Drop</span>
        <span>P Pause</span>
      </div>
    </div>
  );
}
