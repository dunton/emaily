import { combineReducers } from "redux";
import authReducer from "./authReducer";

export default combineReducers({
  // keys we provide here represent keys in state object
  auth: authReducer
});
