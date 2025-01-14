import React from 'react'
import Footer from '../Footer/Footer'
import Banner from '../Banner/Banner'
import Courses from '../Courses/Courses'
import Testimonials from '../Testimonial/Testimonials'
import About from '../About/About'
import ContactUs from '../ContactUs/ContactUs'
import HowItWorks from '../HowItWorks/HowItWorks'
import Certifications from '../Certificates/Certificates'

const Home = () => {
  return (
    <>
    <Banner/>
    <Courses/>
    <Testimonials/>
    <HowItWorks/>
    <Certifications/>
    <About/>
    <ContactUs/>
    <Footer/>
    </>
  )
}

export default Home