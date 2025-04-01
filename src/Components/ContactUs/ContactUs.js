import React from "react";
import {
  Typography,
  Container,
  Grid,
  Paper,
  Divider,
  Box,
} from "@mui/material";
import ContactForm from "./ContactForm";

const ContactUs = () => {
  return (
    <Container
      sx={{
        mb: 8,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
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

      <Grid container spacing={4} sx={{ mt: 3, width: "100%" }}>

        {/* Form Component */}

        <Grid item xs={12} md={6}>
          <ContactForm />
        </Grid>
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
                Masterchessclasses@gmail.com
              </a>
            </Typography>
            <Typography variant="body1" color="text.primary" paragraph>
              <strong>Phone:</strong> +91 98934 58838
            </Typography>
            <Typography variant="body1" color="text.primary" paragraph>
              <strong>Address:</strong> Master Chess Classes, India
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