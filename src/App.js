import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import React from 'react';
import Header from './Components/Header/Header';
import Footer from './Components/Footer/Footer';
import { Box } from '@mui/material';
import Login from './Components/Auth/Login';
import Register from './Components/Auth/Register';
import Forgot from './Components/Auth/Forgot';
import Home from './Components/Home/Home';
import { ToastContainer } from 'react-toastify';
import VerifyOTP from './Components/Auth/VerifyOTP';
import ChangePassword from './Components/Auth/ChangePassword';
import About from './Components/About/About';
import Courses from './Components/Courses/Courses';
import CurriculumPage from './Components/Curriculam/CurriculumPage';
import ContactUs from './Components/ContactUs/ContactUs';
import Blog from './Components/Blog/Blog';

function App() {
  return (
    <div className="App">
      <Router>
        <Box sx={{ width: "100%", display: 'flex', flexDirection: "column", alignItems: 'center' }}>
          <Header/>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/Register" element={<Register />} />
            {/* <Route path="/forgot-password" element={<Forgot />} /> */}
            {/* <Route path="/VerifyOTP" element={<VerifyOTP />} /> */}
            <Route path="/ChangePassword" element={<ChangePassword />} />
            <Route path="/About" element={<About />} />
            <Route path="/Courses" element={<Courses />} />
            <Route path="/Contact" element={<ContactUs />} />
            <Route path="/Curriculum" element={<CurriculumPage />} /> 
            <Route path="/Blog" element={<Blog />} />
          </Routes>
          <Footer/>
        </Box>
      </Router>
      <ToastContainer/>
    </div>
  );
}

export default App;
