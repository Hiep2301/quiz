import { combineReducers } from "redux";
import userReducer from "./userReducer";

// Kết hợp các reducer lại, ở đây chỉ có userReducer
const rootReducer = combineReducers({
  user: userReducer, // userReducer quản lý trạng thái liên quan đến người dùng
});

export default rootReducer;
