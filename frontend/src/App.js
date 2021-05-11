import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import SignIn from './Pages/SignIn'
import SignUp from './Pages/SignUp'
import Home from './Pages/Home'
import Dashboard from './Pages/Dashboard'
import Footer from './components/Footer'
import Header from './components/Footer'

const App = () => {

  return (
    <BrowserRouter>
      <Header />
      <Switch>
        <Route exact path="/home" component={Home} />
        <Route exact path="/signup" component={SignUp} />
        <Route exact path="/signin" component={SignIn} />
        <Route exact path="/dashboard" component={Dashboard} />
      </Switch>
      <Footer />

    </BrowserRouter>
  )
}

export default App