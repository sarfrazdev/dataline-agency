import React from 'react'
import TopBar from '../common/TopBar'
import Header from '../common/Header'
import Navbar from '../common/Navbar' 
import Footer from '../common/Footer'

const NavLayout = ({children}) => {
    return (
        <div>
                <TopBar/>
                <Header/>
                <Navbar/>
                {children}
                <Footer/>
        </div>
    )
}

export default NavLayout