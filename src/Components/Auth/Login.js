import React, { useState } from 'react';
import { Box, Typography, TextField, Button, Checkbox, FormControlLabel } from '@mui/material';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const [userData,setUserData] = useState({
    email:"",
    password:""
  })
  const handleChange = (e)=>{
    const {name,value}= e.target;
    setUserData({...userData,[name]:value})
  }
  const navigate = useNavigate();
  const handleSubmit = async()=>{
    try {
      const loginResponse = await axios.post("https://coddect.glitch.me/login",userData)
      if(loginResponse.data){
      toast.success(loginResponse.data)
      navigate("/");
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
          Hi, Welcome back!
        </Typography>
        <TextField fullWidth label="Username or Email Address" variant="outlined" margin="normal" name="email" onChange={handleChange} required />
        <TextField fullWidth label="Password" type="password" variant="outlined" margin="normal" name="password" onChange={handleChange} required />
        <FormControlLabel control={<Checkbox />} label="Keep me signed in" />
        <Button
          variant="contained"
          color="primary"
          fullWidth
          sx={{ marginTop: 2, padding: 1, textTransform: 'none' }}
          onClick={handleSubmit}
        >
          SIGN IN
        </Button>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            marginTop: 2,
          }}
        >
          <Link to="/forgot-password" underline="hover">
            Forgot?
          </Link>
          <Link to="/register" underline="hover">
            Register Now
          </Link>
        </Box>
      </Box>
    </Box>
  );
};

export default Login;
