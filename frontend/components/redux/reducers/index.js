import { combineReducers } from "redux";
import { user } from './user'

export const Reducers = combineReducers({
    userState: user
})

export default Reducers