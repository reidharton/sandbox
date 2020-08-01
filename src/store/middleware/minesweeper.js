import {
  UNCOVER,
  SEED_BOARD,
  RIGHT_CLICK
} from '../actionTypes/sweeperTypes';
import { updateBoard, gameOver } from '../actions/sweeperActions';

const BOMB = 'B';
const directions = [[0,1],[0,-1],[1,0],[-1,0],[1,1],[1,-1],[-1,1],[-1,-1]];
let uncovered;
let payload;
let board;
let flags;
let row;
let col;
export function minesweeperMiddleware({ dispatch }) {
  return function(next){
    return function(action){
      uncovered = 0;
      flags = 0;
      switch(action.type){
        // MAKE NEW BOARD
        case SEED_BOARD:
          board = [];
          const { dimension } = action;
          for(let i = 0; i < dimension; i++){
            let newRow = [];
            for(let j = 0; j < dimension; j++){
              newRow.push({val: 0, covered: true, flag: false, hit: false});
            }
            board.push(newRow);
          }
          placeBombs();
          placeNumbers();
          payload = { board, uncovered, flags }
          return dispatch(updateBoard(payload))
        // UNCOVER TILES
        case UNCOVER:
          board = action.payload.board;
          row = action.payload.coord.row;
          col = action.payload.coord.col;
          if(board[row][col].flag){
            break;
          }
          if(isBomb(row, col, board)){
            uncoverBoard();
            board[row][col].hit = true;
            return dispatch(gameOver(board))
          }
          uncoverSpaces(row, col, board);
          payload = { board, uncovered, flags }
          return dispatch(updateBoard(payload));
        // TOGGLE FLAG
        case RIGHT_CLICK:
          board = action.payload.board;
          row = action.payload.coord.row;
          col = action.payload.coord.col;
          if(board[row][col].covered){
            flags = (board[row][col].flag) ? -1 : 1;
            board[row][col].flag = !board[row][col].flag;
          }else{
            if(autoClear()){
              uncoverBoard()
              return dispatch(gameOver({ board }))
            }
          }
          payload = { board, uncovered, flags }
          return dispatch(updateBoard(payload))
        default:
          // no default action ever taken as of yet
      }
      return next(action);
    }
  }
}

// returns true if bomb mistakenly uncovered
const autoClear = () => {
  let adjacentFlags = 0;
  directions.forEach((coord) => {
    if(isValidCoordinate(row + coord[0], col + coord[1]))
    if(board[row + coord[0]][col + coord[1]].flag){
      adjacentFlags++;
    }
  })
  let gameLost = false;
  if(adjacentFlags === board[row][col].val){
    directions.forEach((coord) => {
      if(isValidCoordinate(row + coord[0], col + coord[1])){
        if((!board[row + coord[0]][col + coord[1]].flag) && (board[row + coord[0]][col + coord[1]].val === 'B')){
          board[row + coord[0]][col + coord[1]].hit = true;
          gameLost = true;
        }
        uncoverSpaces(row + coord[0], col + coord[1])
      }
    })
  }
  return gameLost;
}

const uncoverBoard = () => {
  board.forEach((row) => {
    row.forEach((tile) => {
      if(!tile.flag && tile.val === 'B'){
        tile.covered = false;
      }
    })
  })
}
const uncoverSpaces = (row, col) => {
  if(isValidCoordinate(row, col)){
    if(!board[row][col].covered || board[row][col].flag){ return }
    if(board[row][col].val === 0){
      board[row][col].covered = false;
      uncovered++;
      directions.forEach((coord) => {
        return uncoverSpaces(row + coord[0], col + coord[1])
      })
    }else{
      board[row][col].covered = false;
      uncovered++;
    }
  }
}

const placeBombs = () => {
  let row;
  let col;
  for(let i = 0; i < board.length; i++){
    do{
      row = Math.floor(Math.random() * 10)
      col = Math.floor(Math.random() * 10)
    }while(board[row][col].val !== 0)
    board[row][col].val = BOMB;
  }
}

const placeNumbers = () => {
  for(let row = 0; row < board.length; row++){
    for(let col = 0; col < board.length; col++){
      checkSurrounding(row, col);
    }
  }
}

const checkSurrounding = (row, col) => {
  if(isBomb(row, col, board)){ return }
  let count = 0;
  directions.forEach((coord) => {
    if(isBomb(row + coord[0], col + coord[1], board)){
      count++;
    }
  })
  board[row][col].val = count;
}

const isBomb = (row, col) => {
  if(isValidCoordinate(row, col)){
    return board[row][col].val === BOMB;
  }
}

const isValidCoordinate = (row, col) => {
  return (row >= 0 && row < board.length && col >= 0 && col < board.length)
}