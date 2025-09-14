import React from 'react'
import TopBar from '../common/TopBar'
import Header from '../common/Header'
import Navbar from '../common/Navbar' 
import Footer from '../common/Footer'
import WhatsAppButton from '../common/WhatsApppButton'

const NavLayout = ({children}) => {
    return (
        <div>
                <TopBar/>
                <Header/>
                <Navbar/>
                {children}
                <WhatsAppButton/>
                <Footer/>
        </div>
    )
}

export default NavLayout