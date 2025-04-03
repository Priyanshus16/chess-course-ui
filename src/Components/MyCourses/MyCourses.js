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
} from "@mui/material";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CloseIcon from "@mui/icons-material/Close";
import ReactPlayer from "react-player";
import { styled } from "@mui/system";
import { useUsers } from "../../context/UserContext";
import { useCourses } from "../../context/courseContext";

// Styled Components
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
  const [videoUrl, setVideoUrl] = useState(null); // State for video URL
  const { users } = useUsers();
  const { courses } = useCourses();

  useEffect(() => {
    const localUser = JSON.parse(localStorage.getItem("user"));
    if (!localUser) return;

    const userCourses =
      users.find((user) => user._id === localUser._id)?.purchasedCourses || [];
    const purchasedCourseIds = userCourses.map((course) => course.courseId);
    const filteredCourses = courses.filter((course) =>
      purchasedCourseIds.includes(course._id)
    );

    setPurchasedCourses(filteredCourses);
  }, [users, courses]);

  return (
    <Box
      sx={{
        padding: { xs: 2, md: 6 },
        background: "linear-gradient(to bottom, #E3F2FD 0%, #F9F9F9 100%)",
        minHeight: "100vh",
        width: "100%",
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

                  {/* Course Metadata */}
                  <Box display="flex" alignItems="center" gap={1} mb={1}>
                    <AccessTimeIcon
                      sx={{ color: "#1976D2", fontSize: "1.2rem" }}
                    />
                    <Typography variant="body2" color="textSecondary">
                      {course.duration} hours
                    </Typography>
                  </Box>
                </CardContent>

                {/* Play Video Button */}
                {course.video && (
                  <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    padding={2}
                    sx={{ background: "rgba(25, 118, 210, 0.05)" }}
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
                  </Box>
                )}
              </StyledCard>
            </Fade>
          </Grid>
        ))}
      </Grid>

      {/* Video Modal */}
      <Dialog
        open={!!videoUrl}
        onClose={() => setVideoUrl(null)}
        maxWidth="md"
        fullWidth
      >
        <Box sx={{ position: "relative", padding: 2 }}>
          {/* Close Button - Moved Above the Video Player */}
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

          {/* Video Player */}
          <ReactPlayer url={videoUrl} controls width="100%" height="500px" />
        </Box>
      </Dialog>
    </Box>
  );
};

export default MyCourses;
