import React from "react";
/* import Header from "./Header";
import Footer from "./Footer"; */
import { useEffect, useState } from "react";

/* import { connect } from "react-redux"; */

import axios from "axios";
/* import GoogleLogin from "react-google-login"; */
import { NavLink } from "react-router-dom";

const SignUp = (props) => {
  const [loginStep, setloginStep] = useState(null);
  const [eyeState, setEyeState] = useState(true);
  const [countries, setCountries] = useState([]);
  const [preUser, setPreUser] = useState({
    name: "",
    lastName: "",
    email: "",
    country: "",
    pass: "",
    url: "",
  });
  const [validations, setValidations] = useState([]);

  useEffect(() => {
    console.log("1v) soy el didmount");
  }, []);

  useEffect(() => {
    /*  console.log("entre a validr"); */
    const pass = preUser.pass;
    setValidations([
      pass.length > 5,
      pass.search(/[A-Z]/) > -1,
      pass.search(/[0-9]/) > -1,
      pass.search(/[$&+,:;=?@#]/) > -1,
    ]);
  }, [preUser.pass]);

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

  return (
    <div className="d-flex">
      <div className="w-50">
        <input
          id="newone"
          _ngcontent-yed-c7=""
          className="ng-dirty ng-valid ng-touched"
          formcontrolname="user"
          type="text"
          id="user"
          placeholder="RUT"
        ></input>
      </div>
      <div className="w-50">
        <div className="w-50 bg-secondary myForm d-flex flex-column align-items-center">
          <div className="font-italic realForm mt-3 mb-2 bg-white border-1 p-3 d-flex flex-column  align-items-left">
            Sign-up Form
            <input
              type="text"
              onChange={(e) => setPreUser({ ...preUser, name: e.target.value })}
              value={preUser.name}
              placeholder="your name"
              className="border-1"
            />
            <input
              type="text"
              onChange={(e) => setPreUser({ ...preUser, lastName: e.target.value })}
              value={preUser.lastName}
              placeholder="your Last Name"
              className="border-1"
            />
            <div className="border mt-1">
              <input
                type="mail"
                onChange={(e) => setPreUser({ ...preUser, email: e.target.value.toLowerCase() })}
                value={preUser.email}
                placeholder="your email"
                className="border-0 w-75"
              />
              📧
            </div>
            <div className="border mt-1">
              <input
                type="text"
                onChange={(e) => setPreUser({ ...preUser, url: e.target.value })}
                value={preUser.url}
                placeholder="url of your picture"
                className="border-0 w-100"
              />
            </div>
            {/*  <div className="small border mt-1"> */}
            <select
              placeholder="where you from?"
              type="selection"
              placeholder="country"
              className=" small h3 mt-1 border"
              onChange={(e) => setPreUser({ ...preUser, country: e.target.value })}
            >
              <option disabled selected>
                -your country-
              </option>

              {countries &&
                countries.length !== 0 &&
                countries.map((pais) => {
                  return (
                    <option key={pais.name} value={pais.name}>
                      {pais.name}
                    </option>
                  );
                })}
            </select>
            {/* </div> */}
            <div className="mt-1">
              <input
                onChange={(e) => setPreUser({ ...preUser, pass: e.target.value })}
                value={preUser.pass}
                type={eyeState ? "password" : "text"}
                placeholder="your password"
                className="mb-1"
              ></input>
            </div>
            <input id="eye" type="checkbox" onChange={() => setEyeState(!eyeState)}></input>{" "}
            <span className="small">show your password</span>
            <button
              className="btn mb-1 btn-success logoIcon"
              onClick={() => {
                props.createAndLogIn(preUser);
                props.history.push("/");
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
            <NavLink to="/LogIn">
              <label className="mt-2 btn btn-warning h6">
                Do you already have an myTinerary account? yes, then please Log-In, ..👉 clicking
                here
              </label>{" "}
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
    </div>
  );
};

/* REDUX */
/* const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = {
  fetchCountries: countriesActions.actionLoadCountries,
  createAndLogIn: usersActions.actionCreateUserInBackEnd,
};
export default connect(mapStateToProps, mapDispatchToProps)(SignUp); */

export default SignUp;
