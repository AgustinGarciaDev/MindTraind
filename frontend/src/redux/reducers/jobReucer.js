const initialState = {
    jobs: []
}

const jobReducer = (state = initialState, action) => {

    switch (action.type) {

        case 'GET_JOBS':
            return {
                ...state,
                jobs: action.payload
            }

        case 'ADD_JOB':
            return {
                ...state,
                jobs: action.payload
            }

        case 'UPDATE_JOBS':
            return {
                ...state,
                jobs: state.jobs.map(job => {
                    if (job._id === action.payload._id) {
                        job = action.payload
                    }
                    return job
                })
            }

        default:
            return state
    }
}

export default jobReducer


