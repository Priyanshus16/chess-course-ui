import React, { useState } from "react";
import { 
  Container,
  Grid,
  Card,
  CardMedia,
  Typography,
  Button,
  Box,
  Chip,
  Divider,
  Rating,
  Stack,
  Paper,
} from "@mui/material";
import { ShoppingCart, ArrowBack } from "@mui/icons-material";
import { useParams, useLocation, useNavigate } from "react-router-dom";

const ProductDetail = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const product = location.state?.product || null;
  
  const [showFull, setShowFull] = useState(false);
  const [value, setValue] = useState(4); // Rating value

  if (!product) {
    return (
      <Container maxWidth="md" sx={{ py: 4, textAlign: "center" }}>
        <Typography variant="h5" color="error">Product not found</Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Button 
        startIcon={<ArrowBack />} 
        onClick={() => navigate(-1)}
        sx={{ mb: 2 }}
      >
        Back to Products
      </Button>

      <Paper elevation={0} sx={{ p: 3, borderRadius: 2 }}>
        <Grid container spacing={4}>
          {/* Image Section */}
          <Grid item xs={12} md={6}>
            <Card sx={{ 
              p: 2, 
              boxShadow: 0,
              border: "1px solid #e0e0e0",
              borderRadius: 2,
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}>
              <CardMedia
                component="img"
                image={product.image}
                alt={product.heading}
                sx={{ 
                  maxWidth: '100%', 
                  maxHeight: 400,
                  objectFit: 'contain',
                  borderRadius: 1
                }}
              />
            </Card>
          </Grid>

          {/* Product Details */}
          <Grid item xs={12} md={6}>
            <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
              <Box sx={{ mb: 2 }}>
                <Chip 
                  label={product.category} 
                  size="small" 
                  sx={{ 
                    mb: 2,
                    backgroundColor: 'primary.light',
                    color: 'primary.contrastText'
                  }} 
                />
                
                <Typography 
                  variant="h4" 
                  component="h1" 
                  gutterBottom
                  sx={{ 
                    fontWeight: 700,
                    lineHeight: 1.2,
                    mb: 1.5
                  }}
                >
                  {product.heading}
                </Typography>
                
                <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 2 }}>
                  <Rating 
                    name="product-rating" 
                    value={value} 
                    precision={0.5} 
                    onChange={(event, newValue) => {
                      setValue(newValue);
                    }} 
                  />
                  <Typography variant="body2" color="text.secondary">
                    (24 reviews)
                  </Typography> 
                </Stack>

                <Typography 
                  variant="h4" 
                  color="primary" 
                  sx={{ 
                    fontWeight: 700, 
                    mb: 3,
                    fontSize: { xs: '1.8rem', sm: '2rem' }
                  }}
                >
                  ₹{product.price}
                  {product.originalPrice && (
                    <Typography 
                      component="span" 
                      variant="body1" 
                      color="text.secondary"
                      sx={{ 
                        textDecoration: 'line-through',
                        ml: 1
                      }}
                    >
                      ${product.originalPrice}
                    </Typography>
                  )}
                </Typography>

                <Typography 
                  variant="body1" 
                  color="text.secondary"
                  sx={{ mb: 3 }}
                >
                  {product.shortDescription || "High-quality product with premium features"}
                </Typography>

                <Stack direction="row" spacing={2} sx={{ mb: 3 }}>
                  <Button
                    variant="contained"
                    size="large"
                    href={product.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    startIcon={<ShoppingCart />}
                    sx={{ 
                      flex: 1,
                      py: 1.5,
                      fontWeight: 600
                    }}
                  >
                    Buy Now
                  </Button>
                  
                </Stack>

                <Divider sx={{ my: 3 }} />

                <Divider sx={{ my: 3 }} />

                {/* Product Description */}
                <Box>
                  <Typography variant="h6" sx={{ fontWeight: 600, mb: 1.5 }}>
                    Product Description
                  </Typography>
                  <Paper 
                    elevation={0}
                    sx={{ 
                      p: 2,
                      backgroundColor: 'background.paper',
                      borderRadius: 1,
                      mb: 2
                    }}
                  >
                    <Typography 
                      variant="body1" 
                      sx={{ 
                        maxHeight: showFull ? "none" : "120px", 
                        overflow: showFull ? "visible" : "hidden", 
                        textOverflow: "ellipsis",
                        whiteSpace: "pre-wrap",
                        textAlign: "left",
                        lineHeight: 1.6,
                        color: 'text.secondary'
                      }}
                    >
                      {product.description || "No description available."}
                    </Typography>
                  </Paper>

                  {product.description && product.description.length > 200 && (
                    <Button 
                      onClick={() => setShowFull(!showFull)} 
                      variant="text" 
                      color="primary"
                      size="small"
                    >
                      {showFull ? "Show Less" : "Read More"}
                    </Button>
                  )}
                </Box>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default ProductDetail;