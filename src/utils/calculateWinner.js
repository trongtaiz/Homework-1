export function calculateWinner(squares) {
  let boardSize = Math.sqrt(squares.length);
  let countChecked = 0;
  let countXO = [[], [], [], []];

  for (let i = 0; i < boardSize; i++) {
    countXO[0] = [];
    countXO[1] = [];
    countXO[2] = [];
    countXO[3] = [];
    for (let j = 0; j < boardSize; j++) {
      let boxHorizontal = squares[i * boardSize + j];
      let boxVertical = squares[j * boardSize + i];
      if (boxHorizontal !== null) {
        countChecked++;
      }
      switch (boxVertical) {
        case "X": {
          countXO[1] = [];
          countXO[0].push(j * boardSize + i);
          if (countXO[0].length === 5) {
            return {
              winner: "X",
              line: countXO[0],
              isDraw: false,
            };
          }
          break;
        }
        case "O": {
          countXO[0] = [];
          countXO[1].push(j * boardSize + i);
          if (countXO[1].length === 5) {
            return {
              winner: "O",
              line: countXO[1],
              isDraw: false,
            };
          }
          break;
        }
        default: {
          countXO[1] = [];
          countXO[0] = [];
          break;
        }
      }
      switch (boxHorizontal) {
        case "X": {
          countXO[3] = [];
          countXO[2].push(i * boardSize + j);
          if (countXO[2].length === 5) {
            return {
              winner: "X",
              line: countXO[2],
              isDraw: false,
            };
          }
          break;
        }
        case "O": {
          countXO[2] = [];
          countXO[3].push(i * boardSize + j);
          if (countXO[3].length === 5) {
            return {
              winner: "O",
              line: countXO[3],
              isDraw: false,
            };
          }
          break;
        }
        default: {
          countXO[3] = [];
          countXO[2] = [];
          break;
        }
      }
    }
  }

  if (countChecked === squares.length) {
    return {
      winner: null,
      line: null,
      isDraw: true,
    };
  }
  // check diagonal

  let countXDiagonal = [[], [], [], []];
  let countODiagonal = [[], [], [], []];
  for (let i = 0; i < boardSize; i++) {
    countXDiagonal[0] = [];
    countXDiagonal[1] = [];
    countXDiagonal[2] = [];
    countXDiagonal[3] = [];

    countODiagonal[0] = [];
    countODiagonal[1] = [];
    countODiagonal[2] = [];
    countXDiagonal[3] = [];
    for (let j = 0; j < boardSize - i; j++) {
      let boxUpperLR = squares[j * boardSize + j + i];
      let boxUpperRL = squares[(boardSize - j - 1 - i) * boardSize + j];
      let boxLowerLR = squares[(j + i) * boardSize + j];
      let boxLowerRL = squares[(j + i) * boardSize + (boardSize - j - 1)];
      // check horizontal row X and O
      switch (boxUpperLR) {
        case "X": {
          countODiagonal[0] = [];
          countXDiagonal[0].push(j * boardSize + j + i);
          if (countXDiagonal[0].length === 5) {
            return {
              winner: "X",
              line: countXDiagonal[0],
              isDraw: false,
            };
          }
          break;
        }
        case "O": {
          countXDiagonal[0] = [];
          countODiagonal[0].push(j * boardSize + j + i);
          if (countODiagonal[0].length === 5) {
            return {
              winner: "O",
              line: countODiagonal[0],
              isDraw: false,
            };
          }
          break;
        }
        default: {
          countXDiagonal[0] = [];
          countODiagonal[0] = [];
          break;
        }
      }
      //
      switch (boxLowerLR) {
        case "X": {
          countODiagonal[1] = [];
          countXDiagonal[1].push((j + i) * boardSize + j);
          if (countXDiagonal[1].length === 5) {
            return {
              winner: "X",
              line: countXDiagonal[1],
              isDraw: false,
            };
          }
          break;
        }
        case "O": {
          countXDiagonal[1] = [];
          countODiagonal[1].push((j + i) * boardSize + j);
          if (countODiagonal[1].length === 5) {
            return {
              winner: "O",
              line: countODiagonal[1],
              isDraw: false,
            };
          }
          break;
        }
        default: {
          countODiagonal[1] = [];
          countXDiagonal[1] = [];
          break;
        }
      }
      //
      switch (boxUpperRL) {
        case "X": {
          countODiagonal[2] = [];
          countXDiagonal[2].push((boardSize - j - 1 - i) * boardSize + j);
          if (countXDiagonal[2].length === 5) {
            return {
              winner: "X",
              line: countXDiagonal[2],
              isDraw: false,
            };
          }
          break;
        }
        case "O": {
          countXDiagonal[2] = [];
          countODiagonal[2].push((boardSize - j - 1 - i) * boardSize + j);
          if (countODiagonal[2].length === 5) {
            return {
              winner: "O",
              line: countODiagonal[2],
              isDraw: false,
            };
          }
          break;
        }
        default: {
          countODiagonal[2] = [];
          countXDiagonal[2] = [];
          break;
        }
      }
      //
      switch (boxLowerRL) {
        case "X": {
          countODiagonal[3] = [];
          countXDiagonal[3].push((j + i) * boardSize + (boardSize - j - 1));
          if (countXDiagonal[3].length === 5) {
            return {
              winner: "X",
              line: countXDiagonal[3],
              isDraw: false,
            };
          }
          break;
        }
        case "O": {
          countXDiagonal[3] = [];
          countODiagonal[3].push((j + i) * boardSize + (boardSize - j - 1));
          if (countODiagonal[3].length === 5) {
            return {
              winner: "O",
              line: countODiagonal[3],
              isDraw: false,
            };
          }
          break;
        }
        default: {
          countODiagonal[3] = [];
          countXDiagonal[3] = [];
          break;
        }
      }
    }
  }
  return {
    winner: null,
    line: null,
    isDraw: false,
  };
}
