import types from '../actionTypes/sweeperTypes';

export function uncover(payload) {
  return { type: UNCOVER, payload }
}

export function seedBoard(dimensions) {
  return { type: types.SEED_BOARD, dimensions }
}

export function updateBoard(board) {
  return { type: types.UPDATE_BOARD, board }
}

export function rightClick(payload) {
  return { type: types.RIGHT_CLICK, payload }
}

export function gameOver(board) {
  return { type: types.GAME_OVER, board }
}