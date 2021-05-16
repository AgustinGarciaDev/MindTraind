import { Link } from 'react-router-dom'
import { useState } from "react"

const AsideNav = () => {

    const [navHide, setNavHide] = useState(false)

    const changeStatus = () => {
        setNavHide(!navHide)
    }

    const dataNav = [
        { path: "/dashboard", icon: "fas fa-border-all", text: "Dashboard" },
        { path: "/courselist", icon: "fas fa-graduation-cap", text: "Courses" },
        { path: "/jobs", icon: "fas fa-briefcase", text: "Jobs" },
        { path: "/chat", icon: "fab fa-discord", text: "Discord" },
        { path: "/admin", icon: "fas fa-users-cog", text: "Admin" },
        { path: "/", icon: "fas fa-door-open", text: "Sign Out" },
    ]


    return (
        <>
            {
                navHide
                    ? <div className=" asideNavActive">
                        <div className="listIconNav">
                            <div onClick={changeStatus} className="contenedorIconNav contenedorIconNavActive"><i className="fas fa-align-left"></i> </div>
                            <>
                                {dataNav.map(element => {
                                    return (
                                        <div className="contenedorIconNav contenedorIconNavActive">
                                            <Link className="contenedorIconSide" to={element.path}><i className={element.icon}></i><p>{element.text}</p></Link>
                                        </div>
                                    )
                                })}
                            </>
                        </div>
                    </div>
                    : <div className="asideNav">
                        <div className="listIconNav">
                            <div onClick={changeStatus} className="contenedorIconNav"><i className="fas fa-align-left"></i> </div>
                            {dataNav.map(element => {
                                return (
                                    <div onClick={changeStatus} className="contenedorIconNav"><i className={element.icon}></i></div>
                                )

                            })}

                        </div>
                    </div>
            }
        </>
    )
}

export default AsideNav

