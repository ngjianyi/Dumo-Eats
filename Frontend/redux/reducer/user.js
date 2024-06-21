//an object that represents the initial state of user variable, which is set to null when initialised
const initialState = {
    currentUser: null
}
//a function that acts as a reducer that takes in current state of user(if undefined then it takes in null) and returns 
//the new state after taking action
//...state is used to copy all properties from the current state into a new state object, because state is immutable in redux
//currentUser: action.currentUser adds or overrides the currentUser property in the new state object with the value from action.currentUser.
export const user = (state=initialState, action) => {
    return {
        ...state,
        currentUser: action.currentUser
    }
}