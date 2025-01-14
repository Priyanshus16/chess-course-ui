import React from 'react';
import { Box, Typography, Container, Grid, Card, CardContent, Button } from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

const steps = [
  {
    title: "Explore the Courses That Suit You",
    description: "Dive into our wide range of carefully crafted chess courses—from beginners to advanced levels.",
    icon: <CheckCircleOutlineIcon />,
  },
  {
    title: "Choose the Course That Matches Your Level",
    description: "Based on your current skill level and learning goals, select the course that aligns best with your chess journey.",
    icon: <CheckCircleOutlineIcon />,
  },
  {
    title: "Create Your Account in a Few Simple Steps",
    description: "Sign up using your email or social media to secure your place in the course and track your progress.",
    icon: <CheckCircleOutlineIcon />,
  },
  {
    title: "Begin Your Learning Journey",
    description: "Access your course materials, engage with lessons, practice, and sharpen your chess skills at your own pace.",
    icon: <CheckCircleOutlineIcon />,
  },
];

const HowItWorks = () => {
  return (
    <Box sx={{ padding: '60px 0', backgroundColor: 'background.paper' }}>
      <Container maxWidth="lg">
        <Typography variant="h3" align="center" gutterBottom>
          How It Works
        </Typography>
        <Typography variant="body1" align="center" color="text.secondary" paragraph>
          Follow these simple steps to start your journey towards mastering chess!
        </Typography>
        <Grid container spacing={4} sx={{ marginTop: 4 }}>
          {steps.map((step, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Card sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', height: '100%' }}>
                <Box sx={{ backgroundColor: 'primary.light', padding: 3, borderRadius: '50%', marginBottom: 2 }}>
                  {step.icon}
                </Box>
                <CardContent sx={{ flex: 1 }}>
                  <Typography variant="h6" gutterBottom>
                    {step.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    {step.description}
                  </Typography>
                </CardContent>
                {index === 3 && (
                  <Button variant="contained" color="primary"  sx={{ m:3 }}>
                    Get Started
                  </Button>
                )}
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default HowItWorks;
