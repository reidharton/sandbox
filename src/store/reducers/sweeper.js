import types from '../actionTypes/sweeperTypes'

const initialState = {
  gameWon: false,
  gameLost: false,
  board: [],
  mines: 10,
  flags: 0,
  uncovered: 0
}

function sweeperReducer(state = initialState, action) {
  const { tile, board } = action;
  let lost, won = false;

  switch(action.type){
    case types.SEED_BOARD:
      const { dimensions } = action;
      const board = createNewBoard(dimensions);
      return Object.assign({}, state, {
        board
      })
    case types.RIGHT_CLICK:
      // console.log('right click')
      return Object.assign({}, state, {
        
      })
    case types.UNCOVER:
      const newBoard = [...state.board]  
      if(newBoard[tile.row][tile.col].flag){
        return state;
      }else if(isBomb(tile.row, tile.col, newBoard)){
        newBoard[tile.row][tile.col].hit = true;
        uncoverBoard(newBoard);
        // lost = true;
      }
      newBoard[tile.row][tile.col].covered = false; 
      won = (state.flags + state.uncovered) === 90;
      return Object.assign({}, state, {
        gameWon: won,
        gameLost: lost,
        board: newBoard,
        uncovered: state.uncovered + 1
      })
    default:
      return state;
  }
}

export default sweeperReducer;

// Extract all this later
const directions = [[0,1],[0,-1],[1,0],[-1,0],[1,1],[1,-1],[-1,1],[-1,-1]];

const uncoverBoard = (board) => {
  board.forEach((row) => {
    row.forEach((tile) => {
      if(!tile.flag && tile.bomb){
        tile.covered = false;
      }
    })
  })
}

const createNewBoard = (dimensions) => {
  const newBoard = generateEmptyBoard(dimensions)
  placeBombs(newBoard);
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

const placeBombs = (emptyBoard) => {
  let row = 0;
  let col = 0;
  for(let i = 0; i < emptyBoard.length; i++){
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

const isBomb = (row, col, board) => {
  if(isValidCoordinate(row, col, board)){
    return board[row][col].bomb;
  }
}

const isValidCoordinate = (row, col, board) => {
  return (row >= 0 && row < board.length && col >= 0 && col < board.length)
}