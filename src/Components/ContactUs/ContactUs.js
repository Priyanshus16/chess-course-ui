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
  Box
} from "@mui/material";

const ContactUs = () => {
  return (
    <Container sx={{ mt: 8, mb: 8 }}>
      <Typography sx={{ mt: 5 }} variant="h3" gutterBottom align="center">
        Book Your Free Demo Class
      </Typography>
      {/* <Typography
        variant="body1"
        color="text.secondary"
        paragraph
        align="center"
      >
        Have questions or need help? Reach out to us using the form below, and
        we'll get back to you as soon as possible.
      </Typography> */}

      <Grid container spacing={4} sx={{ mt: 3 }}>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 4 }}>
            <Typography variant="h5" gutterBottom>
              Book Your Demo Class
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
              label="Whatsapp Contact"
              variant="outlined"
              margin="normal"
              type="email"
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

            <Button variant="contained" color="primary" sx={{ mt: 2 }}>
              Book Now
            </Button>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 4 }}>
            <Typography variant="h5" gutterBottom>
              Contact Information
            </Typography>
            <Divider sx={{ mb: 3 }} />

            <Typography variant="body1" color="text.secondary" paragraph>
              <strong>Email:</strong> support@mychesslearning.com
            </Typography>
            <Typography variant="body1" color="text.secondary" paragraph>
              <strong>Phone:</strong> +1 234 567 890
            </Typography>
            <Typography variant="body1" color="text.secondary" paragraph>
              <strong>Address:</strong> 123 Chess Avenue, Suite 456, ChessCity,
              CC 12345, World
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ContactUs;
