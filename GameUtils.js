export function calculateWinner(squares) {
    const lines = [
      [0, 1, 2, 3],
      [1, 2, 3, 4],
      [5, 6, 7, 8],
      [6, 7, 8, 9],
      [10, 11, 12, 13],
      [11, 12, 13, 14],
      [15, 16, 17, 18],
      [16, 17, 18, 19],
      [20, 21, 22, 23],
      [21, 22, 23, 24],
      [0, 5, 10, 15],
      [5, 10, 15, 20],
      [1, 6, 11, 16],
      [6, 11, 16, 21],
      [2, 7, 12, 17],
      [7, 12, 17, 22],
      [3, 8, 13, 18],
      [8, 13, 18, 23],
      [4, 9, 14, 19],
      [9, 14, 19, 24],
      [3, 7, 11, 15],
      [4, 8, 12, 16],
      [8, 12, 16, 20],
      [0, 6, 12, 18],
      [6, 12, 18, 24],
      [1, 7, 13, 19],
      [5, 11, 17, 23],
      [9, 13, 17, 21]
   
    ];
  
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c, d] = lines[i];
      if (squares[a] !== null && squares[a] === squares[b] && squares[a] === squares[c] && squares[a] === squares[d]) {
        return squares[a];
      }
    }
    return null;
  }
  export function getNextStep(board) {
    // Проверяем, есть ли возможность выиграть на следующем ходу
    for (let i = 0; i < 25; i++) {
      if (board[i] === null) {
        const newBoard = [...board];
        newBoard[i] = 'o';
        if (calculateWinner(newBoard) === 'o') {
          return i;
        }
        // Важное изменение: обнуляем изменения в новой доске перед следующей итерацией
        newBoard[i] = null;
      }
    }
  
    // Проверяем, есть ли необходимость блокировать выигрыш соперника
    for (let i = 0; i < 25; i++) {
      if (board[i] === null) {
        const newBoard = [...board];
        newBoard[i] = 'x';
        if (calculateWinner(newBoard) === 'x') {
          return i;
        }
        // Важное изменение: обнуляем изменения в новой доске перед следующей итерацией
        newBoard[i] = null;
      }
    }
  
    // Ставим фишку в первую свободную клетку снизу вверх
    for (let i = 20; i >= 0; i--) {
      if (board[i] === null && (i >= 20 || board[i + 5] !== null)) {
        return i;
      }
    }
  
    // Новая проверка: ставим фишку над клеткой, в которой уже есть крестик или нолик
    for (let i = 0; i < 25; i++) {
      if (
        board[i] === null &&
        i < 20 &&
        board[i + 5] !== null &&
        (i % 5 === 0 || board[i - 1] !== null || board[i + 1] !== null)
      ) {
        return i;
      }
    }
  
    // Новая проверка: ставим фишку в клетку под уже поставленным крестиком или ноликом
    for (let i = 0; i < 25; i++) {
      if (board[i] === null && i < 20 && (board[i + 5] === 'o' || board[i + 5] === 'x')) {
        return i;
      }
    }
  
    // Попробуем предотвратить выигрыш крестиков в диагонали
    for (let i = 0; i < 25; i++) {
      if (
        board[i] === null &&
        i < 20 &&
        (i % 5 !== 0) &&
        (board[i - 1] === 'x' || board[i + 1] === 'x' || board[i + 6] === 'x' || board[i + 4] === 'x')
      ) {
        // Дополнительная проверка перед установкой нолика
        const diagonalEmpty = board[i + 6] === null && board[i + 4] === null && board[i + 5] === null && board[i - 5] === null;
        const noCrossesInDiagonal = board[i - 5] !== 'x' && board[i - 5] !== 'o' && board[i + 6] !== 'x' && board[i + 6] !== 'o' && board[i + 4] !== 'x' && board[i + 4] !== 'o';
        if (diagonalEmpty && noCrossesInDiagonal) {
          return i;
        }
      }
    }
  
    // Если все клетки заняты, возвращаем null
    return null;
  }
  
