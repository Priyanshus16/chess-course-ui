import React from 'react';
import { Box, Typography, TextField, Button, Checkbox, FormControlLabel, Link } from '@mui/material';

const Login = () => {
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
        <TextField fullWidth label="Username or Email Address" variant="outlined" margin="normal" required />
        <TextField fullWidth label="Password" type="password" variant="outlined" margin="normal" required />
        <FormControlLabel control={<Checkbox />} label="Keep me signed in" />
        <Button
          variant="contained"
          color="primary"
          fullWidth
          sx={{ marginTop: 2, padding: 1, textTransform: 'none' }}
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
          <Link href="/forgot-password" underline="hover">
            Forgot?
          </Link>
          <Link href="/register" underline="hover">
            Register Now
          </Link>
        </Box>
      </Box>
    </Box>
  );
};

export default Login;
