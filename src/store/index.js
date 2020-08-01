import { createStore, applyMiddleware } from 'redux';
import minesweeperMiddleware from '../store/middleware/minesweeper';
import rootReducer from './reducers';

const store = createStore(rootReducer);

export default store;