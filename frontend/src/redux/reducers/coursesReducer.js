const initialState = {
    courses: []
}

const courseReducer = (state = initialState, action) => {

    switch (action.type) {
        case 'GET_COURSES':
            return {
                ...state,
                courses: action.payload
            }

        default:
            return state
    }
}

export default courseReducer