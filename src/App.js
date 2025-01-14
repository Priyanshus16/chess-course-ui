import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import React from 'react';
import Header from './Components/Header/Header';
import { Box } from '@mui/material';
import Login from './Components/Auth/Login';
import Register from './Components/Auth/Register';
import Forgot from './Components/Auth/Forgot';
import Home from './Components/Home/Home';
import { ToastContainer } from 'react-toastify';
import VerifyOTP from './Components/Auth/VerifyOTP';
import ChangePassword from './Components/Auth/ChangePassword';
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
            <Route path="/forgot-password" element={<Forgot />} />
            <Route path="/VerifyOTP" element={<VerifyOTP />} />
            <Route path="/ChangePassword" element={<ChangePassword />} />
          </Routes>
        </Box>
      </Router>
      <ToastContainer/>
    </div>
  );
}

export default App;
