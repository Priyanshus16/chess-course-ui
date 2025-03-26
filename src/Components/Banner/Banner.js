import React from "react";
import { Box, Typography, Button, Grid, Container } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Banner = () => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate("/Courses");
  };

  return (
    <Box
      sx={{
        background: "linear-gradient(135deg, #1c1c1c 30%, #3a3a3a 100%)",
        color: "white",
        py: 8,
        px: 2,
        mt: 5,
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4} alignItems="center">
          {/* Left Section: Text */}
          <Grid item xs={12} md={6}>
            <Typography variant="h4" gutterBottom sx={{ fontWeight: "bold" }}>
            Master Chess Classes: Ignite Passion, Build Skills, Achieve Results
            </Typography>
            <Typography variant="body1" paragraph sx={{ opacity: 0.9 }}>
              At Master Chess Classes, our primary focus is to ignite a passion
              for chess in every child while systematically developing their
              skills to deliver tangible results in a short span of time. With a
              well-structured system tailored to different levels of
              proficiency, we aim to provide an unparalleled learning experience
              that fosters growth, both on and off the chessboard.
            </Typography>
            {/* <Button
              variant="contained"
              size="large"
              onClick={handleNavigate}
              sx={{
                mt: 2,
                backgroundColor: "#f5a623",
                color: "black",
                fontWeight: "bold",
                px: 4,
                py: 1.2,
                "&:hover": { backgroundColor: "#e6951a" },
              }}
            >
              Explore Courses
            </Button> */}
          </Grid>

          {/* Right Section: Image */}
          <Grid item xs={12} md={6}>
            <Box
              component="img"
              src="https://c4.wallpaperflare.com/wallpaper/853/653/132/board-chess-classic-game-wallpaper-preview.jpg"
              alt="Chess pieces on a board"
              sx={{
                width: "100%",
                borderRadius: 3,
                boxShadow: "0px 8px 16px rgba(0,0,0,0.4)",
                transition: "transform 0.3s ease-in-out",
                "&:hover": { transform: "scale(1.05)" },
              }}
            />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Banner;
