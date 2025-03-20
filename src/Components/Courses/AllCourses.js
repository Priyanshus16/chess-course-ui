import React from "react";
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  Avatar,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  CardMedia
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { useCourses } from "../../context/courseContext";
import { useNavigate } from "react-router-dom";

const AllCourses = () => {
  const { courses } = useCourses();
  const navigate = useNavigate();

  const handleNavigate = (id) => { 
    navigate(`/courseDetail`, {state: courses.find(course => course._id === id)});
  };

  return (
    <Box sx={{ backgroundColor: "#f9f9f9", color: "#333", minHeight: "100vh", fontFamily: "Roboto, sans-serif" }}>
      
      {/* Hero Section */}
      <Box
        sx={{
          backgroundImage: "url('/images/chess-banner-light.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          padding: "60px",
          textAlign: "center",
          borderRadius: "10px",
        }}
      >
        <Typography variant="h3" fontWeight="bold" sx={{ color: "#333", fontFamily: "Georgia, serif" }}>
          Mastering Chess: From Beginner to Grandmaster
        </Typography>
        <Typography variant="h6" sx={{ mt: 2, color: "#555" }}>
          Learn chess strategies from expert players and improve your game.
        </Typography>
        <Button
          variant="contained"
          sx={{
            mt: 3,
            fontSize: "18px",
            px: 4,
            py: 1,
            backgroundColor: "#ffcc00",
            color: "#333",
            fontWeight: "bold",
          }}
        >
          Enroll Now
        </Button>
      </Box>

      {/* Available Courses */}
      <Box sx={{ mt: 6, px: 6 }}>
        <Typography variant="h4" fontWeight="bold" sx={{ color: "#444" }}>
          Available Courses
        </Typography>
        <Grid container spacing={3} sx={{ mt: 3 }}>
          {courses.map((course, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Card sx={{ 
          display: "flex", 
          flexDirection: "column", 
          height: "100%", 
          background: "#fff", 
          borderRadius: "8px", 
          boxShadow: "0 4px 10px rgba(0,0,0,0.1)" 
        }}>
              <CardMedia
                component="img"
                height="200"
                image={course.image}
                alt={course.title}
              />
                <CardContent>
                  <Typography variant="h5" fontWeight="bold">
                    {course.title}
                  </Typography>
                  <Typography variant="body1" sx={{ mt: 1, color: "#666" }}>
                    {course.description}
                  </Typography>
                  <Button
                  onClick={() => handleNavigate(course._id)}
                    variant="contained"
                    sx={{
                      mt: 2,
                      backgroundColor: "#ffcc00",
                      color: "#333",
                      fontWeight: "bold",
                    }}
                  >
                    Learn More
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* What You'll Learn */}
      <Box sx={{ mt: 6, px: 6 }}>
        <Typography variant="h4" fontWeight="bold" sx={{ color: "#444" }}>
          What You’ll Learn
        </Typography>
        <List>
          {["Fundamentals of Chess", "Opening Strategies", "Middle-Game Tactics", "Endgame Mastery", "Think Like a Grandmaster"].map(
            (item, index) => (
              <ListItem key={index}>
                <ListItemIcon>
                  <CheckCircleIcon sx={{ color: "#ffcc00" }} />
                </ListItemIcon>
                <ListItemText primary={item} sx={{ color: "#555" }} />
              </ListItem>
            )
          )}
        </List>
      </Box>

      {/* Instructor Section */}
      <Box sx={{ mt: 6, px: 6 }}>
        <Typography variant="h4" fontWeight="bold" sx={{ color: "#444" }}>
          Meet Your Instructor
        </Typography>
        <Card sx={{ display: "flex", alignItems: "center", p: 3, mt: 3, backgroundColor: "#fff", boxShadow: "0 4px 10px rgba(0,0,0,0.1)" }}>
          <Avatar src="/images/instructor.jpg" sx={{ width: 100, height: 100, mr: 3 }} />
          <CardContent>
            <Typography variant="h5" fontWeight="bold">Kunal Vyas</Typography>
            <Typography variant="body1" sx={{ color: "#666" }}>
            I'm Kunal Vyas, the proud founder and coach of Master Chess Classes. With over a decade of experience as an International Chess Coach, I am dedicated to helping students master the art of chess.
            </Typography>
          </CardContent>
        </Card>
      </Box>

      {/* Testimonials */}  

      {/* <Testimonials/> */}

      
    </Box>
  );
};

export default AllCourses;

