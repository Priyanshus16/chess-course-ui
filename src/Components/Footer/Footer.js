import React from "react";
import {
  Box,
  Typography,
  Grid,
  Link,
  Container,
  Divider,
  Stack,
} from "@mui/material";
import {
  Facebook,
  LinkedIn,
  Instagram,
  YouTube,
  Email,
} from "@mui/icons-material";
import logo from "../../Assets/Master Chess Classes Logo1.png.jpg";

const Footer = () => {
  return (
    <Box
      sx={{
        bgcolor: "#1A1A2E",
        color: "white",
        py: 6,
        width: "100%",
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {/* Column 1: Logo & Contact */}
          <Grid item xs={12} sm={6} md={3}>
            <Box sx={{ mb: 3 }}>
              <img
                src={logo}
                alt="Master Chess"
                style={{
                  width: "120px",
                  height: "auto",
                  borderRadius: "8px",
                }}
              />
            </Box>
            
          </Grid>

          {/* Column 2: About Us */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography
              variant="h6"
              gutterBottom
              sx={{
                fontWeight: 600,
                mb: 2,
                color: "#4FC3F7",
              }}
            >
              About Us
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.8, lineHeight: 1.6 }}>
              Master Chess Classes is your ultimate destination to learn and
              master the art of chess. Our expert-led lessons and interactive
              practice sessions help players of all levels improve their game.
            </Typography>
          </Grid>

          {/* Column 3: Courses */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography
              variant="h6"
              gutterBottom
              sx={{
                fontWeight: 600,
                mb: 2,
                color: "#4FC3F7",
              }}
            >
              Master Chess Coaching
            </Typography>
            <Stack spacing={1.5}>
              <Link
                href="/beginnerCoaching"
                color="inherit"
                underline="hover"
                sx={{ "&:hover": { color: "#4FC3F7" } }}
              >
                Beginner's Chess Coaching
              </Link>
              <Link
                href="/intermediateCoaching"
                color="inherit"
                underline="hover"
                sx={{ "&:hover": { color: "#4FC3F7" } }}
              >
                Intermediate Chess Coaching
              </Link>
              <Link
                href="/advanceCoaching"
                color="inherit"
                underline="hover"
                sx={{ "&:hover": { color: "#4FC3F7" } }}
              >
                Advance Chess Coaching
              </Link>
            </Stack>
          </Grid>

          {/* Column 4: Social Media */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography
              variant="h6"
              gutterBottom
              sx={{
                fontWeight: 600,
                mb: 2,
                color: "#4FC3F7",
              }}
            >
              Connect With Us
            </Typography>
            <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
              <Link
                href="https://www.facebook.com/share/1BNhujttVc/"
                target="_blank"
                sx={{ color: "white", "&:hover": { color: "#1877F2" } }}
              >
                <Facebook fontSize="large" />
              </Link>
              <Link
                href="https://www.linkedin.com/in/kunal-vyas-3a1329266"
                target="_blank"
                sx={{ color: "white", "&:hover": { color: "#0A66C2" } }}
              >
                <LinkedIn fontSize="large" />
              </Link>
              <Link
                href="https://www.instagram.com/masterchessclasses"
                target="_blank"
                sx={{ color: "white", "&:hover": { color: "#E4405F" } }}
              >
                <Instagram fontSize="large" />
              </Link>
              <Link
                href="https://youtube.com/@masterchessclasses"
                target="_blank"
                sx={{ color: "white", "&:hover": { color: "#FF0000" } }}
              >
                <YouTube fontSize="large" />
              </Link>
            </Stack>
            
            <Stack spacing={1.5}>
            <Typography variant="body2" sx={{ opacity: 0.8 }}>
              <strong>Address:</strong> Master Chess Classes, India
            </Typography>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                <Email fontSize="small" sx={{ color: "#4FC3F7" }} />
                <Typography variant="body2">
                  Masterchessclasses@gmail.com
                </Typography>
              </Box>
            </Stack>
          </Grid>
        </Grid>

        {/* Divider */}
        <Divider
          sx={{
            my: 4,
            bgcolor: "rgba(255,255,255,0.1)",
            height: "1px",
          }}
        />

        {/* Copyright */}
        <Typography
          variant="body2"
          align="center"
          sx={{
            opacity: 0.7,
            fontSize: "0.9rem",
          }}
        >
          © {new Date().getFullYear()} Master Chess Classes. All Rights
          Reserved.
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
