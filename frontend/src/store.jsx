import {
  combineReducers,
  legacy_createStore as createStore,
  applyMiddleware,
} from "redux";
import { thunk } from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  productDetailsReducers,
  productListReducers,
  productDeleteReducers,
  productCreateReducers,
  productUpdateReducers,
  productReviewCreateReducer,
  productTopRatedReducer,
} from "./reducers/productReducer";
import { cartReducers } from "./reducers/cartReducers";
import {
  userLoginReducers,
  userRegisterReducers,
  userDetailsrReducers,
  userUpdateProfileReducers,
  userListReducers,
  userDeleteReducers,
  userUpdateReducers,
} from "./reducers/userReducers";
import {
  orderCreateReducers,
  orderDetailsReducers,
  orderPayReducers,
  orderListMyReducers,
  orderListReducers,
  orderDeliverReducers,
  paymentIntentReducer,
 
} from "./reducers/orderReducers";

const reducer = combineReducers({
  productList: productListReducers,
  productDetails: productDetailsReducers,
  productDelete: productDeleteReducers,
  productCreate: productCreateReducers,
  productUpdate : productUpdateReducers,
  productReviewCreate: productReviewCreateReducer,
  productTopRated: productTopRatedReducer,
  cart: cartReducers,
  userLogin: userLoginReducers,
  userRegister: userRegisterReducers,
  userList: userListReducers,
  userDelete: userDeleteReducers,
  userUpdate: userUpdateReducers,
  userDetails: userDetailsrReducers,
  userUpdateProfile: userUpdateProfileReducers,
  orderCreate: orderCreateReducers,
  orderDetails: orderDetailsReducers,
  orderPay: orderPayReducers,
  orderListMy: orderListMyReducers,
  orderList: orderListReducers,
  orderDeliver: orderDeliverReducers,
  paymentIntent: paymentIntentReducer
});

const cartItemsFromStorage = localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems"))
  : [];

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const shippingAddressFromStorage = localStorage.getItem("shippingAddress")
  ? JSON.parse(localStorage.getItem("shippingAddress"))
  : {};

const initialState = {
  cart: {
    cartItems: cartItemsFromStorage,
    shippingAddress: shippingAddressFromStorage,
  },
  userLogin: { userInfo: userInfoFromStorage },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
