import axios from 'axios'
import { showTostError500 } from "../../helpers/myToast"

const JobActions = {
    addJob: (data) => {
        return async (dispatch, getState) => {
            try {
                const response = await axios.post('https://trained-mind.herokuapp.com/api/jobs', data)
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
                const response = await axios.get('https://trained-mind.herokuapp.com/api/jobs')
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
                const response = await axios.put('https://trained-mind.herokuapp.com/api/jobs/' + data.id, { ...data.job })
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