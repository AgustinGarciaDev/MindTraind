const initialState = { userLogged: null };

const userReducer = (state = initialState, action) => {
  console.log(action)
  switch (action.type) {
    case "LOGIN_USER":
      localStorage.setItem("token",JSON.stringify(action.payload.token));
      return {
        ...state,
        userLogged: action.payload,
      };

    case "LOG_OUT":
      localStorage.clear();
      /*   console.log("2)solo se limpia storage"); */
      return { ...state, userLogged: null };

    default:
      return state;
  }
};
export default userReducer;
