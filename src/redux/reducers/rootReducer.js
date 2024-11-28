import { combineReducers } from 'redux';

import authReducer from './authReducer.js';
import blogReducer from './blogReducer.js';
import cartReducer from './cartReducer.js';
import categoryReducer from './categoryReducer.js';
import chatReducer from './chatReducer.js';
import commentReducer from './commentReducer.js';
import orderDetailReducer from './orderDetailReduce.js';
import orderReducer from './orderReducer.js';
import paymentReducer from './paymentReducer.js';
import productReducer from './productReducer.js';
import productVariantReducer from './productVariantReducer.js';
import ratingReducer from './ratingReducer.js';
import uploadImageReducer from './uploadImageReducer.js';
import userReducer from './userReducer.js';
import voucherReducer from './voucherReducer.js';


const rootReducer = combineReducers({
  auth: authReducer,
  blog: blogReducer,
  cart: cartReducer,
  category: categoryReducer,
  chat: chatReducer,
  comment: commentReducer,
  order: orderReducer,
  orderDetail: orderDetailReducer,
  payment: paymentReducer,
  product: productReducer,
  productVariant: productVariantReducer,
  rating: ratingReducer,
  uploadImage: uploadImageReducer,
  user: userReducer,
  voucher: voucherReducer,
});

export default rootReducer;
