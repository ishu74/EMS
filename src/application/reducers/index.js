import { combineReducers } from "redux";
import todoReducer from "./todoReducers";
import ui from './uiReducer';

export default combineReducers({
    ui,
    todoReducer,
  
})