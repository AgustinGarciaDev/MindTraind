import { BrowserRouter, Route, Switch } from "react-router-dom";
import './style/formulario.css'
import './style/dashboard.css'
import './style/home.css'
import './style/admin.css'
import SignIn from './Pages/SignIn'
import SignUp from './Pages/SignUp'
import Home from './Pages/Home'
import Dashboard from './Pages/Dashboard'
import Admin from './Pages/Admin'
import CourseList from './Pages/CourseList'
import ClassList from './Pages/ClassList'
import Foro from './Pages/Foro'
import "bootstrap/dist/css/bootstrap.css";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import {connect} from 'react-redux'
import usersActions from "./redux/actions/usersActions";

const App = (props) => {
  const token = localStorage.getItem("token");
  console.log(props)
  //veo que no haya en el store un usuario logueado y que haya un token en el localStorage
  if(!props.userLogged && token && token !== "undefined"){
    console.log("holo")
      props.loginForced(JSON.parse(token),props.history)
  }
  return (
    <BrowserRouter>
      <ToastContainer />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/signup" component={SignUp} />
        <Route exact path="/signin" component={SignIn} />
        <Route exact path="/dashboard" component={Dashboard} />
        <Route exact path="/admin" component={Admin} />
        <Route exact path="/courselist" component={CourseList} />
        <Route exact path="/class" component={ClassList} />
        <Route exact path="/foro" component={Foro} />
      </Switch>
    </BrowserRouter>
  );
};

const mapStateToProps = (state) =>{
  return {
      userLogged : state.user.userLogged,
  }
}
const mapDispatchToProps = {
  loginForced: usersActions.loginForced,
}

export default connect(mapStateToProps,mapDispatchToProps)(App);
