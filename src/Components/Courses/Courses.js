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
    image: "https://plus.unsplash.com/premium_photo-1672855191351-e26398f27e5f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Y2hlc3N8ZW58MHx8MHx8fDA%3D", 
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
    image: "https://images.unsplash.com/photo-1528819622765-d6bcf132f793?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8Y2hlc3N8ZW58MHx8MHx8fDA%3D",
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
    image: "https://images.unsplash.com/photo-1604948501466-4e9c339b9c24?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8Y2hlc3N8ZW58MHx8MHx8fDA%3D",
  },
  {
    id: 4,
    title: "Tactical Chess Play",
    description: "Improve your tactical awareness and sharpen your decision-making skills.",
    enrolled: 1100,
    duration: "18 hours",
    originalPrice: 2199,
    discountedPrice: 1099,
    discount: 50,
    image: "https://images.unsplash.com/photo-1602968407815-5963b28c66af?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGNoZXNzfGVufDB8fDB8fHww",
  },
  {
    id: 5,
    title: "Endgame Techniques",
    description: "Master the endgame with advanced strategies and theoretical concepts.",
    enrolled: 970,
    duration: "15 hours",
    originalPrice: 2299,
    discountedPrice: 1149,
    discount: 50,
    image: "https://images.unsplash.com/photo-1588412079929-790b9f593d8e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGNoZXNzfGVufDB8fDB8fHww",
  },
  {
    id: 6,
    title: "Chess Grandmaster Insights",
    description: "Gain insights from top grandmasters and learn their strategies.",
    enrolled: 650,
    duration: "25 hours",
    originalPrice: 3999,
    discountedPrice: 1999,
    discount: 50,
    image: "https://images.unsplash.com/photo-1568992687947-868a62a9f521",
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
                height="200"
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


