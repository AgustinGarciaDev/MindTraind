import React from "react";
/* import Header from "./Header";
import Footer from "./Footer"; */
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import usersActions from "../redux/actions/usersActions";
import axios from "axios";
import { NavLink } from "react-router-dom";
/* import GoogleLogin from "react-google-login"; */

const SignUp = (props) => {
  const [hidden, setHidden] = useState(true);
  const [eyeState, setEyeState] = useState(true);
  const [errorVisible, setErrorVisible] = useState(true);
  /* const [countries, setCountries] = useState([]); */
  const [preUser, setPreUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    profilePicture: "",
    password: "",
    role: "noRole",
  });
  const [validationsPass, setValidationsPass] = useState([]);
  const [validationsOther, setValidationsOther] = useState([]);

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
    setValidationsOther([
      otherInput.firstName.length > 1,
      otherInput.lastName.length > 2,
      otherInput.email.search(/^\S+@\S+\.\S+$/) > -1,
    ]);
  }, [preUser]);

  const xx = (props) => {
    let miRespuesta = props.createAndLogIn(preUser);
    console.log(miRespuesta);
  };

  /*  const respuestaGoogle = (response) => {
    const { givenName, email, googleId, imageUrl } = response.profileObj;
    props.createAndLogIn({
      name: givenName,
      email: email,
      country: "",
      pass: "a" + googleId,
      url: imageUrl,
    });
    props.history.push("/");
  }; */

  return (
    <div
      className="signUpContainer d-flex "
      onMouseOver={() => setHidden(false)}
      onMouseOut={() => setHidden(false)}
    >
      {props.theUser && console.log("X", props.theUser)}
      {/*  <p> "hola" {hidden && "hola"}</p> */}
      <div className={"w-50"}>
        <div className="titleForm titulos m-3 h2 ">Sign Up Form</div>
        <div className="h6 small textos text-center">Change your Life</div>
        <div className="errorContainer" style={{ display: errorVisible ? "block" : "none" }}>
          error{" "}
          <span
            id="close"
            style={{ display: errorVisible ? "float" : "none" }}
            onClick={() => setErrorVisible(!errorVisible)}
          >
            {" "}
            x{" "}
          </span>
        </div>
        <div className="bg-secondary">
          <div className="font-italic  mt-3 mb-2 bg-white border-1 p-3 d-flex flex-column">
            <div className="border mt-1 ">
              <input
                type="text"
                onChange={(e) => setPreUser({ ...preUser, firstName: e.target.value })}
                value={preUser.firstName}
                placeholder="please, enter your name"
                /*    className="ng-dirty  w-100" */
                className={
                  !validationsOther[0]
                    ? "ng-dirty textos small border-0 w-75"
                    : "ng-valid  textos border-0 w-75"
                }
              />
            </div>
            <div className="border mt-1 ">
              <input
                type="text"
                onChange={(e) => setPreUser({ ...preUser, lastName: e.target.value })}
                value={preUser.lastName}
                placeholder="your last name"
                className={
                  !validationsOther[1]
                    ? "ng-dirty textos small border-0 w-75"
                    : "ng-valid textos small border-0 w-75"
                }
              />
            </div>

            <div className="border mt-1 ">
              <input
                type="text"
                onChange={(e) => setPreUser({ ...preUser, firstName: e.target.value })}
                onChange={(e) => setPreUser({ ...preUser, profilePicture: e.target.value })}
                value={preUser.profilePicture}
                placeholder="your url image"
                className="ng-valid border-0 w-100 textos small"
              />
            </div>

            <div className="border mt-1">
              <input
                type="mail"
                onChange={(e) => setPreUser({ ...preUser, email: e.target.value.toLowerCase() })}
                value={preUser.email}
                placeholder="a valid email address"
                className={
                  !validationsOther[2]
                    ? "ng-dirty border-0 textos small w-75"
                    : "ng-valid border-0  textos small w-75"
                }
              />
              📧
              {/*  {console.log("validacionesotro", validationsOther)} */}
            </div>
            {/*  <div className="small border mt-1"> */}
            {/* </div> */}
            <div className="mt-1 ">
              <input
                onChange={(e) => setPreUser({ ...preUser, password: e.target.value })}
                value={preUser.password}
                type={eyeState ? "password" : "text"}
                placeholder="your secret password"
                className="mb-1 ng-dirty"
                className={
                  !validationsPass.includes(false)
                    ? "ng-valid textos small"
                    : "ng-dirty textos small"
                }
              ></input>
            </div>
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
            <button
              className="btn mb-1 btn-danger myBtn "
              onClick={() => {
                props.createAndLogIn(preUser);
                /* console.log("el usuario", props.theUser && props) */
                /* console.log("0 preuser", preUser); */
                /*     props.history.push("/"); */
              }}
            >
              Continue
            </button>
            {/*     <GoogleLogin
            className="small w-50 text-white bg-primary"
            clientId="834257531526-ouhj5beccvjj3nhvrqjrjvmdga8qjvu9.apps.googleusercontent.com"
            buttonText="Sign Up with Google"
            onSuccess={respuestaGoogle}
            onFailure={respuestaGoogle}
            cookiePolicy={"single_host_origin"}
          /> */}

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

            <NavLink to="/SignIn">
              <label className="mt-2 w-100 btn btn-warning myBtn h6">
                Have an Account Already? click here <span className="mirror">👉</span>
              </label>{" "}
            </NavLink>
            <ul className="pl-3 small">
              {/*  {console.log("soy el validations", validations)} */}
              <span className="small">**Password should be**</span>
              <li className="small">{validationsPass[0] ? "✔" : "❌"}At least 6 character</li>
              <li className="small">{validationsPass[1] ? "✔" : "❌"}Contain a capital Letter</li>
              <li className="small">{validationsPass[2] ? "✔" : "❌"}Contain a number </li>
              <li className="small">
                {validationsPass[3] ? "✔" : "❌"}Contain one of $/¿,:;?@# chars
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="w-50 bg-dark">hola</div>
    </div>
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
  createAndLogIn: usersActions.createUserBackEnd,
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
/* export default SignUp; */
