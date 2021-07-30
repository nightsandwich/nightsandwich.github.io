//const width = 40;
//const height = 30; // width and height dimensions of the board
const width = 30;
const height = 30;
/**
 * Create a Game of Life instance
 */

const gol = new GameOfLife(width, height);


/**
 * create a table and append to the DOM
 */

// Actual table cells
const tds = [];

// <table> element
const table = document.createElement("tbody");
// build a table row <tr>
for (let h = 0; h < height; h++) {
  const tr = document.createElement("tr");
  // build a table column <td>
  for (let w = 0; w < width; w++) {
    const td = document.createElement("td");
    // We'll put the coordinates on the cell
    // Element itself (using dataset),
    // letting us fetch it in a click listener later.
    td.dataset.row = h;
    td.dataset.col = w;
    tds.push(td);
    tr.append(td);
  }
  table.append(tr);
}
document.getElementById("board").append(table);


/**
 * Draws every cell from the gol instance into an actual, visible DOM element
 */
let count = 0;
let extra = 1;

const paint = () => { 
  let livingCells = 0;
  for (let i = 0; i < tds.length; i++){
    const row = tds[i].dataset.row;
    const col = tds[i].dataset.col; 

    if (gol.board[row][col] === 1){
//      livingCells++;
      tds[i].classList = 'darker';
      if (count > 1){
        tds[i].classList = 'darker' + String(extra);
        if (extra === 9) extra = 1;
        else extra++;
      }
    } else tds[i].classList = '';
//    console.log(livingCells);
  }

  
  // TODO:
  //   1. For each <td> in the table:
  //     a. If its corresponding cell in gol instance is alive,
  //        give the <td> the `alive` CSS class.
  //     b. Otherwise, remove the `alive` class.
  //
  // To find all the <td>s in the table, you might query the DOM for them, or you
  // could choose to collect them when we create them in createTable.
  //
  // HINT:
  //   https://developer.mozilla.org/en-US/docs/Web/API/Element/classList
  //   https://developer.mozilla.org/en-US/docs/Web/API/Element/getElementsByTagName
}


/**
 * Event Listeners
 */

document.getElementById("board").addEventListener("click", event => {
  // TODO: Toggle clicked cell (event.target) and paint
  //event.target.classList.toggle('alive');

  const row = event.target.dataset.row;
  const col = event.target.dataset.col;

  gol.toggleCell(row, col);
  paint();
});

document.getElementById("step_btn").addEventListener("click", event => {
  // TODO: Do one gol tick and paint
  gol.tick();
  paint();
});

function step (){
  gol.tick();
  paint();
  count++;
//    extra++;
}

let nIntervId;

function autoPlay(){
  nIntervId = setInterval(step, 300);
}

function stopPlay(){
  clearInterval(nIntervId);
}


document.getElementById("play_btn").addEventListener("click", event => {
  
  autoPlay();
  // TODO: Start playing by calling `tick` and paint
  // repeatedly every fixed time interval.
  // HINT:
  // https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/setInterval
});

document.getElementById("random_btn").addEventListener("click", event => {
  // TODO: Randomize the board and paint
  const numberAlive = Math.floor(Math.random() * (height * width));
  for (let i = 1; i <= numberAlive; i++){
    const row = Math.floor(Math.random() * height);
    const col = Math.floor(Math.random() * width);
    gol.setCell(1,row, col);
  }
  paint();
});

document.getElementById("clear_btn").addEventListener("click", event => {
  // TODO: Clear the board and paint
  stopPlay();
  const newBoard = gol.makeBoard();
  gol.board = newBoard;
  //gol.board.forEach((row,idx) => {
  //  gol.board[idx].fill(0);
  //});
  count = 0;
  extra = 1;
  paint();
});

document.getElementById('pause_btn').addEventListener('click', event => {
  stopPlay();
})

document.getElementById("fun_btn").addEventListener("click", event => {
  gol.board.forEach((row,idx) => {
    if (idx % 2) {
      gol.board[idx].fill(1);
    }
  });
  //count = 0;
  //extra = 1;
  
  autoPlay();
});

//not working
document.getElementById("yay_btn").addEventListener("click", event => { 
  gol.board.forEach((row,idx) => {
      if (idx === 5 || idx === 15 || idx === 25) {
      gol.board[idx].fill(1);
    }
  });

 // count = 0;
 // extra = 1;
  
  autoPlay();
});
