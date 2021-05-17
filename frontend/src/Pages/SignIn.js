import Header from "../components/Header";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import GoogleLogin from "react-google-login";
import usersActions from "../redux/actions/usersActions";
import { showToast } from '../helpers/myToast'


const SignIp = (props) => {
  const [userToLogin, setlogIn] = useState({ email: '', password: '', googleUser: false })

  useEffect(() => {
    window.scrollTo(0, 0)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const readInput = e => {
    const value = e.target.value
    const name = e.target.name
    setlogIn({
      ...userToLogin,
      [name]: value
    })
  }
  const signIn = async (e = null, googleUser = null) => {
    e && e.preventDefault()
    let user = e ? userToLogin : googleUser
    const response = await props.logInUser(user)
    if (response) {
      showToast('error', response.data.error)
    }
  }

  const responseGoogle = (response) => {
    if (response.profileObj.email) {
      signIn(null, { email: response.profileObj.email, password: 'a'+response.profileObj.googleId, googleUser: true })
    }
  }

  const keyPress = (e) => {
    e.key === 'Enter' && signIn()
  }

  return (
    <div className="contenedorMenu">
      <div className="contenedorWeb">
        <Header />
        <div className="signUpContainer">
          <form className="formSign">
            <h1>SIGN IN</h1>
            <input type="text" placeholder="MY E-MAIL" className="signInput" name="email" value={userToLogin.email} onChange={readInput} />
            <input type="password" placeholder="MY PASSWORD" className="signInput" name="password" value={userToLogin.password} onChange={readInput} />
            <button onKeyPress={keyPress} className="signupButton" onClick={signIn}>SIGN UP</button>
            <div className="formbottom">
              <p>You do not have an account ? <Link to="/SignUp">Sign up here !</Link></p>
              <p>Sign in with Google</p>
            </div>
            <GoogleLogin
              className="google"
              clientId="520488943337-q0bjrnkhhdn0iho4rmt6qapssseul2g3.apps.googleusercontent.com"
              buttonText="Sign in with Google"
              onSuccess={responseGoogle}
              onFailure={responseGoogle}
              cookiePolicy={'single_host_origin'}
            />
          </form>
        </div>
      </div>
    </div>
  )
}

const mapDispatchToProps = {
  logInUser: usersActions.logInUser
}

export default connect(null, mapDispatchToProps)(SignIp);