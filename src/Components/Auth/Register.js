import React from 'react';
import { Box, Typography, TextField, Button, Link } from '@mui/material';

const Register = () => {
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
        <TextField fullWidth label="Full Name" variant="outlined" margin="normal" required />
        <TextField fullWidth label="Email Address" variant="outlined" margin="normal" required />
        <TextField fullWidth label="Password" type="password" variant="outlined" margin="normal" required />
        <Button
          variant="contained"
          color="primary"
          fullWidth
          sx={{ marginTop: 2, padding: 1, textTransform: 'none' }}
        >
          REGISTER
        </Button>
        <Box sx={{ textAlign: 'center', marginTop: 2 }}>
          <Link href="/login" underline="hover">
            Already have an account? Sign In
          </Link>
        </Box>
      </Box>
    </Box>
  );
};

export default Register;
