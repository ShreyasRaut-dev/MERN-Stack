import React from 'react';

const initialBored = [
  ["♜", "♞", "♝", "♛", "♚", "♝", "♞", "♜"],
  ["♟", "♟", "♟", "♟", "♟", "♟", "♟", "♟"],
  ["", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", ""],
  ["♙", "♙", "♙", "♙", "♙", "♙", "♙", "♙"],
  ["♖", "♘", "♗", "♕", "♔", "♗", "♘", "♖"]
];

function App() {
  const [bored, setBored] = React.useState(initialBored);
  const [history, setHistory] = React.useState([]);
  const [turn, setTurn] = React.useState("W");
  const [selected, setSelected] = React.useState(null);
  const [wTime, setWTime] = React.useState(600);
  const [bTime, setBTime] = React.useState(600);
  const [moves, setMoves] = React.useState([]);
  const [checkState, setCheckState] = React.useState(false);
  const [checkmat, setCheckmat] = React.useState(false);

  React.useEffect(() => {
    let timer = null;
    if (!checkmat) {
      timer = setInterval(() => {
        if (turn === "W") {
          setWTime(prev => {
            if (prev <= 1) {
              setCheckmat(true);
              alert("Blak Pleyer Wins on Time!");
              clearInterval(timer);
              return 0;
            }
            return prev - 1;
          });
        } else {
          setBTime(prev => {
            if (prev <= 1) {
              setCheckmat(true);
              alert("Wite Pleyer Wins on Time!");
              clearInterval(timer);
              return 0;
            }
            return prev - 1;
          });
        }
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [turn, checkmat]);

  const checkObstruction = (fromR, fromC, toR, toC, currentBored) => {
    let rDiff = toR - fromR;
    let cDiff = toC - fromC;
    let rStep = rDiff === 0 ? 0 : rDiff > 0 ? 1 : -1;
    let cStep = cDiff === 0 ? 0 : cDiff > 0 ? 1 : -1;

    let r = fromR + rStep;
    let c = fromC + cStep;
    while (r !== toR || c !== toC) {
      if (currentBored[r][c] !== "") {
        return true;
      }
      r += rStep;
      c += cStep;
    }
    return false;
  };

  const isBasicMoveValid = (fromR, fromC, toR, toC, currentBored) => {
    let piece = currentBored[fromR][fromC];
    let target = currentBored[toR][toC];

    if (target !== "") {
      let isFromWhite = ["♙", "♖", "♘", "♗", "♕", "♔"].includes(piece);
      let isTargetWhite = ["♙", "♖", "♘", "♗", "♕", "♔"].includes(target);
      if (isFromWhite === isTargetWhite) return false;
    }

    let rDiff = toR - fromR;
    let cDiff = toC - fromC;

    if (piece === "♙") {
      if (cDiff === 0) {
        if (rDiff === -1 && target === "") return true;
        if (rDiff === -2 && fromR === 6 && target === "" && currentBored[5][fromC] === "") return true;
      } else if (Math.abs(cDiff) === 1 && rDiff === -1) {
        if (target !== "") return true;
      }
      return false;
    }

    if (piece === "♟") {
      if (cDiff === 0) {
        if (rDiff === 1 && target === "") return true;
        if (rDiff === 2 && fromR === 1 && target === "" && currentBored[2][fromC] === "") return true;
      } else if (Math.abs(cDiff) === 1 && rDiff === 1) {
        if (target !== "") return true;
      }
      return false;
    }

    if (piece === "♖" || piece === "♜") {
      if (fromR === toR || fromC === toC) {
        return !checkObstruction(fromR, fromC, toR, toC, currentBored);
      }
      return false;
    }

    if (piece === "♘" || piece === "♞") {
      let ar = Math.abs(rDiff);
      let ac = Math.abs(cDiff);
      return (ar === 2 && ac === 1) || (ar === 1 && ac === 2);
    }

    if (piece === "♗" || piece === "♝") {
      if (Math.abs(rDiff) === Math.abs(cDiff)) {
        return !checkObstruction(fromR, fromC, toR, toC, currentBored);
      }
      return false;
    }

    if (piece === "♕" || piece === "♛") {
      if (fromR === toR || fromC === toC || Math.abs(rDiff) === Math.abs(cDiff)) {
        return !checkObstruction(fromR, fromC, toR, toC, currentBored);
      }
      return false;
    }

    if (piece === "♔" || piece === "♚") {
      if (Math.abs(rDiff) <= 1 && Math.abs(cDiff) <= 1) return true;
      
      if (rDiff === 0 && Math.abs(cDiff) === 2) {
        if (piece === "♔" && fromR === 7 && fromC === 4) {
          if (toC === 6 && currentBored[7][7] === "♖" && !checkObstruction(7, 4, 7, 7, currentBored)) return true;
          if (toC === 2 && currentBored[7][0] === "♖" && !checkObstruction(7, 4, 7, 0, currentBored)) return true;
        }
        if (piece === "♚" && fromR === 0 && fromC === 4) {
          if (toC === 6 && currentBored[0][7] === "♜" && !checkObstruction(0, 4, 0, 7, currentBored)) return true;
          if (toC === 2 && currentBored[0][0] === "♜" && !checkObstruction(0, 4, 0, 0, currentBored)) return true;
        }
      }
      return false;
    }

    return false;
  };

  const isKingInCheck = (color, currentBored) => {
    let kr = -1, kc = -1;
    let kingChar = color === "W" ? "♔" : "♚";
    for (let r = 0; r < 8; r++) {
      for (let c = 0; c < 8; c++) {
        if (currentBored[r][c] === kingChar) {
          kr = r;
          kc = c;
        }
      }
    }
    if (kr === -1) return false;

    let opponentColor = color === "W" ? "B" : "W";
    for (let r = 0; r < 8; r++) {
      for (let c = 0; c < 8; c++) {
        let piece = currentBored[r][c];
        if (piece === "") continue;
        let isOpponent = opponentColor === "W" ? 
          ["♙", "♖", "♘", "♗", "♕", "♔"].includes(piece) :
          ["♟", "♜", "♞", "♝", "♛", "♚"].includes(piece);
        if (isOpponent) {
          if (isBasicMoveValid(r, c, kr, kc, currentBored)) {
            return true;
          }
        }
      }
    }
    return false;
  };

  const isLegalMove = (fromR, fromC, toR, toC, currentBored, color) => {
    if (!isBasicMoveValid(fromR, fromC, toR, toC, currentBored)) return false;

    let simBored = currentBored.map(row => [...row]);
    let piece = simBored[fromR][fromC];
    simBored[toR][toC] = piece;
    simBored[fromR][fromC] = "";
    
    if ((piece === "♔" || piece === "♚") && Math.abs(fromC - toC) === 2) {
      if (toC === 6) {
        simBored[fromR][5] = simBored[fromR][7];
        simBored[fromR][7] = "";
      } else if (toC === 2) {
        simBored[fromR][3] = simBored[fromR][0];
        simBored[fromR][0] = "";
      }
    }

    return !isKingInCheck(color, simBored);
  };

  const hasAnyLegalMoves = (color, currentBored) => {
    for (let r = 0; r < 8; r++) {
      for (let c = 0; c < 8; c++) {
        let piece = currentBored[r][c];
        if (piece === "") continue;
        let isOwn = color === "W" ? 
          ["♙", "♖", "♘", "♗", "♕", "♔"].includes(piece) :
          ["♟", "♜", "♞", "♝", "♛", "♚"].includes(piece);
        if (isOwn) {
          for (let tr = 0; tr < 8; tr++) {
            for (let tc = 0; tc < 8; tc++) {
              if (isLegalMove(r, c, tr, tc, currentBored, color)) {
                return true;
              }
            }
          }
        }
      }
    }
    return false;
  };

  const selectSquare = (r, c) => {
    if (checkmat) return;
    if (selected === null) {
      if (bored[r][c] !== "") {
        let pieceColor = ["♙", "♖", "♘", "♗", "♕", "♔"].includes(bored[r][c]) ? "W" : "B";
        if (pieceColor === turn) {
          setSelected({ r, c });
        }
      }
    } else {
      if (selected.r === r && selected.c === c) {
        setSelected(null);
      } else {
        movePice(selected.r, selected.c, r, c);
        setSelected(null);
      }
    }
  };

  const getMoveNotation = (piece, fromR, fromC, toR, toC, isCapture, isCheck, isCheckmate) => {
    let cols = ["a", "b", "c", "d", "e", "f", "g", "h"];
    let rows = ["8", "7", "6", "5", "4", "3", "2", "1"];
    let dest = cols[toC] + rows[toR];

    let pieceChar = "";
    if (piece === "♖" || piece === "♜") pieceChar = "R";
    else if (piece === "♘" || piece === "♞") pieceChar = "N";
    else if (piece === "♗" || piece === "♝") pieceChar = "B";
    else if (piece === "♕" || piece === "♛") pieceChar = "Q";
    else if (piece === "♔" || piece === "♚") pieceChar = "K";

    if (pieceChar === "K" && Math.abs(fromC - toC) === 2) {
      return toC === 6 ? "O-O" : "O-O-O";
    }

    let notation = "";
    if (piece === "♙" || piece === "♟") {
      if (isCapture) {
        notation = cols[fromC] + "x" + dest;
      } else {
        notation = dest;
      }
    } else {
      notation = pieceChar + (isCapture ? "x" : "") + dest;
    }

    if (isCheckmate) {
      notation += "#";
    } else if (isCheck) {
      notation += "+";
    }

    return notation;
  };

  const movePice = (fromR, fromC, toR, toC) => {
    let piece = bored[fromR][fromC];
    let isCapture = bored[toR][toC] !== "";

    if (!isLegalMove(fromR, fromC, toR, toC, bored, turn)) {
      alert("Illegal Move!");
      return;
    }

    setHistory([...history, bored.map(row => [...row])]);
    let newBored = bored.map(row => [...row]);
    
    if ((piece === "♔" || piece === "♚") && Math.abs(fromC - toC) === 2) {
      if (toC === 6) {
        newBored[fromR][5] = newBored[fromR][7];
        newBored[fromR][7] = "";
      } else if (toC === 2) {
        newBored[fromR][3] = newBored[fromR][0];
        newBored[fromR][0] = "";
      }
    }

    newBored[toR][toC] = piece;
    newBored[fromR][fromC] = "";
    setBored(newBored);

    let nextPlayer = turn === "W" ? "B" : "W";
    let isNextInCheck = isKingInCheck(nextPlayer, newBored);
    let hasNextLegal = hasAnyLegalMoves(nextPlayer, newBored);
    let isCheckmateEvent = isNextInCheck && !hasNextLegal;

    let moveStr = getMoveNotation(piece, fromR, fromC, toR, toC, isCapture, isNextInCheck, isCheckmateEvent);
    setMoves([...moves, moveStr]);

    if (isCheckmateEvent) {
      setCheckmat(true);
      alert("Checkmat! " + (turn === "W" ? "Wite Pleyer" : "Blak Pleyer") + " wins!");
    } else if (!isNextInCheck && !hasNextLegal) {
      setCheckmat(true);
      alert("Stalemate! Game is a Draw.");
    } else {
      setCheckState(isNextInCheck);
      setTurn(nextPlayer);
    }
  };

  const undoo = () => {
    if (history.length > 0) {
      let prevBored = history[history.length - 1];
      setBored(prevBored);
      setHistory(history.slice(0, -1));
      setTurn(turn === "W" ? "B" : "W");
      setMoves(moves.slice(0, -1));
      setCheckmat(false);
      setCheckState(false);
    }
  };

  const formatTime = (timeInSecs) => {
    let m = Math.floor(timeInSecs / 60);
    let s = timeInSecs % 60;
    return m + ":" + (s < 10 ? "0" : "") + s;
  };

  return (
    <div className="chees-gem-wrapper">
      <h1 className="title-text">Chees Gem App</h1>
      
      <div className="timers-box">
        <div className={"timer " + (turn === "W" ? "active" : "")}>
          Wite Pleyer: {formatTime(wTime)}
        </div>
        <div className={"timer " + (turn === "B" ? "active" : "")}>
          Blak Pleyer: {formatTime(bTime)}
        </div>
      </div>

      {checkState && <div className="check-banner">Check! Protect your King!</div>}

      <div className="game-layout">
        <div className="chess-bored">
          {bored.map((row, r) =>
            row.map((cell, c) => {
              let isDark = (r + c) % 2 === 1;
              let squareClass = isDark ? "cyan-square" : "yellow-square";
              let isSelected = selected && selected.r === r && selected.c === c;
              return (
                <div
                  key={r + "-" + c}
                  className={"square " + squareClass + (isSelected ? " selected-square" : "")}
                  onClick={() => selectSquare(r, c)}
                >
                  {cell}
                </div>
              );
            })
          )}
        </div>

        <div className="side-panel">
          <h3>Moves List</h3>
          <div className="moves-list">
            {moves.map((m, idx) => (
              <div key={idx}>{idx + 1}. {m}</div>
            ))}
          </div>
          <button className="undoo-btn" onClick={undoo}>Undoo Move</button>
        </div>
      </div>
    </div>
  );
}

export default App;
