export function generateMatrix(startCell = 1, x = 10, y = 10, bomb = 10) {
  let bombs = [];
  for (let i = 0; bombs.length < bomb; i++) {
    let bomb = getRandom(1, x * y);
    if (!bombs.includes(bomb) && bomb !== startCell) bombs.push(bomb);
  }

  let matrix = [];
  for (let i = 0; i < y; i++) {
    matrix[i] = new Array(x);
  }

  let cellNum = 1;
  for (let i = 0; i < y; i++) {
    for (let j = 0; j < x; j++) {
      if (bombs.includes(cellNum)) {
        matrix[i][j] = '⚙';
      } else {
        matrix[i][j] = 0;
      }
      cellNum++;
    }
  }

  for (let i = 0; i < y; i++) {
    for (let j = 0; j < x; j++) {
      let arr = [
        i > 0 && j > 0 ? matrix[i - 1][j - 1] : undefined,
        i > 0 ? matrix[i - 1][j] : undefined,
        i > 0 && j < x - 1 ? matrix[i - 1][j + 1] : undefined,
        j < x - 1 ? matrix[i][j + 1] : undefined,
        i < y - 1 && j < x - 1 ? matrix[i + 1][j + 1] : undefined,
        i < y - 1 ? matrix[i + 1][j] : undefined,
        i < y - 1 && j > 0 ? matrix[i + 1][j - 1] : undefined,
        j > 0 ? matrix[i][j - 1] : undefined,
      ];
      matrix[i][j] =
        matrix[i][j] === '⚙'
          ? '⚙'
          : arr.reduce((sum, cur) => (cur === '⚙' ? sum + 1 : sum), 0);
    }
  }
  return matrix;
}

function getRandom(min = 0, max = 2) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export function generateEmptyMatrix(x = 10, y = 10, bomb = 10) {
  let matrix = [];
  for (let i = 0; i < y; i++) {
    matrix[i] = new Array(x);
  }

  let cellNum = 1;
  for (let i = 0; i < y; i++) {
    for (let j = 0; j < x; j++) {
      matrix[i][j] = cellNum;
      cellNum++;
    }
  }

  return matrix;
}

// export const startMatrix = genrateMatrix();
// export const emptytMatrix = generateEmptyMatrix();
