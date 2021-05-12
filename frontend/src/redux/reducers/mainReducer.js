import { combineReducers } from 'redux'
import courseReducer from './coursesReducer'

const mainReducer = combineReducers({
    courses: courseReducer,
})

export default mainReducer