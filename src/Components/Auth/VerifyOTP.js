import React, { useState } from 'react';
import { Box, Typography, TextField, Button } from '@mui/material';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const VerifyOTP = () => {
  const [userData,setUserData] = useState({
    otp:"",
    email:""
  })
    const location = useLocation();
  const handleChange = (e)=>{
    const {name,value}= e.target;
    setUserData({...userData,[name]:value})
  }
  const navigate = useNavigate();

  const handleSubmit = async()=>{
    if(location.state.email){
      setUserData({...userData,email:location.state.email})
    }
    try {
      if(location.state.otp !== userData.otp){
        toast.error("OTP incorrect");
        return;
      }
    else{
      toast.success("OTP Verified");
      navigate("/ChangePassword",{state:userData});
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
          Enter your OTP from email address
        </Typography>
        <TextField fullWidth label="OTP" variant="outlined" margin="normal" required name="otp" onChange={handleChange}/>
        <Button
          variant="contained"
          color="primary"
          fullWidth
          sx={{ marginTop: 2, padding: 1, textTransform: 'none' }}
          onClick={handleSubmit}
        >
          VERIFY EMAIL
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

export default VerifyOTP;
