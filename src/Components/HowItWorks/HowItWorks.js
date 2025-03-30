import React from 'react';
import { Box, Typography, Container, Grid, List, ListItem, ListItemText, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const HowItWorks = () => {

  const navigate = useNavigate();
  return (
    <Box sx={{ padding: '80px 0', backgroundColor: 'background.paper' }}>
      <Container maxWidth="md">

        {/* Title Section */}
        <Typography variant="h3" align="center" fontWeight={600} gutterBottom>
          How Our Chess Classes Work
        </Typography>
        <Typography variant="body1" align="center" color="text.secondary" paragraph>
          Our chess coaching program is structured to ensure maximum learning, engagement, and skill improvement. Whether you're a beginner or an advanced player, we have a batch for you.
        </Typography>

        {/* Class Details Section */}
        <Box sx={{ marginTop: 6, padding: 4, backgroundColor: 'grey.100', borderRadius: 2 }}>
          <Typography variant="h4" align="center" fontWeight={600} gutterBottom>
            Class Details
          </Typography>
          <Typography variant="body1" align="center" color="text.secondary" paragraph>
            Join a structured training program designed for chess enthusiasts. Learn from expert instructors and enhance your strategic thinking.
          </Typography>

          <Grid container spacing={4} sx={{ maxWidth: 800, padding: 2 }}>
            <Grid item xs={12} sm={6}>
              <List>
                <ListItem>
                  <ListItemText primary="⏰ Timing" secondary="Evening batches available from 4 PM to 9 PM." />
                </ListItem>
                <ListItem>
                  <ListItemText primary="📅 Days" secondary="Choose between: Monday - Wednesday or Thursday - Saturday (3 days a week)." />
                </ListItem>
                <ListItem>
                  <ListItemText primary="⏳ Duration" secondary="Each session lasts 1 hour, ensuring focused learning and practice." />
                </ListItem>
              </List>
            </Grid>
            <Grid item xs={12} sm={6}>
              <List>
                <ListItem>
                  <ListItemText primary="📆 Monthly Schedule" secondary="A total of 12 engaging sessions per month." />
                </ListItem>
                <ListItem>
                  <ListItemText primary="💰 Fee Structure" secondary="Affordable tuition fee of ₹2500 per month." />
                </ListItem>
                <ListItem>
                  <ListItemText primary="👥 Small Batch Size" secondary="Each batch has only 10 students to ensure personalized coaching." />
                </ListItem>
              </List>
            </Grid>
          </Grid>

          {/* Call to Action */}
          <Box textAlign="center" mt={4}>
            <Button onClick={() =>{ navigate('/advanceCoaching'); window.scrollTo(0,0)}} variant="contained" color="primary" sx={{ padding: '12px 24px', fontSize: '16px' }}>
              Enroll Now
            </Button>
          </Box>

        </Box>
      </Container>
    </Box>
  );
};

export default HowItWorks;
  