import React from 'react'
import TopBar from '../common/TopBar'
import Header from '../common/Header'
import Navbar from '../common/Navbar' 
import Footer from '../common/Footer'
import ScrollTop from '../common/ScrollTop'
import WhatsAppButton from '../common/WhatsApppButton'

const NavLayout = ({children}) => {
    return (
        <div>
                <TopBar/>
                <Header/>
                <Navbar/>
                {children}
                <ScrollTop/>
                <WhatsAppButton/>
                <Footer/>
        </div>
    )
}

export default NavLayout