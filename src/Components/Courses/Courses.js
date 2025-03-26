import React from "react";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Grid,
  Button,
  useMediaQuery,
} from "@mui/material";
import { useCourses } from "../../context/courseContext";

const Courses = () => {
  const { courses = [] } = useCourses(); // Ensure courses is always an array
  const isMobile = useMediaQuery("(max-width:600px)");

  if (!Array.isArray(courses) || courses.length === 0) {
    return <Typography align="center">No courses available.</Typography>;
  }

  return (
    <Box sx={{ p: 4 }}>
      <Typography
        sx={{ pb: 2 }}
        variant="h3"
        align="center"
        fontWeight={600}
        gutterBottom
      >
        Explore Our Courses
      </Typography>

      <Grid container spacing={4}>
        {courses.slice(0, isMobile ? 3 : 6).map((course) => (
          <Grid item xs={12} sm={6} md={4} key={course._id}>
            <Card sx={{ height: "100%" }}>
              <CardMedia
                component="img"
                height="200"
                image={course.image || "/default-course-image.jpg"}
                alt={course.title}
              />
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {course.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                  {course.description}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Duration: <strong>{course.duration} hours</strong>
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Level: <strong>{course.courseLevel}</strong>
                </Typography>
                <Box sx={{ mt: 2, display: "flex", alignItems: "center" }}>
                  <Typography variant="h6" color="primary">
                    ₹{course.price}
                  </Typography>
                </Box>
                <Button
                  variant="outlined"
                  color="primary"
                  sx={{ mt: 2 }}
                  fullWidth
                >
                  Enroll Now
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};


export default Courses;
