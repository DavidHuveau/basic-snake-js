class Snake {
  constructor(board, headCell, startingLength) {
    this.headCell = headCell;
    this.startingLength = startingLength;
    this.board = board;

    this.initVerticalSnake();
  }

  initVerticalSnake() {
    this.snakeParts = [];

    this.headCell.cellType = CELL_TYPE.SNAKE;
    this.snakeParts.push(this.headCell);

    for (let index = 1; index < this.startingLength; index++) {
      const bodyPart = this.board.cells[this.headCell.row + index][this.headCell.column];
      bodyPart.cellType = CELL_TYPE.SNAKE;
      this.snakeParts.push(bodyPart);
    }
  }

  getHead() {
    // TODO use setter
    return this.headCell;
  }

  grow() {
    this.snakeParts.push(this.headCell);
  }

  move(nextCell) {
    const initilaCellType = nextCell.cellType;

    this.removeTail();
    this.setHeadToNextCell(nextCell);

    return initilaCellType;
  }

  removeTail() {
    const tail = this.snakeParts.pop();
    tail.cellType = CELL_TYPE.EMPTY;
  }

  setHeadToNextCell(nextCell) {
    this.headCell = nextCell;
    this.headCell.cellType = CELL_TYPE.SNAKE;
    this.snakeParts.unshift(this.headCell);
  }

  checkCrash(nextCell) {
    let crashed = (typeof nextCell === "undefined");

    if (!crashed) {
      crashed = this.snakeParts.some(
        (cell) => cell.row === nextCell.row && cell.column === nextCell.column,
      );
    }
    return crashed;
  }
}
