import React, { useEffect, useState } from "react";
import {
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  IconButton,
  Fade,
  Dialog,
  Button,
} from "@mui/material";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CloseIcon from "@mui/icons-material/Close";
import ReactPlayer from "react-player";
import { styled } from "@mui/system";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// Styled card component
const StyledCard = styled(Card)({
  borderRadius: "16px",
  boxShadow: "0 8px 24px rgba(0, 0, 0, 0.1)",
  transition: "transform 0.3s ease, box-shadow 0.3s ease",
  "&:hover": {
    transform: "translateY(-8px)",
    boxShadow: "0 12px 32px rgba(25, 118, 210, 0.2)",
  },
  height: "100%",
  display: "flex",
  flexDirection: "column",
  overflow: "hidden",
});

const MyCourses = () => {
  const [purchasedCourses, setPurchasedCourses] = useState([]);
  const [videoUrl, setVideoUrl] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const localUser = JSON.parse(localStorage.getItem("user"));
    if (!localUser) return;

    const fetchPurchasedCourses = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_BASE_ADMIN_URL}/users/${localUser._id}/purchased-courses`
        );
        setPurchasedCourses(res.data.purchasedCourses);
      } catch (error) {
        console.error("Error fetching purchased courses:", error);
      }
    };

    fetchPurchasedCourses();
  }, []);

  return (
    <Box
      sx={{
        padding: { xs: 2, md: 6 },
        background: "linear-gradient(to bottom, #E3F2FD 0%, #F9F9F9 100%)",
        minHeight: "100vh",
        width: "100%",
        overflowX: "hidden",
      }}
    >
      <Fade in timeout={1000}>
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
      </Fade>

      {purchasedCourses.length === 0 ? (
        <Fade in timeout={1000}>
          <Box
            textAlign="center"
            mt={8}
            display="flex"
            flexDirection="column"
            alignItems="center"
          >
            <Typography
              variant="h5"
              sx={{
                color: "#555",
                marginBottom: 2,
                fontWeight: 500,
              }}
            >
              🚫 You have no courses enrolled
            </Typography>
            <Typography variant="body1" color="textSecondary" mb={3}>
              Browse and enroll in a course to start your learning journey.
            </Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={() => navigate("/allCourses")}
              sx={{ paddingX: 4, paddingY: 1.5, borderRadius: "30px" }}
            >
              Browse Courses
            </Button>
          </Box>
        </Fade>
      ) : (
        <Grid container spacing={4} justifyContent="center">
          {purchasedCourses.map((course, index) => (
            <Grid item xs={12} sm={6} md={4} key={course._id}>
              <Fade in timeout={500 + index * 200}>
                <StyledCard>
                  <CardMedia
                    component="img"
                    height="200"
                    image={course.image}
                    alt={course.title}
                    sx={{
                      objectFit: "cover",
                      borderTopLeftRadius: "16px",
                      borderTopRightRadius: "16px",
                      transition: "transform 0.3s ease",
                      "&:hover": { transform: "scale(1.05)" },
                    }}
                  />
                  <CardContent sx={{ flexGrow: 1, padding: 3 }}>
                    <Typography
                      variant="h6"
                      fontWeight="bold"
                      color="#333"
                      gutterBottom
                      sx={{
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {course.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      sx={{
                        marginBottom: 2,
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                      }}
                    >
                      {course.description}
                    </Typography>
                    <Box display="flex" alignItems="center" gap={1} mb={1}>
                      <AccessTimeIcon
                        sx={{ color: "#1976D2", fontSize: "1.2rem" }}
                      />
                      <Typography variant="body2" color="textSecondary">
                        {course.duration} hours
                      </Typography>
                    </Box>
                  </CardContent>

                  {course.video && (
                    <Box
                      display="flex"
                      justifyContent="center"
                      alignItems="center"
                      padding={2}
                      sx={{
                        background: "rgba(25, 118, 210, 0.05)",
                        flexDirection: "column",
                      }}
                    >
                      <IconButton
                        onClick={() => setVideoUrl(course.video)}
                        sx={{
                          color: "#1976D2",
                          "&:hover": { color: "#42A5F5" },
                        }}
                      >
                        <PlayCircleOutlineIcon fontSize="large" />
                      </IconButton>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => navigate(`/myCourses/${course._id}`)}
                      >
                        Start Course
                      </Button>
                    </Box>
                  )}
                </StyledCard>
              </Fade>
            </Grid>
          ))}
        </Grid>
      )}

      {/* Video Preview Modal */}
      <Dialog
        open={!!videoUrl}
        onClose={() => setVideoUrl(null)}
        maxWidth="md"
        fullWidth
      >
        <Box sx={{ position: "relative", padding: 2 }}>
          <Box sx={{ position: "absolute", top: 0, right: 0, zIndex: 10 }}>
            <IconButton
              onClick={() => setVideoUrl(null)}
              sx={{
                position: "relative",
                color: "white",
                background: "rgba(0, 0, 0, 0.5)",
                "&:hover": { background: "rgba(0, 0, 0, 0.8)" },
                margin: 1,
              }}
            >
              <CloseIcon />
            </IconButton>
          </Box>
          <ReactPlayer url={videoUrl} controls width="100%" height="500px" />
        </Box>
      </Dialog>
    </Box>
  );
};

export default MyCourses;
