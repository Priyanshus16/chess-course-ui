import React from "react";
import {
  Typography,
  Container,
  Grid,
  TextField,
  Button,
  Paper,
  Divider,
  MenuItem,
  Box,
} from "@mui/material";

const ContactUs = () => {
  return (
    <Container
      sx={{
        mt: 8,
        mb: 8,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {/* Heading */}
      <Typography
        variant="h3"
        gutterBottom
        sx={{
          fontWeight: "bold",
          textAlign: "center",
          color: "#2E3B55",
          mt: 5,
        }}
      >
        Book Your Free Demo Class ♟️
      </Typography>
      <Typography
        variant="body1"
        color="text.secondary"
        paragraph
        sx={{ textAlign: "center", maxWidth: "600px" }}
      >
        Unlock your child's chess potential with expert coaching! 🚀 Experience
        a free trial session with Master Chess Classes and start your journey
        towards chess mastery today.
      </Typography>

      {/* Grid Layout */}
      <Grid container spacing={4} sx={{ mt: 3, width: "100%" }}>
        {/* Booking Form */}
        <Grid item xs={12} md={6}>
          <Paper elevation={4} sx={{ p: 4, borderRadius: "10px" }}>
            <Typography
              variant="h5"
              gutterBottom
              sx={{ fontWeight: "bold", color: "#1B5E20" }}
            >
              Book Your Demo Class 🎯
            </Typography>
            <Divider sx={{ mb: 3 }} />

            <TextField
              fullWidth
              label="Your Name"
              variant="outlined"
              margin="normal"
            />
            <TextField
              fullWidth
              label="WhatsApp Contact"
              variant="outlined"
              margin="normal"
              type="text"
            />
            <TextField
              fullWidth
              label="Email Address"
              variant="outlined"
              margin="normal"
            />
            <TextField
              fullWidth
              label="Your City"
              variant="outlined"
              margin="normal"
            />

            {/* Age Group & Preferred Language */}
            <Box sx={{ display: "flex", gap: 2 }}>
              <TextField
                fullWidth
                select
                label="Select Age Group"
                variant="outlined"
                margin="normal"
                sx={{ width: "50%" }}
              >
                <MenuItem value="5-7">5-7</MenuItem>
                <MenuItem value="8-10">8-10</MenuItem>
                <MenuItem value="11-15">11-15</MenuItem>
              </TextField>
              <TextField
                fullWidth
                select
                label="Preferred Language"
                variant="outlined"
                margin="normal"
                sx={{ width: "50%" }}
              >
                <MenuItem value="hindi">Hindi</MenuItem>
                <MenuItem value="english">English</MenuItem>
              </TextField>
            </Box>

            <Button
              variant="contained"
              color="success"
              sx={{
                mt: 2,
                width: "100%",
                fontSize: "1rem",
                fontWeight: "bold",
                textTransform: "none",
              }}
            >
              ✅ Book Now
            </Button>
          </Paper>
        </Grid>

        {/* Contact Information */}
        <Grid item xs={12} md={6}>
          <Paper
            elevation={4}
            sx={{ p: 4, borderRadius: "10px", backgroundColor: "#F4F6F8" }}
          >
            <Typography
              variant="h5"
              gutterBottom
              sx={{ fontWeight: "bold", color: "#1E88E5" }}
            >
              Contact Information 📞
            </Typography>
            <Divider sx={{ mb: 3 }} />
            <Typography variant="body1" color="text.primary" paragraph>
              <strong>Email:</strong>{" "}
              <a
                href="mailto:contact@masterchessclasses.com"
                style={{ textDecoration: "none", color: "#1E88E5" }}
              >
                contact@masterchessclasses.com
              </a>
            </Typography>
            <Typography variant="body1" color="text.primary" paragraph>
              <strong>Phone:</strong> +91 98765 43210
            </Typography>
            <Typography variant="body1" color="text.primary" paragraph>
              <strong>Address:</strong> Master Chess Academy, Chess Street,
              Mumbai, India 🇮🇳
            </Typography>
          </Paper>

          {/* Map */}
          <Box sx={{ mt: 3, borderRadius: "10px", overflow: "hidden" }}>
            <iframe
              title="Master Chess Academy Location"
              width="100%"
              height="280"
              style={{ border: 0, borderRadius: "10px" }}
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3770.6765672881894!2d72.87765541537891!3d19.072188857546515!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c6303f4f9b6d%3A0x1e74f19e97f5b0b2!2sMaster%20Chess%20Academy!5e0!3m2!1sen!2sin!4v1649422345678!5m2!1sen!2sin"
            ></iframe>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ContactUs;
