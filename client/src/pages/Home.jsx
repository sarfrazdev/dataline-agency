import React from 'react'
import Hero from "../components/common/Hero"
import NavLayout from '../components/auth/NavLayout'
import Slider from '../components/common/Slider'
import Choose from '../components/common/Choose'
import BrandSection from '../components/common/BrandSection'
import ImageSection from '../components/common/Imagesection'
import TopCategoriesSection from '../components/common/TopCategoriesSection'



const Home = () => {
  return (
      <div>
        
        <NavLayout>
             <Hero/>
             <ImageSection/>
            <BrandSection/>
            <TopCategoriesSection/>
            <Slider/>
            <Choose/>
        </NavLayout>
        
      
      
        
      </div>

  )
}

export default Home