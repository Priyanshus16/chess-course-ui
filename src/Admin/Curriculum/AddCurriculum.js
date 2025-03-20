import React, { useState } from "react";
import {
  TextField,
  Button,
  Container,
  Typography,
  Box,
  InputAdornment,
} from "@mui/material";
import { School, Subtitles, ListAlt } from "@mui/icons-material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const AddCurriculum = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    heading: "",
    subHeading: "",
    keyPoints: "",
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

    if (!formData.heading || !formData.subHeading || !formData.keyPoints) {
      return Swal.fire("Please fill all fields");
    }

    try {
      const formattedData = {
        ...formData,
        keyPoints: formData.keyPoints
          .split("\n")
          .filter((point) => point.trim() !== ""),
      };

      console.log(formattedData);

      await axios.post(
        `${process.env.REACT_APP_BASE_ADMIN_URL}/addCurriculum`,
        formattedData
      );

      navigate("/curriculum");
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
        <Typography
          variant="h4"
          gutterBottom
          sx={{ fontWeight: "600", color: "#1E3A8A" }}
        >
          Add Curriculum
        </Typography>

        <form>
          {/* Curriculum Heading */}
          <TextField
            label="Curriculum Heading"
            fullWidth
            name="heading"
            value={formData.heading}
            onChange={handleChange}
            margin="normal"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <School sx={{ color: "#1E3A8A" }} />
                </InputAdornment>
              ),
            }}
          />

          {/* Curriculum Subheading */}
          <TextField
            label="Curriculum Subheading"
            fullWidth
            name="subHeading"
            value={formData.subHeading}
            onChange={handleChange}
            margin="normal"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Subtitles sx={{ color: "#1E3A8A" }} />
                </InputAdornment>
              ),
            }}
          />

          {/* Key Points */}
          <TextField
            label="Key Points"
            multiline
            rows={5}
            name="keyPoints"
            value={formData.keyPoints}
            fullWidth
            onChange={handleChange}
            margin="normal"
            placeholder=" Write points like this - 
            Chessboard and Pieces
            Basic Rules & Movement"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <ListAlt sx={{ color: "#1E3A8A" }} />
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
            Submit Curriculum
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default AddCurriculum;

