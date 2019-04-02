import { combineReducers } from "redux";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import fabricantReducer from "./fabricantReducer";
import brandReducer from "./brandReducer";
import productReducer from "./productReducer";
import marketReducer from "./marketReducer";
import userReducer from "./userReducer";

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  fabricant: fabricantReducer,
  brand: brandReducer,
  product: productReducer,
  market: marketReducer,
  user: userReducer
});
