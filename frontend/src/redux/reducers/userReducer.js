const initialState = { userLogged: null };

const userReducer = (state = initialState, action) => {
  console.log("0)payload Jona", action.payload);

  switch (action.type) {
    case "LOGIN_USER":
      if (action.payload) {
        console.log("1)payload is true", action.payload);
      }

      /*  localStorage.setItem(
          "userLogged",
          JSON.stringify({
            name: action.payload.name,
            url: action.payload.url,
            email: action.payload.email,
          })
        );
        localStorage.setItem("token", action.payload.token);
      } */

      return {
        ...state,
        userLogged: action.payload,
      };

      break;

    case "LOG_OUT":
      localStorage.clear();
      /*   console.log("2)solo se limpia storage"); */
      return { ...state, userLogged: null };

    default:
      return state;
  }
};
export default userReducer;
