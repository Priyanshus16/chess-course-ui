import React from "react";
import { useEffect, useState } from "react";
import { Box, Card, CardMedia, Container, Typography, IconButton } from "@mui/material";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import axios from "axios";

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

  const [testimonialImage, setTestimonialImage] = useState([]);
  
    const getTestimonialData = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/testimonialImage`
        );
        setTestimonialImage(res.data.testimonialImage || []);
      } catch (error) {
        console.error(error, "there was problem while getting testimonial data");
      }
    };
  
    useEffect(() => {
      getTestimonialData();
    }, []);

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
          {testimonialImage.map((item) => (
            <Box key={item._id} sx={{ px: 1 }}>
              <Card
                sx={{
                  justifyContent: "center",
                  display: "flex",
                  borderRadius: "8px",
                  overflow: "hidden",
                  boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                }}
              >
                <CardMedia
                  component="img"
                  height="300"
                  image={item.image}
                  alt={`Testimonial ${item.id}`}
                  sx={{ objectFit: "contain", width: "80%", height: "80%" }}
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