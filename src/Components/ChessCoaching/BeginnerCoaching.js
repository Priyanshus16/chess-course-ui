import React from "react";
import { Box, Typography, Container, Grid } from "@mui/material";
import { styled } from "@mui/system";
import Testimonials from "../Testimonial/Testimonials";
import About from "../About/About";
import chessImage from "../../Assets/chess-image.jpg";
import ContactForm from "../ContactUs/ContactForm";
import CurriculumPage from "../Curriculam/CurriculumPage";
import axios from "axios";
import { useEffect } from "react";

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
  [theme.breakpoints.down("sm")]: {
    height: "50vh",
  },
}));

const ContentBox = styled(Box)(({ theme }) => ({
  position: "absolute",
  left: "5%",
  maxWidth: "45%",
  padding: "30px",
  color: "#fffff5",
  [theme.breakpoints.down("md")]: {
    maxWidth: "60%",
    left: "10%",
  },
  [theme.breakpoints.down("sm")]: {
    width: "90%",
    maxWidth: "none",
    left: "50%",
    transform: "translateX(-50%)",
    textAlign: "center",
    padding: "15px",
  },
}));

const CardBox = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: theme.spacing(3),
  borderRadius: "12px",
  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
  backgroundColor: "#fff",
  textAlign: "center",
  transition: "transform 0.3s ease-in-out",
  height: "100%",
  minHeight: "250px",
  "&:hover": {
    transform: "scale(1.03)",
  },
  [theme.breakpoints.down("sm")]: {
    minHeight: "200px",
    padding: theme.spacing(2),
  },
}));

// Chess Card icon
const staticIcons = ["♘", "♕", "♖", "♙"];

const BeginnerCoaching = () => {
  const [response, setResponse] = React.useState([]);
  const [coachingCards, setCoachingCards] = React.useState([]);

  const getData = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/beginnerBanner`
      );
      setResponse(res.data.beginnerBanner);
      const updatedCoachingCards = res.data.coachingCards.map(
        (card, index) => ({
          ...card,
          icon: staticIcons[index % staticIcons.length], // Repeat icons in a cycle
        })
      );
      setCoachingCards(updatedCoachingCards);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <Container maxWidth="lg">
      {/* Section with Background Image and Content */}
      <SectionWrapper sx={{ mt: 3 }}>
        {/* <ImageBackground /> */}
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundImage: `url(${response[0]?.image || chessImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            filter: "brightness(50%)",
          }}
        />
        <ContentBox>
          <Typography
            variant="h3"
            sx={{
              fontWeight: "bold",
              mb: 3,
              fontSize: { xs: "28px", sm: "32px", md: "40px" },
            }}
          >
            {response[0]?.heading}
            {/* Beginner Chess Coaching ♟️ */}
          </Typography>
          <Typography
            variant="body1"
            sx={{
              mt: 2,
              fontSize: { xs: "18px", sm: "20px", md: "22px" },
              lineHeight: 1.6,
            }}
          >
            {response[0]?.description}
            {/* Start your chess journey with Master Chess Classes! Learn the
            fundamentals, basic moves, and essential strategies to build a
            strong foundation. */}
          </Typography>
        </ContentBox>
      </SectionWrapper>

      {/* Benefits and Contact Form Section */}
      <Box sx={{ mt: 5 }}>
        <Typography
          variant="h4"
          sx={{
            fontWeight: "bold",
            mb: 3,
            textAlign: "center",
            fontSize: { xs: "28px", sm: "32px", md: "36px" },
          }}
        >
          Benefits of Learning Chess For Beginners
        </Typography>
        <Grid container spacing={3} alignItems="stretch">
          {/* Left side - Benefits Cards */}
          <Grid item xs={12} md={6}>
            <Grid container spacing={3}>
              {coachingCards.map((card, index) => (
                <Grid item xs={12} sm={6} key={index} sx={{ display: "flex" }}>
                  <CardBox>
                    <Typography
                      variant="h2"
                      sx={{ fontSize: { xs: "2.5rem", sm: "3rem" } }}
                    >
                      {card.icon}
                    </Typography>
                    <Typography
                      variant="h5"
                      sx={{
                        mt: 2,
                        fontWeight: "bold",
                        fontSize: { xs: "1.25rem", sm: "1.5rem" },
                      }}
                    >
                      {card.heading}
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{
                        mt: 1,
                        fontSize: { xs: "1rem", sm: "1.1rem" },
                        color: "#555",
                        lineHeight: 1.5,
                      }}
                    >
                      {card.description}
                    </Typography>
                  </CardBox>
                </Grid>
              ))}
            </Grid>
          </Grid>

          {/* Right side - Contact Form */}
          <Grid item xs={12} md={6} sx={{ display: "flex" }}>
            <Box sx={{ width: "100%" }}>
              <ContactForm />
            </Box>
          </Grid>
        </Grid>
      </Box>

      {/* Other Sections */}
      <About />
      <Testimonials />
      <CurriculumPage />
    </Container>
  );
};

export default BeginnerCoaching;
