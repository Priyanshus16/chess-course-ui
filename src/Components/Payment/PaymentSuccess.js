import React, { useEffect } from "react";
import { Box, Container, Typography, Button } from "@mui/material";
import { CheckCircleOutline } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

export default function PaymentSuccess() {
  const navigate = useNavigate();

  useEffect(() => {
    const enrollUser = async () => {
      const course = JSON.parse(localStorage.getItem("courseToEnroll"));
      const user = JSON.parse(localStorage.getItem("userToEnroll"));

      if (!course || !user) return;


      try {
        const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/enroll`, {
          courseId: course._id,
          userId: user._id,
        });

        if (response.status === 200) {
          Swal.fire("Enrolled Successfully!", "", "success");
          localStorage.removeItem("courseToEnroll");
          localStorage.removeItem("userToEnroll");
        }
      } catch (error) {
        if (error.response?.status === 400) {
          Swal.fire("You are already enrolled in this course");
        } else {
          Swal.fire("An error occurred while enrolling");
        }
      }
    };

    enrollUser();
  }, []);

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          mt: 10,
          p: 4,
          mb: 10,
          boxShadow: 3,
          borderRadius: 3,
          bgcolor: "#ECFDF5",
          textAlign: "center",
        }}
      >
        <CheckCircleOutline sx={{ fontSize: 80, color: "#22C55E" }} />
        <Typography variant="h4" sx={{ mt: 2, fontWeight: "bold", color: "#065F46" }}>
          Payment Successful!
        </Typography>
        <Typography variant="body1" sx={{ mt: 1, mb: 3, color: "#047857" }}>
          🎉 You're now enrolled in the course.
        </Typography>
        <Button
          variant="contained"
          sx={{
            bgcolor: "#065F46",
            "&:hover": { bgcolor: "#047857" },
            px: 4,
            py: 1,
            borderRadius: 2,
            fontWeight: "bold",
          }}
          onClick={() => navigate("/myCourses")}
        >
          Go to Dashboard
        </Button>
      </Box>
    </Container>
  );
}
