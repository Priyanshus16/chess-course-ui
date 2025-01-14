import React from "react";
import { Box, Typography, Button, Grid, Container } from "@mui/material";// Replace with the actual path to your image

const Banner = () => {
  return (
    <Box
      sx={{
        bgcolor: "background.default",
        color: "text.primary",
        py: 8,
        px: 2,
        mt:3
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4} alignItems="center">
          {/* Left Section: Text */}
          <Grid item xs={12} md={6}>
            <Typography variant="h3" gutterBottom>
              Master the Art of Chess
            </Typography>
            <Typography variant="body1" paragraph>
              Unlock your chess potential with expert-led courses designed to
              enhance your skills, strategies, and gameplay. Whether you're a
              beginner or a pro, our lessons will help you dominate the board.
            </Typography>
            <Button
              variant="contained"
              color="primary"
              size="large"
              sx={{ mt: 2 }}
              href="#courses" // Replace with the link to your courses
            >
              Explore Courses
            </Button>
          </Grid>

          {/* Right Section: Image */}
          <Grid item xs={12} md={6}>
            <Box
              component="img"
              src="https://c4.wallpaperflare.com/wallpaper/853/653/132/board-chess-classic-game-wallpaper-preview.jpg"
              alt="Chess pieces on a board"
              sx={{
                width: "100%",
                borderRadius: 2,
                boxShadow: 3,
              }}
            />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Banner;
