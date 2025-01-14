import React from 'react';
import { Box, Typography, Grid, Link, Container } from '@mui/material';

const Footer = () => {
  return (
    <Box
      sx={{
        bgcolor: 'primary.main',
        color: 'white',
        py: 4,
        mt: 8,
        width:"100%"
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {/* Column 1 */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" gutterBottom>
              About Us
            </Typography>
            <Typography variant="body2">
            Our platform offers a comprehensive range of courses designed to empower learners with in-demand skills and knowledge. Whether you're a beginner or a professional, our expert-led lessons and practical tutorials will help you master new concepts and achieve your learning goals with confidence.
            </Typography>
          </Grid>

          {/* Column 2 */}
          <Grid item xs={12} sm={6} md={3}>
            <Box sx={{display:"flex",flexDirection:"column",gap:"10px"}}>
            <Typography variant="h6" gutterBottom>
              Courses
            </Typography>
            <Box>
              <Link href="/courses" color="inherit" underline="hover">
                Web Development
              </Link>
            </Box>
            <Box>
              <Link href="/courses" color="inherit" underline="hover">
                Data Science
              </Link>
            </Box>
            <Box>
              <Link href="/courses" color="inherit" underline="hover">
                Graphic Design
              </Link>
            </Box></Box>
          </Grid>

          {/* Column 3 */}
          <Grid item xs={12} sm={6} md={3}>
          <Box sx={{display:"flex",flexDirection:"column",gap:"10px"}}>
            <Typography variant="h6" gutterBottom>
              Support
            </Typography>
            <Box>
              <Link href="/faq" color="inherit" underline="hover">
                FAQ
              </Link>
            </Box>
            <Box>
              <Link href="/contact" color="inherit" underline="hover">
                Contact Us
              </Link>
            </Box>
            <Box>
              <Link href="/terms" color="inherit" underline="hover">
                Terms of Service
              </Link>
            </Box></Box>
          </Grid>

          {/* Column 4 */}
          <Grid item xs={12} sm={6} md={3}>
          <Box sx={{display:"flex",flexDirection:"column",gap:"10px"}}>
            <Typography variant="h6" gutterBottom>
              Follow Us
            </Typography>
            <Box>
              <Link href="https://facebook.com" color="inherit" underline="hover" target="_blank">
                Facebook
              </Link>
            </Box>
            <Box>
              <Link href="https://twitter.com" color="inherit" underline="hover" target="_blank">
                Twitter
              </Link>
            </Box>
            <Box>
              <Link href="https://instagram.com" color="inherit" underline="hover" target="_blank">
                Instagram
              </Link>
            </Box></Box>
          </Grid>
        </Grid>
        <Typography variant="body2" align="center" sx={{ mt: 4 }}>
          © {new Date().getFullYear()} Your Platform Name. All rights reserved.
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
