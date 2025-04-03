import React from "react";
import {
  Container,
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
  Divider,
} from "@mui/material";
import { AccessTime, MonetizationOn } from "@mui/icons-material";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";

const CourseDetail = () => {
  const location = useLocation();
  const course = location.state;
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const handleSubmit = async (id) => {
    if (!user) {
      navigate("/login");
      Swal.fire("Please login to enroll");
      return;
    }

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/enroll`,
        {
          courseId: course._id,
          userId: user._id,
        }
      );
      if (response.status === 200) {
        Swal.fire("Enrolled Successfully!", "", "success");
      }
    } catch (error) {
      if(error.response.status === 400) {
        Swal.fire("You are already enrolled in this course");
      } else {  
      Swal.fire("An error occurred while enrolling");
      }
    }
  };

  return (
    <Container maxWidth="md">
      <Box
        sx={{ mt: 5, p: 4, boxShadow: 4, borderRadius: 3, bgcolor: "#F8FAFC" }}
      >
        {/* Course Title */}
        <Typography
          variant="h4"
          sx={{ fontWeight: "bold", color: "#1E3A8A", mb: 2 }}
        >
          {course.title}
        </Typography>

        {/* Duration & Price */}
        <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
          <Typography
            sx={{ display: "flex", alignItems: "center", color: "#475569" }}
          >
            <AccessTime sx={{ mr: 1, color: "#1E3A8A" }} /> {course.duration}{" "}
            hours
          </Typography>
          <Typography
            sx={{ display: "flex", alignItems: "center", color: "#475569" }}
          >
            <MonetizationOn sx={{ mr: 1, color: "#1E3A8A" }} /> {course.price}
          </Typography>
        </Box>

        {/* Description */}
        <Typography variant="body1" sx={{ mt: 2, color: "#475569" }}>
          {course.description}
        </Typography>

        {/* Curriculum Section */}
        <Card sx={{ mt: 3, p: 2, bgcolor: "#FFF" }}>
          <CardContent>
            <Typography
              variant="h6"
              sx={{ fontWeight: "bold", color: "#1E3A8A" }}
            >
              Course Curriculum
            </Typography>
            <List>
              {course.curricullum.map((topic, index) => (
                <React.Fragment key={index}>
                  <ListItem>
                    <ListItemText primary={topic} />
                  </ListItem>
                  {index < course.curricullum.length - 1 && <Divider />}
                </React.Fragment>
              ))}
            </List>
          </CardContent>
        </Card>

        {/* Enroll Button */}
        <Button
          onClick={() => handleSubmit(course._id)}
          variant="contained"
          fullWidth
          sx={{
            mt: 3,
            bgcolor: "#0F172A",
            "&:hover": { bgcolor: "#1E293B" },
            p: 1.5,
            fontWeight: "bold",
            borderRadius: 2,
          }}
        >
          Enroll Now
        </Button>
      </Box>
    </Container>
  );
};

export default CourseDetail;
