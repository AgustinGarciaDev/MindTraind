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

  let miRespuesta2 = [{ message: "" }, { message: "" }, { message: "" }, { message: "" }];

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
      /*   pass.search(/[$&+,:;=?@#]/) > -1, */
    ]);

    console.log("validationsPass", validationsPass.length);
    console.log("passguide", passGuideVisible);
  }, [preUser.password]);

  useEffect(() => {
    const otherInput = preUser;
    /*  console.log("otherInput", otherInput); */
    setValidationsOther([
      otherInput.firstName.length > 1,
      otherInput.lastName.length > 1,
      otherInput.email.search(/^\S+@\S+\.\S+$/) > -1,
      otherInput.profilePicture.length > 0,
    ]);
  }, [preUser]);

  const fcreateAndLogIn = async () => {
    try {
      let miRespuesta = await props.createAndLogIn(preUser);
      console.log("0props", miRespuesta);
      setErroresSignUp(miRespuesta);

      /*   console.log("x", miRespuesta[0].message); */

      miRespuesta.map((error) => {
        switch (error.label) {
          case "firstName":
            miRespuesta2[0].message = error.message;

            break;
          case "lastName":
            miRespuesta2[1].message = error.message;
            break;
          case "profilePicture":
            miRespuesta2[2].message = error.message;
          case "email":
            miRespuesta2[3].message = error.message;
            break;
        }
      });

      setPreUserPlaceHolder({
        firstName: miRespuesta2[0].message !== "" && "🚩" + miRespuesta2[0].message,
        lastName: miRespuesta2[1].message !== "" && "🚩" + miRespuesta2[1].message,
        profilePicture: miRespuesta2[2].message !== "" && "🚩" + miRespuesta2[2].message,
        email: miRespuesta2[3].message !== "" && "🚩" + miRespuesta2[3].message,
        password: "",
      });

      setPreUser({
        firstName: miRespuesta2[0].message !== "" ? "" : preUser.firstName,
        lastName: miRespuesta2[1].message !== "" ? "" : preUser.lastName,
        profilePicture: miRespuesta2[2].message !== "" ? "" : preUser.lastName,
        email: miRespuesta2[3].message !== "" ? "" : preUser.email,
        password: "",
      });

      setErrorVisible(true);

      console.log("errores", miRespuesta2);
    } catch {
      props.history.push("/dashboard");
      console.log("no funciono");
    }
  };

  const responseGoogle = (response) => {
    const { givenName, familyName, email, googleId, imageUrl } = response.profileObj;
    props.createAndLogIn({
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
      <div className="signUpContainer d-flex ">
        <div className="w-50 mi100">
          <div className="titleForm titulos mt-2 h3 ">Sign Up Form</div>
          <div className=" small textos text-center">
            <h2 className="titleSignUp"> Start Free Today⚡ </h2>
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

          <div className="w-100">
            <div className="font-italic bg-white border-1 align-items-center pt-0 d-flex flex-column">
              <span className="afterRed small w-75 m-2">hi, please enter your name</span>
              <div className="border w-75">
                <input
                  type="text"
                  onChange={(e) => setPreUser({ ...preUser, firstName: e.target.value })}
                  value={preUser.firstName}
                  placeholder={preUserPlaceHolder.firstName || "e.g: John"}
                  autoFocus
                  /*    className="ng-dirty  w-100" */
                  className={
                    !validationsOther[0]
                      ? "ng-dirty textos small pl-4 w-100"
                      : "ng-valid  textos small pl-4 w-100"
                  }
                />
              </div>
              <span className="mt-1 small afterRed w-75 ">your lastname</span>
              <div className="border w-75">
                <input
                  type="text"
                  onChange={(e) => setPreUser({ ...preUser, lastName: e.target.value })}
                  value={preUser.lastName}
                  placeholder={preUserPlaceHolder.lastName || "e.g: Doe"}
                  className={
                    !validationsOther[1]
                      ? "ng-dirty textos small  w-100"
                      : "ng-valid textos small  w-100"
                  }
                />
              </div>
              <span className="small mt-1 afterRed w-75">an url of your personal image</span>
              <div className="border w-75">
                <input
                  type="text"
                  onChange={(e) => setPreUser({ ...preUser, firstName: e.target.value })}
                  onChange={(e) => setPreUser({ ...preUser, profilePicture: e.target.value })}
                  value={preUser.profilePicture}
                  placeholder={preUserPlaceHolder.profilePicture || " your url image"}
                  className={
                    !validationsOther[3]
                      ? "ng-dirty textos small  w-100"
                      : "ng-valid textos small w-100"
                  }
                />
              </div>
              <span className="small mt-1 afterRed w-75">a valid email address</span>
              <div className="border w-75">
                <input
                  type="mail"
                  onChange={(e) => setPreUser({ ...preUser, email: e.target.value.toLowerCase() })}
                  value={preUser.email}
                  placeholder={preUserPlaceHolder.email || "e.g: john.doe@gmail.com"}
                  className={
                    !validationsOther[2]
                      ? "ng-dirty textos small w-100"
                      : "ng-valid textos small w-100"
                  }
                />

                {/*  {console.log("validacionesotro", validationsOther)} */}
              </div>
              {/*  <div className="small border mt-1"> */}
              {/* </div> */}
              <div className="w40 mt-2 d-flex justify-content-between">
                {/*   <span className="small italics">show your password </span> */}
              </div>
              <div className="w-75 border mt-1 mb-1 ">
                <input
                  onChange={(e) => setPreUser({ ...preUser, password: e.target.value })}
                  onFocus={() => setPassGuideVisible(true)}
                  value={preUser.password}
                  type={eyeState ? "password" : "text"}
                  placeholder=" your password"
                  className={
                    !validationsPass.includes(false)
                      ? "ng-valid titulos w90"
                      : "ng-dirty titulos w90"
                  }
                ></input>
                <label htmlFor="eye" className="ml-5">
                  <input
                    id="eye"
                    className="hidden"
                    type="checkbox"
                    onChange={() => setEyeState(!eyeState)}
                  ></input>{" "}
                  <i className={eyeState ? "pl-5 fas fa-eye-slash" : "fas fa-eye"}></i>
                </label>
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
                </ul>
              </div>
              <div className="m-auto w-50 d-flex flex-column justify-content-center text-center">
                {" "}
                <button
                  className="btn mb-2 btn-danger myBtn "
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
                      className="myBtn btn btn-primary mb-2 d-flex"
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
                  <label className="w-100 btn btn-warning myBtn h6">
                    Have an Account Already? click here <span className="mirror">👉</span>
                  </label>{" "}
                </NavLink>
              </div>
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
