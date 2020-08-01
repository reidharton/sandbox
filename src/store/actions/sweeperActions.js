import types from '../actionTypes/sweeperTypes';

export function uncover(tile) {
  return { type: types.UNCOVER, tile }
}

export function seedBoard(dimensions) {
  return { type: types.SEED_BOARD, dimensions }
}

export function updateBoard(board) {
  return { type: types.UPDATE_BOARD, board }
}

export function rightClick(tile) {
  return { type: types.RIGHT_CLICK, tile }
}

export function gameOver(board) {
  return { type: types.GAME_OVER, board }
}