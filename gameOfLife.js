const cells = [
  [0, 0, 0, 0, 1, 0],
  [0, 0, 0, 1, 1, 0],
  [0, 0, 0, 0, 0, 1],
  [1, 0, 0, 1, 0, 0],
  [1, 0, 0, 1, 0, 1],
];

// Comprobar vecinos de cada una de las celulas
export const toCountNeighbors = (cells, row, col) => {
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

  if (count !== 0) {
    count += 1;
    return count;
  }

  return count;
};

// Aplica las normas del juego en base al estado de sus vecinos.
export const applyRules = (cells) => {
  const newCells = JSON.parse(JSON.stringify(cells));
  for (let i = 0; i < cells.length; i++) {
    for (let x = 0; x < cells[i].length; x++) {
      const neighbors = toCountNeighbors(cells, i, x);
      if (cells[i][x] === 1 && (neighbors < 2 || neighbors >= 3)) {
        newCells[i][x] = 0;
      } // Soledad o Sobrepoblación
      else if (cells[i][x] === 1 && (neighbors === 2 || neighbors === 3)) {
        newCells[i][x] = 1;
      } // Sobrevive
      else if (cells[i][x] === 0 && neighbors === 3) {
        newCells[i][x] = 1;
      } // Nace
    }
  }

  return newCells;
};

function playGame() {
  setTimeout(() => {
    cells = applyRules();
  }, 1000);
}

playGame();
