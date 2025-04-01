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
import AddTestimonials from "./AddTestimonials";

const AddTestimonialVideo = () => {
  const navigate = useNavigate();
  const cloud_name = "dvheeoqcn";

  const [formData, setFormData] = useState({
    name:"",
    video: null,
    videoName: "",
  });

  const [uploading, setUploading] = useState(false);
  const [uploadingProgress, setUploadingProgress] = useState(0);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleVideoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({
        ...formData,
        video: file,
        videoName: file.name, 
      });
      Swal.fire("Video uploaded successfully!");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!formData.video) {
        return Swal.fire("Please select a video to upload.");
      }
  
      setUploading(true);
      const videoData = new FormData();
      videoData.append("file", formData.video);
      videoData.append("upload_preset", "chess-course");
      videoData.append("folder", "testimonial-videos");
      videoData.append("resource_type", "video");
  
      // Upload with progress tracking
      const cloudinaryRes = await axios.post(
        `https://api.cloudinary.com/v1_1/${cloud_name}/video/upload`,
        videoData,
        {
          headers: { "X-Requested-With": "XMLHttpRequest" },
          onUploadProgress: (progressEvent) => {
            const percentCompleted = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            setUploadingProgress(percentCompleted);
            console.log(`Upload Progress: ${percentCompleted}%`);
          },
        }
      );
  
      const videoUrl = cloudinaryRes.data.secure_url;
      setUploading(false);
      Swal.fire("Video uploaded successfully!");
  
      const finalData = { ...formData, video: videoUrl };
  
      await axios.post(`${process.env.REACT_APP_BASE_ADMIN_URL}/addTestimonialVideo`, finalData);
      navigate("/admin/testimonialVideo");
    } catch (error) {
      console.error(error, "Error while sending data");
      setUploading(false);
      Swal.fire("Error uploading video. Try a smaller file less than 100mb.");
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
          Add Testimonial Video
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
                  <School sx={{ color: "#1E3A8A" }} />
                </InputAdornment>
              ),
            }}
          />

          <Grid container spacing={3} sx={{ mt: 3 }}>

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
              <Typography variant="body2" sx={{ mb: 1 }}>
                Upload Progress: {uploadingProgress}%
              </Typography>

              <Button
                variant="contained"
                component="label"
                startIcon={<PlayCircleOutline />}
              >
                Upload Video
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
            {uploading ? "Uploading..." : "Submit Testimonial"}
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default AddTestimonialVideo;
    