import React, { useState } from "react";
import { Box, Button, TextField, Typography, Paper, Link } from "@mui/material";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });

  // Admin credentials
  const adminUser = "kunal@gmail.com";
  const adminPassword = "kunal@12345";

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.email === adminUser && formData.password === adminPassword) {
      localStorage.setItem("admin", JSON.stringify({ email: adminUser }));
      navigate("/admin/");
      Swal.fire("admin login successfully");
      return;
    }
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/login`,
        formData
      );
      const user = response.data.user;
      const localStorageData = {
        name: user.name,
        email: user.email,
        _id: user._id,
      };

      if (response.status === 200) {
        const token = response.data.token;
        localStorage.setItem("token", JSON.stringify(token));
        localStorage.setItem("user", JSON.stringify(localStorageData));
        localStorage.setItem("userType", user.source);
        if (user.source === "admin") {
          navigate("/admin/");
          Swal.fire("Admin login successfully");
        } else {
          // Swal.fire("login successfully");
          navigate("/home");
        }
        setTimeout(() => {
          window.scrollTo(0, 0);
        }, 100);
      }
    } catch (error) {
      console.log("error while sending data", error);
      if (error.response.status === 401) {
        Swal.fire("invalid credential");
        return;
      }
      Swal.fire("Something went wrong. Please try again.");
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundImage:
          "url('https://source.unsplash.com/1600x900/?chess,night')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Paper
          elevation={10}
          sx={{
            padding: "2rem",
            borderRadius: "12px",
            textAlign: "center",
            maxWidth: "400px",
            bgcolor: "rgba(255, 255, 255, 0.9)",
          }}
        >
          <Typography variant="h4" fontWeight="bold" color="primary">
            Login
          </Typography>
          <Typography variant="body2" color="text.secondary" mb={2}>
            Welcome back! Enter your details.
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              sx={{ mb: 2 }}
            />
            <Button fullWidth variant="contained" color="primary" type="submit">
              Login
            </Button>
          </form>
          <Typography variant="body2" sx={{ mt: 2 }}>
            Don't have an account?{" "}
            <Link
              component="button"
              onClick={() => navigate("/register")}
              color="primary"
            >
              Register
            </Link>
          </Typography>
          <Typography variant="body2" sx={{ mt: 2 }}>
            <Link
              component="button"
              onClick={() => navigate("/forgotPassword")}
              color="primary"
            >
              Forgot Password
            </Link>
          </Typography>
        </Paper>
      </motion.div>
    </Box>
  );
};

export default Login;
