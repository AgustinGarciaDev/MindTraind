import axios from "axios"
import { showToast, showTostError500 } from "../../helpers/myToast"

const coursesActions = {

    getCourses: () => {
        return async (dispatch, getState) => {
            try {
                const response = await axios.get('https://trained-mind.herokuapp.com/api/courses')
                if (!response.data.success) {
                    showToast("error", response.data.error)
                    return response.data
                }
                dispatch({ type: 'GET_COURSES', payload: response.data.response })
            } catch (err) {
                console.log(err)
                showTostError500();
            }

        }
    },

    editCourse: (data) => {
        return async (dispatch, getState) => {
            console.log(data)
            try {
                const response = await axios.put('https://trained-mind.herokuapp.com/api/courses/' + data.id, { data: data.data, email: data.email })
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
                const response = await axios.post('https://trained-mind.herokuapp.com/api/courses', data)
                if (response.data.success) {
                    dispatch({ type: 'GET_COURSES', payload: response.data.response })
                    return response
                } else {
                    showToast("error", response.data.error)
                    return response
                }
            } catch (err) {
                console.log(err);
                showTostError500();
            }
        }
    },

    addStudentToCourse: (token, idCourse, action) => {
        return async (dispatch) => {
            try {

                const { data } = await axios.put("https://trained-mind.herokuapp.com/api/coursesmodifyStudents/" + idCourse, { action }, {
                    headers: { 'Authorization': 'Bearer ' + token }
                })
                if (!data.success) {
                    return showToast("error", data.error);
                }
                showToast("info", "Successfully enrolled")
                dispatch({ type: "UPDATE_COURSE", payload: data.response })
            } catch (err) {
                if (err.response && err.response.status === 401) {
                    localStorage.clear();
                    return showToast("error", "usuario no autorizado , acceso denegado")
                }
                console.log(err);
                showTostError500();
            }
        }
    },
    getCoursesByIdStudent: (token) => {
        return async () => {
            try {
                const { data } = await axios.get("https://trained-mind.herokuapp.com/api/coursesOfUser", {
                    headers: { "Authorization": "Bearer " + token }
                })

                return data

            } catch (err) {
                if (err.response && err.response.status === 401) {
                    localStorage.clear();
                    return showToast("error", "usuario no autorizado , acceso denegado")
                }
                console.log(err);
                showTostError500();
            }

        }
    },
    getCourseById: (idCourse) => {
        return async (dispatch) => {
            try {
                const { data } = await axios.get('https://trained-mind.herokuapp.com/api/courses/' + idCourse)
                if (data.success) {
                    dispatch({ type: "UPDATE_CURRENT_COURSE", payload: data.response });
                    return data.response
                }
                else
                    showToast("error", data.error)

            } catch (err) {
                console.log(err)
                showTostError500();
            }

        }
    },

    modifyCategory: (data) => {
        return async (dispatch, getState) => {
            try {
                const response = await axios.put('https://trained-mind.herokuapp.com/api/coursesmodifyCategory/' + data.idCourse, data)
                if (response.data.success) {
                    dispatch({ type: 'UPDATE_CATEGORY', payload: response.data.response })
                    return response.data.success
                }
            } catch (err) {
                console.log(err);
                showTostError500();
            }
        }
    },

    modifyLesson: (data) => {
        return async (dispatch, getState) => {
            try {
                const response = await axios.put('https://trained-mind.herokuapp.com/api/coursesmodifyLesson/' + data.idCourse, data)
                if (response.data.success) {
                    dispatch({ type: 'UPDATE_CATEGORY', payload: response.data.response })
                    return response.data.success
                }
            } catch (err) {
                console.log(err);
                showTostError500();
            }
        }
    },

    /* Comments */
    sendPost: (data) => {

        return async (dispatch, getState) => {
            try {
                const response = await axios.put('https://trained-mind.herokuapp.com/api/coursesmodifyComments/' + data.idCourse, data, {
                    headers: { Authorization: "Bearer " + data.token },
                })

                if (response.data.success) {
                    dispatch({ type: "UPDATE_COURSE", payload: response.data.response })
                }
            } catch (err) {
                console.log(err);
                showTostError500();
            }
        }
    },

    editPost: (data) => {

        return async (dispatch, getState) => {
            try {
                const response = await axios.put('https://trained-mind.herokuapp.com/api/coursesmodifyComments/' + data.idCourse, data, {
                    headers: { Authorization: "Bearer " + data.token },
                })
                if (response.data.success) {
                    dispatch({ type: "UPDATE_COURSE", payload: response.data.response })
                }
            } catch (err) {
                console.log(err);
                showTostError500();
            }
        }

    },
    deletePost: (data) => {
        return async (dispatch, getState) => {
            try {
                const response = await axios.put('https://trained-mind.herokuapp.com/api/coursesmodifyComments/' + data.idCourse, data, {
                    headers: { Authorization: "Bearer " + data.token },
                })
                if (response.data.success) {
                    dispatch({ type: "UPDATE_COURSE", payload: response.data.response })
                }
            } catch (err) {
                console.log(err);
                showTostError500();
            }
        }

    },

    /* Reply Comment */
    modifyReply: (data) => {

        return async (dispatch, getState) => {
            try {
                const response = await axios.put('https://trained-mind.herokuapp.com/api/coursesReplyAComment/' + data.idCourse, data, {
                    headers: { Authorization: "Bearer " + data.token },
                })
                if (response.data.success) {
                    dispatch({ type: "UPDATE_COURSE", payload: response.data.response });
                }
            } catch (err) {
                console.log(err);
                showTostError500();
            }
        }
    },





}

export default coursesActions