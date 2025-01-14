import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import React from 'react';
import Header from './Components/Header/Header';
import { Box } from '@mui/material';
import Login from './Components/Auth/Login';
import Register from './Components/Auth/Register';
import Forgot from './Components/Auth/Forgot';
import Maincontent from './Components/Maincontent/Maincontent';
import Home from './Components/Home/Home';

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
          </Routes>
        </Box>
      </Router>
    </div>
  );
}

export default App;
