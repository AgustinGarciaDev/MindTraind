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
    setValidationsPass([
      pass.length > 5,
      pass.search(/[A-Z]/) > -1,
      pass.search(/[0-9]/) > -1,
      pass.search(/[$&+,:;=?@#]/) > -1,
    ]);
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
      props.history.push("/dashboard");
      console.log("errpres", miRespuesta);
    } catch {
      console.log("no funciono");
    }
  };

  const responseGoogle = (response) => {
    alert("entre");
    const { givenName, email, googleId, imageUrl } = response.profileObj;
    props.logInUser({
      firstName: givenName,
      lastName: givenName,
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
        {props.theUser && console.log("X", props.theUser)}

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
              <div className="borderBottom mt-1">
                <input
                  type="mail"
                  autoFocus
                  onChange={(e) => setPreUser({ ...preUser, email: e.target.value.toLowerCase() })}
                  value={preUser.email}
                  placeholder="1) your registered email address"
                  className={
                    !validationsOther[2]
                      ? "ng-dirty border-0 textos small w95"
                      : "ng-valid border-0  textos small w95"
                  }
                />
                📧
                {/*  {console.log("validacionesotro", validationsOther)} */}
              </div>
              {/*  <div className="small border mt-1"> */}
              {/* </div> */}
              <div className="w35 mt-4 d-flex justify-content-between">
                <span className="small">show your password</span>

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
              <div className="mt-1 mb-5  border w35">
                <input
                  onChange={(e) => setPreUser({ ...preUser, password: e.target.value })}
                  value={preUser.password}
                  type={eyeState ? "password" : "text"}
                  placeholder="2) your secret password"
                  className="mb-1 ng-dirty"
                  className={
                    !validationsPass.includes(false)
                      ? "ng-valid textos w-100 small"
                      : "ng-dirty textos w-100 small"
                  }
                ></input>
              </div>

              <button className="btn mb-1 btn-danger myBtn " onClick={() => flogInUser()}>
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
                    <div className="w-50 text-center">SignUp with Google</div>
                  </div>
                )}
                buttonText="Login"
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
                cookiePolicy={"single_host_origin"}
              />

              {/* facebook btn */}
              <div
                className="fb-login-button"
                data-width=""
                data-size="large"
                data-button-type="continue_with"
                data-layout="rounded"
                data-auto-logout-link="true"
                data-use-continue-as="true"
              ></div>

              <NavLink to="/SignUp">
                <label className="mt-2 w-100 btn btn-info myBtn h6">
                  New at TrainedMind?,Join us here. <span className="mirror">👉</span>
                </label>{" "}
              </NavLink>
            </div>
          </div>
        </div>
        <div className="signInVideoContainer w-50 h-50 bg-dark" controls>
          <video className="signInVideo w-100" autoPlay muted loop>
            <source
              src={"https://baravdg.com/wp-content/uploads/2021/05/production-ID_3843427.mp4"}
              type={"video/mp4"}
            />
          </video>
        </div>
      </div>
    </>
  );
};
/* REDUX */
/*
 const mapStateToProps = (state) => {
  return {

  };
};*/
const mapDispatchToProps = {
  logInUser: usersActions.logInUser,
};
export default connect(null, mapDispatchToProps)(SignIn);
