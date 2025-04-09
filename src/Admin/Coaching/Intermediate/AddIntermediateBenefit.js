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

const AddIntermediateBenefit = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    heading: "",
    description: "",
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
      if (!formData.heading || !formData.description ) {
        return Swal.fire("Please provide all fields.");
      }
      await axios.post(
        `${process.env.REACT_APP_BASE_ADMIN_URL}/addintermediateBenefit`,
        formData
      );
      navigate("/admin/intermediatebenefit");
    } catch (error) {
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
          Add Intermediate Benefit Card
        </Typography>

        <form>
          {/* Heading */}
          <TextField
            label="Heading"
            fullWidth
            name="heading"
            value={formData.heading}
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

          {/* Description */}
          <TextField
            label="Description"
            multiline
            rows={4}
            name="description"
            value={formData.description}
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
            Submit Card
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default AddIntermediateBenefit;
