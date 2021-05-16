import React from 'react'
import Footer from '../components/Footer'
import Header from '../components/Header'
import Hero from '../components/Hero'
import Info from '../components/Info'
import { connect } from 'react-redux'
import { useEffect, useState } from "react"
import AsideNav from '../components/AsideNav'

const Home = (props) => {
    const [user, setUser] = useState(false)
    useEffect(() => {
        if (props.userLogged.userLogged !== null) {
            setUser(true)
        } else {
            setUser(false)
        }
    }, [props.userLogged.userLogged])

    return (
        <div className="contenedorMenu">
            {user &&
                (
                    <AsideNav />

                )}
            <div className="contenedorWeb">
                <div className="home">
                    <Header />
                    <Hero />
                    <Info />
                    <Footer />
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        userLogged: state.user
    }
}

export default connect(mapStateToProps, null)(Home)