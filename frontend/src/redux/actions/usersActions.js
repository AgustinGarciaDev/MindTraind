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
          if (respuesta.data.success) {
            showToast("success", respuesta.data.error);
            /*   alert(respuesta.data.error); */

            /*  respuesta.data.errores.details &&
            respuesta.data.errores.details.map((joiError) => {
            }); */

            dispatch({
              type: "LOGIN_USER",
              payload: respuesta.data.response,
            });
          } else {
            showToast("error", respuesta.data);
            return respuesta.data.errores;
          }
        })
        .catch((e) => console.log("el eror", e));
    };
  },

  /* filtro */
  logInUserBackEnd: (preUser) => {
    console.log("0) en login preuser", preUser);
    return (dispatch, getState) => {
      let respuesta = axios
        .post("http://localhost:4000/api/users/login/", preUser)
        .then((respuesta) => {
          console.log("1)soy info para loguear", respuesta.data.respuesta);
          if (respuesta.data.success) {
            console.log("1) respuesta", respuesta);
          } else {
            alert("algo fallo");
          }
          dispatch({
            type: "LOGIN_USER",
            payload: respuesta.data.response ? respuesta.data.response : null,
          });
        })
        .catch((e) => console.log("error", e));
    };
  },

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
