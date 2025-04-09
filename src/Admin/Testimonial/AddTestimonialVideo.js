import React, { useState } from "react";
import {
  TextField,
  Button,
  Container,
  Typography,
  Box,
  InputAdornment,
  LinearProgress,
  IconButton,
} from "@mui/material";
import { School, CloudUpload, Cancel } from "@mui/icons-material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const AddTestimonialVideo = () => {
  const navigate = useNavigate();
  const cloud_name = "dvheeoqcn";

  const [formData, setFormData] = useState({
    name: "",
    video: null,
    videoName: "",
    videoPreview: null,
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
        videoPreview: URL.createObjectURL(file),
      });
      Swal.fire("Video selected successfully!");
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
          },
        }
      );

      const videoUrl = cloudinaryRes.data.secure_url;
      setUploading(false);
      Swal.fire("Video uploaded successfully!");

      const finalData = { ...formData, video: videoUrl };

      await axios.post(
        `${process.env.REACT_APP_BASE_ADMIN_URL}/addTestimonialVideo`,
        finalData
      );
      navigate("/admin/testimonialVideo");
    } catch (error) {
      console.error(error, "Error while sending data");
      setUploading(false);
      Swal.fire("Error uploading video. Try a smaller file less than 100MB.");
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

          {/* Video Upload Box */}
          <Box
            sx={{
              mt: 3,
              border: "2px dashed #ccc",
              padding: "20px",
              textAlign: "center",
              borderRadius: "8px",
              cursor: "pointer",
              bgcolor: "#F8FAFC",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              position: "relative",
            }}
          >
            <input
              type="file"
              accept="video/*"
              onChange={handleVideoChange}
              style={{
                opacity: 0,
                position: "absolute",
                width: "100%",
                height: "100%",
                cursor: "pointer",
              }}
            />
            <CloudUpload sx={{ fontSize: 50, color: "#1976d2" }} />
            <Typography sx={{ fontSize: 16, fontWeight: "bold", mt: 1 }}>
              Drag & Drop or Click to Upload Video
            </Typography>
          </Box>

          {/* Show Video Preview */}
          {formData.videoPreview && (
            <Box
              sx={{
                mt: 2,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <video
                src={formData.videoPreview}
                controls
                style={{
                  width: "100%",
                  maxWidth: "250px",
                  height:"300px",
                  borderRadius: "8px",
                  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
                }}
              />
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  width: "100%",
                  maxWidth: "400px",
                  mt: 1,
                }}
              >
                <Typography variant="body2" sx={{ color: "#666" }}>
                  {formData.videoName}
                </Typography>
                <IconButton
                  onClick={() =>
                    setFormData({ ...formData, video: null, videoPreview: null, videoName: "" })
                  }
                  color="error"
                  size="small"
                >
                  <Cancel />
                </IconButton>
              </Box>
            </Box>
          )}

          {/* Upload Progress */}
          {uploading && (
            <Box sx={{ width: "100%", mt: 2 }}>
              <LinearProgress variant="determinate" value={uploadingProgress} />
              <Typography variant="body2" sx={{ mt: 1 }}>
                Upload Progress: {uploadingProgress}%
              </Typography>
            </Box>
          )}

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
