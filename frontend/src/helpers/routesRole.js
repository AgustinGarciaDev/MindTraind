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
import NewJob from "../components/NewJob"
import NewCourse from "../components/NewCourse"
import CourseContainer from "../components/CourseContainer"
import JobsContainer from "../components/JobsContainer";
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
                <Route exact path="/admin" component={Admin} /> {/* ADMIN */}
                <Route exact path="/NewJob" component={NewJob} />{/* ADMIN */}
                <Route exact path="/EditJobs" component={JobsContainer} />{/* ADMIN */}
                <Route exact path="/NewCourse" component={NewCourse} />{/* ADMIN */}
                <Route exact path="/EditCourse" component={CourseContainer} />{/* ADMIN */}
                <Redirect to="/" />
            </Switch>
        )
    }
}

export default routesProtected