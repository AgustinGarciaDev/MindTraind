import axios from 'axios'
import { showToast, showTostError500 } from "../../helpers/myToast"

const JobActions = {
    addJob: (data) => {
        return async (dispatch, getState) => {
            try {
                const response = await axios.post('http://localhost:4000/api/jobs', data)
                if (response.data.success) {
                    dispatch({ type: 'ADD_JOB', payload: response.data.response })
                    return response
                } else {
                    return response
                }
            } catch (err) {
                console.log(err);
                showTostError500();
            }
        }
    },

    getJobs: () => {
        return async (dispatch, getState) => {
            try {
                const response = await axios.get('http://localhost:4000/api/jobs')
                if (response.data.success) {
                    dispatch({ type: 'GET_JOBS', payload: response.data.response })
                    return response
                } else {
                    return response
                }
            } catch (err) {
                console.log(err);
                showTostError500();
            }
        }
    },

    updateJob: (data) => {
        return async (dispatch, getState) => {
            try {
                const response = await axios.put('http://localhost:4000/api/jobs/' + data.id, {...data.job})
                if (response.data.success) {
                    dispatch({ type: 'UPDATE_JOBS', payload: response.data.response })
                    return response
                } else {
                    return response
                }
            } catch (err) {
                console.log(err);
                showTostError500();
            }
        }
    },


}

export default JobActions