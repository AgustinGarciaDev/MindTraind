import React from 'react'
import Footer from '../components/Footer'
import Header from '../components/Header'
import Hero from '../components/Hero'
import Info from '../components/Info'


const Home = () => {

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