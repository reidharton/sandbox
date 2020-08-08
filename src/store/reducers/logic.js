// Extract all this later
const directions = [[0,1],[0,-1],[1,0],[-1,0],[1,1],[1,-1],[-1,1],[-1,-1]];

export const uncoverBoard = (board) => {
  board.forEach((row) => {
    row.forEach((tile) => {
      if(!tile.flag && tile.bomb){
        tile.covered = false;
      }
    })
  })
}

export const createNewBoard = (dimensions, bombs) => {
  const newBoard = generateEmptyBoard(dimensions)
  placeBombs(newBoard, bombs);
  placeNumbers(newBoard);
  return newBoard;
}

const generateEmptyBoard = (dimensions) => {
  const board = [];
  for(let i = 0; i < dimensions; i++){
    let newRow = [];
    for(let j = 0; j < dimensions; j++){
      newRow.push({
        val: 0, 
        row: i,
        col: j,
        hit: false,
        flag: false,
        bomb: false,
        covered: true,
      });
    }
    board.push(newRow);
  }
  return board;
}

// assuming a square board for now
const placeBombs = (emptyBoard, numBombs) => {
  let row = 0;
  let col = 0;
  for(let i = 0; i < numBombs; i++){
    do{
      row = Math.floor(Math.random() * emptyBoard.length)
      col = Math.floor(Math.random() * emptyBoard.length)
    }while(emptyBoard[row][col].val !== 0)
    emptyBoard[row][col].bomb = true;
  }
  return emptyBoard;
}

const placeNumbers = (board) => {
  for(let row = 0; row < board.length; row++){
    for(let col = 0; col < board.length; col++){
      checkSurrounding(row, col, board);
    }
  }
  return board;
}

const checkSurrounding = (row, col, board) => {
  if(isBomb(row, col, board)){ return }
  let count = 0;
  directions.forEach((coord) => {
    if(isBomb(row + coord[0], col + coord[1], board)){
      count++;
    }
  })
  board[row][col].val = count;
}

export const isBomb = (row, col, board) => {
  if(isValidCoordinate(row, col, board)){
    return board[row][col].bomb;
  }
}

const isValidCoordinate = (row, col, board) => {
  return (row >= 0 && row < board.length && col >= 0 && col < board.length)
}