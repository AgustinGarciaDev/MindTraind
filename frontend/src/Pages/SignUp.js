import React from "react";
/* import Header from "./Header";
import Footer from "./Footer"; */
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import usersActions from "../redux/actions/usersActions";
import axios from "axios";
import { NavLink } from "react-router-dom";
import GoogleLogin from "react-google-login";
import Header from "../components/Header";
import Footer from "../components/Footer";

const SignUp = (props) => {
  /*   console.log(props); */
  const [hidden, setHidden] = useState(true);
  const [eyeState, setEyeState] = useState(true);
  const [errorVisible, setErrorVisible] = useState(false);
  const [validationsPass, setValidationsPass] = useState([]);
  const [passGuideVisible, setPassGuideVisible] = useState(false);
  const [validationsOther, setValidationsOther] = useState([]);
  const [erroresSignUp, setErroresSignUp] = useState([]);
  /* const [countries, setCountries] = useState([]); */
  const [preUser, setPreUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    profilePicture: "",
    password: "",
    role: "noRole",
  });

  const [preUserPlaceHolder, setPreUserPlaceHolder] = useState({
    firstName: "",
    lastName: "",
    email: "",
    profilePicture: "",
    password: "",
    role: "noRole",
  });

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

    console.log("validationsPass", validationsPass.length);
    console.log("passguide", passGuideVisible);
  }, [preUser.password]);

  useEffect(() => {
    const otherInput = preUser;
    /*  console.log("otherInput", otherInput); */
    setValidationsOther([
      otherInput.firstName.length > 1,
      otherInput.lastName.length > 2,
      otherInput.email.search(/^\S+@\S+\.\S+$/) > -1,
      otherInput.profilePicture.length > 0,
    ]);
  }, [preUser]);

  const fcreateAndLogIn = async () => {
    try {
      let miRespuesta = await props.createAndLogIn(preUser);
      console.log("0props", miRespuesta);
      setErroresSignUp(miRespuesta);
      console.log("x", miRespuesta[0].message);
      setPreUser({
        firstName: miRespuesta[0].message !== "" ? preUser.firstName : miRespuesta[0].message,
        lastName: miRespuesta[1].message !== "" ? preUser.lastName : miRespuesta[1].message,
        profilePicture:
          miRespuesta[2].message !== "" ? preUser.profilePicture : miRespuesta[2].message,
        email: miRespuesta[3].message !== "" ? preUser.email : miRespuesta[3].message,
        password: "",
      });
      setPreUserPlaceHolder({
        firstName: "🚩" + miRespuesta[0].message,
        lastName: "🚩" + miRespuesta[1].message,
        profilePicture: "🚩" + miRespuesta[2].message,
        email: "🚩" + miRespuesta[3].message,
        password: "",
      });

      setErrorVisible(true);

      console.log("errores", miRespuesta);
    } catch {
      console.log("no funciono");
    }
  };

  const responseGoogle = (response) => {
    alert("entre");
    const { givenName, email, googleId, imageUrl } = response.profileObj;
    props.createAndLogIn({
      firstName: givenName,
      lastName: givenName,
      email: email,
      profilePicture: imageUrl,
      password: "Cx1" + googleId,
      role: "noRole",
    });
    props.history.push("/");
  };

  return (
    <>
      <Header />
      <div
        className="signUpContainer d-flex "
        /* onMouseOver={() => setHidden(false)}
      onMouseOut={() => setHidden(false)} */
      >
        {props.theUser && console.log("X", props.theUser)}
        {/*  <p> "hola" {hidden && "hola"}</p> */}
        <div className="w-50 mi100">
          <div className="titleForm titulos mt-2 h3 ">Sign Up Form</div>
          <div className="h6 small textos text-center">Change your life⚡</div>
          <div className="h6 text-danger small textos text-center">
            join us in 5 simple steps (all fields are mandatory)
          </div>
          <div
            className="errorContainer especial"
            style={{ display: errorVisible ? "block" : "none" }}
          >
            <span
              id="close"
              style={{ display: errorVisible ? "block" : "none" }}
              onClick={() => setErrorVisible(!errorVisible)}
            >
              {" "}
              x{" "}
            </span>
            <div className="text-center">
              {" "}
              🚫 sorry we couldn't create an account with your provided info, please watch below for
              the missing details.{" "}
            </div>
          </div>

          <div className="bg-secondary">
            <div className="font-italic bg-white border-1 p-2 d-flex flex-column">
              <div className="borderBottom">
                <input
                  type="text"
                  onChange={(e) => setPreUser({ ...preUser, firstName: e.target.value })}
                  value={preUser.firstName}
                  placeholder={preUserPlaceHolder.firstName || "1) Please, enter your name"}
                  autoFocus
                  /*    className="ng-dirty  w-100" */
                  className={
                    !validationsOther[0]
                      ? "ng-dirty textos small  w95"
                      : "ng-valid  textos small  w95"
                  }
                />
                👤
              </div>
              <div className="borderBottom mt-1">
                <input
                  type="text"
                  onChange={(e) => setPreUser({ ...preUser, lastName: e.target.value })}
                  value={preUser.lastName}
                  placeholder={preUserPlaceHolder.lastName || "2) your last name"}
                  className={
                    !validationsOther[1] ? "ng-dirty textos small w95" : "ng-valid textos small w95"
                  }
                />
                👤
              </div>
              <div className="borderBottom mt-1 ">
                <input
                  type="text"
                  onChange={(e) => setPreUser({ ...preUser, firstName: e.target.value })}
                  onChange={(e) => setPreUser({ ...preUser, profilePicture: e.target.value })}
                  value={preUser.profilePicture}
                  placeholder={preUserPlaceHolder.profilePicture || "3) your url image"}
                  className={
                    !validationsOther[3] ? "ng-dirty textos small w95" : "ng-valid textos small w95"
                  }
                />
                👤
              </div>
              <div className="borderBottom mt-1">
                <input
                  type="mail"
                  onChange={(e) => setPreUser({ ...preUser, email: e.target.value.toLowerCase() })}
                  value={preUser.email}
                  placeholder={preUserPlaceHolder.email || "4) a valid email adress"}
                  className={
                    !validationsOther[2] ? "ng-dirty textos small w95" : "ng-valid textos small w95"
                  }
                />
                📧
                {/*  {console.log("validacionesotro", validationsOther)} */}
              </div>
              {/*  <div className="small border mt-1"> */}
              {/* </div> */}
              <div className="w35 mt-2 d-flex justify-content-between">
                <span className="small italics">show your password </span>
                <label htmlFor="eye" className="ml-5">
                  <i className={eyeState ? "pl-5 fas fa-eye-slash" : "fas fa-eye"}></i>
                  <input
                    id="eye"
                    className="hidden"
                    type="checkbox"
                    onChange={() => setEyeState(!eyeState)}
                  ></input>{" "}
                </label>
              </div>
              <div className="w35 border mb-2 ">
                <input
                  onChange={(e) => setPreUser({ ...preUser, password: e.target.value })}
                  onFocus={() => setPassGuideVisible(true)}
                  value={preUser.password}
                  type={eyeState ? "password" : "text"}
                  placeholder="5) your password"
                  className={
                    !validationsPass.includes(false)
                      ? "ng-valid titulos w-100"
                      : "ng-dirty titulos w-100"
                  }
                ></input>
              </div>
              {/* errorPassContainer */}
              <div className="mb-3">
                <span
                  className="small"
                  style={{
                    display: passGuideVisible && validationsPass.includes(false) ? "block" : "none",
                  }}
                >
                  **Password guidelines**
                </span>
                <ul>
                  <li
                    style={{
                      display:
                        passGuideVisible && validationsPass.includes(false) ? "block" : "none",
                    }}
                    className="small"
                  >
                    {validationsPass[0] ? "😎✔" : "❎"}At least 6 character
                  </li>
                  <li
                    style={{
                      display:
                        passGuideVisible && validationsPass.includes(false) ? "block" : "none",
                    }}
                    className="small"
                  >
                    {validationsPass[1] ? "😎✔" : "❎"}Contain a capital Letter
                  </li>
                  <li
                    style={{
                      display:
                        passGuideVisible && validationsPass.includes(false) ? "block" : "none",
                    }}
                    className="small"
                  >
                    {validationsPass[2] ? "😎✔" : "❎"}Contain a number{" "}
                  </li>
                  <li
                    style={{
                      display:
                        passGuideVisible && validationsPass.includes(false) ? "block" : "none",
                    }}
                    className="small"
                  >
                    {validationsPass[3] ? "😎✔" : "❎"}Contain one of $/¿,:;?@# chars{" "}
                  </li>
                </ul>
              </div>
              <button
                className="btn mb-1 btn-danger myBtn "
                onClick={() => {
                  fcreateAndLogIn();
                }}
              >
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
              <NavLink to="/SignIn">
                <label className="mt-1 w-100 btn btn-warning myBtn h6">
                  Have an Account Already? click here <span className="mirror">👉</span>
                </label>{" "}
              </NavLink>
            </div>
          </div>
        </div>

        <div className="signUpVideoContainer w-50 h-50 bg-dark" controls>
          <video className="signUpVideo w-100" autoPlay muted loop>
            <source
              src={"https://baravdg.com/wp-content/uploads/2021/05/production-ID_4761432.mp4"}
              type={"video/mp4"}
            />
          </video>
        </div>
      </div>
    </>
  );
};

/* REDUX */
const mapStateToProps = (state) => {
  return {
    theUser: state.user.userLogged,
  };
};
const mapDispatchToProps = {
  /*  fetchCountries: countriesActions.actionLoadCountries, */
  createAndLogIn: usersActions.signUpUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
/* export default SignUp; */
