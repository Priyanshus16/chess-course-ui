import React from 'react';
import {
  Box,
  Typography,
  Container,
  Grid,
  Button,
  Avatar,
  Paper,
} from '@mui/material';

const About = () => {
  return (
    <Container sx={{ mt: 8, mb: 8 ,
        width:"100%",}}>
      <Typography sx={{mt:3}} variant="h3" gutterBottom align="center">
        About Us
      </Typography> 
      <Typography variant="body1" color="text.secondary" paragraph align="center">
        Welcome to My Chess Learning, your ultimate platform for mastering the game of chess.
        Our mission is to provide learners of all levels with the best resources to enhance their skills,
        improve strategies, and unlock their full potential in the world of chess.
      </Typography>

      <Grid container spacing={4} sx={{ mt: 4 }}>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Avatar
              alt="Our Vision"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRMc9y6LsGiXYfP_OXKM3oaiXamGoJ_8Rj3PA&s"
              sx={{ width: 150, height: 150, mb: 2 }}
            />
            <Typography variant="h5" gutterBottom>
              Our Vision
            </Typography>
            <Typography variant="body1" color="text.secondary">
              To create a community of passionate chess enthusiasts and to become a premier destination for online chess education.
            </Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Avatar
              alt="Our Mission"
              src="https://store.playstation.com/store/api/chihiro/00_09_000/container/PL/pl/19/EP4037-SLES51630_00-AVPLAYITCH000002/image?w=320&h=320&bg_color=000000&opacity=100&_version=00_09_000"
              sx={{ width: 150, height: 150, mb: 2 }}
            />
            <Typography variant="h5" gutterBottom>
              Our Mission
            </Typography>
            <Typography variant="body1" color="text.secondary">
              To empower learners worldwide by providing world-class courses, expert guidance, and a supportive learning environment.
            </Typography>
          </Paper>
        </Grid>
      </Grid>

      <Box sx={{ mt: 6, textAlign: 'center' }}>
        <Typography variant="h4" gutterBottom>
          Join Our Chess Community Today!
        </Typography>
        <Typography variant="body1" color="text.secondary" paragraph>
          Be a part of our growing chess community and take your skills to the next level.
        </Typography>
        <Button variant="contained" color="primary" size="large">
          Sign Up Now
        </Button>
      </Box>
    </Container>
  );
};

export default About;
