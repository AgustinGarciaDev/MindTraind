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
        case 'UPDATE_COURSE': 
            let newCourses = state.courses.map(course => {
                if(course._id === action.payload._id)
                    return action.payload
                return course
            })
            return {
                ...state,
                courses : newCourses
            }
        default:
            return state
    }
}

export default courseReducer