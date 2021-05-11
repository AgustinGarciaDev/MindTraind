import { BrowserRouter, Route, Switch } from "react-router-dom";
import './style/formulario.css'
import './style/dashboard.css'
import './style/home.css'
import SignIn from './Pages/SignIn'
import SignUp from './Pages/SignUp'
import Home from './Pages/Home'
import Dashboard from './Pages/Dashboard'
import "bootstrap/dist/css/bootstrap.css";

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/home" component={Home} />
        <Route exact path="/signup" component={SignUp} />
        <Route exact path="/signin" component={SignIn} />
        <Route exact path="/dashboard" component={Dashboard} />
      </Switch>

    </BrowserRouter>
  );
};

export default App;
