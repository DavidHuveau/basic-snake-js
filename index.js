const GAME_BOARD_ID = "game-grid";

// Game settings
const GAME_ROWS_NUMBER = 20;
const GAME_COLUMNS_NUMBER = 20;
const SNAKE_STARTING_LENGTH = 5;

const board = new Board(GAME_BOARD_ID, GAME_ROWS_NUMBER, GAME_COLUMNS_NUMBER);
const snake = new Snake(board.cells[1][10], SNAKE_STARTING_LENGTH, board);

new Game(board, snake);
