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
const App = () => {
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
        <Route exact path="/class" component={ClassList} /> {/* SOLO ALUMNO /PROFESOR/ADMIN*/}
        <Route exact path="/foro" component={Foro} />{/* SOLO ALUMNO /PROFESOR/ADMIN */}
      </Switch>
    </BrowserRouter>
  );
};

export default App;
