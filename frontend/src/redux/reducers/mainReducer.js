import { combineReducers } from "redux";
import courseReducer from "./coursesReducer";
import usersReducer from "./userReducer";

const mainReducer = combineReducers({
  courses: courseReducer,
  users: usersReducer,
});

export default mainReducer;
