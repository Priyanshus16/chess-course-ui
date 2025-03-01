import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";

const BlogDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const blog = location.state;

  if (!blog) return <Typography>No blog found.</Typography>;

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>{blog.title}</Typography>
      <Typography variant="body1" sx={{ mb: 3 }}>{blog.longDesc}</Typography>
      <Button variant="contained" onClick={() => navigate(-1)}>Back</Button>
    </Box>
  );
};

export default BlogDetails;
