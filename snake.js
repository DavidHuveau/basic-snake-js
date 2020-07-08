const GAME_BOARD_ID = "game-grid";

const GAME_ROWS_NUMBER = 20;
const GAME_COLS_NUMBER = 20;

class Snake {
  constructor() {
    this.gameBoard = this.domElement(GAME_BOARD_ID);

    this.startGame();
  }

  startGame() {
    this.generateGrid();
  }

  generateGrid() {
    this.gameBoard.innerHTML = "";

    for (let rowIndex = 0; rowIndex < GAME_ROWS_NUMBER; rowIndex++) {
      for (let colIndex = 0; colIndex < GAME_COLS_NUMBER; colIndex++) {
        this.generateCell(rowIndex, colIndex);
      }
    }
  }

  generateCell(rowIndex, colIndex) {
    const cell = document.createElement("div");
    cell.className = "cell";
    cell.id = `${rowIndex}_${colIndex}`;
    this.gameBoard.appendChild(cell);
  }

  // --------------------------------------------------------
  // utilities
  // --------------------------------------------------------

  // eslint-disable-next-line class-methods-use-this
  domElement(classOrId) {
    const char = classOrId.charAt(0);
    if (char !== "." && char !== "#") {
      classOrId = `#${classOrId}`; // eslint-disable-line no-param-reassign
    }
    return document.querySelector(classOrId);
  }
}
