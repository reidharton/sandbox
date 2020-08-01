import { combineReducers } from 'redux';
import homeReducer from './home';
import sweeperReducer from './sweeper';

const rootReducer = combineReducers({
  homeReducer,
  sweeperReducer
})

export default rootReducer;