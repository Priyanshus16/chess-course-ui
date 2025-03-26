import React from "react";
import {
  Box,
  Typography,
  Button,
  Grid,
  Card,
  CardMedia,
  CardContent,
} from "@mui/material";

const Maincontent = () => {
  return (
    <Box sx={{ marginTop: "80px", width: "100%", padding: 2 }}>
      <Grid container spacing={4} alignItems="center">
        {/* Image Section */}
        <Grid
          item
          xs={12}
          md={6}
          display="flex"
          justifyContent={{ xs: "center", md: "flex-start" }}
        >
          <Card sx={{ boxShadow: 3, maxWidth: "400px" }}>
            <CardMedia
              component="img"
              alt="Chess Award Ceremony"
              image="https://via.placeholder.com/400x300"
            />
            <CardContent>
              <Typography variant="body1" fontWeight="bold">
                My Chess Learning Student Prem Kumar Selected for Bihar State
                SGFI U-17 Boys Tournament at Samrat Ashok Bhavan, Kishanganj
                with an Impressive 6.5/7 Score (17/10/2024)
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Description Section */}
        <Grid item xs={12} md={6}>
          <Typography
            variant="h5"
            fontWeight="bold"
            mb={2}
            textAlign={{ xs: "center", md: "left" }}
          >
            My Chess Learning: Discover the World of Chess
          </Typography>
          <Typography
            variant="body1"
            mb={2}
            textAlign={{ xs: "center", md: "left" }}
          >
            Established on 10/4/2018, My Chess Learning is a premier Chess
            Academy located in Bavdhan, Pune. Founded and led by Mr. Himanshu
            Chhabra, a certified Chess Trainer and accomplished player in
            National and State Level Tournaments.
          </Typography>
          <Typography
            variant="body1"
            mb={2}
            textAlign={{ xs: "center", md: "left" }}
          >
            He emerged as the Vidarbha Champion in the under-19 Chess Tournament
            and was a Runner-up in the All India Fide Rating Tournament held in
            Ahmedabad.
          </Typography>
          <Typography
            variant="body1"
            mb={4}
            textAlign={{ xs: "center", md: "left" }}
          >
            Additionally, Mr. Chhabra represented SGBU in the All India
            Inter-University Chess Tournament for three consecutive years
            (2013-2015). With a passion for Chess since his school days, he aims
            to promote Chess and support aspiring champions in their journey.
          </Typography>
          <Box
            display="flex"
            justifyContent={{ xs: "center", md: "flex-start" }}
          >
            <Button variant="contained" color="primary" size="large">
              BOOK YOUR FREE DEMO NOW
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Maincontent;
