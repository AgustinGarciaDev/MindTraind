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
import NewJob from "./components/NewJob"
import NewCourse from "./components/NewCourse"
import CourseContainer from "./components/CourseContainer"

import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { connect } from 'react-redux'
import usersActions from "./redux/actions/usersActions";
import JobsContainer from "./components/JobsContainer";

const App = (props) => {
  const token = localStorage.getItem("token");
  //veo que no haya en el store un usuario logueado y que haya un token en el localStorage
  if (!props.userLogged && token && token !== "undefined") {
    props.loginForced(JSON.parse(token), props.history)
    return null;
  }


  return (
    <BrowserRouter>
      <ToastContainer />
      <Switch>
        <Route exact path="/" component={Home} /> {/* Todos */}
        <Route exact path="/signup" component={SignUp} /> {/* Todos */}
        <Route exact path="/signin" component={SignIn} /> {/* Todos */}
        <Route exact path="/dashboard" component={Dashboard} /> {/* SOLO ALUMNO /PROFESOR/ADMIN */}
        <Route exact path="/admin" component={Admin} /> {/* ADMIN */}
        <Route exact path="/courselist" component={CourseList} /> {/*  SOLO ALUMNO /PROFESOR/ADMIN*/}
        <Route exact path="/chat" component={Chat} /> {/* SOLO ALUMNO /PROFESOR/ADMIN*/}
        <Route exact path="/jobs" component={Jobs} /> {/* SOLO ALUMNO /PROFESOR/ADMIN*/}
        <Route exact path="/class/:id" component={ClassList} /> {/* SOLO ALUMNO /PROFESOR/ADMIN*/}
        <Route exact path="/foro/:id" component={Foro} />{/* SOLO ALUMNO /PROFESOR/ADMIN */}
        <Route exact path="/NewJob" component={NewJob}/>{/* ADMIN */}
        <Route exact path="/EditJobs" component={JobsContainer}/>{/* ADMIN */}
        <Route exact path="/NewCourse" component={NewCourse}/>{/* ADMIN */}
        <Route exact path="/EditCourse" component={CourseContainer}/>{/* ADMIN */}
      </Switch>
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
