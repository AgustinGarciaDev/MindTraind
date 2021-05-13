const initialState = {
    courses: []
}

const courseReducer = (state = initialState, action) => {

    switch (action.type) {
        case 'GET_COURSES':
            return {
                ...state,
                courses: action.payload
            };

        case 'UPDATE_CATEGORY':
            return {
                ...state,
                courses: state.courses.map(course => {
                    if (course._id === action.payload._id) {
                        course = action.payload
                    }
                    return course
                })
            }

        default:
            return state
    }
}

export default courseReducer