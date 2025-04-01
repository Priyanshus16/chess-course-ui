import React from "react";
import {
  Box,
  Typography,
  Container,
  Grid,
  Avatar,
  Divider,
  useTheme,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import InstructorImage from "../../Assets/kunal-vyas.jpg";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const About = () => {
  const theme = useTheme();

  return (
    <Container id="about" sx={{ mt: 8, mb: 8 }}>
      {/* Header Section */}
      <Box sx={{ textAlign: "center", mb: 6 }}>
        <Typography
          variant="h4"
          sx={{
            fontWeight: 700,
            color: theme.palette.primary.main,
            mb: 2,
            textTransform: "uppercase",
            letterSpacing: 1,
          }}
        >
          About Master Chess Classes
        </Typography>
        <Divider sx={{ width: 100, height: 4, bgcolor: theme.palette.primary.main, mx: "auto", mb: 4 }} />
      </Box>

      {/* Profile Section */}
      <Grid container spacing={6} alignItems="center" sx={{ mb: 6 }}>
        <Grid item xs={12} md={4} sx={{ display: "flex", justifyContent: "center" }}>
          <Avatar
            alt="Kunal Vyas"
            src={InstructorImage}
            sx={{
              width: 250,
              height: 250,
              border: `4px solid ${theme.palette.primary.main}`,
            }}
          />
        </Grid>
        
        <Grid item xs={12} md={8}>
          <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>
            Kunal Vyas
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" sx={{ mb: 3, fontStyle: "italic", fontWeight: 600 }}>
            International Chess Coach & Founder
          </Typography>
          
          <Typography variant="body1" paragraph sx={{ lineHeight: 1.8, fontSize: "1.1rem", fontWeight: "500" }}>
            With over a decade of experience as an International Chess Coach, I've dedicated my career to helping students master the art of chess through structured, results-oriented training.
          </Typography>
          
          <Typography variant="body1" paragraph sx={{ lineHeight: 1.8,fontSize: "1.1rem", fontWeight: "500" }}>
            My extensive study of 80+ chess books covering all aspects of the game - from openings to endgames, strategy to positional play - enables me to provide students with a comprehensive chess education that delivers rapid improvement.
          </Typography>
        </Grid>
      </Grid>

      {/* Methodology Section */}
      <Box sx={{ 
        backgroundColor: theme.palette.grey[100], 
        p: 4,
        borderRadius: 2,
        mb: 6
      }}>
        <Typography variant="h5" sx={{ fontWeight: 600, mb: 3, color: theme.palette.primary.main }}>
          Our Approach
        </Typography>
        
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
              Structured Learning
            </Typography>
            <Box component="ul" sx={{ 
        pl: 2,
        '& li': {
          mb: 1,
          fontSize: '1rem',
          fontWeight: "500",
          lineHeight: 1.6,
          fontFamily: "'Roboto', sans-serif"
        }
      }}>
        <li>Progressive curriculum from fundamentals to advanced strategies</li>
        <li>Customized lesson plans for each student's level</li>
        <li>Systematic breakdown of complex chess concepts</li>
        <li>Regular skill assessments to track development</li>
      </Box>
          </Grid>
          
          <Grid item xs={12} md={6}>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
              Results Focused
            </Typography>
            <Box component="ul" sx={{ 
        pl: 2,
        '& li': {
          mb: 1,
          fontSize: "1rem", fontWeight: "500",
          lineHeight: 1.6,
          fontFamily: "'Roboto', sans-serif"
        }
      }}>
        <li>Proven track record of student rating improvements</li>
        <li>Tournament preparation and performance analysis</li>
        <li>Practical application of learned concepts</li>
        <li>Measurable progress benchmarks</li>
      </Box>
          </Grid>
        </Grid>
      </Box>

      {/* Why Choose Us Section  */}
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
      <Box sx={{ 
        mt: 6, 
        textAlign: "center",
        backgroundColor: theme.palette.primary.main,
        color: "white",
        p: 4,
        borderRadius: 2
      }}>
        <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>
          Ready to Elevate Your Chess Game?
        </Typography>
        <Typography variant="body1" sx={{ mb: 3 }}>
          Join Master Chess Classes today and experience professional training that delivers results.
        </Typography>
      </Box>
    </Container>
  );
};

export default About;
