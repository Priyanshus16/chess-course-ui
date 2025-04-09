import React, { useState } from "react";
import {
  TextField,
  Button,
  Container,
  Typography,
  Box,
  InputAdornment,
} from "@mui/material";
import { Person as PersonIcon, Email as EmailIcon, Lock as LockIcon } from "@mui/icons-material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const AddUser = () => {
  const navigate = useNavigate();
  const userType = localStorage.getItem("userType");
  if (userType !== "admin") {
    navigate("/");
  }

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!formData.name || !formData.email || !formData.password) {
        return Swal.fire("Please provide all fields.");
      }
      
      await axios.post(
        `${process.env.REACT_APP_BASE_ADMIN_URL}/addUser`,
        formData
      );
      navigate("/admin/users");
    } catch (error) {
      if(error.response.status === 409){
        Swal.fire("User already exists");
        return;
      }
      console.error(error, "Error while sending data");
    }
  };

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          mt: 10,
          p: 4,
          boxShadow: 4,
          borderRadius: 3,
          bgcolor: "#F8FAFC", 
          textAlign: "center",
          fontFamily: "'Poppins', sans-serif",
        }}
      >
        <Typography variant="h4" gutterBottom sx={{ fontWeight: "600", color: "#1E3A8A" }}>
          User Management
        </Typography>

        <form>
          <TextField
            label="Full Name"
            fullWidth
            name="name"
            value={formData.name}
            onChange={handleChange}
            margin="normal"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <PersonIcon sx={{ color: "#1E3A8A" }} />
                </InputAdornment>
              ),
            }}
          />

          <TextField
            label="Email"
            name="email"
            value={formData.email}
            fullWidth
            onChange={handleChange}
            margin="normal"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <EmailIcon sx={{ color: "#1E3A8A" }} />
                </InputAdornment>
              ),
            }}
          />
          
          <TextField
            label="Password"
            name="password"
            value={formData.password}
            fullWidth
            onChange={handleChange}
            margin="normal"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockIcon sx={{ color: "#1E3A8A" }} />
                </InputAdornment>
              ),
            }}
          />


          {/* Submit Button */}
          <Button
            type="submit"
            variant="contained"
            fullWidth
            onClick={handleSubmit}
            sx={{
              mt: 3,
              bgcolor: "#0F172A",
              "&:hover": { bgcolor: "#1E293B" },
              color: "white",
              fontWeight: "bold",
              p: 1.5,
              borderRadius: 2,
            }}
          >
            Submit User
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default AddUser;
