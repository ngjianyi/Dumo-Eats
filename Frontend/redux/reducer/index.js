import { combineReducers } from "redux"
import { user } from "./user"

//basically combining multiple reducer functions such as "user" reducer under "userState" key into a single function
//easier to export to the redux store
//
const Reducer = combineReducers({
    userState: user
})

export default Reducer

