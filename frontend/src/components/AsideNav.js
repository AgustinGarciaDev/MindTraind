
import { useState } from "react"

const AsideNav = () => {

    const [navHide, setNavHide] = useState(false)

    const changeStatus = () => {
        setNavHide(!navHide)
    }


    return (
        <>
            {
                navHide
                    ? <div className="asideNav asideNavActive">
                        <div className="listIconNav">
                            <div onClick={changeStatus} className="contenedorIconNav contenedorIconNavActive"><i class="fas fa-align-left"></i> </div>
                            <div className="contenedorIconNav contenedorIconNavActive">
                                <i className="fas fa-graduation-cap"></i><p> Courses</p>
                            </div>
                            <div className="contenedorIconNav contenedorIconNavActive">
                                <i className="fas fa-border-all"></i><p> Dashboard</p>
                            </div>
                            <div className="contenedorIconNav contenedorIconNavActive">
                                <i className="fas fa-briefcase"></i><p>Jobs</p>
                            </div>
                            <div className="contenedorIconNav contenedorIconNavActive">
                                <i className="fab fa-discord"></i><p> Discord</p>
                            </div>
                            <div className="contenedorIconNav contenedorIconNavActive">
                                <i className="fab fa-spotify"></i><p>Spotify</p>
                            </div>
                            <div className="contenedorIconNav contenedorIconNavActive">
                                <i className="fas fa-users-cog"></i><p> Admin</p>
                            </div>
                            <div className="contenedorIconNav contenedorIconNavActive">
                                <i className="fas fa-door-open"></i><p> Sign out</p>
                            </div>
                        </div>
                    </div>
                    : <div className="asideNav">
                        <div className="listIconNav">
                            <div onClick={changeStatus} className="contenedorIconNav"><i className="fas fa-align-left"></i> </div>
                            <div onClick={changeStatus} className="contenedorIconNav"><i className="fas fa-briefcase"></i> </div>
                            <div onClick={changeStatus} className="contenedorIconNav"><i className="fas fa-graduation-cap"></i></div>
                            <div onClick={changeStatus} className="contenedorIconNav"><i className="fas fa-border-all"></i></div>
                            <div onClick={changeStatus} className="contenedorIconNav"><i className="fab fa-discord"></i></div>
                            <div onClick={changeStatus} className="contenedorIconNav"><i className="fab fa-spotify"></i></div>
                            <div onClick={changeStatus} className="contenedorIconNav"><i className="fas fa-users-cog"></i></div>
                            <div onClick={changeStatus} className="contenedorIconNav"> <i className="fas fa-door-open"></i></div>
                        </div>
                    </div>
            }
        </>
    )
}

export default AsideNav

