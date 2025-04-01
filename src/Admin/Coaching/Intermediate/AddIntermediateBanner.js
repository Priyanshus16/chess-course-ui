import React, { useState } from "react";
import {
  TextField,
  Button,
  Container,
  Typography,
  Box,
  Avatar,
  InputAdornment,
} from "@mui/material";
import { Title, Description, CloudUpload } from "@mui/icons-material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const AddIntermediateBanner = () => {
  const navigate = useNavigate();
  const cloud_name = process.env.REACT_APP_CLOUD_NAME;
  const cloudinary_URL = process.env.REACT_APP_CLOUDINARY_URL;

  const [formData, setFormData] = useState({
    heading: "",
    description: "",
    image: null,
    imagePreview: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({
        ...formData,
        image: file,
        imagePreview: URL.createObjectURL(file),
      });
    }
    Swal.fire("Image uploaded successfully!");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let imageUrl = "";

      if (formData.image) {
        const imageData = new FormData();
        imageData.append("file", formData.image);
        imageData.append("upload_preset", "chess-course");
        imageData.append("folder", "Banner/IntermediateBanner");

        const cloudinaryRes = await axios.post(
          `${cloudinary_URL}/${cloud_name}/image/upload`,
          imageData
        );
        imageUrl = cloudinaryRes.data.secure_url;
      }

      const finalData = {
        ...formData,
        image: imageUrl,
      };


      if (!finalData.heading || !finalData.description || !finalData.image) {
        return Swal.fire("Please provide all fields.");
      }

      await axios.post(
        `${process.env.REACT_APP_BASE_ADMIN_URL}/addIntermediateBanner`,
        finalData
      );
      navigate("/admin/IntermediateBanner");
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
          Add Banner
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

          {/* Image Upload */}
          <Box display="flex" flexDirection="column" alignItems="center" mt={3}>
            <Avatar
              src={formData.imagePreview || ""}
              sx={{ width: 120, height: 120, mb: 2, border: "2px solid #ccc" }}
            />
            <Button
              variant="contained"
              component="label"
              startIcon={<CloudUpload />}
              sx={{
                backgroundColor: "#1976d2",
                color: "#fff",
                fontWeight: "bold",
                "&:hover": { backgroundColor: "#1565c0" },
              }}
            >
              Upload Image
              <input onChange={handleFileChange} type="file" hidden />
            </Button>
          </Box>

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
            Submit Banner
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default AddIntermediateBanner;
