import React, { useEffect, useState } from "react";
import { Box, Typography, Grid, Container } from "@mui/material";
import axios from "axios";

const Banner = () => {
  const [response, setResponse] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getData = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/banner`);
      setResponse(res.data.banners);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  // Fallback values
  const fallback = {
    heading: "Master Chess Classes: Ignite Passion, Build Skills, Achieve Results",
    description:
      "At Master Chess Classes, our primary focus is to ignite a passion for chess in every child while systematically developing their skills to deliver tangible results in a short span of time. With a well-structured system tailored to different levels of proficiency, we aim to provide an unparalleled learning experience that fosters growth, both on and off the chessboard.",
    image: "../../Assets/chess-fallback.jpg", // Make sure this exists in public folder
  };

  const content = response[0] || fallback;

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
              {content.heading}
            </Typography>
            <Typography variant="body1" paragraph sx={{ opacity: 0.9 }}>
              {content.description}
            </Typography>
          </Grid>

          {/* Right Section: Image */}
          <Grid item xs={12} md={6}>
            <Box
              component="img"
              src={content.image}
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
