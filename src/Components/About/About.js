import React from "react";
import {
  Box,
  Typography,
  Container,
  Grid,
  Button,
  Avatar,
  Paper,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const About = () => {
  return (
    <Container id="about" sx={{ mt: 8, mb: 8, width: "100%" }}>
      {/* Header Section */}
      <Typography
        variant="h3"
        align="center"
        sx={{
          fontWeight: "bold",
          color: "#1E3A8A",
          mb: 2,
          fontFamily: "'Poppins', sans-serif",
        }}
      >
        About Us
      </Typography>

      <Typography
        variant="body1"
        color="text.secondary"
        paragraph
        align="center"
        sx={{
          fontSize: "1.2rem",
          fontStyle: "italic",
          color: "#374151",
          px: 2,
        }}
      >
        I'm <strong>Kunal Vyas</strong>, the proud founder and coach of{" "}
        <strong>Master Chess Classes</strong>. With over a decade of experience
        as an
        <strong> International Chess Coach</strong>, I am dedicated to helping
        students master the art of chess.
      </Typography>

      {/* About Section */}
      <Grid container spacing={4} sx={{ mt: 4 }}>
        <Grid item xs={12} md={6}>
          <Paper
            elevation={6}
            sx={{
              p: 4,
              textAlign: "center",
              borderRadius: "10px",
              backgroundColor: "#F3F4F6",
              boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
            }}
          >
            <Avatar
              alt="Chess Knowledge"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRMc9y6LsGiXYfP_OXKM3oaiXamGoJ_8Rj3PA&s"
              sx={{ width: 150, height: 150, mb: 2 }}
            />
            <Typography
              variant="h5"
              sx={{ fontWeight: "bold", color: "#1E3A8A" }}
            >
              Chess Expertise
            </Typography>
            <Typography variant="body1" color="text.secondary">
              I have read <strong>80+ chess books</strong> covering openings,
              middlegame, endgame, strategy, and pawn structures. This deep
              knowledge enables me to offer a structured and results-oriented
              chess education.
            </Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper
            elevation={6}
            sx={{
              p: 4,
              textAlign: "center",
              borderRadius: "10px",
              backgroundColor: "#F3F4F6",
              boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
            }}
          >
            <Avatar
              alt="Holistic Learning"
              src="https://store.playstation.com/store/api/chihiro/00_09_000/container/PL/pl/19/EP4037-SLES51630_00-AVPLAYITCH000002/image?w=320&h=320&bg_color=000000&opacity=100&_version=00_09_000"
              sx={{ width: 150, height: 150, mb: 2 }}
            />
            <Typography
              variant="h5"
              sx={{ fontWeight: "bold", color: "#1E3A8A" }}
            >
              Holistic Learning
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Beyond chess, I have read <strong>65+ books</strong> on business,
              psychology, productivity, and teaching, allowing me to integrate
              life skills into my chess coaching.
            </Typography>
          </Paper>
        </Grid>
      </Grid>

      {/* Why Choose Us Section */}
      <Box sx={{ mt: 6, textAlign: "center" }}>
        <Typography
          variant="h4"
          gutterBottom
          sx={{
            fontWeight: "bold",
            color: "#1E3A8A",
            textTransform: "uppercase",
          }}
        >
          Why Choose Us?
        </Typography>

        <List
          sx={{
            display: "inline-block",
            textAlign: "left",
            background: "#F9FAFB",
            p: 3,
            borderRadius: "10px",
          }}
        >
          {[
            "10+ Years of Experience: Trusted and proven coaching methods.",
            "Individual Attention: Small batches ensure focused learning.",
            "Results-Driven Approach: Watch your child's skills grow rapidly.",
            "Holistic Development: Chess as a tool for strategic and critical thinking.",
          ].map((text, index) => (
            <ListItem key={index}>
              <ListItemIcon>
                <CheckCircleIcon sx={{ color: "green" }} />
              </ListItemIcon>
              <ListItemText
                primary={text}
                primaryTypographyProps={{
                  sx: { fontSize: "1.1rem", fontWeight: "500" },
                }}
              />
            </ListItem>
          ))}
        </List>
      </Box>

      {/* Call to Action */}
      <Box sx={{ mt: 6, textAlign: "center" }}>
        <Typography
          variant="h4"
          gutterBottom
          sx={{ fontWeight: "bold", color: "#1E3A8A" }}
        >
          Join Our Chess Community Today!
        </Typography>
        <Typography variant="body1" color="text.secondary" paragraph>
          Be a part of <strong>Master Chess Classes</strong> and take your chess
          skills to the next level.
        </Typography>
        {/* <Button
          variant="contained"
          sx={{
            backgroundColor: "#1E3A8A",
            fontSize: "1rem",
            px: 4,
            py: 1,
            "&:hover": { backgroundColor: "#1C64F2" },
          }}
        >
          Sign Up Now
        </Button> */}
      </Box>
    </Container>
  );
};

export default About;
