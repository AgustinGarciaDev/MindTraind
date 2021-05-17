import React from 'react'
import Footer from '../components/Footer'
import Header from '../components/Header'
import Hero from '../components/Hero'
import Info from '../components/Info'
import { useEffect } from "react"

const Home = () => {

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    return (

        <div className="home">
            <Header />
            <Hero />
            <Info />
            <Footer />
        </div>
    )
}

export default Home