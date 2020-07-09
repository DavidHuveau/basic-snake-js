class Board {
  constructor(rowCount, columnCount) {
    this.rowCount = rowCount;
    this.columnCount = columnCount;

    this.initCells();

    // render test cells
    // this.cells[0][0].cellType = CELL_TYPE.SNAKE;
    // this.cells[19][19].cellType = CELL_TYPE.FOOD;
  }

  initCells() {
    this.cells = [...Array(this.rowCount)].map((row, rowIndex) => [...Array(this.columnCount)].map(
      (col, columnIndex) => new Cell(rowIndex, columnIndex, CELL_TYPE.EMPTY),
    ));
  }

  placeFood() {
    const availableCells = this.availableCells();
    const cellIndex = Utilities.randomInteger(0, availableCells.length);

    availableCells[cellIndex].cellType = CELL_TYPE.FOOD;
  }

  availableCells() {
    const availableCells = [];

    // TODO add browseAllCells(fn) function
    for (let rowIndex = 0; rowIndex < this.rowCount; rowIndex++) {
      for (let columnIndex = 0; columnIndex < this.columnCount; columnIndex++) {
        if (this.cells[rowIndex][columnIndex].cellType === CELL_TYPE.EMPTY) {
          availableCells.push(this.cells[rowIndex][columnIndex]);
        }
      }
    }
    return availableCells;
  }

  render() {
    for (let rowIndex = 0; rowIndex < this.rowCount; rowIndex++) {
      for (let columnIndex = 0; columnIndex < this.columnCount; columnIndex++) {
        const { cellType } = this.cells[rowIndex][columnIndex];
        const cellElement = Utilities.domElement(`c_${rowIndex}_${columnIndex}`);

        if (cellType === CELL_TYPE.EMPTY) {
          cellElement.classList.remove(SNAKE_CLASS);
          cellElement.classList.remove(FOOD_CLASS);
        } else if (cellType === CELL_TYPE.SNAKE) {
          cellElement.classList.add(SNAKE_CLASS);
          cellElement.classList.remove(FOOD_CLASS);
        } else if (cellType === CELL_TYPE.FOOD) {
          cellElement.classList.add(FOOD_CLASS);
          cellElement.classList.remove(SNAKE_CLASS);
        }
      }
    }
  }
}
