import React from "react";
import { Box, Typography, Button, Container } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";

const BlogDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const blog = location.state || {};

  if (!blog) return <Typography>No blog found.</Typography>;

  return (
    <Container
      sx={{
        py: 5,
        width: {
          xs: "100%", 
          sm: "90%", 
          md: "70%",
          lg: "60%",  
        },
      }}
    >
      <Typography
        variant="h4"
        fontWeight={700}
        sx={{ fontSize: { xs: "1.8rem", sm: "2.2rem", md: "2.5rem" } }}
      >
        {blog.heading}
      </Typography>

      {/* Hero Section */}
      <Box
        sx={{
          backgroundImage: `url(${blog.image || "/images/default-blog.jpg"})`,
          backgroundSize: "contain",
          backgroundPosition: "center",
          height: { xs: "200px", sm: "380px", md: "380px" },
          width:"100%",
          borderRadius: 3,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundRepeat: "no-repeat",
          color: "white",
          textAlign: "center",
          p: 3,
          mt: 5,
        }}
      ></Box>

      {/* Blog Content */}
      <Typography
        variant="body1"
        color="text.secondary"
        sx={{ mb: 3, mt: 5, fontSize: { xs: "0.95rem", sm: "1rem" } }}
      >
        {blog.description}
      </Typography>

      {/* Back Button */}
      <Button
        variant="contained"
        color="primary"
        onClick={() => navigate(-1)}
        sx={{ mt: 2 }}
        fullWidth={true}
      >
        ← Back to Blogs
      </Button>
    </Container>
  );
};

export default BlogDetails;
