import React from "react";
import Square from "./Square";

function Board(props) {
  const { squares, onClick, winLine, boardSize } = props;

  const renderSquare = (i) => {
    return (
      <Square
        key={i}
        value={squares[i]}
        onClick={() => onClick(i)}
        highlight={winLine && winLine.includes(i)}
      />
    );
  };

  let squaresToRender = [];
  for (let i = 0; i < boardSize; ++i) {
    let row = [];
    for (let j = 0; j < boardSize; ++j) {
      row.push(renderSquare(i * boardSize + j));
    }
    squaresToRender.push(
      <div key={i} className="board-row">
        {row}
      </div>
    );
  }

  return <div>{squaresToRender}</div>;
}

export default Board;
