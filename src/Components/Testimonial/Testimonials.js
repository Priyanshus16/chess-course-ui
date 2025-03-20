import React from "react";
import {
  Box,
  Typography,
  Avatar,
  Card,
  CardContent,
  IconButton,
  Button,
} from "@mui/material";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";
import Slider from "react-slick";
import axios from "axios";

// Import slick-carousel CSS files
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useState } from "react";
import { useEffect } from "react";


// Custom arrows for the carousel
const PrevArrow = ({ onClick }) => (
  <IconButton
    onClick={onClick}
    sx={{
      position: "absolute",
      left: { xs: 10, md: -40 },
      top: "50%",
      transform: "translateY(-50%)",
      zIndex: 1,
      color: "primary.main",
    }}
  >
    <ArrowBackIos />
  </IconButton>
);

const NextArrow = ({ onClick }) => (
  <IconButton
    onClick={onClick}
    sx={{
      position: "absolute",
      right: { xs: 10, md: -40 },
      top: "50%",
      transform: "translateY(-50%)",
      zIndex: 1,
      color: "primary.main",
    }}
  >
    <ArrowForwardIos />
  </IconButton>
);

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState([]);

  const getTestimonialData = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/testimonial`);
      setTestimonials(res.data.testimonial);
    } catch (error) {
      console.error(error, "there was problem while getting testimonial data");
    }
  };

  useEffect(() => {
    getTestimonialData();
  }, []);

  // Slider settings
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 900,
        settings: { slidesToShow: 1 },
      },
      {
        breakpoint: 600,
        settings: { slidesToShow: 1, arrows: false },
      },
    ],
  };

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        alignItems: "center",
        p: { xs: 2, md: 4 },
        backgroundColor: "#f0f0f0",
        textAlign: { xs: "center", md: "left" },
      }}
    >
      {/* Left Section (YouTube Video) */}
      <Box
        sx={{
          flex: 1,
          pr: { md: 4 },
          mb: { xs: 4, md: 0 },
          maxWidth: { xs: "100%", md: "40%" },
        }}
      >
        <Typography variant="h4" gutterBottom>
          Improve Your Chess with the Best!
        </Typography>
        <Typography variant="body1" color="text.secondary" paragraph>
          Watch how our courses can help you elevate your chess skills.
        </Typography>
        <Box sx={{ width: "100%", position: "relative", pb: "56.25%" }}>
          <iframe
            src="https://www.youtube-nocookie.com/embed/P4fCFom_KzI"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
            }}
          ></iframe>
        </Box>
      </Box>

      {/* Right Section (Carousel) */}
      <Box
  sx={{
    flex: 2,
    width: { xs: "100%", md: "60%" },
    mx: "auto",
    py: 4,
  }}
>
  <Slider {...sliderSettings}>
    {testimonials.map((testimonial) => (
      <Card
        key={testimonial._id}
        sx={{
          m: { xs: 2, md: 3 },
          p: { xs: 3, md: 5 },
          textAlign: "left",
          borderRadius: "15px",
          boxShadow: "0px 6px 20px rgba(0,0,0,0.15)",
          background:
            "linear-gradient(135deg, rgba(255,255,255,0.95), rgba(240,240,240,0.7))",
          border: "1px solid rgba(0,0,0,0.05)",
          transition: "all 0.3s ease-in-out",
          "&:hover": {
            transform: "translateY(-5px)",
            boxShadow: "0px 10px 25px rgba(0,0,0,0.2)",
          },
        }}
      >
        <CardContent>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              flexDirection: { xs: "column", md: "row" },
              textAlign: { xs: "center", md: "left" },
              mb: 3,
            }}
          >
            {/* Avatar Styling */}
            <Avatar
              src={testimonial.image}
              alt={testimonial.name}
              sx={{
                width: 90,
                height: 90,
                mr: { md: 3 },
                mb: { xs: 2, md: 0 },
                border: "4px solid #1976d2",
                boxShadow: "0px 4px 8px rgba(0,0,0,0.1)",
              }}
            />

            <Box>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: "bold",
                  color: "#333",
                  fontSize: { xs: "1.2rem", md: "1.5rem" },
                }}
              >
                {testimonial.name}
              </Typography>
              <Typography
                variant="body2"
                sx={{ color: "text.secondary", fontStyle: "italic" }}
              >
                {testimonial.role}
              </Typography>
            </Box>
          </Box>

          {/* Testimonial Text */}
          <Typography
            variant="body1"
            sx={{
              fontStyle: "italic",
              color: "#555",
              fontSize: "1.1rem",
              lineHeight: 1.6,
              mb: 2,
              position: "relative",
              px: 2,
            }}
          >
            <span
              style={{
                fontSize: "2rem",
                color: "#1976d2",
                fontWeight: "bold",
                position: "absolute",
                left: "-10px",
                top: "-5px",
              }}
            >
              “
            </span>
            {testimonial.description}
            <span
              style={{
                fontSize: "2rem",
                color: "#1976d2",
                fontWeight: "bold",
                position: "absolute",
                right: "-10px",
                bottom: "-5px",
              }}
            >
              ”
            </span>
          </Typography>

          {/* Course Info */}
          <Typography
            variant="body2"
            sx={{
              fontWeight: "bold",
              color: "#1976d2",
              fontSize: "1rem",
              mb: 2,
            }}
          >
            Enrolled in: <span style={{ color: "#444" }}>{testimonial.course}</span>
          </Typography>

          {/* Join Now Button */}
          <Box sx={{ textAlign: "center", mt: 3 }}>
            <Button
              variant="contained"
              sx={{
                background: "#1976d2",
                color: "#fff",
                fontSize: "1rem",
                fontWeight: "bold",
                textTransform: "none",
                px: 4,
                py: 1,
                borderRadius: "8px",
                transition: "all 0.3s ease-in-out",
                "&:hover": {
                  background: "#125a9c",
                },
              }}
            >
              Join Now
            </Button>
          </Box>
        </CardContent>
      </Card>
    ))}
  </Slider>
</Box>

    </Box>
  );
};

export default Testimonials;
