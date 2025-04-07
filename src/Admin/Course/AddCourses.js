import React, { useState } from "react";
import {
  TextField,
  Button,
  Container,
  Typography,
  Box,
  Avatar,
  InputLabel,
  Select,
  MenuItem,
  InputAdornment,
  Grid,
} from "@mui/material";
import {
  School,
  Timelapse,
  MonetizationOn,
  CloudUpload,
  PlayCircleOutline,
} from "@mui/icons-material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const AddCourses = () => {
  const navigate = useNavigate();
  const cloud_name = "dvheeoqcn";

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    duration: "",
    curricullum: "",
    price: "",
    image: null,
    imagePreview: null,
    imageName: "",
    video: null,
    videoName: "",
    courseLevel: "beginner",
  });

  const [uploading, setUploading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setFormData({
      ...formData,
      image: file,
      imagePreview: URL.createObjectURL(file),
      imageName: file.name, // Store file name
    });
    Swal.fire("Image uploaded successfully!");
  };

  const handleVideoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({
        ...formData,
        video: file,
        videoName: file.name, // Store video file name
      });
      Swal.fire("Video uploaded successfully!");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let imageUrl = "";
      let videoUrl = "";

      // Upload Image to Cloudinary
      if (formData.image) {
        setUploading(true);
        const imageData = new FormData();
        imageData.append("file", formData.image);
        imageData.append("upload_preset", "chess-course");
        imageData.append("folder", "courses");

        const cloudinaryRes = await axios.post(
          `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`,
          imageData
        );
        imageUrl = cloudinaryRes.data.secure_url;
      }

      // Upload Video to Cloudinary
      if (formData.video) {
        setUploading(true);
        const videoData = new FormData();
        videoData.append("file", formData.video);
        videoData.append("upload_preset", "chess-course");
        videoData.append("folder", "course-videos");
        videoData.append("resource_type", "video");

        const cloudinaryRes = await axios.post(
          `https://api.cloudinary.com/v1_1/${cloud_name}/video/upload`,
          videoData,
          {
            onUploadProgress: (progressEvent) => {
              const percentCompleted = Math.round(
                (progressEvent.loaded * 100) / progressEvent.total
              );
              console.log(`Upload Progress: ${percentCompleted}%`);
            },
          }
        );
        videoUrl = cloudinaryRes.data.secure_url;
        setUploading(false); // Stop upload progress
        Swal.fire("Video uploaded successfully!");
      }

      const finalData = {
        ...formData,
        image: imageUrl,
        video: videoUrl,
        curricullum: formData.curricullum
          .split("\n")
          .filter((point) => point.trim() !== ""),
      };

      if (
        !finalData.title ||
        !finalData.duration ||
        !finalData.price ||
        !finalData.description ||
        !finalData.curricullum
      ) {
        return Swal.fire("Please provide all fields.");
      }

      await axios.post(
        `${process.env.REACT_APP_BASE_ADMIN_URL}/addCourses`,
        finalData
      );
      navigate("/admin/course");
    } catch (error) {
      console.error(error, "Error w hile sending data");
      setUploading(false);
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
        }}
      >
        <Typography
          variant="h4"
          gutterBottom
          sx={{ fontWeight: "600", color: "#1E3A8A" }}
        >
          Add Course
        </Typography>

        <form>
          <TextField
            label="Title"
            fullWidth
            name="title"
            value={formData.title}
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

          <TextField
            label="Description"
            fullWidth
            name="description"
            value={formData.description}
            onChange={handleChange}
            margin="normal"
            multiline
            rows={4}
          />

          <TextField
            label="Curriculum"
            fullWidth
            name="curricullum"
            value={formData.curricullum}
            onChange={handleChange}
            margin="normal"
            multiline
            rows={4}
          />

          <Grid container spacing={2} sx={{ mt: 2 }}>
            <Grid item xs={6}>
              <TextField
                label="Duration"
                fullWidth
                name="duration"
                value={formData.duration}
                onChange={handleChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Timelapse sx={{ color: "#1E3A8A" }} />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Price"
                fullWidth
                name="price"
                value={formData.price}
                onChange={handleChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <MonetizationOn sx={{ color: "#1E3A8A" }} />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
          </Grid>

          <InputLabel sx={{ textAlign: "left", mt: 2, color: "#1E3A8A" }}>
            Course Level
          </InputLabel>
          <Select
            fullWidth
            name="courseLevel"
            value={formData.courseLevel}
            onChange={handleChange}
            sx={{ bgcolor: "white", borderRadius: 1 }}
          >
            <MenuItem value="beginner">Beginner</MenuItem>
            <MenuItem value="intermediate">Intermediate</MenuItem>
            <MenuItem value="advance">Advanced</MenuItem>
          </Select>

          <Grid container spacing={3} sx={{ mt: 3 }}>
            {/* Image Upload */}
            <Grid item xs={6} textAlign="center">
              <Avatar
                src={formData.imagePreview}
                sx={{
                  width: 80,
                  height: 80,
                  mx: "auto",
                  border: "2px solid #ccc",
                }}
              />
              <Typography variant="body2" sx={{ mt: 1 }}>
                {formData.imageName}
              </Typography>
              <Button
                variant="contained"
                component="label"
                startIcon={<CloudUpload />}
                sx={{ mt: 1 }}
              >
                Upload Thumbnail
                <input type="file" hidden onChange={handleFileChange} />
              </Button>
            </Grid>

            {/* Video Upload */}
            <Grid item xs={6} textAlign="center">
              <Avatar
                src={formData.videoPreview}
                sx={{
                  width: 80,
                  height: 80,
                  mx: "auto",
                  border: "2px solid #ccc",
                }}
              />
              <Typography variant="body2" sx={{ mb: 1 }}>
                {formData.videoName}
              </Typography>
              <Button
                variant="contained"
                component="label"
                startIcon={<PlayCircleOutline />}
              >
                Upload Demo Video
                <input
                  type="file"
                  accept="video/*"
                  hidden
                  onChange={handleVideoChange}
                />
              </Button>
            </Grid>
          </Grid>

          <Button
            type="submit"
            variant="contained"
            fullWidth
            onClick={handleSubmit}
            disabled={uploading}
            sx={{ mt: 3 }}
          >
            {uploading ? "Uploading..." : "Submit Course"}
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default AddCourses;
    