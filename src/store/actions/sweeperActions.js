import types from '../actionTypes/sweeperTypes';

export function uncover(tile) {
  return { type: types.UNCOVER, tile }
}

export function seedBoard(bombs) {
  return { type: types.SEED_BOARD, bombs }
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

export function togglePlay() {
  return { type: types.TOGGLE_PLAY }
}

export function toggleFlagMode() {
  return { type: types.TOGGLE_FLAG_MODE }
}