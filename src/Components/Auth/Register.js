import React, { useState } from 'react';
import { Box, Typography, TextField, Button } from '@mui/material';
import { toast } from 'react-toastify';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
  const [userData,setUserData] = useState({
    email:"",
    password:"",
    name:""
  })
  const handleChange = (e)=>{
    const {name,value}= e.target;
    setUserData({...userData,[name]:value})
  }
  const navigate = useNavigate();
  const handleSubmit = async()=>{
    try {
      const loginResponse = await axios.post("https://coddect.glitch.me/signup",userData)
      setUserData({
        email:"",
        password:"",
        name:""    
      })
      if(loginResponse.data){
        toast.success(loginResponse.data);
        navigate("/login");
      }
    } catch (error) {
      toast.error(error);
    }
  }
  return (
    <Box
      sx={{
        width: '100%',
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f9f9f9',
      }}
    >
      <Box
        sx={{
          width: { xs: '90%', sm: '400px' },
          backgroundColor: '#fff',
          padding: 4,
          borderRadius: 2,
          boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
        }}
      >
        <Typography variant="h5" fontWeight="bold" textAlign="center" mb={2}>
          Create Account
        </Typography>
        <TextField fullWidth label="Full Name" variant="outlined" margin="normal" required name="name" onChange={handleChange}/>
        <TextField fullWidth label="Email Address" variant="outlined" margin="normal" required name="email" onChange={handleChange}/>
        <TextField fullWidth label="Password" type="password" variant="outlined" margin="normal" required name="password" onChange={handleChange}/>
        <Button
          variant="contained"
          color="primary"
          fullWidth
          sx={{ marginTop: 2, padding: 1, textTransform: 'none' }}
          onClick={handleSubmit}
        >
          REGISTER
        </Button>
        <Box sx={{ textAlign: 'center', marginTop: 2 }}>
          <Link to="/login" underline="hover">
            Already have an account? Sign In
          </Link>
        </Box>
      </Box>
    </Box>
  );
};

export default Register;
