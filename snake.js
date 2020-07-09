class Snake {
  constructor(cell, startingLength, board) {
    this.cell = cell;
    this.startingLength = startingLength;
    this.board = board;

    this.initSnake();
  }

  // Make a vertical snake whose head is closest to the top of the game board
  initSnake() {
    this.head = this.cell;
    this.snakeParts = [];

    this.head.cellType = CELL_TYPE.SNAKE;
    this.snakeParts.push(this.head);

    for (let index = 1; index < this.startingLength; index++) {
      const bodyPart = this.board.cells[this.head.row + index][this.head.column];
      bodyPart.cellType = CELL_TYPE.SNAKE;
      this.snakeParts.push(bodyPart);
    }
  }

  getHead() {
    // TODO use setter
    return this.head;
  }

  grow() {
    this.snakeParts.push(this.head);
  }

  move(nextCell) {
    // const cellType = nextCell.cellType;

    // remove the tail of our snake
    const tail = this.snakeParts.pop();
    tail.cellType = CELL_TYPE.EMPTY;

    // set the head of the snake to the cell being moved into
    this.head = nextCell;
    this.head.cellType = CELL_TYPE.SNAKE;
    this.snakeParts.unshift(this.head);

    // loops through all of the snakeParts and sets the cell type to SNAKE for each
    // this.snakeParts.forEach( function(part) {
    //  part.cellType = CELL_TYPE.SNAKE;
    // })
    // return cellType;
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
