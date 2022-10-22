const initialState = {  // kinda like a constructor
    currentUser: null
}

export const user = (state = initialState, action) => {
    return {
        ...state,
        currentUser: action.currentUser
    }
}

// reducers stores the state and update it whenever there is an action