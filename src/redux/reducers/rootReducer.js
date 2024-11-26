import { combineReducers } from 'redux';
import categoryReducer from './categoryReducer';

const rootReducer = combineReducers({
  category: categoryReducer,
});

export default rootReducer;
