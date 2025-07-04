import Banner from "../Banner/Banner";
import Testimonials from "../Testimonial/Testimonials";
import About from "../About/About";
import ContactUs from "../ContactUs/ContactUs";
import CurriculumPage from "../Curriculam/CurriculumPage";
import FloatingVideo from "../Youtube/FloatingVideo";
import TestimonialImage from "../Testimonial/TestimonialImage";
import PopUpModal from "../Banner/PopUpModal";

const Home = () => {
  return (
    <>
      <Banner />
      <Testimonials />
      <TestimonialImage/>
      <CurriculumPage />
      <About />
      <ContactUs />
      <FloatingVideo />
      <PopUpModal />

      {/* Floating WhatsApp Icon */}
      <a
        href="https://wa.me/+919893458838" // Replace with your WhatsApp number
        target="_blank"
        rel="noopener noreferrer"
        style={{
          position: "fixed",
          bottom: "20px",
          right: "20px",
          zIndex: 1000,
          backgroundColor: "#25D366",
          width: "60px",
          height: "60px",
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
          textDecoration: "none",
        }}
      >
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
          alt="WhatsApp"
          style={{ width: "30px", height: "30px" }}
        />
      </a>
    </>
  );
};

export default Home;
