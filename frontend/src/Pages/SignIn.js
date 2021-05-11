import React from "react";
/* import Header from "./Header";
import Footer from "./Footer"; */
import { useEffect, useState } from "react";
/* import { connect } from "react-redux"; */
import axios from "axios";

/* import GoogleLogin from "react-google-login"; */
import { NavLink } from "react-router-dom";
import { useHistory } from "react-router-dom";

const SignIn = (props) => {
  const [loginStep, setloginStep] = useState(null);
  const [eyeState, setEyeState] = useState(true);
  const [incomingUser, setIncomingUser] = useState({ email: "", pass: "" });

  const respuestaGoogle = (response) => {
    const { givenName, email, googleId, imageUrl } = response.profileObj;
    /* setPreUser({name:givenName,email:email,pass:googleId,url:imageUrl}) */
    props.logInUserInBackEnd({
      name: givenName,
      email: email,
      country: "",
      pass: "a" + googleId,
      url: imageUrl,
    });

    props.history.push("/");
  };

  return (
    <div className="">

      <div className="myForm bg-secondary d-flex flex-column align-items-center">
        <div className="bg-white font-italic w-50 mt-2 mb-3 border p-5 logInContainer d-flex flex-column  align-items-left">
          Log-In Form
          <div className="border-0 bg-white">
            <input
              type="mail"
              placeholder="your email"
              className="border-1 w-75"
              onChange={(e) => setIncomingUser({ ...incomingUser, email: e.target.value })}
              value={incomingUser.email}
            ></input>
            📧
          </div>
          <input
            type={eyeState ? "password" : "text"}
            placeholder="your password"
            className="mt-1 "
            onChange={(e) => setIncomingUser({ ...incomingUser, pass: e.target.value })}
            value={incomingUser.pass}
          ></input>
          <input
            id="eye"
            className="mt-1"
            type="checkbox"
            onChange={() => setEyeState(!eyeState)}
          ></input>{" "}
          show your password
          <button
            id="notEye"
            className="bg-success text-white mb-2"
            onClick={() => {
              props.logInUserInBackEnd(incomingUser);
              props.history.push("/");
            }}
          >
            Continue
          </button>
       {/*    <GoogleLogin
            className="text-white bg-primary"
            clientId="834257531526-ouhj5beccvjj3nhvrqjrjvmdga8qjvu9.apps.googleusercontent.com"
            buttonText="LogIn with Google"
            onSuccess={respuestaGoogle}
            onFailure={respuestaGoogle}
            cookiePolicy={"single_host_origin"}
          /> */}
          <NavLink to="/SignUp">
            <div className="btn  mt-2 btn-warning  w-100">
              new at myTinerary?. Create your myTinerary account now, ..👉 clicking here
            </div>
          </NavLink>
        </div>
      </div>
  {/*     <Footer /> */}
    </div>
  );
};
/*
const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = {
  logInUserInBackEnd: userActions.actionlogInUserInBackEnd,
}; */
/* export default connect(null, mapDispatchToProps)(LogIn); */
export default SignIn;
