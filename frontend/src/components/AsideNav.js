import { Link } from 'react-router-dom'
import { useEffect, useState } from "react"
import { connect } from 'react-redux'
import usersActions from '../redux/actions/usersActions'

const AsideNav = (props) => {
    const [user, setUser] = useState(false)
    const [navHide, setNavHide] = useState(false)

    const changeStatus = () => {
        setNavHide(!navHide)
    }

    useEffect(() => {
        if (props.userLogged.userLogged !== null) {
            if (props.userLogged.userLogged.role === 'admin') {
                setUser(true)
            }
        } else {
            setUser(false)
        }
    }, [props.userLogged.userLogged])

    const dataNav = [
        { path: "/dashboard", icon: "fas fa-border-all", text: "Dashboard" },
        { path: "/courselist", icon: "fas fa-graduation-cap", text: "Courses" },
        { path: "/jobs", icon: "fas fa-briefcase", text: "Jobs" },
        { path: "/chat", icon: "fab fa-discord", text: "Discord" },
    ]

    return (
        <>
            {
                navHide
                    ? <div className=" asideNavActive">
                        <div className="listIconNav">
                            <div onClick={changeStatus} className="contenedorIconNav contenedorIconNavActive"><i className="fas fa-align-left"></i> </div>
                            {
                                user &&
                                (
                                    <div className="contenedorIconNav contenedorIconNavActive">
                                        <Link className="contenedorIconSide" to={"/admin"}><i className="fas fa-users-cog"></i><p>Admin</p></Link>
                                    </div>
                                )
                            }

                            <>
                                {dataNav.map((element, index) => {
                                    return (
                                        <div key={index} className="contenedorIconNav contenedorIconNavActive">
                                            <Link className="contenedorIconSide" to={element.path}><i className={element.icon}></i><p>{element.text}</p></Link>
                                        </div>
                                    )
                                })}
                            </>
                            <div className="contenedorIconNav contenedorIconNavActive">
                                <i className="fas fa-door-open"></i><p onClick={props.signOut}>Sign out</p>
                            </div>
                        </div>
                    </div>
                    : <div className="asideNav">
                        <div className="listIconNav">
                            <div onClick={changeStatus} className="contenedorIconNav"><i className="fas fa-align-left"></i> </div>
                            {
                                user &&
                                (
                                    <div className="contenedorIconNav">
                                        <Link className="contenedorIconSide" to={"/admin"}><i className="fas fa-users-cog"></i></Link>
                                    </div>
                                )
                            }
                            {dataNav.map((element, index) => {
                                return (
                                    <div key={index} onClick={changeStatus} className="contenedorIconNav"><i className={element.icon}></i></div>
                                )

                            })}
                            <div className="contenedorIconNav">
                                <Link className="contenedorIconSide" onClick={props.signOut} to={"/"}><i className="fas fa-door-open"></i></Link>
                            </div>
                        </div>
                    </div>
            }
        </>
    )
}

const mapStateToProps = state => {
    return {
        userLogged: state.user
    }
}

const mapDispatchToProps = {
    signOut: usersActions.logOutUser
}

export default connect(mapStateToProps, mapDispatchToProps)(AsideNav)

