import React from 'react';
import { Box, Typography, TextField, Button, Link } from '@mui/material';

const ForgotPassword = () => {
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
        <TextField fullWidth label="Email Address" variant="outlined" margin="normal" required />
        <Button
          variant="contained"
          color="primary"
          fullWidth
          sx={{ marginTop: 2, padding: 1, textTransform: 'none' }}
        >
          RESET PASSWORD
        </Button>
        <Box sx={{ textAlign: 'center', marginTop: 2 }}>
          <Link href="/login" underline="hover">
            Back to Sign In
          </Link>
        </Box>
      </Box>
    </Box>
  );
};

export default ForgotPassword;
