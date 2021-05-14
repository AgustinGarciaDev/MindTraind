import { combineReducers } from "redux";
import courseReducer from "./coursesReducer";
import jobReducer from "./jobReucer";
import userReducer from "./userReducer";

const mainReducer = combineReducers({
  courses: courseReducer,
  user: userReducer,
  jobs: jobReducer
});

export default mainReducer;
