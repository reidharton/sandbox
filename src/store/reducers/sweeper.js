import types from '../actionTypes/sweeperTypes'
import { createNewBoard, uncoverBoard, isBomb } from './logic';

const MINES = 25;

const initialState = {
  play: false,
  gameWon: false,
  gameLost: false,
  flagMode: false,
  board: [],
  mines: MINES,
  flags: 0,
  uncovered: 0
}

function sweeperReducer(state = initialState, action) {
  const newBoard = [...state.board]  
  const { tile } = action;

  switch(action.type){
    case types.SEED_BOARD:
      const { bombs } = action;
      const mineseed = bombs ? bombs : MINES
      return Object.assign({}, state, {
        mineseed,
        gameWon: false,
        gameLost: false,
        board: createNewBoard(10, mineseed)
      })
    case types.RIGHT_CLICK:
      let { mines, flags } = state;
      newBoard[tile.row][tile.col].flag = !newBoard[tile.row][tile.col].flag
      flags = newBoard[tile.row][tile.col].flag ? flags + 1 : flags - 1
      mines = newBoard[tile.row][tile.col].flag ? mines - 1 : mines + 1
      return Object.assign({}, state, {
        flags,
        mines,
        board: newBoard,
        
      })
    case types.UNCOVER:
      let lost = false;
      if(newBoard[tile.row][tile.col].flag){
        return state;
      }else if(isBomb(tile.row, tile.col, newBoard)){
        newBoard[tile.row][tile.col].hit = true;
        uncoverBoard(newBoard);
        lost = true;
      }
      newBoard[tile.row][tile.col].covered = false; 
      const won = (state.uncovered + 1) === (100 - MINES);
      return Object.assign({}, state, {
        play: !(won || lost),
        gameWon: won,
        gameLost: lost,
        board: newBoard,
        uncovered: state.uncovered + 1
      })
    case types.TOGGLE_PLAY:
      return Object.assign({}, state, {
        play: !state.play
      })
    case types.TOGGLE_FLAG_MODE:
      return Object.assign({}, state, {
        flagMode: !state.flagMode
      })
    default:
      return state;
  }
}

export default sweeperReducer;

