import React from 'react';
import {
  Typography,
  Container,
  Grid,
  TextField,
  Button,
  Paper,
  Divider,
} from '@mui/material';

const ContactUs = () => {
  return (
    <Container sx={{ mt: 8, mb: 8 }}>
      <Typography variant="h3" gutterBottom align="center">
        Contact Us
      </Typography>
      <Typography variant="body1" color="text.secondary" paragraph align="center">
        Have questions or need help? Reach out to us using the form below, and we'll get back to you as soon as possible.
      </Typography>

      <Grid container spacing={4} sx={{ mt: 6 }}>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 4 }}>
            <Typography variant="h5" gutterBottom>
              Get in Touch
            </Typography>
            <Divider sx={{ mb: 3 }} />

            <TextField
              fullWidth
              label="Name"
              variant="outlined"
              margin="normal"
            />
            <TextField
              fullWidth
              label="Email"
              variant="outlined"
              margin="normal"
              type="email"
            />
            <TextField
              fullWidth
              label="Subject"
              variant="outlined"
              margin="normal"
            />
            <TextField
              fullWidth
              label="Message"
              variant="outlined"
              margin="normal"
              multiline
              rows={4}
            />
            <Button variant="contained" color="primary" sx={{ mt: 2 }}>
              Send Message
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
              <strong>Address:</strong> 123 Chess Avenue, Suite 456,  
              ChessCity, CC 12345, World
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ContactUs;
