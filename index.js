const GAME_BOARD_ID = "game-grid";

// Game settings
const GAME_ROWS_NUMBER = 20;
const GAME_COLUMNS_NUMBER = 20;
const SNAKE_STARTING_LENGTH = 5;

const board = new Board(GAME_BOARD_ID, GAME_ROWS_NUMBER, GAME_COLUMNS_NUMBER);

const startRowIndex = Math.floor(GAME_ROWS_NUMBER / 2);
const startColumnIndex = Math.floor(GAME_COLUMNS_NUMBER / 2);
const snake = new Snake(board, board.cells[startRowIndex][startColumnIndex], SNAKE_STARTING_LENGTH);

new Game(board, snake);
