import React, { useState } from "react";
import {
  TextField,
  Button,
  Container,
  Typography,
  Box,
  InputAdornment,
} from "@mui/material";
import { Title, Description } from "@mui/icons-material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const AddContactDetail = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    phone: "",
    address:""  
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
      if (!formData.email || !formData.phone || !formData.address) {
        return Swal.fire({
          icon: "warning",
          title: "Missing Fields",
          text: "Please provide all fields.",
        });
      }
  
      await axios.post(
        `${process.env.REACT_APP_BASE_ADMIN_URL}/addContactDetail`,
        formData
      );
      navigate("/admin/contactDetail");
    } catch (error) {
      console.error(error, "Error while sending data");
      Swal.fire({
        icon: "error",
        title: "Submission Failed",
        text: "An error occurred while submitting the data.",
      });
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
          bgcolor: "#F8FAFC", // Light background
          textAlign: "center",
          fontFamily: "'Poppins', sans-serif",
        }}
      >
        <Typography
          variant="h4"
          gutterBottom
          sx={{ fontWeight: "600", color: "#1E3A8A" }}
        >
          Add Contact Detail
        </Typography>

        <form>
          {/* email */}
          <TextField
            label="Email"
            fullWidth
            name="email"
            value={formData.email}
            onChange={handleChange}
            margin="normal"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Title sx={{ color: "#1E3A8A" }} />
                </InputAdornment>
              ),
            }}
          />

          {/* phone */}
          <TextField
            label="Phone"
            name="phone"
            value={formData.phone}
            fullWidth
            onChange={handleChange}
            margin="normal"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Description sx={{ color: "#1E3A8A" }} />
                </InputAdornment>
              ),
            }}

          />
          <TextField
            label="Address"
            name="address"
            value={formData.address}
            fullWidth
            onChange={handleChange}
            margin="normal"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Description sx={{ color: "#1E3A8A" }} />
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
            Submit Blog
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default AddContactDetail;
