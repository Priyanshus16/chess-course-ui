import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Grid,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Divider,
  CircularProgress,
} from "@mui/material";
import { useParams } from "react-router-dom";
import axios from "axios";

const MyCourseContent = () => {
  const { courseId } = useParams();
  const [videos, setVideos] = useState([]);
  const [currentVideo, setCurrentVideo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_BASE_ADMIN_URL}/course/video/${courseId}`
        );
        setVideos(res.data.videos);
        if (res.data.videos.length > 0) {
          setCurrentVideo(res.data.videos[0]);
        }
      } catch (err) {
        console.error("Error fetching videos:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, [courseId]);

  return (
    <Box
      sx={{
        padding: { xs: 2, md: 6 },
        background: "linear-gradient(to bottom, #E3F2FD 0%, #F9F9F9 100%)",
        minHeight: "100vh",
        width: "100%",
      }}
    >
      <Typography
        variant="h3"
        fontWeight="bold"
        textAlign="center"
        sx={{
          background: "linear-gradient(45deg, #1976D2, #42A5F5)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          marginBottom: 6,
          fontSize: { xs: "2rem", md: "3rem" },
        }}
      >
        My Learning Journey
      </Typography>

      {loading ? (
        <Box display="flex" justifyContent="center" mt={4}>
          <CircularProgress />
        </Box>
      ) : (
        <Grid container spacing={4}>
          {/* Video Player */}
          <Grid item xs={12} md={8}>
            {currentVideo ? (
              <>
                <video
                  key={currentVideo._id}
                  width="100%"
                  height="auto"
                  controls
                  autoPlay
                  style={{ borderRadius: 12, maxHeight: "100%" }}
                >
                  <source src={currentVideo.videoUrl} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>

                <Box mt={3}>
                  <Typography variant="h5" fontWeight="bold">
                    Description
                  </Typography>
                  <Typography variant="body1" mt={1}>
                    {currentVideo.description}
                  </Typography>
                </Box>
              </>
            ) : (
              <Typography>No video found for this course.</Typography>
            )}
          </Grid>

          {/* Playlist */}
          <Grid item xs={12} md={4}>
            <Typography variant="h6" fontWeight="bold" mb={2}>
              Playlist
            </Typography>
            <List sx={{ background: "#fff", borderRadius: 2, boxShadow: 2 }}>
              {videos.map((video) => (
                <React.Fragment key={video._id}>
                  <ListItem disablePadding>
                    <ListItemButton
                      selected={currentVideo?._id === video._id}
                      onClick={() => setCurrentVideo(video)}
                    >
                      <ListItemText primary={video.title} />
                    </ListItemButton>
                  </ListItem>
                  <Divider />
                </React.Fragment>
              ))}
            </List>
          </Grid>
        </Grid>
      )}
    </Box>
  );
};

export default MyCourseContent;
