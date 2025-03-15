// import React from "react";
// import { Box, Typography, Button } from "@mui/material";
// import { useLocation, useNavigate } from "react-router-dom";

// const BlogDetails = () => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const blog = location.state;

//   if (!blog) return <Typography>No blog found.</Typography>;

//   return (
//     <Box sx={{ p: 4 }}>
//       <Typography variant="h4" gutterBottom>{blog.title}</Typography>
//       <Typography variant="body1" sx={{ mb: 3 }}>{blog.longDesc}</Typography>
//       <Button variant="contained" onClick={() => navigate(-1)}>Back</Button>
//     </Box>
//   );
// };

// export default BlogDetails;


import React from "react";
import { Box, Typography, Button, Container } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";

const BlogDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const blog = location.state;

  if (!blog) return <Typography>No blog found.</Typography>;

  return (
    <Container sx={{ py: 5 }}>
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
        <Typography variant="h3" fontWeight={700}>
          {blog.title}
        </Typography>
      </Box>

      {/* Blog Content */}
      <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
        {blog.longDesc}
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

