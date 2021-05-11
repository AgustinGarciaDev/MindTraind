import axios from "axios"

const coursesActions = {

    getCourses: () => {
        return async (dispatch, getState) => {
            const response = await axios.get('http://localhost:4000/api/courses')
            if (!response.data.success) {
                return response.data
            }
            dispatch({ type: 'GET_COURSES', payload: response.data.response })
        }
    },

    editCourse: (data) => {
        return async (dispatch, getState) => {
            const response = await axios.put('http://localhost:4000/api/courses/' + data.id, data)
            if (response.data.success) {
                dispatch({ type: 'GET_COURSES', payload: response.data.response })
                return response
            }
        }
    }

}

export default coursesActions