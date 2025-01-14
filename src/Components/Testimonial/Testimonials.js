import React from "react";
import {
  Box,
  Typography,
  Avatar,
  Card,
  CardContent,
  IconButton,
} from "@mui/material";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";
import Slider from "react-slick";

// Import slick-carousel CSS files
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Testimonials data
const testimonials = [
  {
    id: 1,
    name: "John Doe",
    role: "Beginner Chess Player",
    review:
      "This platform has transformed my chess skills. The beginner courses are easy to follow and incredibly effective.",
    image: "https://www.classcentral.com/report/wp-content/uploads/2022/11/Chess-BCG-Banner.png",
    courseEnrolled: "Mastering Chess Basics",
  },
  {
    id: 2,
    name: "Jane Smith",
    role: "Intermediate Chess Enthusiast",
    review:
      "The advanced strategies course taught me tactics that significantly improved my game. Highly recommend it!",
    image: "https://www.classcentral.com/report/wp-content/uploads/2022/11/Chess-BCG-Banner.png",
    courseEnrolled: "Advanced Chess Strategies",
  },
  {
    id: 3,
    name: "Chris Johnson",
    role: "Chess Competitor",
    review:
      "The bootcamp helped me prepare for tournaments. The lessons are well-structured and engaging.",
    image: "https://www.classcentral.com/report/wp-content/uploads/2022/11/Chess-BCG-Banner.png",
    courseEnrolled: "Chess Mastery Bootcamp",
  },
];

// Custom arrows for the carousel
const PrevArrow = (props) => {
    const { onClick } = props;
    return (
      <IconButton
        onClick={onClick}
        sx={{ position: "absolute", left: -30, top: "50%", transform: "translateY(-50%)", zIndex: 1 }}
      >
        <ArrowBackIos />
      </IconButton>
    );
  };
  
  const NextArrow = (props) => {
    const { onClick } = props;
    return (
      <IconButton
        onClick={onClick}
        sx={{ position: "absolute", right: -30, top: "50%", transform: "translateY(-50%)", zIndex: 1 }}
      >
        <ArrowForwardIos />
      </IconButton>
    );
  };
const Testimonials = () => {
  // Slider settings
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,

  };

  return (
    <Box
      sx={{
        width:"100%",
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        alignItems: "center",
        p: 4,
        backgroundColor: "#f9f9f9",
        position: "relative",
      }}
    >
      {/* Left Section */}
      <Box sx={{ flex: 1, pr: { md: 4 }, mb: { xs: 4, md: 0 } }}>
        <Typography variant="h4" gutterBottom>
          Testimonials and Success Stories
        </Typography>
        <Typography variant="body1" color="text.secondary" paragraph>
          Hear from our learners about how our courses helped them improve
          their chess skills.
        </Typography>
      </Box>

      {/* Right Section (Carousel) */}
      <Box sx={{ flex: 2, width:"700px" }}>
        <Slider {...sliderSettings}>
          {testimonials.map((testimonial) => (
            <Card key={testimonial.id} sx={{ m: 2, p: 2 }}>
              <CardContent>
                <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                  <Avatar
                    src={testimonial.image}
                    alt={testimonial.name}
                    sx={{ width: 64, height: 64, mr: 2 }}
                  />
                  <Box>
                    <Typography variant="h6">{testimonial.name}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      {testimonial.role}
                    </Typography>
                  </Box>
                </Box>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  {testimonial.review}
                </Typography>
                <Typography variant="body2" color="primary">
                  Course Enrolled: <strong>{testimonial.courseEnrolled}</strong>
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Slider>
      </Box>
    </Box>
  );
};

export default Testimonials;
