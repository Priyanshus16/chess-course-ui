import React from "react";
import { Box, Card, CardMedia, Container, Typography, IconButton } from "@mui/material";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

// Mock data (replace with your DB data)
const testimonialImages = [
  { id: 1, url: "https://via.placeholder.com/300x200?text=Testimonial+1" },
  { id: 2, url: "https://via.placeholder.com/300x200?text=Testimonial+2" },
  { id: 3, url: "https://via.placeholder.com/300x200?text=Testimonial+3" },
  { id: 4, url: "https://via.placeholder.com/300x200?text=Testimonial+4" },
  { id: 5, url: "https://via.placeholder.com/300x200?text=Testimonial+5" },
  { id: 6, url: "https://via.placeholder.com/300x200?text=Testimonial+6" },
];

// Custom Arrow Components
const NextArrow = (props) => {
  const { onClick } = props;
  return (
    <IconButton
      onClick={onClick}
      sx={{
        position: "absolute",
        right: "-40px",
        top: "50%",
        transform: "translateY(-50%)",
        zIndex: 1,
        bgcolor: "background.paper",
        boxShadow: 1,
        "&:hover": { bgcolor: "action.hover" },
      }}
    >
      <ArrowForwardIosIcon fontSize="small" />
    </IconButton>
  );
};

const PrevArrow = (props) => {
  const { onClick } = props;
  return (
    <IconButton
      onClick={onClick}
      sx={{
        position: "absolute",
        left: "-40px",
        top: "50%",
        transform: "translateY(-50%)",
        zIndex: 1,
        bgcolor: "background.paper",
        boxShadow: 1,
        "&:hover": { bgcolor: "action.hover" },
      }}
    >
      <ArrowBackIosNewIcon fontSize="small" />
    </IconButton>
  );
};

const TestimonialImage = () => {
  // Carousel settings (4 slides per row + custom arrows)
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 3, arrows: false },
      },
      {
        breakpoint: 768,
        settings: { slidesToShow: 2, arrows: false },
      },
      {
        breakpoint: 480,
        settings: { slidesToShow: 1, arrows: false },
      },
    ],
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4, mt: 5, position: "relative" }}>
      <Typography sx={{ mb: 5 }} variant="h3" fontWeight={700} align="center" gutterBottom>
        Achievement Of Our Students
      </Typography>

      <Box sx={{ px: { xs: 1, md: 0 }, position: "relative" }}>
        <Slider {...settings}>
          {testimonialImages.map((item) => (
            <Box key={item.id} sx={{ px: 1 }}>
              <Card
                sx={{
                  borderRadius: "8px",
                  overflow: "hidden",
                  boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                }}
              >
                <CardMedia
                  component="img"
                  height="200"
                  image={item.url}
                  alt={`Testimonial ${item.id}`}
                  sx={{ objectFit: "cover" }}
                />
              </Card>
            </Box>
          ))}
        </Slider>
      </Box>
    </Container>
  );
};

export default TestimonialImage;