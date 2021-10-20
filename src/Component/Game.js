import React, { useState } from "react";
import Board from "./Board";

import { calculateWinner } from "../utils/calculateWinner";

function Game() {
  const [inputNumber, setInputNumber] = useState(5);
  const [boardSize, setBoardSize] = useState(5);
  const [history, setHistory] = useState([
    { squares: Array(boardSize * boardSize).fill(null) },
  ]);
  const [stepNumber, setStepNumber] = useState(0);
  const [xIsNext, setXIsNext] = useState(true);
  const [isAscending, setIsAscending] = useState(true);

  const handleClick = (i) => {
    // e.preventDefault();
    const currentHistory = [...history].slice(0, stepNumber + 1);
    const current = currentHistory[currentHistory.length - 1];
    const squares = current.squares.slice();
    if (calculateWinner(squares).winner || squares[i]) {
      return;
    }

    squares[i] = xIsNext ? "X" : "O";
    setHistory(currentHistory.concat([{ squares, latestMoveSquare: i }]));
    setStepNumber(currentHistory.length);
    setXIsNext(!xIsNext);
  };

  const jumpTo = (step) => {
    setStepNumber(step);
    setXIsNext(step % 2 === 0);
  };

  const handleSortToggle = () => {
    setIsAscending(!isAscending);
  };

  const current = history[stepNumber];
  const winInfo = calculateWinner(current.squares);
  const winner = winInfo.winner;

  let moves = history.map((step, move) => {
    const latestMoveSquare = step.latestMoveSquare;
    const col = 1 + (latestMoveSquare % boardSize);
    const row = 1 + Math.floor(latestMoveSquare / boardSize);
    const desc = move
      ? `Go to move #${move} (${col}, ${row})`
      : "Go to game start";
    return (
      <li key={move}>
        {/* Bold the currently selected item */}
        <button
          className={move === stepNumber ? "move-list-item-selected" : ""}
          onClick={() => jumpTo(move)}
        >
          {desc}
        </button>
      </li>
    );
  });

  let status;
  if (winner) {
    status = "Winner: " + winner;
  } else {
    if (winInfo.isDraw) {
      status = "Draw";
    } else {
      status = "Next player: " + (xIsNext ? "X" : "O");
    }
  }

  if (!isAscending) {
    moves.reverse();
  }

  const handleChange = (e) => {
    setInputNumber(e.target.value);
  };

  const handleChangeBoardSize = (e) => {
    e.preventDefault();
    setStepNumber(0);
    setBoardSize(inputNumber);
    setHistory([{ squares: Array(boardSize * boardSize).fill(null) }]);
  };

  return (
    <div className="game">
      <div className="game-board">
        <Board
          squares={current.squares}
          onClick={handleClick}
          winLine={winInfo.line}
          boardSize={boardSize}
        />
      </div>
      <div className="game-info">
        <input
          type="number"
          value={inputNumber}
          onChange={handleChange}
          min="3"
        />
        <button onClick={handleChangeBoardSize}>Change Board Size</button>
        <div>{status}</div>
        <button onClick={() => handleSortToggle()}>
          {isAscending ? "descending" : "ascending"}
        </button>
        <ol>{moves}</ol>
      </div>
    </div>
  );
}

export default Game;
