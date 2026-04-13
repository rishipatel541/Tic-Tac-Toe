import { useState } from 'react'
import './App.css'
function Square({ value, onSquareClick }) {
  return (
    <button
      className="square"
      onClick={onSquareClick}
    >
      {value}
    </button>
  )
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ]

  for (const [a, b, c] of lines) {
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a]
    }
  }

  return null
}

function App() {
  const [stepX, setStepX] = useState('X')
  const [basemap, setBaseMap] = useState(Array(9).fill(null))
  const winner = calculateWinner(basemap)
  const isDraw = !winner && basemap.every((sq) => sq != null)
  const status = winner ? `Winner: ${winner}` : isDraw ? 'Draw!' : `Next player: ${stepX}`

  function handleClick(i) {
    if (winner) return
    if (basemap[i] != null) return

    const newBaseMap = basemap.slice()
    newBaseMap[i] = stepX
    setBaseMap(newBaseMap)
    setStepX(stepX === 'X' ? 'O' : 'X')
  }

  function resetGame() {
    setBaseMap(Array(9).fill(null))
    setStepX('X')
  }

  return (
    <div className="game">
      <div className="game-card">
        <div className="game-header">
          <div className="game-title">Tic Tac Toe</div>
          <div className={`game-status ${winner ? 'is-winner' : isDraw ? 'is-draw' : ''}`}>
            {status}
          </div>
        </div>

        <div className="board" role="grid" aria-label="Tic Tac Toe board">
          <Square value={basemap[0]} onSquareClick={() => handleClick(0)} />
          <Square value={basemap[1]} onSquareClick={() => handleClick(1)} />
          <Square value={basemap[2]} onSquareClick={() => handleClick(2)} />
          <Square value={basemap[3]} onSquareClick={() => handleClick(3)} />
          <Square value={basemap[4]} onSquareClick={() => handleClick(4)} />
          <Square value={basemap[5]} onSquareClick={() => handleClick(5)} />
          <Square value={basemap[6]} onSquareClick={() => handleClick(6)} />
          <Square value={basemap[7]} onSquareClick={() => handleClick(7)} />
          <Square value={basemap[8]} onSquareClick={() => handleClick(8)} />
        </div>

        <div className="game-actions">
          <button className="btn" onClick={resetGame} type="button">
            Reset
          </button>
        </div>
      </div>
    </div>
  )
}

export default App
