import types from '../actionTypes/sweeperTypes'
import { createNewBoard, uncoverBoard, isBomb } from './logic';

const initialState = {
  gameWon: false,
  gameLost: false,
  board: createNewBoard(10),
  mines: 10,
  flags: 0,
  uncovered: 0
}

function sweeperReducer(state = initialState, action) {
  const { tile, board } = action;
  let lost, won = false;

  switch(action.type){
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

