import React from "react";
import { Box, Container, Typography, Button } from "@mui/material";
import { CancelOutlined } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

export default function PaymentCancel() {
  const navigate = useNavigate();

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          mt: 10,
          p: 4,
          mb: 10,
          boxShadow: 3,
          borderRadius: 3,
          bgcolor: "#FEF2F2",
          textAlign: "center",
        }}
      >
        <CancelOutlined sx={{ fontSize: 80, color: "#DC2626" }} />
        <Typography
          variant="h4"
          sx={{ mt: 2, fontWeight: "bold", color: "#991B1B" }}
        >
          Payment Cancelled
        </Typography>
        <Typography variant="body1" sx={{ mt: 1, mb: 3, color: "#B91C1C" }}>
          ❌ Your payment was not completed. You can try again at any time.
        </Typography>
        <Button
          variant="contained"
          sx={{
            bgcolor: "#991B1B",
            "&:hover": { bgcolor: "#B91C1C" },
            px: 4,
            py: 1,
            borderRadius: 2,
            fontWeight: "bold",
          }}
          onClick={() => navigate("/myCourses")}
        >
          Back to Courses
        </Button>
      </Box>
    </Container>
  );
}
