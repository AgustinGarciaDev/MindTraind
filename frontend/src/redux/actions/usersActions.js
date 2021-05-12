import axios from "axios";

/* import { ToastContainer, toast, helpers, showToast } from "react-toastify"; */
import { showToast, showTostError500 } from "../../helpers/myToast";


const usersActions = {
  signUpUser: (objInputsValues) => {
    /*  const notify = (msg) => toast("errores del baack end"); */
    return async (dispatch, getState) => {
      try {
        let { data } = await axios.post("http://localhost:4000/api/users/signup", objInputsValues)
        if (data.success) {
          showToast("success", data.error);
          dispatch({ type: "LOGIN_USER", payload: data.response });
          showToast("success",`Welcome ${data.response.firstName} ${data.response.lastName}`)
        } else {
          return data.errors ? data.errors : data.error;
        }
      } catch (err) {
        console.log(err);
        showTostError500();
      }
    }
  },
  logInUser : (objInputsValues) =>{
    return async (dispatch) => {
      try {
        let {data} = await axios.post("http://localhost:4000/api/users/login",objInputsValues);
        console.log(data)
        if(data.success){
          dispatch({type:"LOGIN_USER" , payload: data.response})      
          showToast("success",`Welcome ${data.response.firstName} ${data.response.lastName}`)
        }
      } catch (err) {
        console.log(err);
        showTostError500();
      }
    }
  },
  loginForced: (token, history) => {
    return async (dispatch, getState) => {
        try {
            const { data } = await axios.get("http://localhost:4000/api/usersforcedlogin", {
                headers: { 'Authorization': 'Bearer ' + token }
            })
            
            dispatch({type: "LOGIN_USER", payload: {...data.response,token} } );
            showToast("success",`Welcome ${data.response.firstName} ${data.response.lastName}`)
        }
        catch (err) {
            alert("Error 500 , please come back later")
            console.log(err)
            if (err.response && err.response.status === 401) {
                alert("try harder next time")
                localStorage.clear();
                window.location.reload(true);
                //history.push("/");
            }
            showToast();
            localStorage.clear();
        }
    }
},

  logOutUser: () => {
    return (dispatch, getState) => {
      showToast("info", "Come back later ", "top-right");
      dispatch({type: "LOG_OUT"})
    };
  }

  /*  ForceLogIn: (preUser) => {
      console.log("1) en force login", preUser);

    return (dispatch, getState) => {
    console.log(typeof userLS);
      let respuesta = axios
        .get("http://localhost:4000/api/trainedMind/LogInLF", {
          headers: {
            Authorization: "Bearer " + userLS,
          },
        })
        .then((respuesta) => {
            console.log("zz", respuesta.data.success);
          dispatch({
            type: "LOGIN_USER",
            payload: respuesta.data.success ? respuesta.data.respuesta : null,
          });
        })
        .catch((e) => console.log("", e));
    };
  }, */
};

export default usersActions;
