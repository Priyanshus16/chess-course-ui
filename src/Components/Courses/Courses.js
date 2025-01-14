import React from "react";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Grid,
  Button,
} from "@mui/material";

// Array of course data
const courses = [
  {
    id: 1,
    title: "Mastering Chess Basics",
    description: "Learn the fundamentals of chess, including rules, strategies, and tactics.",
    enrolled: 1200,
    duration: "12 hours",
    originalPrice: 1999,
    discountedPrice: 999,
    discount: 50,
    image: "https://www.classcentral.com/report/wp-content/uploads/2022/11/Chess-BCG-Banner.png", // Replace with a default or relevant image
  },
  {
    id: 2,
    title: "Advanced Chess Strategies",
    description: "Elevate your gameplay with advanced tactics and strategies.",
    enrolled: 950,
    duration: "20 hours",
    originalPrice: 2499,
    discountedPrice: 1249,
    discount: 50,
    image: "https://www.classcentral.com/report/wp-content/uploads/2022/11/Chess-BCG-Banner.png",// Replace with a default or relevant image
  },
  {
    id: 3,
    title: "Chess Mastery Bootcamp",
    description: "An intensive bootcamp for players looking to compete at professional levels.",
    enrolled: 800,
    duration: "30 hours",
    originalPrice: 4999,
    discountedPrice: 2499,
    discount: 50,
    image: "https://www.classcentral.com/report/wp-content/uploads/2022/11/Chess-BCG-Banner.png",
  },  {
    id: 4,
    title: "Mastering Chess Basics",
    description: "Learn the fundamentals of chess, including rules, strategies, and tactics.",
    enrolled: 1200,
    duration: "12 hours",
    originalPrice: 1999,
    discountedPrice: 999,
    discount: 50,
    image: "https://www.classcentral.com/report/wp-content/uploads/2022/11/Chess-BCG-Banner.png", // Replace with a default or relevant image
  },
  {
    id: 5,
    title: "Advanced Chess Strategies",
    description: "Elevate your gameplay with advanced tactics and strategies.",
    enrolled: 950,
    duration: "20 hours",
    originalPrice: 2499,
    discountedPrice: 1249,
    discount: 50,
    image: "https://www.classcentral.com/report/wp-content/uploads/2022/11/Chess-BCG-Banner.png",// Replace with a default or relevant image
  },
  {
    id: 6,
    title: "Chess Mastery Bootcamp",
    description: "An intensive bootcamp for players looking to compete at professional levels.",
    enrolled: 800,
    duration: "30 hours",
    originalPrice: 4999,
    discountedPrice: 2499,
    discount: 50,
    image: "https://www.classcentral.com/report/wp-content/uploads/2022/11/Chess-BCG-Banner.png",
  }
];

const Courses = () => {
  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom align="center">
        Explore Our Courses
      </Typography>
      <Grid container spacing={4}>
        {courses.map((course) => (
          <Grid item xs={12} sm={6} md={4} key={course.id}>
            <Card sx={{ height: "100%" }}>
              <CardMedia
                component="img"
                height="140"
                image={course.image}
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
                  Enrolled By: <strong>{course.enrolled}</strong>
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Duration: <strong>{course.duration}</strong>
                </Typography>
                <Box sx={{ mt: 2, display: "flex", alignItems: "center" }}>
                  <Typography
                    variant="body1"
                    color="text.secondary"
                    sx={{ textDecoration: "line-through", mr: 1 }}
                  >
                    ₹{course.originalPrice}
                  </Typography>
                  <Typography variant="h6" color="primary">
                    ₹{course.discountedPrice}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="success.main"
                    sx={{ ml: 1 }}
                  >
                    ({course.discount}% off)
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
