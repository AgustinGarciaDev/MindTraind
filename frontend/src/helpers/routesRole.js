
import SignIn from '../Pages/SignIn'
import SignUp from '../Pages/SignUp'
import Home from '../Pages/Home'
import Dashboard from '../Pages/Dashboard'
import Admin from '../Pages/Admin'
import CourseList from '../Pages/CourseList'
import ClassList from '../Pages/ClassList'
import Foro from '../Pages/Foro'
import Chat from '../Pages/Chat'
import Jobs from '../Pages/Jobs'
import { Route, Switch, Redirect } from "react-router-dom";

const routesProtected = {
    routerUserDontLogged: () => {
        return (
            <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/signup" component={SignUp} />
                <Route exact path="/signin" component={SignIn} />
                <Redirect to="/" />
            </Switch>
        )
    },
    routerUserLoggedCommon: () => {
        return (
            <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/dashboard" component={Dashboard} />
                <Route exact path="/courselist" component={CourseList} />
                <Route exact path="/chat" component={Chat} />
                <Route exact path="/jobs" component={Jobs} />
                <Route exact path="/class/:id" component={ClassList} />
                <Route exact path="/foro/:id" component={Foro} />
                <Redirect to="/" />
            </Switch>
        )
    },
    routerUserLoggedAdmin: () => {
        return (
            <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/dashboard" component={Dashboard} />
                <Route exact path="/courselist" component={CourseList} />
                <Route exact path="/chat" component={Chat} />
                <Route exact path="/admin" component={Admin} />
                <Route exact path="/jobs" component={Jobs} />
                <Route exact path="/class/:id" component={ClassList} />
                <Route exact path="/foro/:id" component={Foro} />
                <Redirect to="/" />
            </Switch>
        )
    },
    allRoutes: () => {
        return (
            <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/signup" component={SignUp} />
                <Route exact path="/signin" component={SignIn} />
                <Route exact path="/dashboard" component={Dashboard} />
                <Route exact path="/courselist" component={CourseList} />
                <Route exact path="/chat" component={Chat} />
                <Route exact path="/admin" component={Admin} />
                <Route exact path="/jobs" component={Jobs} />
                <Route exact path="/class/:id" component={ClassList} />
                <Route exact path="/foro/:id" component={Foro} />
                <Redirect to="/" />
            </Switch>
        )
    }
}

const getRoutesByRole = (role) => {
    if (role === "notLogged")
        return routesProtected.routerUserDontLogged();
    if (role === "student" || role === "coach" || role === "noRole")
        return routesProtected.routerUserLoggedCommon();
    if (role === "admin")
        return routesProtected.routerUserLoggedAdmin();

    //return routesProtected.allRoutes()
}


export default getRoutesByRole;
