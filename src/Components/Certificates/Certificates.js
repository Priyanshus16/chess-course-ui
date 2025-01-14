import React from 'react';
import { Box, Typography, Container, Grid, Card, CardContent, CardMedia, Button } from '@mui/material';

const certifications = [
  {
    id: 1,
    title: "Chess Master Certification",
    description: "Achieve mastery in chess with this comprehensive certification awarded upon completing advanced courses.",
    image: "https://www.classcentral.com/report/wp-content/uploads/2022/11/Chess-BCG-Banner.png",
  },
  {
    id: 2,
    title: "Chess Strategist Certification",
    description: "Become a certified chess strategist by mastering key tactics and strategies with our specialized course.",
    image: "https://www.classcentral.com/report/wp-content/uploads/2022/11/Chess-BCG-Banner.png",
  },
  {
    id: 3,
    title: "Tournament Preparation Certification",
    description: "Prepare for real-world chess tournaments with this certification, covering all essential preparation techniques.",
    image: "https://www.classcentral.com/report/wp-content/uploads/2022/11/Chess-BCG-Banner.png",
  },
  {
    id: 4,
    title: "Grandmaster Foundation Certification",
    description: "Start your journey to becoming a grandmaster with our foundational chess certification program.",
    image: "https://www.classcentral.com/report/wp-content/uploads/2022/11/Chess-BCG-Banner.png",
  },
];

const Certifications = () => {
  return (
    <Box sx={{ padding: '60px 0', backgroundColor: 'background.paper' }}>
      <Container maxWidth="lg">
        <Typography variant="h3" align="center" gutterBottom>
          Certifications
        </Typography>
        <Typography variant="body1" align="center" color="text.secondary" paragraph>
          Gain industry-recognized certifications to validate your chess skills and achievements.
        </Typography>
        <Grid container spacing={4} sx={{ marginTop: 4 }}>
          {certifications.map((cert) => (
            <Grid item xs={12} sm={6} md={3} key={cert.id}>
              <Card sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', height: '100%', justifyContent: 'space-between', padding: 2 }}>
                <CardMedia
                  component="img"
                  image={cert.image}
                  alt={cert.title}
                  sx={{ width: '100%', height: 250, objectFit: 'cover', marginBottom: 2 }}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="h6" gutterBottom>
                    {cert.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    {cert.description}
                  </Typography>
                </CardContent>
                <Button variant="contained" color="primary" fullWidth sx={{ marginTop: 2 }}>
                  Enroll Now
                </Button>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Certifications;
