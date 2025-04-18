let board = Array(9).fill('');
let currentPlayer = 'X';
let gameOver = false;
let mode = 'human'; // 'human' or 'computer'

const cells = document.querySelectorAll('.cell');
const message = document.getElementById('message');

function setMode(selectedMode) {
  mode = selectedMode;
  restartGame();
}

function restartGame() {
  board.fill('');
  gameOver = false;
  currentPlayer = 'X';
  cells.forEach(cell => {
    cell.textContent = '';
    cell.classList.remove('disabled');
  });
  message.textContent = '';
}

cells.forEach(cell => {
  cell.addEventListener('click', () => handleClick(cell));
});

function handleClick(cell) {
  const index = cell.dataset.index;
  if (board[index] !== '' || gameOver) return;

  board[index] = currentPlayer;
  cell.textContent = currentPlayer;

  if (checkWin(currentPlayer)) {
    message.textContent = `${currentPlayer} wins!`;
    gameOver = true;
    disableBoard();
    return;
  } else if (board.every(cell => cell !== '')) {
    message.textContent = "It's a tie!";
    gameOver = true;
    return;
  }

  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';

  if (mode === 'computer' && currentPlayer === 'O') {
    setTimeout(() => {
      computerMove();
    }, 500);
  }
}

function computerMove() {
  if (gameOver) return;

  // pick a random empty cell
  let emptyIndices = board.map((val, idx) => val === '' ? idx : null).filter(val => val !== null);
  let randomIndex = emptyIndices[Math.floor(Math.random() * emptyIndices.length)];

  board[randomIndex] = 'O';
  cells[randomIndex].textContent = 'O';

  if (checkWin('O')) {
    message.textContent = "O wins!";
    gameOver = true;
    disableBoard();
  } else if (board.every(cell => cell !== '')) {
    message.textContent = "It's a tie!";
    gameOver = true;
  } else {
    currentPlayer = 'X';
  }
}

function checkWin(player) {
  const winPatterns = [
    [0,1,2],[3,4,5],[6,7,8], // rows
    [0,3,6],[1,4,7],[2,5,8], // cols
    [0,4,8],[2,4,6]          // diagonals
  ];
  return winPatterns.some(pattern => pattern.every(index => board[index] === player));
}

function disableBoard() {
  cells.forEach(cell => cell.classList.add('disabled'));
}