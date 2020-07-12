const SNAKE_CLASS = "snake";
const FOOD_CLASS = "food";

class Board {
  constructor(gameBoardElementId, rowsNumber, columnsNumber) {
    this.gameBoardElement = Utilities.domElement(gameBoardElementId);
    this.rowsNumber = rowsNumber;
    this.columnsNumber = columnsNumber;

    this.generateGrid();
  }

  get getRowsCount() {
    return this.rowsNumber;
  }

  get getColumnsCount() {
    return this.columnsNumber;
  }

  generateGrid() {
    this.gameBoardElement.innerHTML = "";

    this.initCells();

    const self = this;
    this.browseAllCells(function (rowIndex, columnIndex) {
      self.generateEmptyCell(rowIndex, columnIndex);
    });
  }

  browseAllCells(fn) {
    for (let rowIndex = 0; rowIndex < this.rowsNumber; rowIndex++) {
      for (let columnIndex = 0; columnIndex < this.columnsNumber; columnIndex++) {
        fn(rowIndex, columnIndex);
      }
    }
  }

  initCells() {
    this.cells = Array.from(Array(this.rowsNumber), () => new Array(this.columnsNumber));
  }

  generateEmptyCell(rowIndex, columnIndex) {
    const cell = document.createElement("div");
    cell.className = "cell";
    cell.id = `c_${rowIndex}_${columnIndex}`;
    this.gameBoardElement.appendChild(cell);

    this.cells[rowIndex][columnIndex] = new Cell(rowIndex, columnIndex, CELL_TYPE.EMPTY);
  }

  placeFood() {
    const availableCells = this.availableCells();
    const cellIndex = Utilities.randomInteger(0, availableCells.length);

    availableCells[cellIndex].cellType = CELL_TYPE.FOOD;
  }

  availableCells() {
    const self = this;
    const availableCells = [];

    this.browseAllCells(function (rowIndex, columnIndex) {
      if (self.cells[rowIndex][columnIndex].cellType === CELL_TYPE.EMPTY) {
        availableCells.push(self.cells[rowIndex][columnIndex]);
      }
    });
    return availableCells;
  }

  render() {
    const self = this;

    this.browseAllCells(function (rowIndex, columnIndex) {
      const { cellType } = self.cells[rowIndex][columnIndex];
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
    });
  }
}
