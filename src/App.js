// import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
// import { Box } from '@mui/material';
// import { ToastContainer } from 'react-toastify';
// import './App.css';
// import React from 'react';
// import Header from './Components/Header/Header.js';
// import Footer from './Components/Footer/Footer.js';
// import Login from './Components/Auth/Login.js';
// import Register from './Components/Auth/Register.js';
// import Forgot from './Components/Auth/Forgot';
// import Home from './Components/Home/Home.js';
// import VerifyOTP from './Components/Auth/VerifyOTP';
// import ChangePassword from './Components/Auth/ChangePassword';
// import About from './Components/About/About';
// import Courses from './Components/Courses/Courses';
// import CurriculumPage from './Components/Curriculam/CurriculumPage';
// import ContactUs from './Components/ContactUs/ContactUs';
// import Blog from './Components/Blog/Blog.js';
// import BlogDetails from './Components/Blog/BlogDetails';
// import Testimonials from './Components/Testimonial/Testimonials.js';

// import Users from './Admin/Auth/AdminLogin.js';
// import Testimonial from './Admin/Testimonial/Testimonial.js';
// import AddTestimonials from './Admin/Testimonial/AddTestimonials.js';
// import AddCurriculum from './Admin/Curriculum/AddCurriculum.js';
// import Curriculum from './Admin/Curriculum/Curriculum.js';
// import AddBlog from './Admin/Blog/AddBlog.js';
// import AdminLogin from './Admin/Auth/AdminLogin.js';

// function App() {
//   return (
//     <div className="App">
//       <Router>
//         <Box sx={{ width: "100%", display: 'flex', flexDirection: "column", alignItems: 'center' }}>
//           <Header/>
//           <Routes>
//             <Route path="/" element={<Home />} />
//             <Route path="/login" element={<Login />} />
//             <Route path="/Register" element={<Register />} />
//             <Route path="/forgot-password" element={<Forgot />} />
//             <Route path="/VerifyOTP" element={<VerifyOTP />} />
//             <Route path="/ChangePassword" element={<ChangePassword />} />
//             <Route path="/About" element={<About />} />
//             <Route path="/Courses" element={<Courses />} />
//             <Route path="/Contact" element={<ContactUs />} />
//             <Route path="/Curriculum" element={<CurriculumPage />} /> 
//             <Route path="/Blog" element={<Blog />} />
//             <Route path="/blogs/:id" element={<BlogDetails />} />
//             <Route path="testimonial" element={<Testimonials />} />
//             {/* Admin Routes */}
//             <Route exact path="/admin" element={<AdminLogin />} />
//             <Route path="/admin/Users" element={<Users />} />
//             <Route path="/admin/Testimonials" element={<Testimonial />} />
//             <Route path="/admin/addTestimonials" element={<AddTestimonials />} />
//             <Route path="/admin/addCurriculum" element={<AddCurriculum />} />
//             <Route path="/admin/Curriculum" element={<Curriculum />} />
//             <Route path="/admin/addBlog" element={<AddBlog />} />
//             <Route path="/admin/blogs" element={<Blog />} />
//           </Routes>
//           <Footer/>
//         </Box>
//       </Router>
//       <ToastContainer/>
//     </div>
//   );
// }

// export default App;



import { Route, BrowserRouter as Router, Routes, useLocation } from 'react-router-dom';
import { Box } from '@mui/material';
import { ToastContainer } from 'react-toastify';
import './App.css';
import React from 'react';
import Header from './Components/Header/Header.js';
import AdminHeader from './Admin/Header/AdminHeader.js'; // Import Admin Header
import Footer from './Components/Footer/Footer.js';
import Login from './Components/Auth/Login.js';
import Register from './Components/Auth/Register.js';
import Forgot from './Components/Auth/Forgot';
import Home from './Components/Home/Home.js';
import VerifyOTP from './Components/Auth/VerifyOTP';
import ChangePassword from './Components/Auth/ChangePassword';
import About from './Components/About/About';
import Courses from './Components/Courses/Courses';
import CurriculumPage from './Components/Curriculam/CurriculumPage';
import ContactUs from './Components/ContactUs/ContactUs';
import Blog from './Components/Blog/Blog.js';
import BlogDetails from './Components/Blog/BlogDetails';
import Testimonials from './Components/Testimonial/Testimonials.js';

import Users from './Admin/Auth/AdminLogin.js';
import Testimonial from './Admin/Testimonial/Testimonial.js';
import AddTestimonials from './Admin/Testimonial/AddTestimonials.js';
import AddCurriculum from './Admin/Curriculum/AddCurriculum.js';
import Curriculum from './Admin/Curriculum/Curriculum.js';
import AddBlog from './Admin/Blog/AddBlog.js';
import AdminLogin from './Admin/Auth/AdminLogin.js';

function App() {

  const isAdmin = localStorage.getItem('login') === 'true';


  return (
    <div className="App">
      <Router>
      <Box sx={{ width: "100%", display: 'flex', flexDirection: "column", alignItems: 'center' }}>
        {/* Render different headers based on login status and route */}
        {!isAdmin ? <AdminHeader /> : <Header />}
        
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/Register" element={<Register />} />
          <Route path="/forgot-password" element={<Forgot />} />
          <Route path="/VerifyOTP" element={<VerifyOTP />} />
          <Route path="/ChangePassword" element={<ChangePassword />} />
          <Route path="/About" element={<About />} />
          <Route path="/Courses" element={<Courses />} />
          <Route path="/Contact" element={<ContactUs />} />
          <Route path="/Curriculum" element={<CurriculumPage />} /> 
          <Route path="/Blog" element={<Blog />} />
          <Route path="/blogs/:id" element={<BlogDetails />} />
          <Route path="testimonial" element={<Testimonials />} />
          
          {/* Admin Routes */}
          <Route exact path="/admin" element={<AdminLogin />} />
          <Route path="/admin/Users" element={<Users />} />
          <Route path="/admin/Testimonials" element={<Testimonial />} />
          <Route path="/admin/addTestimonials" element={<AddTestimonials />} />
          <Route path="/admin/addCurriculum" element={<AddCurriculum />} />
          <Route path="/admin/Curriculum" element={<Curriculum />} />
          <Route path="/admin/addBlog" element={<AddBlog />} />
          <Route path="/admin/blogs" element={<Blog />} />
        </Routes>

        <Footer />
      </Box>
      <ToastContainer />
      </Router>
    </div>
  );
}

export default App;
