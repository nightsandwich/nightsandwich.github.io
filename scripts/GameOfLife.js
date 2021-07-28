class GameOfLife {
  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.board = this.makeBoard();
  }

  /**
   * Returns a 2D Array
   */

  makeBoard() {
    // TODO: Create and return an 2D Array 
    // with `this.heigh` as rows and `this.width` as cols.
    // For example, given a height of 4 and a width of 3, it will generate:
    // [
    //  [0, 0, 0],
    //  [0, 0, 0],
    //  [0, 0, 0],
    //  [0, 0, 0],
    // ]
    return new Array(this.height).fill().map(_=> {return new Array(this.width).fill(0)});
  }

  getCell(row, col) {
    if (row >= 0 && col >= 0 && row < this.height && col < this.width) return this.board[row][col];
    return -1;
  }

  setCell(value, row, col) {
    this.board[row][col] = value;
  }

  toggleCell(row,col) {
    this.board[row][col] === 0 ? this.setCell(1, row, col) : this.setCell(0, row, col);
  }


  /**
   * Return the amount of living neighbors around a given coordinate.
   */

  livingNeighbors(row, col) {
    // TODO: Return the count of living neighbors.

    let count = 0;

    if (this.getCell(row, col -1) === 1) count++;
    if (this.getCell(row, col+1) === 1) count++;
    if (this.getCell(row-1, col) === 1) count++;
    if (this.getCell(row+1, col) === 1) count++;
    if (this.getCell(row-1, col-1) === 1) count++;
    if (this.getCell(row-1, col+1) === 1) count++;
    if (this.getCell(row+1, col+1) === 1) count++ 
    if (this.getCell(row+1, col-1) === 1) count++;
    
    return count;
  }


  /**
   * Given the present board, apply the rules to generate a new board
   */
  
  tick() {
    const newBoard = this.makeBoard();
    
    for (let i = 0; i < this.height; i++){
      for (let j = 0; j < this.width; j++){
        const alive = this.livingNeighbors(i, j);
        let currentCell = this.board[i][j];
        if (currentCell === 1){ //current cell is alive
          if (alive < 2 ){
            newBoard[i][j] = 0;
          } else if (alive > 3){
            newBoard[i][j] = 0; 
          } else {
            newBoard[i][j] = 1;
          }
        } else if (currentCell === 0){ //current cell is dead
          if (alive === 3){
            newBoard[i][j] = 1;
          }
        }
      }
    }
    this.board = newBoard;
    

    
    // TODO: Here is where you want to loop through all the cells
    // on the existing board and determine, based on it's neighbors,
    // whether the cell should be dead or alive in the new board 
    // (the next iteration of the game) 
    //
    // You need to:
    // 1. Count alive neighbors for all cells
    // 2. Set the next state of all cells in newBoard,
    // based on their current alive neighbors
  }
}
