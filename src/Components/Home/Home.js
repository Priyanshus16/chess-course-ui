import Banner from '../Banner/Banner'
import Courses from '../Courses/Courses'
import Testimonials from '../Testimonial/Testimonials'
import About from '../About/About'
import ContactUs from '../ContactUs/ContactUs'
import HowItWorks from '../HowItWorks/HowItWorks'
import CurriculumPage from '../Curriculam/CurriculumPage'
import Blog from '../Blog/Blog'


const Home = () => {

  return (
    <>
    <Banner/>
    <Courses/>
    <Testimonials/>
    <HowItWorks/>
    {/* <Certifications/> */}
    <Blog/>
    <CurriculumPage/>
    <About/>
    <ContactUs/>
    </>
  )
}

export default Home