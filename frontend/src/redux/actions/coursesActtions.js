import axios from "axios"
import { showToast, showTostError500 } from "../../helpers/myToast"

const coursesActions = {

    getCourses: () => {
        return async (dispatch, getState) => {
            try {
                const response = await axios.get('http://localhost:4000/api/courses')
                if (!response.data.success) {
                    showToast("error", response.data.error)
                    return response.data
                }
                dispatch({ type: 'GET_COURSES', payload: response.data.response })
            } catch (err) {
                showTostError500();
            }

        }
    },

    editCourse: (data) => {
        return async (dispatch, getState) => {
            try {
                const response = await axios.put('http://localhost:4000/api/courses/' + data.id, data)
                if (response.data.success) {
                    dispatch({ type: 'GET_COURSES', payload: response.data.response })
                    return response
                } else {
                    showToast("error", response.data.error)
                }
            } catch (err) {
                console.log(err);
                showTostError500();
            }
        }
    },

    addCourse: (data) => {
        return async (dispatch, getState) => {
            try {
                const response = await axios.post('http://localhost:4000/api/courses', data)
                if (response.data.success) {
                    dispatch({ type: 'GET_COURSES', payload: response.data.response })
                    return response
                } else {
                    showToast("error",response.data.error)
                    return response
                }
            } catch (err) {
                console.log(err);
                showTostError500();
            }
        }
    },

    addStudentToCourse: (email) => {
        
    }
    

}

export default coursesActions