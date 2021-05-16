import React from "react";
import Header from "../components/Header";
/* import Footer from "./Footer"; */
import { useEffect, useState } from "react";
/* import { connect } from "react-redux"; */
import GoogleLogin from "react-google-login";
import { NavLink } from "react-router-dom";
import usersActions from "../redux/actions/usersActions";
import { connect } from "react-redux";
const SignIn = (props) => {
  const [hidden, setHidden] = useState(true);
  const [eyeState, setEyeState] = useState(true);
  const [errorVisible, setErrorVisible] = useState(false);
  const [preUser, setPreUser] = useState({
    email: "",
    password: "",
  });
  const [validationsPass, setValidationsPass] = useState([]);
  const [validationsOther, setValidationsOther] = useState([]);
  const [erroresSignIn, setErroresSignIn] = useState("");

  useEffect(() => {
    /*  console.log("1v) soy el didmount"); */
  }, []);
  useEffect(() => {
    /*  console.log("entre a validr"); */
    const pass = preUser.password;
    setValidationsPass([pass.length > 5, pass.search(/[A-Z]/) > -1, pass.search(/[0-9]/) > -1]);
  }, [preUser.password]);

  useEffect(() => {
    const otherInput = preUser;
    /*  console.log("otherInput", otherInput); */
    setValidationsOther([otherInput.email.search(/^\S+@\S+\.\S+$/) > -1]);
  }, [preUser]);

  const flogInUser = async () => {
    /* props.logInUser(preUser) */
    try {
      let miRespuesta = await props.logInUser(preUser);
      console.log("0props", miRespuesta);
      setErroresSignIn(miRespuesta);
      setErrorVisible(!errorVisible);
      console.log("errpres", miRespuesta);
    } catch {
      props.history.push("/dashboard");
      console.log("no funciono");
    }
  };

  const responseGoogle = (response) => {
    /*  alert("entre"); */
    const { givenName, familyName, email, googleId, imageUrl } = response.profileObj;
    props.logInUser({
      firstName: givenName,
      lastName: familyName,
      email: email,
      profilePicture: imageUrl,
      password: "Cx1" + googleId,
      role: "noRole",
    });
    props.history.push("/dashboard");
  };

  return (
    <>
      <Header />
      <div
        className="signInContainer d-flex "
        onMouseOver={() => setHidden(false)}
        onMouseOut={() => setHidden(false)}
      >
        {/*    {props.theUser && console.log("X", props.theUser)} */}

        <div className=" w-50 mi100 ">
          <div className="titleForm titulos m-3 h3 ">Sign In</div>
          <div className="h6 small textos text-center">welcome back 💪</div>
          <div className="errorContainer" style={{ display: errorVisible ? "block" : "none" }}>
            <span
              id="close"
              style={{ display: errorVisible ? "block" : "none" }}
              onClick={() => setErrorVisible(!errorVisible)}
            >
              {" "}
              x{" "}
            </span>
            🚫 sorry we couldn't login to your account with your provided info, please refer to the
            folowing messages.
            <div>{erroresSignIn}</div>
          </div>
          <div className="bg-secondary">
            <div className="font-italic  mt-3 mb-2 bg-white border-1 p-3 d-flex flex-column">
              <span className="small mt-1 afterRed">your registered email</span>
              <div className="border mt-1">
                <input
                  type="mail"
                  autoFocus
                  onChange={(e) => setPreUser({ ...preUser, email: e.target.value.toLowerCase() })}
                  value={preUser.email}
                  placeholder="e.g: john.doe@gmail.com"
                  className={
                    !validationsOther[2]
                      ? "ng-dirty  textos small w-100"
                      : "ng-valid  textos small w-100"
                  }
                />

                {/*  {console.log("validacionesotro", validationsOther)} */}
              </div>
              {/*  <div className="small border mt-1"> */}
              {/* </div> */}
              <div className="w35 mt-4 d-flex justify-content-between"></div>
              <div className="mt-1 mb-5  border w35">
                <input
                  onChange={(e) => setPreUser({ ...preUser, password: e.target.value })}
                  value={preUser.password}
                  type={eyeState ? "password" : "text"}
                  placeholder="your secret password"
                  className="mb-1 ng-dirty"
                  className={
                    !validationsPass.includes(false)
                      ? "ng-valid textos w90 small"
                      : "ng-dirty textos w90 small"
                  }
                ></input>
                <label htmlFor="eye">
                  <i className={eyeState ? "fas fa-eye-slash" : "fas fa-eye"}></i>
                  <input
                    id="eye"
                    className="hidden"
                    type="checkbox"
                    onChange={() => setEyeState(!eyeState)}
                  ></input>{" "}
                </label>
              </div>

              <div className="m-auto w-50 d-flex flex-column justify-content-center text-center">
                <button className="btn mb-2 btn-danger myBtn " onClick={() => flogInUser()}>
                  Continue
                </button>
                <GoogleLogin
                  clientId="829812608617-0sn9cfi15261rmp12hd06m7sj55plu0u.apps.googleusercontent.com"
                  render={(renderProps) => (
                    <div
                      onClick={renderProps.onClick}
                      disabled={renderProps.disabled}
                      className="myBtn btn btn-primary  d-flex"
                    >
                      <div className=""></div>
                      <i className="w-25 pt-1 pl-5 ml-5 fab fa-google"></i>
                      <div className="w-50 text-center">Sign In with Google</div>
                    </div>
                  )}
                  buttonText="Login"
                  onSuccess={responseGoogle}
                  onFailure={responseGoogle}
                  cookiePolicy={"single_host_origin"}
                />

                <NavLink to="/SignUp">
                  <label className="mt-2 w-100 btn btn-info myBtn h6">
                    New at TrainedMind?, join us here. <span className="mirror">👉</span>
                  </label>{" "}
                </NavLink>
              </div>
            </div>
          </div>
        </div>
        <div className="signInVideoContainer w-50 h-50 bg-dark" controls>
          <video className="signInVideo w-100" autoPlay muted loop>
            <source
              src={"https://baravdg.com/wp-content/uploads/2021/05/production-ID_4438098.mp4"}
              type={"video/mp4"}
            />
          </video>
        </div>
      </div>
    </>
  );
};

const mapDispatchToProps = {
  logInUser: usersActions.logInUser,
};
export default connect(null, mapDispatchToProps)(SignIn);
