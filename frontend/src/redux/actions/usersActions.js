import axios from "axios";

/* import { ToastContainer, toast, helpers, showToast } from "react-toastify"; */
import { showToast } from "../../helpers/myToast";

/* import "react-toastify/dist/ReactToastify.css"; */
/* import { Notyf } from "notyf"; */
/* import "notyf/notyf.min.css"; // for React, Vue and Svelte */
/* import { Redirect } from "react-router-dom"; */
/* const notyf = new Notyf(); */

const usersActions = {
  createUserBackEnd: (preUser) => {
    /*  const notify = (msg) => toast("errores del baack end"); */

    return (dispatch, getState) => {
      console.log("new user petition Req", preUser);
      let respuesta = axios
        .post("http://localhost:4000/api/users/signup", preUser)

        .then((respuesta) => {
          console.log("0) soylaRespuesta", respuesta);
          if (!respuesta.data.success) {
            showToast("error", respuesta.data.error);
            /*   alert(respuesta.data.error); */

            /*  respuesta.data.errores.details &&
            respuesta.data.errores.details.map((joiError) => {
            }); */

            return respuesta.data.errores;
          } else {
            showToast("success", respuesta.data.error);
          }
          dispatch({
            type: "LOGIN_USER",
            payload: respuesta.data.success ? respuesta.data.response : null,
          });
        })
        .catch((e) => console.log("el eror", e));
    };
  },

  /* filtro */
  /*   logInUserBackEnd: (preUser) => {
    return (dispatch, getState) => {
      let respuesta = axios
        .post("http://localhost:4000/api/trainedMind/LogIn/", preUser)
        .then((respuesta) => {
          console.log("1)soy info para loguear", respuesta.data.respuesta);
          if (!respuesta.data.success) {
            notyf.error({ message: respuesta.data.error, duration: 3000 });
          } else {
            notyf.success({ message: "Welcome 😀", duration: 3000 });
          }
          dispatch({
            type: "LOGIN_USER",
            payload: respuesta.data.success ? respuesta.data.respuesta : null,
          });
        });
    };,
  }, */

  actionLogOut: () => {
    return (dispatch, getState) => {
      dispatch({
        type: "LOG_OUT",
        payload: [],
      });
    };
  },

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
