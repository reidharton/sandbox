import { UPDATE_COUNT } from '../actions-types/home-actions';

export function updateCount() {
  return { type: UPDATE_COUNT }
}
      
const initialState = {
  count: 0
}

export default function homeReducer(state = initialState, action) {
  switch (action.type) {
    case UPDATE_COUNT:
      return Object.assign({}, state, {
          count: state.count + 1
      })
    default:
      return state;
  }
}