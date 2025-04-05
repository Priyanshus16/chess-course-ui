import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Typography,
  TextField,
  InputAdornment,
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Toolbar,
} from "@mui/material";
import {
  Add as AddIcon,
  Search as SearchIcon,
  Delete as DeleteIcon,
} from "@mui/icons-material";
import axios from "axios";
import { useSearchParams } from "react-router-dom";
const AddCourseVideos = () => {
  const [searchParams] = useSearchParams();
  const courseId = searchParams.get("courseId");
  const [searchTerm, setSearchTerm] = useState("");
  const [videos, setVideos] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [videoTitle, setVideoTitle] = useState("");
  const [videoDesc, setVideoDesc] = useState("");
  const [videoFile, setVideoFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const BASE_URL = process.env.REACT_APP_BASE_ADMIN_URL;

  const fetchVideos = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/course/video/${courseId}`);
      setVideos(res.data.videos || []);
    } catch (err) {
      console.error("Error fetching videos:", err);
    }
  };

  useEffect(() => {
    fetchVideos();
  }, []);
  const cloud_name = process.env.REACT_APP_CLOUD_NAME;
  const cloudinary_URL = process.env.REACT_APP_CLOUDINARY_URL;
  const upload_preset = process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET;

  const handleUpload = async () => {
    if (!videoFile || !videoTitle) return alert("Please fill in all fields");
    setLoading(true);
    const formData = new FormData();
    formData.append("file", videoFile); // ✅ must be "file", not "video"
    formData.append("upload_preset", upload_preset); // ✅ required for unsigned uploads
    formData.append("resource_type", "video");
    try {
    const cloudinaryRes = await axios.post(
      `${cloudinary_URL}/${cloud_name}/video/upload`,
      formData
    );
    const videoUrl = cloudinaryRes.data.secure_url;
    formData.append("title", videoTitle);
    formData.append("description", videoDesc);
    formData.append("videoUrl", videoUrl);
      await axios.post(`${BASE_URL}/course/video/${courseId}`, {
        videoUrl,
        title: videoTitle,
        description: videoDesc,
      });
      setOpenDialog(false);
      setVideoTitle("");
      setVideoDesc("");
      setVideoFile(null);
      fetchVideos();
    } catch (err) {
      console.error("Upload failed:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (videoId) => {
    try {
      await axios.delete(`${BASE_URL}/course/video/${courseId}/${videoId}`);
      fetchVideos();
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  return (
    <Box
      component="main"
      sx={{ flexGrow: 1, p: 3, bgcolor: "#E3F2FD", minHeight: "97vh", mt: 4 }}
    >
      <Toolbar />
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
        }}
      >
        <Typography variant="h5" fontWeight={600} color="#0D47A1">
          Course Videos
        </Typography>

        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setOpenDialog(true)}
        >
          Upload Video
        </Button>
      </Box>

      <TextField
        fullWidth
        variant="outlined"
        placeholder="Search by video title..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
        sx={{
          mb: 3,
          "& .MuiOutlinedInput-root": {
            borderRadius: 2,
            backgroundColor: "white",
          },
        }}
      />

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Video</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {videos
              .filter((v) =>
                v.title.toLowerCase().includes(searchTerm.toLowerCase())
              )
              .map((video) => (
                <TableRow key={video._id}>
                  <TableCell>{video.title}</TableCell>
                  <TableCell>{video.description}</TableCell>
                  <TableCell>
                    <video
                      src={video.videoUrl}
                      height="100"
                      controls
                      style={{ borderRadius: "8px" }}
                    />
                  </TableCell>
                  <TableCell>
                    <IconButton
                      color="error"
                      onClick={() => handleDelete(video._id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Upload Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} fullWidth>
        <DialogTitle>Upload New Video</DialogTitle>

        <DialogContent
          sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}
        >
          <input
            type="file"
            accept="video/*"
            onChange={(e) => setVideoFile(e.target.files[0])}
          />
          <TextField
            label="Video Title"
            fullWidth
            value={videoTitle}
            onChange={(e) => setVideoTitle(e.target.value)}
          />
          <TextField
            label="Video Description"
            fullWidth
            multiline
            rows={3}
            value={videoDesc}
            onChange={(e) => setVideoDesc(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleUpload} disabled={loading}>
            {loading ? "Uploading..." : "Upload"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AddCourseVideos;
