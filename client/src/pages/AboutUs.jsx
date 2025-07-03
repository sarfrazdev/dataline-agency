import React from 'react'
import NavLayout from '../components/auth/NavLayout'
import AboutUsHeroSection from '../components/common/AboutUsHeroSection'
import OurStory from '../components/common/OurStory'
import OurMIssion from '../components/common/OurMIssion'
import Values from '../components/common/Values'

const AboutUs = () => {
  return (
    <NavLayout>
        <AboutUsHeroSection/>
        <OurStory/>
        <Values/>
        <OurMIssion/>
    </NavLayout>
  )
}

export default AboutUs