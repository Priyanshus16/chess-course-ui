import React, { useState } from 'react';
import { Box, Typography, TextField, Button } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';

const ForgotPassword = () => {
  const [userData,setUserData] = useState({
    email:""
  })
  const handleChange = (e)=>{
    const {name,value}= e.target;
    setUserData({...userData,[name]:value})
  }
  const navigate = useNavigate();
  const handleSubmit = async()=>{
    try {
      const loginResponse = await axios.post(`${process.env.REACT_APP_BASE_URL}/forgot-password`,userData)
      if(loginResponse.data){
      toast.success(loginResponse.data.message)
      navigate("/VerifyOTP",{state:{otp:loginResponse.data.otp,email:userData.email}})
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
          Forgot Password
        </Typography>
        <Typography variant="body2" textAlign="center" mb={2}>
          Enter your email address and we’ll send you a link to reset your password.
        </Typography>
        <TextField fullWidth label="Email Address" variant="outlined" margin="normal" required name="email" onChange={handleChange}/>
        <Button
          variant="contained"
          color="primary"
          fullWidth
          sx={{ marginTop: 2, padding: 1, textTransform: 'none' }}
          onClick={handleSubmit}
        >
          RESET PASSWORD
        </Button>
        <Box sx={{ textAlign: 'center', marginTop: 2 }}>
          <Link to="/login" underline="hover">
            Back to Sign In
          </Link>
        </Box>
      </Box>
    </Box>
  );
};

export default ForgotPassword;
