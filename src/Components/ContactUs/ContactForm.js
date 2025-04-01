import React, { useState } from "react";
import axios from "axios";
import {
  TextField,
  Button,
  Divider,
  MenuItem,
  Box,
  Typography,
  Paper,
} from "@mui/material";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    email: "",
    city: "",
    ageGroup: "",
    language: "",
    device: "",
  });

  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Sending...");

    try {
      await axios.post(
        `${process.env.REACT_APP_BASE_URL}/send-email`,
        formData
      );
      setStatus("✅ Email sent successfully!");
    } catch (error) {
      setStatus("❌ Failed to send email. Try again.");
    }
  };

  return (
    <Paper elevation={4} sx={{ p: 4, borderRadius: "10px" }}>
      <Typography
        variant="h5"
        gutterBottom
        sx={{ fontWeight: "bold", color: "#1B5E20" }}
      >
        Book Your Demo Class 🎯
      </Typography>
      <Divider sx={{ mb: 3 }} />

      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Your Name"
          name="name"
          variant="outlined"
          margin="normal"
          onChange={handleChange}
          required
        />
        <TextField
          fullWidth
          label="WhatsApp Contact"
          name="contact"
          variant="outlined"
          margin="normal"
          onChange={handleChange}
          required
        />
        <TextField
          fullWidth
          label="Email Address"
          name="email"
          variant="outlined"
          margin="normal"
          onChange={handleChange}
          required
        />
        <Box sx={{ display: "flex", gap: 2 }}>
          <TextField
            fullWidth
            label="Your City"
            name="city"
            variant="outlined"
            margin="normal"
            onChange={handleChange}
            required
          />

          <TextField
            fullWidth
            select
            label="Select Your Device"
            name="device"
            variant="outlined"
            margin="normal"
            onChange={handleChange}
            required
          >
            <MenuItem value="laptop">Laptop</MenuItem>
            <MenuItem value="desktop">Desktop</MenuItem>
            <MenuItem value="tab">Tablet</MenuItem>
          </TextField>
        </Box>

        <Box sx={{ display: "flex", gap: 2 }}>
          <TextField
            fullWidth
            select
            label="Select Age Group"
            name="ageGroup"
            variant="outlined"
            margin="normal"
            onChange={handleChange}
            required
          >
            <MenuItem value="5-7">5-7</MenuItem>
            <MenuItem value="8-10">8-10</MenuItem>
            <MenuItem value="11-15">11-15</MenuItem>
          </TextField>
          <TextField
            fullWidth
            select
            label="Preferred Language"
            name="language"
            variant="outlined"
            margin="normal"
            onChange={handleChange}
            required
          >
            <MenuItem value="hindi">Hindi</MenuItem>
            <MenuItem value="english">English</MenuItem>
          </TextField>
        </Box>

        <Button
          type="submit"
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
      </form>

      {status && (
        <Typography
          variant="body2"
          sx={{ mt: 2, color: "red", textAlign: "center" }}
        >
          {status}
        </Typography>
      )}
    </Paper>
  );
};

export default ContactForm;
