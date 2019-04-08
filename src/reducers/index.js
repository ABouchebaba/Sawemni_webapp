import { combineReducers } from "redux";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import productReducer from "./productReducer";
import marketReducer from "./marketReducer";
import userReducer from "./userReducer";

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  product: productReducer,
  market: marketReducer,
  user: userReducer
});
