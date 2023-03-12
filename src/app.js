import { useState } from "react";
import React from "react";
import "./style.css";

//komponenta za pojedinačne  kvadratiće
function Kvadrat({ value, onKvadratClick }) {
  // Vraća gumb s danom vrijednosti i klik handlerom
  return (
    <button className="kvadrat" onClick={onKvadratClick}>
      {value}
    </button>
  );
}

// komponenta za  ploču
function Ploca() {
  // Inicijalizacija stanja pomoću useState hooka s True vrijednosti
  const [xIsNext, setXIsNext] = useState(true);
  // Inicijalizacija stanja pomoću useState hooka s nizom od 9 null vrijednosti
  const [kvadrat, setKvad] = useState(Array(9).fill(null));

  // Funkcija za obradu klikova
  function handleClick(i) {
    if (kvadrat[i] || calculateWinner(kvadrat)) {
      return;
    }
    // Stvaramo kopiju trenutnog niza stanja
    const sljedeciKvad = kvadrat.slice();
    // promjena krizic/kruzic
    if (xIsNext) {
      sljedeciKvad[i] = "X";
    } else {
      sljedeciKvad[i] = "O";
    }
    // Ažuriranje stanja novim nizom
    setKvad(sljedeciKvad);
    setXIsNext(!xIsNext);
  }
  const winner = calculateWinner(kvadrat);
  let status;
  if (winner) {
    status = "Winner: " + winner;
  } else {
    status = "Next player: " + (xIsNext ? "X" : "O");
  }

  // ploča s Kvadrat komponentom za svaki kvadrat
  return (
    <>
      <div className="status">{status}</div>
      <div className="board-row">
        <Kvadrat value={kvadrat[0]} onKvadratClick={() => handleClick(0)} />
        <Kvadrat value={kvadrat[1]} onKvadratClick={() => handleClick(1)} />
        <Kvadrat value={kvadrat[2]} onKvadratClick={() => handleClick(2)} />
      </div>
      <div className="board-row">
        <Kvadrat value={kvadrat[3]} onKvadratClick={() => handleClick(3)} />
        <Kvadrat value={kvadrat[4]} onKvadratClick={() => handleClick(4)} />
        <Kvadrat value={kvadrat[5]} onKvadratClick={() => handleClick(5)} />
      </div>
      <div className="board-row">
        <Kvadrat value={kvadrat[6]} onKvadratClick={() => handleClick(6)} />
        <Kvadrat value={kvadrat[7]} onKvadratClick={() => handleClick(7)} />
        <Kvadrat value={kvadrat[8]} onKvadratClick={() => handleClick(8)} />
      </div>
    </>
  );
}

function calculateWinner(kvadrat) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (kvadrat[a] && kvadrat[a] === kvadrat[b] && kvadrat[a] === kvadrat[c]) {
      return kvadrat[a];
    }
  }
  return null;
}

export default function Igra() {
  return (
    <div className="game">
      <div className="game-board">
        <Ploca />
      </div>
      <div className="game-info">
        <ol>{/*TODO*/}</ol>
      </div>
    </div>
  );
}
