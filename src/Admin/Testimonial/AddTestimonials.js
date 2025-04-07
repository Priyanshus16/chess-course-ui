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
import { Person, EmojiEvents, School, CloudUpload } from "@mui/icons-material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const AddTestimonials = () => {
  const navigate = useNavigate();
  const cloud_name = "dvheeoqcn";

  const [formData, setFormData] = useState({
    name: "",
    achievement: "",
    description: "",
    course: "",
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

  const handleDescriptionChange = (e) => {
    const value = e.target.value;
    setFormData({
      ...formData,
      description: value,
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({
        ...formData,
        image: file,
        imagePreview: URL.createObjectURL(file), // Show preview
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
        imageData.append("folder", "testimonials");

        const cloudinaryRes = await axios.post(
          `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`,
          imageData
        );
        imageUrl = cloudinaryRes.data.secure_url;
      }

      const finalData = {
        ...formData,
        image: imageUrl,
      };

      if (
        !finalData.name ||
        !finalData.achievement ||
        !finalData.course ||
        !finalData.description ||
        !finalData.image
      ) {
        return Swal.fire("Please provide all fields.");
      }

      await axios.post(
        `${process.env.REACT_APP_BASE_ADMIN_URL}/addTestimonials`,
        finalData
      );
      navigate("/admin/testimonials");
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
          Add Testimonial
        </Typography>

        <form>
          {/* Name */}
          <TextField
            label="Name"
            fullWidth
            name="name"
            value={formData.name}
            onChange={handleChange}
            margin="normal"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Person sx={{ color: "#1E3A8A" }} />
                </InputAdornment>
              ),
            }}
          />

          {/* Achievement */}
          <TextField
            label="Achievement"
            fullWidth
            name="achievement"
            value={formData.achievement}
            onChange={handleChange}
            margin="normal"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <EmojiEvents sx={{ color: "#1E3A8A" }} />
                </InputAdornment>
              ),
            }}
          />

          {/* Description */}
          <Box sx={{ mt: 2, mb: 2 }}>
            <Typography
              variant="body1"
              sx={{ textAlign: "left", mb: 1, color: "#1E3A8A" }}
            >
              Description
            </Typography>
            <TextField
              fullWidth
              name="description"
              value={formData.description}
              multiline
              rows={4}
              onChange={(e) => handleDescriptionChange(e)}
            />
          </Box>

          {/* Course */}
          <TextField
            label="Course"
            fullWidth
            name="course"
            value={formData.course}
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

          {/* Image Upload */}
          <Box
            sx={{
              border: "2px dashed #ccc",
              padding: "30px",
              textAlign: "center",
              borderRadius: "8px",
              bgcolor: "#F8FAFC",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              width: "100%",
              cursor: "pointer",
            }}
            onClick={() => document.getElementById("fileInput").click()}
          >
            <CloudUpload sx={{ fontSize: 50, color: "#1976d2" }} />
            <Typography sx={{ fontSize: 16, fontWeight: "bold", mt: 1 }}>
              Drop a file here or click to upload
            </Typography>
            <input
              id="fileInput"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              style={{ display: "none" }}
            />
          </Box>

          {formData.imagePreview && (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                mt: 2,
              }}
            >
              <Avatar
                src={formData.imagePreview}
                sx={{
                  width: 80,
                  height: 80,
                  mb: 1,
                  border: "2px solid #ccc",
                }}
              />
              <Typography variant="body2" sx={{ color: "#666" }}>
                {formData.imageName}
              </Typography>
            </Box>
          )}

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
            Submit Testimonial
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default AddTestimonials;
