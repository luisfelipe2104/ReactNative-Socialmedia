import { USER_STATE_CHANGE, USER_POSTS_STATE_CHANGE } from "../constants"

const initialState = {  // kinda like a constructor
    currentUser: null,
    // posts: []
}

export const user = (state = initialState, action) => {
    switch(action.type) {
        case USER_STATE_CHANGE:
            return {
                ...state,
                currentUser: action.currentUser // updates users
            }
        case USER_POSTS_STATE_CHANGE:
            return {
                ...state,
                posts: action.posts // updates posts
            }
        default:
            return state    // returns the initial state
    }

}

// reducers stores the state and update it whenever there is an action