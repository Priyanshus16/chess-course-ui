import { Route, Routes, useLocation } from "react-router-dom";
import { Box } from "@mui/material";
import { ToastContainer } from "react-toastify";
import "./App.css";
import React from "react";

// UI
import Header from "./Components/Header/Header.js";
import Footer from "./Components/Footer/Footer.js";
import Login from "./Components/Auth/Login.js";
import Register from "./Components/Auth/Register.js";
import Home from "./Components/Home/Home.js";
import About from "./Components/About/About";
import CurriculumPage from "./Components/Curriculam/CurriculumPage";
import ContactUs from "./Components/ContactUs/ContactUs";
import Blog from "./Components/Blog/Blog.js";
import BlogDetails from "./Components/Blog/BlogDetails";
import Testimonials from "./Components/Testimonial/Testimonials.js";
import ChessStore from "./Components/Store/ChessStore.js";
import IntermediateCoaching from "./Components/ChessCoaching/IntermediateCoaching.js";
import BeginnerCoaching from "./Components/ChessCoaching/BeginnerCoaching.js";
import AdvanceCoaching from "./Components/ChessCoaching/AdvanceCoaching.js";
import AllCourses from "./Components/Courses/AllCourses.js";
import CourseDetail from "./Components/Courses/CourseDetail.js";
import MyCourses from "./Components/MyCourses/MyCourses.js";
import ProductDetail from "./Components/Store/ProductDetail.js";

// ADMIN ROUTES
import Users from "./Admin/User/Users.js";
import AdminHeader from "./Admin/Header/AdminHeader.js";
import Testimonial from "./Admin/Testimonial/Testimonial.js";
import AddTestimonials from "./Admin/Testimonial/AddTestimonials.js";
import AddCurriculum from "./Admin/Curriculum/AddCurriculum.js";
import Curriculum from "./Admin/Curriculum/Curriculum.js";
import AddBlog from "./Admin/Blog/AddBlog.js";
import AdminBlog from "./Admin/Blog/AdminBlog.js";
import AddCourses from "./Admin/Course/AddCourses.js";
import Course from "./Admin/Course/Course.js";
import Sidebar from "./Admin/Sidebar/Sidebar.js";
import AddUser from "./Admin/User/AddUser.js";
import AddAdmin from "./Admin/User/AddAdmin.js";
import TestimonialVideo from "./Admin/Testimonial/TestimonialVideo.js";
import AddTestimonialVideo from "./Admin/Testimonial/AddTestimonialVideo.js";
import TestimonialImage from "./Admin/Testimonial/TestimonialImage.js";
import AddTestimonialImage from "./Admin/Testimonial/AddTestimonialImage.js";
import Banner from "./Admin/Banner/Banner.js";
import AddBanner from "./Admin/Banner/AddBanner.js";

// CONTEXT
import { UserProvider } from "./context/UserContext.js";
import { CourseProvider } from "./context/courseContext.js";
import BeginnerBanner from "./Admin/Coaching/Beginner/BeginnerBanner.js";
import AddBeginnerBanner from "./Admin/Coaching/Beginner/AddBeginnerBanner.js";
import IntermediateBanner from "./Admin/Coaching/Intermediate/IntermediateBanner.js";
import AddIntermediateBanner from "./Admin/Coaching/Intermediate/AddIntermediateBanner.js";
import AdvanceBanner from "./Admin/Coaching/Advance/AdvanceBanner.js";
import AddAdvanceBanner from "./Admin/Coaching/Advance/AddAdvanceBanner.js";
import AdvanceBenefit from "./Admin/Coaching/Advance/AdvanceBenefit.js";
import AddAdvanceBenefit from "./Admin/Coaching/Advance/AddAdvanceBenefit.js";
import IntermediateBenefit from "./Admin/Coaching/Intermediate/IntermediateBenefit.js";
import AddIntermediateBenefit from "./Admin/Coaching/Intermediate/AddIntermediateBenefit.js";
import BeginnerBenefit from "./Admin/Coaching/Beginner/BeginnerBenefit.js";
import AddBeginnerBenefit from "./Admin/Coaching/Beginner/AddBeginnerBenefit.js";
import Store from "./Admin/Store/Store.js";
import AddItem from "./Admin/Store/AddItem.js";
import PopUpModal from "./Components/Banner/PopUpModal.js";

function App() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");
  const hideHeaderRoutes = ["/login", "/register"]; // Hide user headers
  const hideAdminHeaderRoutes = ["/admin"]; // Hide admin headers on login page

  const shouldShowHeader = !hideHeaderRoutes.includes(location.pathname);
  const shouldShowAdminHeader = !hideAdminHeaderRoutes.includes(
    location.pathname
  );

  return (
    <CourseProvider>
      <UserProvider>
        <div className="App">
          <Box
            sx={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            {isAdminRoute ? (
              <>
                {shouldShowAdminHeader && <AdminHeader />}{" "}
                {/* Hide admin header on login */}
                <Box sx={{ display: "flex", width: "100%" }}>
                  {shouldShowAdminHeader && <Sidebar />}{" "}
                  {/* Hide sidebar on admin login */}
                  <Box sx={{ flexGrow: 1, padding: 2 }}>
                    <Routes>
                      <Route path="/admin/" element={<Users />} />
                      <Route path="/admin/users" element={<Users />} />
                      <Route path="/admin/addUser" element={<AddUser />} />
                      <Route path="/admin/addAdmin" element={<AddAdmin />} />
                      <Route
                        path="/admin/Testimonials"
                        element={<Testimonial />}
                      />
                      <Route
                        path="/admin/testimonialVideo"
                        element={<TestimonialVideo />}
                      />
                      <Route
                        path="/admin/addTestimonialVideo"
                        element={<AddTestimonialVideo />}
                      />
                      <Route
                        path="/admin/testimonialImage"
                        element={<TestimonialImage />}
                      />
                      <Route
                        path="/admin/addTestimonialImage"
                        element={<AddTestimonialImage />}
                      />
                      <Route
                        path="/admin/addTestimonials"
                        element={<AddTestimonials />}
                      />
                      <Route
                        path="/admin/addCurriculum"
                        element={<AddCurriculum />}
                      />
                      <Route
                        path="/admin/Curriculum"
                        element={<Curriculum />}
                      />
                      <Route path="/admin/addBlog" element={<AddBlog />} />
                      <Route path="/admin/adminBlog" element={<AdminBlog />} />
                      <Route
                        path="/admin/addCourses"
                        element={<AddCourses />}
                      />
                      <Route path="/admin/Course" element={<Course />} />
                      <Route path="/admin/banner" element={<Banner />} />
                      <Route path="/admin/addBanner" element={<AddBanner />} />
                      <Route
                        path="/admin/beginnerBanner"
                        element={<BeginnerBanner />}
                      />
                      <Route
                        path="/admin/addBeginnerBanner"
                        element={<AddBeginnerBanner />}
                      />
                      <Route
                        path="/admin/intermediateBanner"
                        element={<IntermediateBanner />}
                      />
                      <Route
                        path="/admin/addIntermediateBanner"
                        element={<AddIntermediateBanner />}
                      />
                      <Route
                        path="/admin/advanceBanner"
                        element={<AdvanceBanner />}
                      />
                      <Route
                        path="/admin/addAdvanceBanner"
                        element={<AddAdvanceBanner />}
                      />
                      <Route
                        path="/admin/advanceBenefit"
                        element={<AdvanceBenefit />}
                      />
                      <Route
                        path="/admin/addAdvanceBenefit"
                        element={<AddAdvanceBenefit />}
                      />
                      <Route
                        path="/admin/intermediateBenefit"
                        element={<IntermediateBenefit />}
                      />
                      <Route
                        path="/admin/addIntermediateBenefit"
                        element={<AddIntermediateBenefit />}
                      />
                      <Route
                        path="/admin/beginnerBenefit"
                        element={<BeginnerBenefit />}
                      />
                      <Route
                        path="/admin/addBeginnerBenefit"
                        element={<AddBeginnerBenefit />}
                      />
                      <Route path="/admin/store" element={<Store />} />
                      <Route path="/admin/addItem" element={<AddItem />} />
                    </Routes>
                  </Box>
                </Box>
              </>
            ) : (
              <>
                {shouldShowHeader && <Header />}
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/home" element={<Home />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/contact" element={<ContactUs />} />
                  <Route path="/curriculum" element={<CurriculumPage />} />
                  <Route path="/blog" element={<Blog />} />
                  <Route path="/blogs/:id" element={<BlogDetails />} />
                  <Route path="/testimonial" element={<Testimonials />} />
                  <Route
                    path="/testimonialImage"
                    element={<TestimonialImage />}
                  />
                  <Route path="/courses" element={<AllCourses />} />
                  <Route path="/courseDetail" element={<CourseDetail />} />
                  <Route path="/myCourses" element={<MyCourses />} />
                  <Route
                    path="/intermediateCoaching"
                    element={<IntermediateCoaching />}
                  />
                  <Route
                    path="/beginnerCoaching"
                    element={<BeginnerCoaching />}
                  />
                  <Route
                    path="/advanceCoaching"
                    element={<AdvanceCoaching />}
                  />
                  <Route path="/store" element={<ChessStore />} />
                  <Route path="/modal" element={<PopUpModal />} />
                  <Route path="/store/productDetail/:id" element={<ProductDetail />} />
                </Routes>
              </>
            )}
            {!isAdminRoute && <Footer />}
          </Box>
          <ToastContainer />
        </div>
      </UserProvider>
    </CourseProvider>
  );
}

export default App;
