import {
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import { Box } from "@mui/material";
import { ToastContainer } from "react-toastify";
import "./App.css";
import React from "react";
import Header from "./Components/Header/Header.js";
import AdminHeader from "./Admin/Header/AdminHeader.js";
import Footer from "./Components/Footer/Footer.js";
import Login from "./Components/Auth/Login.js";
import Register from "./Components/Auth/Register.js";
// import Forgot from "./Components/Auth/Forgot";
import Home from "./Components/Home/Home.js";
// import VerifyOTP from "./Components/Auth/VerifyOTP";
// import ChangePassword from "./Components/Auth/ChangePassword";
import About from "./Components/About/About";
// import Courses from "./Components/Courses/Courses";
import CurriculumPage from "./Components/Curriculam/CurriculumPage";
import ContactUs from "./Components/ContactUs/ContactUs";
import Blog from "./Components/Blog/Blog.js";
import BlogDetails from "./Components/Blog/BlogDetails";
import Testimonials from "./Components/Testimonial/Testimonials.js";
import { CourseProvider } from "./context/courseContext.js";

// ADMIN ROUTES
import Users from "./Admin/User/Users.js";
import Testimonial from "./Admin/Testimonial/Testimonial.js";
import AddTestimonials from "./Admin/Testimonial/AddTestimonials.js";
import AddCurriculum from "./Admin/Curriculum/AddCurriculum.js";
import Curriculum from "./Admin/Curriculum/Curriculum.js";
import AddBlog from "./Admin/Blog/AddBlog.js";
import AdminBlog from "./Admin/Blog/AdminBlog.js";
import AdminLogin from "./Admin/Auth/AdminLogin.js";
import AddCourses from "./Admin/Course/AddCourses.js";
import Course from "./Admin/Course/Course.js";
import Sidebar from "./Admin/Sidebar/Sidebar.js";
import AddUser from "./Admin/User/AddUser.js";
import AllCourses from "./Components/Courses/AllCourses.js";
import CourseDetail from "./Components/Courses/CourseDetail.js";
import MyCourses from "./Components/MyCourses/MyCourses.js";
import { UserProvider } from "./context/UserContext.js";

function App() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");
  const hideHeaderRoutes = [ "/login", "/register"]; // Hide user headers
  const hideAdminHeaderRoutes = ["/admin"]; // Hide admin headers on login page

  const shouldShowHeader = !hideHeaderRoutes.includes(location.pathname);
  const shouldShowAdminHeader = !hideAdminHeaderRoutes.includes(location.pathname);

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
              {shouldShowAdminHeader && <AdminHeader />} {/* Hide admin header on login */}
              <Box sx={{ display: "flex", width: "100%" }}>
                {shouldShowAdminHeader && <Sidebar />} {/* Hide sidebar on admin login */}
                <Box sx={{ flexGrow: 1, padding: 2 }}>
                  <Routes>
                    <Route exact path="/admin" element={<AdminLogin />} />
                    <Route path="/admin/users" element={<Users />} />
                    <Route path="/admin/addUser" element={<AddUser />} />
                    <Route path="/admin/Testimonials" element={<Testimonial />} />
                    <Route path="/admin/addTestimonials" element={<AddTestimonials />} />
                    <Route path="/admin/addCurriculum" element={<AddCurriculum />} />
                    <Route path="/admin/Curriculum" element={<Curriculum />} />
                    <Route path="/admin/addBlog" element={<AddBlog />} />
                    <Route path="/admin/adminBlog" element={<AdminBlog />} />
                    <Route path="/admin/addCourses" element={<AddCourses />} />
                    <Route path="/admin/Course" element={<Course />} />
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
                <Route path="/courses" element={<AllCourses />} />
                <Route path="/courseDetail" element={<CourseDetail />} />
                <Route path="/myCourses" element={<MyCourses />} />
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


