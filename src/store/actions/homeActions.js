import types from '../actionTypes/homeTypes';

export function setHighScoreMi(high_mi) {
  return { type: types.SET_HIGH_SCORE_MI, high_mi }
}