import { combineReducers } from 'redux';
import categoryReducer from './categoryReducer';
import productReducer from './productReducer';
import cartReducer from './cartReducer';
import userReducer from './userReducer';
import orderReducer from './orderReducer';
import orderDetailReducer from './orderDetailReducer';
import paymentReducer from './paymentReducer';
import authReducer from './authReducer';
import reviewReducer from './reviewReducer';
import ratingReducer from './ratingReducer';
import searchReducer from './searchReducer';


const rootReducer = combineReducers({
  category: categoryReducer,
});

export default rootReducer;
