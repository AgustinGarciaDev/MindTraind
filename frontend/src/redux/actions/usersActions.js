import axios from "axios";
/* import { Notyf } from "notyf"; */
/* import "notyf/notyf.min.css"; // for React, Vue and Svelte */
/* import { Redirect } from "react-router-dom"; */
/* const notyf = new Notyf(); */

const usersActions = {
  createUserBackEnd: (preUser) => {
    return (dispatch, getState) => {
      console.log("new user petition Req", preUser);
      let respuesta = axios.post("http://localhost:4000/api/users/", preUser).then((respuesta) => {
        if (!respuesta.data.success) {
          console.log("errores del baack end", respuesta);
          /*  respuesta.data.errores.details &&
            respuesta.data.errores.details.map((joiError) => {
            }); */

          return respuesta.data.errores;
        } else {
          alert("algo fallo");
        }
        dispatch({
          type: "LOGIN_USER",

          payload: respuesta.data.success ? respuesta.data.respuesta : null,
        });
      });
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
