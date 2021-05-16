import "bootstrap/dist/css/bootstrap.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import './style/formulario.css'
import './style/dashboard.css'
import './style/home.css'
import './style/admin.css'
import './style/foro.css'
import './style/jobs.css'
import './style/asideNav.css'
import './style/course.css'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { connect } from 'react-redux'
import usersActions from "./redux/actions/usersActions";
import getRoutesByRole from "./helpers/routesRole"


const App = (props) => {
  const token = localStorage.getItem("token");
  //veo que no haya en el store un usuario logueado y que haya un token en el localStorage
  if (!props.userLogged && token && token !== "undefined") {
    props.loginForced(JSON.parse(token), props.history)
    return null;
  }
  
   /*let role = props.userLogged || "routerUserDontLogged";
   role = props?.userLogged?.role === "admin" ? "routerUserLoggedAdmin": role;
   role = props?.userLogged?.role === 'noRole' ? "routerUserLoggedCommon": role;*/
  let role = "notLogged"
  if(props.userLogged)
    role = props.userLogged.role
  return (
    <BrowserRouter>
      <ToastContainer />
      {getRoutesByRole(role)}    
    </BrowserRouter>
  );
};

const mapStateToProps = (state) => {
  return {
    userLogged: state.user.userLogged,
  }
}
const mapDispatchToProps = {
  loginForced: usersActions.loginForced,
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
