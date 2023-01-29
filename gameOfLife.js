// Matriz estado inicial con estado 0 como muerta y 1 como viva
let cells = [
  [0, 0, 0, 0, 0, 0],
  [0, 0, 0, 1, 0, 0],
  [0, 1, 0, 1, 0, 0],
  [0, 0, 1, 1, 0, 0],
  [0, 0, 0, 0, 0, 0],
  [0, 0, 0, 1, 0, 0],
];

// Comprobar vecinos de cada una de las celulas
const toCountNeighbors = (cells, row, col) => {
  let count = 0;
  for (let i = row - 1; i <= row + 1; i++) {
    for (let j = col - 1; j <= col + 1; j++) {
      if (i >= 0 && i < cells.length && j >= 0 && j < cells[i].length) {
        if (i !== row || j !== col) {
          count += cells[i][j];
        }
      }
    }
  }
  return count;
};

// Aplica las normas del juego en base al estado de sus vecinos.
const applyRules = () => {
  let newCells = JSON.parse(JSON.stringify(cells));
  for (let i = 0; i < cells.length; i++) {
    for (let x = 0; x < cells[i].length; x++) {
      let neighbors = toCountNeighbors(cells, i, x);
      if (cells[i][x] === 1 && (neighbors < 2 || neighbors >= 3))
        newCells[i][x] = 0; // Soledad o Sobrepoblación
      else if (cells[i][x] === 1 && (neighbors === 2 || neighbors === 3))
        newCells[i][x] = 1; // Sobrevive
      else if (cells[i][x] === 0 && neighbors === 3) newCells[i][x] = 1; // Nace
    }
  }
  return newCells;
};

function playGame() {
  console.log(cells);
  cells = applyRules();
  setTimeout(playGame, 1000);
}

playGame();
