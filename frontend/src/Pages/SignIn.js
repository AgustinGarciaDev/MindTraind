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

const SignIn = (props) => {
  /*   console.log(props); */
  const [hidden, setHidden] = useState(true);
  const [eyeState, setEyeState] = useState(true);
  const [errorVisible, setErrorVisible] = useState(false);
  const [validationsPass, setValidationsPass] = useState([]);
  const [passGuideVisible, setPassGuideVisible] = useState(false);
  const [validationsOther, setValidationsOther] = useState([]);
  const [erroresSignIn, setErroresSignIn] = useState([]);
  /* const [countries, setCountries] = useState([]); */
  const [preUser, setPreUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    profilePicture: "",
    password: "",
    /*  role: "noRole", */
  });

  const [preUserPlaceHolder, setPreUserPlaceHolder] = useState({
    firstName: "",
    lastName: "",
    email: "",
    profilePicture: "",
    password: "",
    /*  role: "noRole", */
  });

  let miRespuesta2 = [{ message: "" }, { message: "" }, { message: "" }, { message: "" }];

  useEffect(() => {
    /*  console.log("1v) soy el didmount"); */
  }, []);
  useEffect(() => {
    /*  console.log("entre a validr"); */
    const pass = preUser.password;
    setValidationsPass([
      pass.length > 4,
      pass.search(/[A-z]/) > -1,
      pass.search(/[0-9]/) > -1,
      /*   pass.search(/[$&+,:;=?@#]/) > -1, */
    ]);

    /*   console.log("validationsPass", validationsPass.length);
    console.log("passguide", passGuideVisible); */
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

  const flogInUser = async () => {
    /* props.logInUser(preUser); */
    try {
      let miRespuesta = await props.logInUser(preUser);
      console.log("0props", miRespuesta);
      setErroresSignIn(miRespuesta);
      setErrorVisible(true);
      console.log("errpres", miRespuesta);

      if (miRespuesta.success) {
        props.history.push("/dashboard");
      }
    } catch {
      props.history.push("/dashboard");
      console.log("no funciono");
    }
  };

  const responseGoogle = (response) => {
    const { givenName, familyName, email, googleId, imageUrl } = response.profileObj;
    props.logInUser({
      firstName: givenName,
      lastName: familyName,
      email: email,
      profilePicture: imageUrl,
      password: "Cx1" + googleId,
      /*  role: "noRole", */
    });
    props.history.push("/dashboard");
  };

  return (
    <>
      <Header />
      <div className="signUpContainer d-flex ">
        <div className="w-50 mi100">
          <div className="titleForm titulos mt-2 h3 ">Sign In Form</div>
          <div className=" small textos text-center">
            <h2 className="titleSignUp"> Welcome Back💪 </h2>
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
            <div className="text-center"> 🚫 Plese provided a valid email and/or password </div>
          </div>

          <div className="w-100">
            <div className="font-italic bg-white border-1 align-items-center pt-0 d-flex flex-column">
              <span className="small mt-1 afterRed w-75">
                hi, please enter your registered email
              </span>
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

              <div className="m-auto w-50 d-flex flex-column justify-content-center text-center">
                {" "}
                <button
                  className="btn mt-4 mb-2 btn-danger myBtn "
                  onClick={() => {
                    flogInUser();
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
                      <div className="w-50 text-center">SignIn with Google</div>
                    </div>
                  )}
                  buttonText="Login"
                  onSuccess={responseGoogle}
                  onFailure={responseGoogle}
                  cookiePolicy={"single_host_origin"}
                />
                <NavLink to="/SignUp">
                  <label className="w-100 btn small btn-warning bg-info myBtn h6">
                    New? register now <span className="mirror">👉</span>
                  </label>{" "}
                </NavLink>
              </div>
            </div>
          </div>
        </div>

        <div className="signUpVideoContainer w-50 bg-dark" controls>
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
  logInUser: usersActions.logInUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
/* export default SignUp; */
