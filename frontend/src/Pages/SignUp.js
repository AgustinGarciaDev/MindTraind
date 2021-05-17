import Header from "../components/Header";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import GoogleLogin from "react-google-login";
import usersActions from "../redux/actions/usersActions";
import { showToast } from '../helpers/myToast'


const SignUp = (props) => {
  const [newUser, setNewUser] = useState({ firstName: '', lastName: '', email: '', password: '', profilePicture: '' })
  const [error, setError] = useState({})

  useEffect(() => {
    window.scrollTo(0, 0)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])


  const errorsImput = { firstName: null, lastName: null, email: null, password: null, profilePicture: null }

  const readInput = e => {
    const value = e.target.value
    const name = e.target.name
    setNewUser({
      ...newUser,
      [name]: value
    })
  }

  const sendNewUser = async (e = null, googleUser = null) => {
    e && e.preventDefault()
    let user = e ? newUser : googleUser
    const response = await props.signUpUser(user)
    if (response) {
      if (response.data.error.details) {
        response.data.error.details.map(error => {
          errorsImput[error.context.label] = error.message
          return null
        })
      } else {
        showToast('error', response.data.error)
      }
      setError(errorsImput)
    }
  }

  const responseGoogle = (response) => {
    if (!response.error) {
      const { givenName, familyName, email, googleId, imageUrl } = response.profileObj
      sendNewUser(null, { firstName: givenName, lastName: familyName, email: email, profilePicture: imageUrl, password: 'a' + googleId, googleUser: true })
    }
  }

  const keyPress = (e) => {
    e.key === 'Enter' && sendNewUser()
  }

  return (
    <div className="contenedorMenu">
      <div className="contenedorWeb">
        <Header />
        <div className="signUpContainer">
          <form className="formSign">
            <h1>SIGN UP</h1>

            <input type="text" className={error.firstName ? "errorInput" : "signInput"} placeholder="My first name" name="firstName" value={newUser.firstName} onChange={readInput} />
            {error.firstName && <small>{error.firstName}</small>}

            <input type="text" className={error.lastName ? "errorInput" : "signInput"} placeholder="My last name" name="lastName" value={newUser.lastName} onChange={readInput} />
            {error.lastName && <small>{error.lastName}</small>}

            <input type="text" className={error.email ? "errorInput" : "signInput"} placeholder="My e-mail" name="email" value={newUser.email} onChange={readInput} />
            {error.email && <small>{error.email}</small>}

            <input type="password" className={error.password ? "errorInput" : "signInput"} placeholder="My password" name="password" value={newUser.password} onChange={readInput} />
            {error.password && <small>{error.password}</small>}

            <input type="text" className={error.profilePicture ? "errorInput" : "signInput"} placeholder="Profile picture url" name="profilePicture" value={newUser.profilePicture} onChange={readInput} />
            {error.profilePicture && <small>{error.profilePicture}</small>}

            <button className="signupButton" onKeyPress={keyPress} onClick={sendNewUser}>SIGN UP</button>
            <div className="formbottom">
              <p>Already have an account? <Link to="/signin">Sign in here !</Link></p>
              <p>Or you can sign up with Google</p>
            </div>
            <GoogleLogin
              className="google"
              clientId="714215106747-270kd1ontnkpdopijelc4kc6mdivqotv.apps.googleusercontent.com"
              buttonText="Sign Up with Google"
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
  signUpUser: usersActions.signUpUser,
}

export default connect(null, mapDispatchToProps)(SignUp);