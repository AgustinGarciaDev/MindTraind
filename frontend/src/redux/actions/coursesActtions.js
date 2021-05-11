import axios from "axios"

const coursesActions = {

    getCourses: (data) => {
        return async (dispatch, getState) => {
            const response = await axios.get('http://localhost:4000/api/courses')
            if(!response.data.success){
                return response.data
            }
            dispatch({type: 'GET_COURSES', payload: response.data.response})
        }
    }

}

export default coursesActions