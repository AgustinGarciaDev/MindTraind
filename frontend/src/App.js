import "bootstrap/dist/css/bootstrap.css"
import { BrowserRouter } from "react-router-dom"
import './style/formulario.css'
import './style/dashboard.css'
import './style/home.css'
import './style/admin.css'
import './style/foro.css'
import './style/jobs.css'
import './style/asideNav.css'
import './style/course.css'
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from 'react-toastify'
import { connect } from 'react-redux'
import usersActions from "./redux/actions/usersActions"
import routesRole from "./helpers/routesRole"

const App = (props) => {
  const token = localStorage.getItem("token");
  //veo que no haya en el store un usuario logueado y que haya un token en el localStorage
  if (!props.userLogged && token && token !== "undefined") {
    props.loginForced(JSON.parse(token), props.history)
    return null
  }

  let role = "routerUserDontLogged"
  if (props.userLogged) {
    if (props.userLogged.role === "admin") {
      role = "routerUserLoggedAdmin"
    } else {
      role = "routerUserLoggedCommon"
    }
  } else {
    role = "routerUserDontLogged"
  }

  return (
    <BrowserRouter>
      <ToastContainer />
      {routesRole[role]()}
    </BrowserRouter>
  )
}

const mapStateToProps = (state) => {
  return {
    userLogged: state.user.userLogged,
  }
}
const mapDispatchToProps = {
  loginForced: usersActions.loginForced,
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
