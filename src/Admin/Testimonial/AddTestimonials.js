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
import {
  Person,
  EmojiEvents,
  Description,
  School,
  CloudUpload,
} from "@mui/icons-material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  Editor,
  EditorProvider,
  Toolbar,
  BtnBold,
  BtnItalic,
  BtnUnderline,
  BtnUndo,
  BtnRedo,
} from "react-simple-wysiwyg";
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

  const handleDescriptionChange = (value) => {
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
    <EditorProvider>
      {" "}
      {/* Wrap the component with EditorProvider */}
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
              <Toolbar>
                <BtnUndo />
                <BtnRedo />
                <BtnBold />
                <BtnItalic />
                <BtnUnderline />
              </Toolbar>
              <Editor
                value={formData.description}
                onChange={(e) => handleDescriptionChange(e.target.value)}
                containerProps={{
                  style: {
                    border: "1px solid #ccc",
                    borderRadius: 4,
                    padding: 8,
                    textAlign: "left", 
                    minHeight: 100, 
                    verticalAlign: "top", 
                  },
                }}
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
              display="flex"
              flexDirection="column"
              alignItems="center"
              mt={3}
            >
              <Avatar
                src={formData.image ? URL.createObjectURL(formData.image) : ""}
                sx={{
                  width: 120,
                  height: 120,
                  mb: 2,
                  border: "2px solid #ccc",
                }}
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
              {formData.imageName && (
                <Typography variant="body2" sx={{ mt: 1, color: "#666" }}>
                  {formData.imageName}
                </Typography>
              )}
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
              Submit Testimonial
            </Button>
          </form>
        </Box>
      </Container>
    </EditorProvider>
  );
};

export default AddTestimonials;
