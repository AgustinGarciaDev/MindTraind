import React from "react";
/* import Header from "./Header";
import Footer from "./Footer"; */
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import usersActions from "../redux/actions/usersActions";
import axios from "axios";
import { NavLink } from "react-router-dom";
import GoogleLogin from "react-google-login";

const SignUp = (props) => {
  /*   console.log(props); */
  const [hidden, setHidden] = useState(true);
  const [eyeState, setEyeState] = useState(true);
  const [errorVisible, setErrorVisible] = useState(false);
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
  const [erroresSignUp, setErroresSignUp] = useState([]);

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
      otherInput.profilePicture.length > 0,
    ]);
  }, [preUser]);

  const fcreateAndLogIn = async () => {
    try {
      let miRespuesta = await props.createAndLogIn(preUser);
      console.log("0props", miRespuesta);
      setErroresSignUp(miRespuesta);
      setErrorVisible(!errorVisible);

      console.log("errpres", miRespuesta);
    } catch {
      console.log("no funciono");
    }
  };

  const respuestaGoogle = (response) => {
    alert("");
    /*  const { givenName, email, googleId, imageUrl } = response.profileObj;
    props.createAndLogIn({
      name: givenName,
      email: email,
      country: "",
      pass: "a" + googleId,
      url: imageUrl,
    });
    props.history.push("/"); */
  };

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
        <div className="h6 text-danger small textos text-center">(all fields are mandatory)</div>

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
          🚫 sorry we couldn't create an account with your provided info, please refer to the
          folowing problemss ]
          {erroresSignUp &&
            erroresSignUp.map((error) => {
              return <div className="m-2 text-danger small textos">❎ {error.message}</div>;
            })}
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
                    ? "ng-dirty textos small  w-75"
                    : "ng-valid  textos small  w-75"
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
                  !validationsOther[1] ? "ng-dirty textos small w-75" : "ng-valid textos small w-75"
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
                className={
                  !validationsOther[3] ? "ng-dirty textos small w-75" : "ng-valid textos small w-75"
                }
              />
            </div>
            <div className="border mt-1">
              <input
                type="mail"
                onChange={(e) => setPreUser({ ...preUser, email: e.target.value.toLowerCase() })}
                value={preUser.email}
                placeholder="a valid email address"
                className={
                  !validationsOther[2] ? "ng-dirty textos small w-75" : "ng-valid textos small w-75"
                }
              />
              📧
              {/*  {console.log("validacionesotro", validationsOther)} */}
            </div>
            {/*  <div className="small border mt-1"> */}
            {/* </div> */}
            <div className="border mt-2 ">
              <input
                onChange={(e) => setPreUser({ ...preUser, password: e.target.value })}
                value={preUser.password}
                type={eyeState ? "password" : "text"}
                placeholder="your secret password"
                className={
                  !validationsPass.includes(false)
                    ? "ng-valid titulos small"
                    : "ng-dirty titulos small"
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
                fcreateAndLogIn();
                /* console.log("el usuario", props.theUser && props) */
                /* console.log("0 preuser", preUser); */
                /*     props.history.push("/"); */
              }}
            >
              Continue
            </button>

            <div>
              <div
                className="w-10"
                style={{
                  backgroundImage:
                    "url(data:image/png;base64,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)",
                }}
              >
                XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
              </div>
              <button className="btn-google">btn-google</button>
            </div>

            <GoogleLogin
              className="small text-center pl-5 ml-5 w-100 text-white myBtn bg-primary"
              clientId="829812608617-0sn9cfi15261rmp12hd06m7sj55plu0u.apps.googleusercontent.com"
              buttonText="Sign Up with Google"
              /*   onSuccess={respuestaGoogle}
              onFailure={respuestaGoogle} */
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
  createAndLogIn: usersActions.signUpUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
/* export default SignUp; */
