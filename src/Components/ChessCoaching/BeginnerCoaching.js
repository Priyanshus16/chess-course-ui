import React from "react";
import { Box, Typography, Container, Grid } from "@mui/material";
import { styled } from "@mui/system";
import ContactUs from "../ContactUs/ContactUs";
import Testimonials from "../Testimonial/Testimonials";
import About from "../About/About";
import chessImage from "../../Assets/chess-image.jpg";

// Styled components
const SectionWrapper = styled(Box)(({ theme }) => ({
  position: "relative",
  height: "80vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: "12px",
  overflow: "hidden",
  boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.2)",
  [theme.breakpoints.down("md")]: {
    height: "60vh",
  },
}));

const ImageBackground = styled(Box)({
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  backgroundImage: `url(${chessImage})`,
  backgroundSize: "cover",
  backgroundPosition: "center",
  filter: "brightness(50%)",
});

const ContentBox = styled(Box)(({ theme }) => ({
  position: "absolute",
  left: "5%",
  maxWidth: "40%",
  padding: "30px",
  color: "#fffff5",
  [theme.breakpoints.down("md")]: {
    maxWidth: "60%",
    left: "10%",
  },
  [theme.breakpoints.down("sm")]: {
    maxWidth: "90%",
    left: "5%",
    textAlign: "center",
  },
}));

const CardBox = styled(Box)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "20px",
  borderRadius: "12px",
  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
  backgroundColor: "#fff",
  textAlign: "center",
  transition: "transform 0.3s ease-in-out",
  "&:hover": {
    transform: "scale(1.05)",
  },
});

// Chess Coaching Card Data
const coachingCards = [
  { icon: "♘", title: "Higher IQ", description: "Chess enhances logical thinking, calculation, and puzzle-solving skills." },
  { icon: "♕", title: "Improves Focus", description: "Chess requires unwavering attention, as one mistake can cost the game." },
  { icon: "♖", title: "Enhances Problem-Solving", description: "Players learn to think ahead, analyze patterns, and make strategic decisions." },
  { icon: "♙", title: "Builds Patience & Discipline", description: "Chess teaches patience, as players must wait for the right moment to strike." },
];

const BeginnerCoaching = () => {
  return (
    <Container>
      {/* Section with Background Image and Content */}
      <SectionWrapper sx={{ mt: 3 }}>
        <ImageBackground />
        <ContentBox>
          <Typography variant="h3" sx={{ fontWeight: "bold", mb: 3 }}>
            Beginner Chess Coaching ♟️
          </Typography>
          <Typography variant="body1" sx={{ mt: 2, fontSize: "22px" }}>
            Start your chess journey with Master Chess Classes! Learn the fundamentals, basic moves, and essential strategies to build a strong foundation.
          </Typography>
        </ContentBox>
      </SectionWrapper>

      {/* Coaching Cards Section */}
      <Box sx={{ mt: 5, textAlign: "center" }}>
        <Typography variant="h4" sx={{ fontWeight: "bold", mb: 3 }}>
          Benefits of Learning Chess For Beginners
        </Typography>
        <Grid container spacing={3} justifyContent="center">
          {coachingCards.map((card, index) => (
            <Grid item xs={12} sm={6} md={6} key={index}>
              <CardBox>
                <Typography variant="h2">{card.icon}</Typography>
                <Typography variant="h5" sx={{ mt: 2, fontWeight: "bold" }}>
                  {card.title}
                </Typography>
                <Typography variant="body2" sx={{ mt: 1, fontSize: "18px", color: "#555" }}>
                  {card.description}
                </Typography>
              </CardBox>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Other Sections */}
      <ContactUs />
      <Testimonials />
      <About />
    </Container>
  );
};

export default BeginnerCoaching;
