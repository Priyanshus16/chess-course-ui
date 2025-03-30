// import React from 'react';
// import { Box, Typography, Grid, Link, Container } from '@mui/material';

// const Footer = () => {
//   return (
//     <Box
//       sx={{
//         bgcolor: 'primary.main',
//         color: 'white',
//         py: 4,
//         mt: 8,
//         width:"100%"
//       }}
//     >
//       <Container maxWidth="lg">
//         <Grid container spacing={4}>
//           {/* Column 1 */}
//           <Grid item xs={12} sm={6} md={3}>
//             <Typography variant="h6" gutterBottom>
//               About Us
//             </Typography>
//             <Typography variant="body2">
//             Our platform offers a comprehensive range of courses designed to empower learners with in-demand skills and knowledge. Whether you're a beginner or a professional, our expert-led lessons and practical tutorials will help you master new concepts and achieve your learning goals with confidence.
//             </Typography>
//           </Grid>

//           {/* Column 2 */}
//           <Grid item xs={12} sm={6} md={3}>
//             <Box sx={{display:"flex",flexDirection:"column",gap:"10px"}}>
//             <Typography variant="h6" gutterBottom>
//               Courses
//             </Typography>
//             <Box>
//               <Link href="/courses" color="inherit" underline="hover">
//                 Web Development
//               </Link>
//             </Box>
//             <Box>
//               <Link href="/courses" color="inherit" underline="hover">
//                 Data Science
//               </Link>
//             </Box>
//             <Box>
//               <Link href="/courses" color="inherit" underline="hover">
//                 Graphic Design
//               </Link>
//             </Box></Box>
//           </Grid>

//           {/* Column 3 */}
//           <Grid item xs={12} sm={6} md={3}>
//           <Box sx={{display:"flex",flexDirection:"column",gap:"10px"}}>
//             <Typography variant="h6" gutterBottom>
//               Support
//             </Typography>
//             <Box>
//               <Link href="/faq" color="inherit" underline="hover">
//                 FAQ
//               </Link>
//             </Box>
//             <Box>
//               <Link href="/contact" color="inherit" underline="hover">
//                 Contact Us
//               </Link>
//             </Box>
//             <Box>
//               <Link href="/terms" color="inherit" underline="hover">
//                 Terms of Service
//               </Link>
//             </Box></Box>
//           </Grid>

//           {/* Column 4 */}
//           <Grid item xs={12} sm={6} md={3}>
//           <Box sx={{display:"flex",flexDirection:"column",gap:"10px"}}>
//             <Typography variant="h6" gutterBottom>
//               Follow Us
//             </Typography>
//             <Box>
//               <Link href="https://facebook.com" color="inherit" underline="hover" target="_blank">
//                 Facebook
//               </Link>
//             </Box>
//             <Box>
//               <Link href="https://twitter.com" color="inherit" underline="hover" target="_blank">
//                 Twitter
//               </Link>
//             </Box>
//             <Box>
//               <Link href="https://instagram.com" color="inherit" underline="hover" target="_blank">
//                 Instagram
//               </Link>
//             </Box></Box>
//           </Grid>
//         </Grid>
//         <Typography variant="body2" align="center" sx={{ mt: 4 }}>
//           © {new Date().getFullYear()} Your Platform Name. All rights reserved.
//         </Typography>
//       </Container>
//     </Box>
//   );
// };

// export default Footer;


import React from "react";
import { Box, Typography, Grid, Link, Container, Divider } from "@mui/material";

const Footer = () => {
  return (
    <Box
      sx={{
        bgcolor: "#1A1A2E",
        color: "white",
        py: 5,
        mt: 8,
        width: "100%",
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {/* Column 1: About Us */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: "bold" }}>
              About Us ♟️
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.8 }}>
              Master Chess Classes is your ultimate destination to learn and
              master the art of chess. Our expert-led lessons and interactive
              practice sessions help players of all levels improve their game.
            </Typography>
          </Grid>

          {/* Column 2: Chess Courses */}
          <Grid item xs={12} sm={6} md={3}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              <Typography
                variant="h6"
                gutterBottom
                sx={{ fontWeight: "bold" }}
              >
                Chess Courses 📚
              </Typography>
              <Box>
                <Link href="/beginnerCoaching" color="inherit" underline="hover">
                  Beginner's Guide to Chess
                </Link>
              </Box>
              <Box>
                <Link href="/intermediateCoaching" color="inherit" underline="hover">
                  Advanced Strategies & Tactics
                </Link>
              </Box>
              <Box>
                <Link href="/advanceCoaching" color="inherit" underline="hover">
                  Mastering Endgames
                </Link>
              </Box>
            </Box>
          </Grid>

          {/* Column 3: Support */}
          <Grid item xs={12} sm={6} md={3}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              <Typography
                variant="h6"
                gutterBottom
                sx={{ fontWeight: "bold" }}
              >
                Support 🛠️
              </Typography>
              <Box>
                <Link 
                // href="/faq" 
                color="inherit" underline="hover">
                  FAQ
                </Link>
              </Box>
              <Box>
                <Link href="/contact" color="inherit" underline="hover">
                  Contact Support
                </Link>
              </Box>
              <Box>
                <Link 
                // href="/privacy" 
                color="inherit" underline="hover">
                  Privacy Policy
                </Link>
              </Box>
            </Box>
          </Grid>

          {/* Column 4: Follow Us */}
          <Grid item xs={12} sm={6} md={3}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              <Typography
                variant="h6"
                gutterBottom
                sx={{ fontWeight: "bold" }}
              >
                Follow Us 🔗
              </Typography>
              <Box>
                <Link
                  href="https://www.facebook.com/share/1BNhujttVc/"
                  color="inherit"
                  underline="hover"
                  target="_blank"
                >
                  Facebook
                </Link>
              </Box>
              <Box>
                <Link
                  href="https://www.linkedin.com/in/kunal-vyas-3a1329266?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
                  color="inherit"
                  underline="hover"
                  target="_blank"
                >
                  LinkedIn
                </Link>
              </Box>
              <Box>
                <Link
                  href="https://www.instagram.com/masterchessclasses?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
                  color="inherit"
                  underline="hover"
                  target="_blank"
                >
                  Instagram
                </Link>
              </Box>
              <Box>
                <Link
                  href="https://youtube.com/@masterchessclasses?si=szp2GXXRBFquQQz4"
                  color="inherit"
                  underline="hover"
                  target="_blank"
                >
                  YouTube
                </Link>
              </Box>
            </Box>
          </Grid>
        </Grid>

        {/* Divider */}
        <Divider sx={{ my: 4, bgcolor: "gray" }} />

        {/* Footer Bottom Section */}
        <Typography variant="body2" align="center" sx={{ opacity: 0.7 }}>
          © {new Date().getFullYear()} Master Chess Classes. All Rights Reserved.
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
