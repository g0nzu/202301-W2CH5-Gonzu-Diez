let cells = [
  [1, 0, 0, 1, 1, 0],
  [0, 1, 0, 1, 1, 0],
  [0, 0, 0, 0, 0, 1],
  [1, 0, 0, 1, 0, 0],
  [0, 0, 1, 1, 0, 1],
  [1, 0, 1, 0, 0, 1],
  [0, 0, 1, 1, 0, 1],
  [0, 1, 0, 0, 0, 1],
];

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const colors = ['grey', 'green'];
const size = 30; // Aumento el tamaño de las células

const drawCell = (x, y, size, color) => {
  ctx.fillStyle = color;
  ctx.fillRect(x * size, y * size, size, size);
};

const drawBoard = (cells, size, colors) => {
  ctx.clearRect(
    -canvas.width / 2,
    -canvas.height / 2,
    canvas.width,
    canvas.height
  ); // Limpia el canvas
  ctx.translate(canvas.width / 2, canvas.height / 2); // Centra el origen en el centro del canvas
  for (let i = 0; i < cells.length; i++) {
    for (let j = 0; j < cells[i].length; j++) {
      drawCell(
        -cells[0].length / 2 + j,
        -cells.length / 2 + i,
        size,
        colors[cells[i][j]]
      );
    }
  }
};

canvas.width = cells[0].length * size;
canvas.height = cells.length * size;

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

  if (count !== 0) {
    count += 1;
    return count;
  }

  return count;
};

// Aplica las normas del juego en base al estado de sus vecinos.
const applyRules = (cells) => {
  const newCells = JSON.parse(JSON.stringify(cells));
  for (let i = 0; i < cells.length; i++) {
    for (let x = 0; x < cells[i].length; x++) {
      const neighbors = toCountNeighbors(cells, i, x);
      if (cells[i][x] === 1 && neighbors < 2) {
        newCells[i][x] = 0; // Soledad
      }

      if (cells[i][x] === 1 && neighbors >= 3) {
        newCells[i][x] = 0; // Sobrepoblación
      }

      if (cells[i][x] === 1 && neighbors === 2) {
        newCells[i][x] = 1; // Sobrevive
      }

      if (cells[i][x] === 1 && neighbors === 3) {
        newCells[i][x] = 1; // Sobrevive
      }

      if (cells[i][x] === 0 && neighbors === 3) {
        newCells[i][x] = 1; // Nace
      }
    }
  }

  return newCells;
};

// Función para actualizar y dibujar el tablero
const updateAndDrawBoard = () => {
  cells = applyRules(cells);
  drawBoard(cells, size, colors);
};

const playGame = () => {
  setInterval(() => {
    updateAndDrawBoard();
  }, 1000);
};

playGame();
