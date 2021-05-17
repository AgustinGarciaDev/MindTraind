import axios from "axios";

/* import { ToastContainer, toast, helpers, showToast } from "react-toastify"; */
import { showToast, showTostError500 } from "../../helpers/myToast";

const usersActions = {
  signUpUser: (objInputsValues) => {
    return async (dispatch, getState) => {
      try {
        const response = await axios.post("http://localhost:4000/api/users/signup", objInputsValues);
        if (response.data.success) {
          dispatch({ type: "LOGIN_USER", payload: response.data.response });
          showToast("success", `Welcome ${response.data.response.firstName} ${response.data.response.lastName}`);
        } else {
          return response
        }
      } catch (err) {
        console.log(err);
        showTostError500();
      }
    };
  },
  logInUser: (objInputsValues) => {
    return async (dispatch) => {
      try {
        const response = await axios.post("http://localhost:4000/api/users/login", objInputsValues);
        if (response.data.success) {
          dispatch({ type: "LOGIN_USER", payload: response.data.response });
          showToast("success", `Welcome ${response.data.response.firstName} ${response.data.response.lastName}`);
        } else {
          return response
        }
      } catch (err) {
        console.log(err);
        showTostError500();
      }
    };
  },
  loginForced: (token, history) => {
    return async (dispatch, getState) => {
      try {
        const { data } = await axios.get("http://localhost:4000/api/usersforcedlogin", {
          headers: { Authorization: "Bearer " + token },
        });

        dispatch({ type: "LOGIN_USER", payload: { ...data.response, token } });
      } catch (err) {
        alert("Error 500 , please come back later");
        console.log(err);
        if (err.response && err.response.status === 401) {
          alert("try harder next time");
          //localStorage.clear();
          window.location.reload(true);
          //history.push("/");
        }
        localStorage.clear();
      }
    };
  },

  logOutUser: () => {
    return (dispatch, getState) => {
      showToast("info", "Come back later ", "top-right");
      dispatch({ type: "LOG_OUT" });
    };
  },
};

export default usersActions;
