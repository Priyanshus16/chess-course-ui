import Footer from '../Footer/Footer'
import Banner from '../Banner/Banner'
import Courses from '../Courses/Courses'
import Testimonials from '../Testimonial/Testimonials'
import About from '../About/About'
import ContactUs from '../ContactUs/ContactUs'
import HowItWorks from '../HowItWorks/HowItWorks'
// import Certifications from '../Certificates/Certificates'
import CurriculumPage from '../Curriculam/CurriculumPage'
import Header from '../Header/Header'
import Blog from '../Blog/Blog'


const Home = () => {

  return (
    <>
    <Header  />
    <Banner/>
    <Courses/>
    <Testimonials/>
    <HowItWorks/>
    {/* <Certifications/> */}
    <Blog/>
    <CurriculumPage/>
    <About/>
    <ContactUs/>
    <Footer/>
    </>
  )
}

export default Home