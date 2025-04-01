import React from "react";
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
  Breadcrumbs,
  Link as MuiLink,
  Rating
} from "@mui/material";
import { Link } from "react-router-dom";
import { ShoppingCart, Favorite, Share } from "@mui/icons-material";
// import { products } from "./productData"; // Import your product data

const products = [
    {
      id: 1,
      name: "Tournament Chess Set",
      price: 49.99,
      rating: 4.5,
      image: "https://m.media-amazon.com/images/I/71yQd6Z4HaL._AC_UF1000,1000_QL80_.jpg",
      description: "Professional tournament chess set with 3.75\" king and weighted pieces. Includes vinyl board and storage box.",
      affiliateLink: "https://www.amazon.com/dp/B00004THCL",
      category: "Chess Sets",
      stock: 15
    },
    {
      id: 2,
      name: "Electronic Chess Computer",
      price: 129.99,
      rating: 4.2,
      image: "https://m.media-amazon.com/images/I/71YHjVXyR0L._AC_UF1000,1000_QL80_.jpg",
      description: "Advanced chess computer with 100+ difficulty levels, LCD display, and teaching functions.",
      affiliateLink: "https://www.amazon.com/dp/B08L5WR4G5",
      category: "Electronics",
      stock: 8
    },
    // Add more products as needed
  ];

const ProductDetail = ({ match }) => {
  const productId = parseInt(match.params.id);
  const product = products.find(p => p.id === productId);

  if (!product) {
    return (
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Typography variant="h5">Product not found</Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 3 }}>
        <MuiLink component={Link} to="/" color="inherit">
          Home
        </MuiLink>
        <MuiLink component={Link} to="/store" color="inherit">
          Chess Store
        </MuiLink>
        <Typography color="text.primary">{product.name}</Typography>
      </Breadcrumbs>

      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Card sx={{ p: 2 }}>
            <CardMedia
              component="img"
              image={product.image}
              alt={product.name}
              sx={{ width: '100%', height: 'auto', objectFit: 'contain' }}
            />
          </Card>
        </Grid>
        
        <Grid item xs={12} md={6}>
          <Box sx={{ mb: 2 }}>
            <Chip label={product.category} size="small" sx={{ mb: 1 }} />
            <Typography variant="h4" component="h1" gutterBottom>
              {product.name}
            </Typography>
            
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Rating value={product.rating} precision={0.5} readOnly />
              <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                {product.rating} Stars ({product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'})
              </Typography>
            </Box>
            
            <Typography variant="h4" color="primary" sx={{ fontWeight: 700, mb: 3 }}>
              ${product.price.toFixed(2)}
            </Typography>
            
            <Button
              variant="contained"
              size="large"
              component="a"
              href={product.affiliateLink}
              target="_blank"
              rel="noopener noreferrer"
              startIcon={<ShoppingCart />}
              sx={{ mb: 3 }}
              fullWidth
            >
              Buy Now on Amazon
            </Button>
            
            <Divider sx={{ my: 2 }} />
            
            <Typography variant="body1" paragraph>
              {product.description}
            </Typography>
            
            <Box sx={{ display: 'flex', gap: 1, mt: 2 }}>
              <Button variant="outlined" startIcon={<Favorite />}>
                Add to Wishlist
              </Button>
              <Button variant="outlined" startIcon={<Share />}>
                Share
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ProductDetail;