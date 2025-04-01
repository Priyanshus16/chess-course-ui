import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Avatar,
  Card,
  CardContent,
  IconButton,
  Tooltip,
} from "@mui/material";
import { 
  ArrowBackIos, 
  ArrowForwardIos,
  VolumeOff,
  VolumeUp
} from "@mui/icons-material";
import Slider from "react-slick";
import axios from "axios";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Custom arrows for the testimonials carousel
const TestimonialPrevArrow = ({ onClick }) => (
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

const TestimonialNextArrow = ({ onClick }) => (
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

// Custom arrows for the video carousel
const VideoPrevArrow = ({ onClick }) => (
  <IconButton
    onClick={onClick}
    sx={{
      position: "absolute",
      left: 10,
      top: "50%",
      transform: "translateY(-50%)",
      zIndex: 1,
      color: "white",
      backgroundColor: "rgba(0,0,0,0.5)",
      "&:hover": {
        backgroundColor: "rgba(0,0,0,0.7)",
      },
    }}
  >
    <ArrowBackIos />
  </IconButton>
);

const VideoNextArrow = ({ onClick }) => (
  <IconButton
    onClick={onClick}
    sx={{
      position: "absolute",
      right: 10,
      top: "50%",
      transform: "translateY(-50%)",
      zIndex: 1,
      color: "white",
      backgroundColor: "rgba(0,0,0,0.5)",
      "&:hover": {
        backgroundColor: "rgba(0,0,0,0.7)",
      },
    }}
  >
    <ArrowForwardIos />
  </IconButton>
);

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [testimonialVideos, setTestimonialVideos] = useState([]);

  const getTestimonialData = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/testimonial`
      );
      setTestimonials(res.data.testimonial || []);
      setTestimonialVideos(res.data.testimonialVideo || []);
    } catch (error) {
      console.error(error, "there was problem while getting testimonial data");
    }
  };

  useEffect(() => {
    getTestimonialData();
  }, []);

  // Video slider settings
  const videoSliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <VideoNextArrow />,
    prevArrow: <VideoPrevArrow />,
    autoplay: true,
    autoplaySpeed: 5000,
    arrows: true,
    appendDots: (dots) => (
      <div style={{ position: "absolute", bottom: "10px", width: "100%" }}>
        <ul style={{ margin: 0, padding: 0, textAlign: "center" }}>{dots}</ul>
      </div>
    ),
    customPaging: (i) => (
      <div
        style={{
          width: "10px",
          height: "10px",
          borderRadius: "50%",
          backgroundColor: "white",
          opacity: 0.5,
          margin: "0 4px",
          cursor: "pointer",
        }}
      />
    ),
  };

  // Testimonial slider settings
  const testimonialSliderSettings = {
    dots: true,
    infinite: testimonials.length > 1,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <TestimonialNextArrow />,
    prevArrow: <TestimonialPrevArrow />,
    responsive: [
      {
        breakpoint: 900,
        settings: {
          slidesToShow: 1,
        },
      },
      {
        breakpoint: 600,
        settings: { slidesToShow: 1 },
      },
    ],
  };

  // Single video card component with mute control
  const SingleVideoCard = ({ video }) => {
    const [isMuted, setIsMuted] = useState(true);

    return (
      <Box sx={{ position: "relative", pb: "56.25%" }}>
        <video
          src={video.video}
          muted={isMuted}
          autoPlay
          loop
          playsInline
          controls={false}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            objectFit: "contain",
            borderRadius: "8px",
          }}
        />
        <Tooltip title={isMuted ? "Unmute" : "Mute"}>
          <IconButton
            onClick={() => setIsMuted(!isMuted)}
            sx={{
              position: "absolute",
              bottom: 16,
              right: 16,
              backgroundColor: "rgba(0,0,0,0.5)",
              color: "white",
              "&:hover": {
                backgroundColor: "rgba(0,0,0,0.7)",
              },
            }}
          >
            {isMuted ? <VolumeOff /> : <VolumeUp />}
          </IconButton>
        </Tooltip>
      </Box>
    );
  };

  // Single testimonial card component
  const SingleTestimonialCard = ({ testimonial }) => (
    <Card
      sx={{
        height: "100%",
        p: { xs: 2, md: 3 },
        textAlign: "left",
        borderRadius: "12px",
        boxShadow: "0px 4px 15px rgba(0,0,0,0.1)",
        background: "white",
      }}
    >
      <CardContent>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            flexDirection: { xs: "column", md: "row" },
            textAlign: { xs: "center", md: "left" },
            mb: 2,
          }}
        >
          <Avatar
            src={testimonial.image}
            alt={testimonial.name}
            sx={{
              width: 70,
              height: 70,
              mr: { md: 2 },
              mb: { xs: 1, md: 0 },
              border: "3px solid #1976d2",
            }}
          />
          <Box>
            <Typography
              variant="h6"
              sx={{
                fontWeight: "bold",
                color: "#333",
                fontSize: "1.1rem",
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

        <Typography
          variant="body1"
          sx={{
            fontStyle: "italic",
            color: "#555",
            fontSize: "1rem",
            lineHeight: 1.5,
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
              top: "-15px",
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
              bottom: "-25px",
            }}
          >
            ”
          </span>
        </Typography>

        <Typography
          variant="body2"
          sx={{
            fontWeight: "bold",
            color: "#1976d2",
            fontSize: "0.9rem",
            mb: 1,
          }}
        >
          Enrolled in:{" "}
          <span style={{ color: "#444" }}>{testimonial.course}</span>
        </Typography>
      </CardContent>
    </Card>
  );

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        alignItems: "center",
        p: { xs: 2, md: 4 },
        backgroundColor: "#f0f0f0",
        gap: { xs: 3, md: 4 },
      }}
    >
      {/* Left Section (Video) */}
      <Box
        sx={{
          flex: 1,
          width: "100%",
          maxWidth: { xs: "100%", md: "50%" },
        }}
      >
        {testimonialVideos.length === 0 ? (
          <Typography>No testimonial videos available</Typography>
        ) : testimonialVideos.length === 1 ? (
          <SingleVideoCard video={testimonialVideos[0]} />
        ) : (
          <Box
            sx={{
              borderRadius: "8px",
              overflow: "hidden",
              boxShadow: "0px 4px 15px rgba(0,0,0,0.1)",
            }}
          >
            <Slider {...videoSliderSettings}>
              {testimonialVideos.map((item) => (
                <SingleVideoCard key={item._id} video={item} />
              ))}
            </Slider>
          </Box>
        )}
      </Box>

      {/* Right Section (Testimonials) */}
      <Box
        sx={{
          flex: 1,
          width: "100%",
          maxWidth: { xs: "100%", md: "50%" },
        }}
      >
        {testimonials.length === 0 ? (
          <Typography>No testimonials available</Typography>
        ) : testimonials.length === 1 ? (
          <SingleTestimonialCard testimonial={testimonials[0]} />
        ) : (
          <Slider {...testimonialSliderSettings}>
            {testimonials.map((testimonial) => (
              <Box key={testimonial._id} sx={{ px: 1, py: 1 }}>
                <SingleTestimonialCard testimonial={testimonial} />
              </Box>
            ))}
          </Slider>
        )}
      </Box>
    </Box>
  );
};

export default Testimonials;