import React from "react";
import { Box, Typography, Button, Container } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";

const BlogDetails = () => {
  const { state: blog } = useLocation();
  const navigate = useNavigate();

  if (!blog) return <Typography>No blog found.</Typography>;

  return (
    <Container sx={{ py: 5, mt:8, width:'60%' }}>
      {/* Hero Section */}
      <Box
        sx={{
          backgroundImage: `url(${blog.image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "300px",
          borderRadius: 3,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
          textAlign: "center",
          p: 3,
          mb: 5,
        }}
      >
        
      </Box>

      {/* Blog Content */}
      <Typography variant="h3" fontWeight={700}>
          {blog.heading} {/* Ensure correct property is used */}
        </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 3, mt:5 }}>
        {blog.description}
      </Typography>

      {/* Back Button */}
      <Button
        variant="contained"
        color="primary"
        onClick={() => navigate(-1)}
        sx={{ mt: 2 }}
      >
        ← Back to Blogs
      </Button>
    </Container>
  );
};

export default BlogDetails;


