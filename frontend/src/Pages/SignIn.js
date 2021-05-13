import React from "react";
/* import Header from "./Header";
import Footer from "./Footer"; */
import { useEffect, useState } from "react";
/* import { connect } from "react-redux"; */

/* import GoogleLogin from "react-google-login"; */
import { NavLink } from "react-router-dom";
import usersActions from "../redux/actions/usersActions";
import {connect} from 'react-redux'
const SignIn = (props) => {
  const [hidden, setHidden] = useState(true);
  const [eyeState, setEyeState] = useState(true);
  /* const [countries, setCountries] = useState([]); */
  const [preUser, setPreUser] = useState({
    email: "",
    password: "",
  });
  const [validations, setValidations] = useState([]);
  useEffect(() => {
    /*  console.log("1v) soy el didmount"); */
  }, []);
  useEffect(() => {
    /*  console.log("entre a validr"); */
    const pass = preUser.password;
    setValidations([
      pass.length > 5,
      pass.search(/[A-Z]/) > -1,
      pass.search(/[0-9]/) > -1,
      pass.search(/[$&+,:;=?@#]/) > -1,
    ]);
  }, [preUser.password]);
  /*   const fetchCountries = async (props) => {
    const paises = await props.fetchCountries();
    setCountries(paises);
  }; */
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
  const send = () => {
    props.logInUser(preUser)
  }
  return (
    <div
      className="signUpContainer d-flex "
      onMouseOver={() => setHidden(false)}
      onMouseOut={() => setHidden(false)}
    >
      {/*  <p> "hola" {hidden && "hola"}</p> */}
      <div className={"w-50"}>
        <div className="titleForm m-3 h2 ">Sign Up Form</div>
        <div className="h6 small text-center">Change your Life</div>
        <div className="bg-secondary">
          <div className="font-italic  mt-3 mb-2 bg-white border-1 p-3 d-flex flex-column">
            <div className="border mt-1">
              <input
                type="mail"
                onChange={(e) => setPreUser({ ...preUser, email: e.target.value.toLowerCase() })}
                value={preUser.email}
                placeholder="your email"
                className="ng-valid border-0 w-75"
              />
              📧
            </div>
            
            {/*  <div className="small border mt-1"> */}
            {/* </div> */}
            <div className="mt-1 ">
              <input
                onChange={(e) => setPreUser({ ...preUser, password: e.target.value })}
                value={preUser.password}
                type={eyeState ? "password" : "text"}
                placeholder="your password"
                className="mb-1 ng-dirty"
                className={!validations.includes(false) ? "ng-valid" : "ng-dirty"}
              ></input>
            </div>
            <span className="small">show your password</span>
            <label htmlFor="eye">
              <i className={eyeState ? "fas fa-eye-slash" : "fas fa-eye"}></i>
              <i class="fas fa-eye"></i>
              <input
                id="eye"
                className="hidden"
                type="checkbox"
                onChange={() => setEyeState(!eyeState)}
              ></input>{" "}
            </label>
            <button
              className="btn mb-1 btn-danger myBtn "
              onClick={() => send()}
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
            <NavLink to="/LogIn">
              <label className="mt-2 btn btn-warning h6">Do you need help click here?</label>{" "}
            </NavLink>
            <ul className="pl-3 small">
              {/*  {console.log("soy el validations", validations)} */}
              <span className="small">**Password**</span>
              <li className="small">{validations[0] ? "✔" : "❌"}Must be at least 6 character</li>
              <li className="small">{validations[1] ? "✔" : "❌"}Must contain a capital Letter</li>
              <li className="small">{validations[2] ? "✔" : "❌"}Must contain a number </li>
              <li className="small">{validations[3] ? "✔" : "❌"}Must contain one of $/¿,:;?@#</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="w-50 bg-dark">hola</div>
    </div>
  );
};
/* REDUX */
/*
 const mapStateToProps = (state) => {
  return {
  
  };
};*/
const mapDispatchToProps = {
  logInUser : usersActions.logInUser
};
export default connect(null, mapDispatchToProps)(SignIn); 

