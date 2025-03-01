// import React, { useState } from 'react';
// import { Box, Typography, TextField, Button } from '@mui/material';
// import { toast } from 'react-toastify';
// import axios from 'axios';
// import { Link, useNavigate } from 'react-router-dom';

// const Register = () => {
//   const [userData,setUserData] = useState({
//     email:"",
//     password:"",
//     name:""
//   })
//   const handleChange = (e)=>{
//     const {name,value}= e.target;
//     setUserData({...userData,[name]:value})
//   }
//   const navigate = useNavigate();
//   const handleSubmit = async()=>{
//     try {
//       const loginResponse = await axios.post("https://coddect.glitch.me/signup",userData)
//       setUserData({
//         email:"",
//         password:"",
//         name:""    
//       })
//       if(loginResponse.data){
//         toast.success(loginResponse.data);
//         navigate("/login");
//       }
//     } catch (error) {
//       toast.error(error);
//     }
//   }
//   return (
//     <Box
//       sx={{
//         width: '100%',
//         height: '100vh',
//         display: 'flex',
//         alignItems: 'center',
//         justifyContent: 'center',
//         backgroundColor: '#f9f9f9',
//       }}
//     >
//       <Box
//         sx={{
//           width: { xs: '90%', sm: '400px' },
//           backgroundColor: '#fff',
//           padding: 4,
//           borderRadius: 2,
//           boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
//         }}
//       >
//         <Typography variant="h5" fontWeight="bold" textAlign="center" mb={2}>
//           Create Account
//         </Typography>
//         <TextField fullWidth label="Full Name" variant="outlined" margin="normal" required name="name" onChange={handleChange}/>
//         <TextField fullWidth label="Email Address" variant="outlined" margin="normal" required name="email" onChange={handleChange}/>
//         <TextField fullWidth label="Password" type="password" variant="outlined" margin="normal" required name="password" onChange={handleChange}/>
//         <Button
//           variant="contained"
//           color="primary"
//           fullWidth
//           sx={{ marginTop: 2, padding: 1, textTransform: 'none' }}
//           onClick={handleSubmit}
//         >
//           REGISTER
//         </Button>
//         <Box sx={{ textAlign: 'center', marginTop: 2 }}>
//           <Link to="/login" underline="hover">
//             Already have an account? Sign In
//           </Link>
//         </Box>
//       </Box>
//     </Box>
//   );
// };

// export default Register;

import React, { useState } from "react";
import { Box, Button, TextField, Typography, Paper, Link } from "@mui/material";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Register Data:", formData);
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundImage: "url('https://source.unsplash.com/1600x900/?chess,abstract')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <Paper elevation={10} sx={{ padding: "2rem", borderRadius: "12px", textAlign: "center", maxWidth: "400px", bgcolor: "rgba(255, 255, 255, 0.9)" }}>
          <Typography variant="h4" fontWeight="bold" color="primary">Register</Typography>
          <Typography variant="body2" color="text.secondary" mb={2}>Join the Chess Community!</Typography>
          <form onSubmit={handleSubmit}>
            <TextField fullWidth label="Full Name" name="name" value={formData.name} onChange={handleChange} sx={{ mb: 2 }} />
            <TextField fullWidth label="Email" type="email" name="email" value={formData.email} onChange={handleChange} sx={{ mb: 2 }} />
            <TextField fullWidth label="Password" type="password" name="password" value={formData.password} onChange={handleChange} sx={{ mb: 2 }} />
            <Button fullWidth variant="contained" color="primary" type="submit">Register</Button>
          </form>
          <Typography variant="body2" sx={{ mt: 2 }}>
            Already have an account?{" "}
            <Link component="button" onClick={() => navigate("/login")} color="primary">Login</Link>
          </Typography>
        </Paper>
      </motion.div>
    </Box>
  );
};

export default Register;
