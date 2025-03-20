import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import {Swal} from 'sweetalert2'
import { motion } from "framer-motion";

export default function AdminLogin() {
  const navigate = useNavigate();
  const [formData, setFormData] = React.useState({
    username: "",
    password: "",
  });
  const handleChange = (e) => {
  const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleSubmit = async () => {
    axios.post(`${process.env.REACT_APP_BASE_ADMIN_URL}/login`, formData).then((res) => {
    if (res.formData.success) {
        navigate("/admin/Users");
        localStorage.setItem('login',true);
    }
    else{
        Swal.fire('Username Incorrect');
      }
    });
     
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundImage: "url('https://source.unsplash.com/1600x900/?chess,night')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <Paper elevation={10} sx={{ padding: "2rem", borderRadius: "12px", textAlign: "center", maxWidth: "400px", bgcolor: "rgba(255, 255, 255, 0.9)" }}>
          <Typography variant="h4" fontWeight="bold" color="primary">Admin Login</Typography>
          <Typography variant="body2" color="text.secondary" mb={2}>Welcome back! Enter your details.</Typography>
          <form onSubmit={handleSubmit}>
            <TextField fullWidth label="Email" type="email" name="email" value={formData.email} onChange={handleChange} sx={{ mb: 2 }} />
            <TextField fullWidth label="Password" type="password" name="password" value={formData.password} onChange={handleChange} sx={{ mb: 2 }} />
            <Button fullWidth variant="contained" color="primary" type="submit">Login</Button>
          </form>
          <Typography variant="body2" sx={{ mt: 2 }}>
            Don't have an account?{" "}
            <Link component="button" onClick={() => navigate("/register")} color="primary">Register</Link>
          </Typography>
        </Paper>
      </motion.div>
    </Box>
  );
}
