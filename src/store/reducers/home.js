import types from '../actionTypes/homeTypes';

const initialState = {
  high_mi: '00:00'
}

export default function homeReducer(state = initialState, action) {
  switch (action.type) {
    case types.SET_HIGH_SCORE_MI:
      const { high_mi } = action; 
      return Object.assign({}, state, {
        high_mi
      })
    default:
      return state;
  }
}