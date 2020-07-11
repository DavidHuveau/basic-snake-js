const SNAKE_CLASS = "snake";
const FOOD_CLASS = "food";

class Board {
  constructor(gameBoardElementId, rowsNumber, columnsNumber) {
    this.gameBoardElement = Utilities.domElement(gameBoardElementId);
    this.rowsNumber = rowsNumber;
    this.columnsNumber = columnsNumber;

    this.generateGrid();

    // render test cells
    // this.cells[0][0].cellType = CELL_TYPE.SNAKE;
    // this.cells[19][19].cellType = CELL_TYPE.FOOD;
  }

  generateGrid() {
    this.gameBoardElement.innerHTML = "";

    this.initCells();

    for (let rowIndex = 0; rowIndex < this.rowsNumber; rowIndex++) {
      for (let columnIndex = 0; columnIndex < this.columnsNumber; columnIndex++) {
        this.generateCell(rowIndex, columnIndex);
      }
    }
  }

  initCells() {
    this.cells = Array.from(Array(this.rowsNumber), () => new Array(this.columnsNumber));
  }

  generateCell(rowIndex, columnIndex) {
    const cell = document.createElement("div");
    cell.className = "cell";
    cell.id = `c_${rowIndex}_${columnIndex}`;
    this.gameBoardElement.appendChild(cell);

    this.cells[rowIndex][columnIndex] = new Cell(rowIndex, columnIndex, CELL_TYPE.EMPTY);
  }

  // initCells() {
  //   this.cells = [...Array(this.rowsNumber)].map((row, rowIndex) => [...Array(this.columnsNumber)].map(
  //     (col, columnIndex) => new Cell(rowIndex, columnIndex, CELL_TYPE.EMPTY),
  //   ));
  // }

  placeFood() {
    const availableCells = this.availableCells();
    const cellIndex = Utilities.randomInteger(0, availableCells.length);

    availableCells[cellIndex].cellType = CELL_TYPE.FOOD;
  }

  availableCells() {
    const availableCells = [];

    // TODO add browseAllCells(fn) function
    for (let rowIndex = 0; rowIndex < this.rowsNumber; rowIndex++) {
      for (let columnIndex = 0; columnIndex < this.columnsNumber; columnIndex++) {
        if (this.cells[rowIndex][columnIndex].cellType === CELL_TYPE.EMPTY) {
          availableCells.push(this.cells[rowIndex][columnIndex]);
        }
      }
    }
    return availableCells;
  }

  render() {
    for (let rowIndex = 0; rowIndex < this.rowsNumber; rowIndex++) {
      for (let columnIndex = 0; columnIndex < this.columnsNumber; columnIndex++) {
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
