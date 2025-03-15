// import React from 'react';
// import { Box, Typography, Container, Grid, Card, CardContent, Button } from '@mui/material';
// import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

// const steps = [
//   {
//     title: "Explore the Courses That Suit You",
//     description: "Dive into our wide range of carefully crafted chess courses—from beginners to advanced levels.",
//     icon: <CheckCircleOutlineIcon />,
//   },
//   {
//     title: "Choose the Course That Matches Your Level",
//     description: "Based on your current skill level and learning goals, select the course that aligns best with your chess journey.",
//     icon: <CheckCircleOutlineIcon />,
//   },
//   {
//     title: "Create Your Account in a Few Simple Steps",
//     description: "Sign up using your email or social media to secure your place in the course and track your progress.",
//     icon: <CheckCircleOutlineIcon />,
//   },
//   {
//     title: "Begin Your Learning Journey",
//     description: "Access your course materials, engage with lessons, practice, and sharpen your chess skills at your own pace.",
//     icon: <CheckCircleOutlineIcon />,
//   },
// ];

// const HowItWorks = () => {
//   return (
//     <Box sx={{ padding: '60px 0', backgroundColor: 'background.paper' }}>
//       <Container maxWidth="lg">
//         <Typography variant="h3" align="center" gutterBottom>
//           How It Works
//         </Typography>
//         <Typography variant="body1" align="center" color="text.secondary" paragraph>
//           Follow these simple steps to start your journey towards mastering chess!
//         </Typography>
//         <Grid container spacing={4} sx={{ marginTop: 4 }}>
//           {steps.map((step, index) => (
//             <Grid item xs={12} sm={6} md={3} key={index}>
//               <Card sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', height: '100%' }}>
//                 <Box sx={{ backgroundColor: 'primary.light', padding: 3, borderRadius: '50%', marginBottom: 2 }}>
//                   {step.icon}
//                 </Box>
//                 <CardContent sx={{ flex: 1 }}>
//                   <Typography variant="h6" gutterBottom>
//                     {step.title}
//                   </Typography>
//                   <Typography variant="body2" color="text.secondary" gutterBottom>
//                     {step.description}
//                   </Typography>
//                 </CardContent>
//                 {index === 3 && (
//                   <Button variant="contained" color="primary"  sx={{ m:3 }}>
//                     Get Started
//                   </Button>
//                 )}
//               </Card>
//             </Grid>
//           ))}
//         </Grid>
//       </Container>
//     </Box>
//   );
// };

// export default HowItWorks;

import React from 'react';
import { Box, Typography, Container, Grid, List, ListItem, ListItemText, Button } from '@mui/material';

const HowItWorks = () => {
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
            <Button variant="contained" color="primary" sx={{ padding: '12px 24px', fontSize: '16px' }}>
              Enroll Now
            </Button>
          </Box>

        </Box>
      </Container>
    </Box>
  );
};

export default HowItWorks;
  