import React from 'react'
import NavLayout from '../components/auth/NavLayout'
import GetInTouch from '../components/common/GetInTouch'
import ContactUsForm from "../components/common/ContactUsForm"

const Contact = () => {
  return (
  <NavLayout>
    <GetInTouch/>
    <ContactUsForm/>
  </NavLayout>
  )
}

export default Contact