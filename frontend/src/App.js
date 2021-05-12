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
import "bootstrap/dist/css/bootstrap.css";

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/signup" component={SignUp} />
        <Route exact path="/signin" component={SignIn} />
        <Route exact path="/dashboard" component={Dashboard} />
        <Route exact path="/admin" component={Admin} />
        <Route exact path="/courselist" component={CourseList} />
      </Switch>

    </BrowserRouter>
  );
};

export default App;
