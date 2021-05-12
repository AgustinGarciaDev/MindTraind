import { combineReducers } from "redux";
import courseReducer from "./coursesReducer";
import userReducer from "./userReducer";

const mainReducer = combineReducers({
  courses: courseReducer,
  user: userReducer,
});

export default mainReducer;
