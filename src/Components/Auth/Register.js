import React, { useState } from "react";
import { Box, Button, TextField, Typography, Paper, Link } from "@mui/material";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
        Swal.fire("Please provide all fields");
        return;
      }

      if(formData.password !== formData.confirmPassword) {
        Swal.fire("Password does not match");
        return;
      }

      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/register`,
        formData
      );
      if (response.status === 200) {
        Swal.fire("User Register Successfully");
        navigate("/login");
        return;
      }
    } catch (error) {
      console.log(`error api call`, error);
      if (error.response.status === 409) {
        Swal.fire("User already exists");
        return;
      }
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
          "url('https://source.unsplash.com/1600x900/?chess,abstract')",
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
            Register
          </Typography>
          <Typography variant="body2" color="text.secondary" mb={2}>
            Join the Chess Community!
          </Typography>
          <form>
            <TextField
              fullWidth
              label="Full Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              sx={{ mb: 2 }}
            />
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
            <TextField
              fullWidth
              label="Confirm Password"
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              sx={{ mb: 2 }}
            />
            <Button
              onClick={handleSubmit}
              fullWidth
              variant="contained"
              color="primary"
              type="submit"
            >
              Register
            </Button>
          </form>
          <Typography variant="body2" sx={{ mt: 2 }}>
            Already have an account?{" "}
            <Link
              component="button"
              onClick={() => navigate("/login")}
              color="primary"
            >
              Login
            </Link>
          </Typography>
        </Paper>
      </motion.div>
    </Box>
  );
};

export default Register;
