
import React, { useState } from 'react';
import { Box, Typography, TextField, Button } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';

const ChangePassword = () => {
  const [passwordData, setPasswordData] = useState({
    password: '',
    confirmPassword: '',
  });
  const { state } = useLocation();
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setPasswordData({ ...passwordData, [name]: value });
  };

  const handleSubmit = async () => {
    if (passwordData.password !== passwordData.confirmPassword) {
      toast.error('Passwords do not match!');
      return;
    }
    try {
    const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/reset-password`, {
        email: state?.email,
        newPassword: passwordData.password,
      });
      if (response.data) {
        toast.success(response.data);
        navigate('/login');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Something went wrong!');
    }
  };

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
          Change Password
        </Typography>
        <Typography variant="body2" textAlign="center" mb={2}>
          Enter your new password below.
        </Typography>
        <TextField
          fullWidth
          label="New Password"
          type="password"
          variant="outlined"
          margin="normal"
          required
          name="password"
          onChange={handleChange}
        />
        <TextField
          fullWidth
          label="Confirm Password"
          type="password"
          variant="outlined"
          margin="normal"
          required
          name="confirmPassword"
          onChange={handleChange}
        />
        <Button
          variant="contained"
          color="primary"
          fullWidth
          sx={{ marginTop: 2, padding: 1, textTransform: 'none' }}
          onClick={handleSubmit}
        >
          CHANGE PASSWORD
        </Button>
      </Box>
    </Box>
  );
};

export default ChangePassword;