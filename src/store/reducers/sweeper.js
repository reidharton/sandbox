import types from '../actionTypes/sweeperTypes'

const initialState = {
  gameStatus: 'PENDING',
  board: [],
  mines: 10,
  flags: 0,
  uncovered: 0
}

function sweeperReducer(state = initialState, action) {
  const { tile, board } = action;

  switch(action.type){
    case types.SEED_BOARD:
      const { dimensions } = action;
      const board = createNewBoard(dimensions);
      return Object.assign({}, state, {
        board
      })
    case types.UPDATE_BOARD:
      const { mines, uncovered, gameStatus } = state;

      const status = (mines + uncovered + board.uncovered === 100) ?
        'WON' : (uncovered + board.uncovered === 0) ?
        "STARTED" : gameStatus;

      return Object.assign({}, state, {
        gameStatus: status,
        board
      })
    case types.RIGHT_CLICK:
      // console.log('right click')
      const newBoard = [...state.board]
      // console.log('before',newBoard[[tile.row][tile.col]])
      newBoard[tile.row][tile.col].flag = !state.board[tile.row][tile.col].flag
      console.log('after',newBoard[tile.row][tile.col])
      return Object.assign({}, state, {
        board: newBoard
      })
    case types.UNCOVER:
      console.log('uncovering',tile)
        
      return Object.assign({}, state, {

      })
    case types.GAME_OVER:
      return {
        gameStatus: 'LOST',
        uncovered: 0,
        mines: 10,
        flags: 0,
        board
      };
    default:
      return state;
  }
}

export default sweeperReducer;

// Extract all this later
const BOMB = 'B';
const directions = [[0,1],[0,-1],[1,0],[-1,0],[1,1],[1,-1],[-1,1],[-1,-1]];

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
    emptyBoard[row][col].val = BOMB;
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
    return board[row][col].val === BOMB;
  }
}

const isValidCoordinate = (row, col, board) => {
  return (row >= 0 && row < board.length && col >= 0 && col < board.length)
}