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
import SignIn from './Pages/SignIn'
import SignUp from './Pages/SignUp'
import Home from './Pages/Home'
import Dashboard from './Pages/Dashboard'
import Admin from './Pages/Admin'
import CourseList from './Pages/CourseList'
import ClassList from './Pages/ClassList'
import Foro from './Pages/Foro'
import Chat from './Pages/Chat'
import Jobs from './Pages/Jobs'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { connect } from 'react-redux'
import usersActions from "./redux/actions/usersActions";
import routesRole from "./helpers/routesRole"


const App = (props) => {
  const token = localStorage.getItem("token");
  //veo que no haya en el store un usuario logueado y que haya un token en el localStorage
  if (!props.userLogged && token && token !== "undefined") {
    props.loginForced(JSON.parse(token), props.history)
    return null;
  }

  //let role ;
  /*if(!props.userLogged){
    role = "routerUserDontLogged" 
  }else{
    if(props.userLogged.role === "admin")
      role = "routerUserLoggedAdmin"
    else
      role = "routerUserLoggedCommon" 
  }*/
  let role = props.userLogged || "routerUserDontLogged";
  role = props?.userLogged?.role === "admin" ? "routerUserLoggedAdmin" : role;
  role = props?.userLogged?.role === 'noRole' || props?.userLogged?.role === 'students' ? "routerUserLoggedCommon" : role;

  console.log(role, props.userLogged)

  return (
    <BrowserRouter>
      <ToastContainer />
      {routesRole[role]()}
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
