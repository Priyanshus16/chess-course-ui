import React from "react";
import {
  Container,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  Box,
  Chip,
  Breadcrumbs,
  Link as MuiLink,
} from "@mui/material";
import { Link } from "react-router-dom";
import { ShoppingCart, Favorite, Share } from "@mui/icons-material";

const products = [
    {
      id: 1,
      name: "Tournament Chess Set - Staunton Style",
      price: 59.99,
      rating: 4.7,
      image: "https://m.media-amazon.com/images/I/71yQd6Z4HaL._AC_UF1000,1000_QL80_.jpg",
      description: "Professional 3.75\" tournament chess set with weighted pieces and roll-up vinyl board. FIDE approved for tournament play.",
      affiliateLink: "https://www.amazon.com/dp/B00004THCL",
      category: "Chess Sets",
      stock: 18,
      brand: "House of Staunton"
    },
    {
      id: 2,
      name: "Electronic Chess Trainer - 300 Levels",
      price: 129.99,
      rating: 4.3,
      image: "https://m.media-amazon.com/images/I/71YHjVXyR0L._AC_UF1000,1000_QL80_.jpg",
      description: "Interactive chess computer with 300 difficulty levels, LCD display, and built-in tutorials. Perfect for all skill levels.",
      affiliateLink: "https://www.amazon.com/dp/B08L5WR4G5",
      category: "Electronics",
      stock: 7,
      brand: "ChessGenius"
    },
    {
      id: 3,
      name: "My System by Aron Nimzowitsch",
      price: 14.95,
      rating: 4.8,
      image: "https://m.media-amazon.com/images/I/91KOKeFVhDL._AC_UF1000,1000_QL80_.jpg",
      description: "The classic chess strategy book covering prophylaxis, pawn structure, and positional play. Essential for intermediate players.",
      affiliateLink: "https://www.amazon.com/dp/0486204936",
      category: "Books",
      stock: 32,
      brand: "Dover Publications"
    },
    {
      id: 4,
      name: "Walnut & Maple Wood Chess Board",
      price: 89.99,
      rating: 4.6,
      image: "https://m.media-amazon.com/images/I/71yQZ4XyJ9L._AC_UF1000,1000_QL80_.jpg",
      description: "Handcrafted 2.25\" square chess board with walnut and maple inlays. Foldable design with storage compartment.",
      affiliateLink: "https://www.amazon.com/dp/B001DT1X9O",
      category: "Boards",
      stock: 5,
      brand: "ChessBaron"
    },
    {
      id: 5,
      name: "Magnetic Travel Chess Set",
      price: 24.99,
      rating: 4.4,
      image: "https://m.media-amazon.com/images/I/81lZ+2+9mZL._AC_UF1000,1000_QL80_.jpg",
      description: "Portable magnetic chess set with 2\" pieces. Folds to 10x5 inches - perfect for trips and commutes.",
      affiliateLink: "https://www.amazon.com/dp/B0006N8X5G",
      category: "Travel",
      stock: 22,
      brand: "Wholesale Chess"
    },
    {
      id: 6,
      name: "DGT Bluetooth Electronic Chess Board",
      price: 349.99,
      rating: 4.5,
      image: "https://m.media-amazon.com/images/I/71Jk9WgXJkL._AC_UF1000,1000_QL80_.jpg",
      description: "Smart chess board that connects to chess apps via Bluetooth. Tracks moves automatically for analysis.",
      affiliateLink: "https://www.amazon.com/dp/B01N6QJ58Y",
      category: "Electronics",
      stock: 3,
      brand: "DGT"
    },
    {
      id: 7,
      name: "Chess Clock - Tournament Dual Timer",
      price: 39.95,
      rating: 4.6,
      image: "https://m.media-amazon.com/images/I/71YHjVXyR0L._AC_UF1000,1000_QL80_.jpg",
      description: "Professional digital chess clock with multiple time controls. Perfect for tournaments and casual play.",
      affiliateLink: "https://www.amazon.com/dp/B000J3DN22",
      category: "Accessories",
      stock: 14,
      brand: "DGT"
    },
    {
      id: 8,
      name: "Silicon Chess Pieces - 4\" King",
      price: 29.99,
      rating: 4.2,
      image: "https://m.media-amazon.com/images/I/71eQwVWZ3RL._AC_UF1000,1000_QL80_.jpg",
      description: "Durable silicone chess pieces with weighted bases. 4\" king height with felt bottoms to protect boards.",
      affiliateLink: "https://www.amazon.com/dp/B08K3S8JXH",
      category: "Pieces",
      stock: 9,
      brand: "ChessHouse"
    },
    {
      id: 9,
      name: "Chess Strategy for Club Players",
      price: 22.95,
      rating: 4.7,
      image: "https://m.media-amazon.com/images/I/81Z+5+6JmFL._AC_UF1000,1000_QL80_.jpg",
      description: "Comprehensive guide to positional play and strategic planning by GM Herman Grooten.",
      affiliateLink: "https://www.amazon.com/dp/9056913665",
      category: "Books",
      stock: 11,
      brand: "New In Chess"
    },
    {
      id: 10,
      name: "Luxury Leather Chess Case",
      price: 79.99,
      rating: 4.3,
      image: "https://m.media-amazon.com/images/I/71Jk9WgXJkL._AC_UF1000,1000_QL80_.jpg",
      description: "Premium leather carrying case for tournament chess pieces. Fits up to 4.5\" king size pieces.",
      affiliateLink: "https://www.amazon.com/dp/B08L5XZJ6H",
      category: "Accessories",
      stock: 6,
      brand: "ChessBaron"
    },
    {
      id: 11,
      name: "Giant Outdoor Chess Set (20\" King)",
      price: 199.99,
      rating: 4.4,
      image: "https://m.media-amazon.com/images/I/81lZ+2+9mZL._AC_UF1000,1000_QL80_.jpg",
      description: "Weather-resistant outdoor chess set with 20\" tall pieces and 3'x3' vinyl mat. Perfect for parks and gardens.",
      affiliateLink: "https://www.amazon.com/dp/B08K3T7JXH",
      category: "Outdoor",
      stock: 4,
      brand: "Backyard Chess"
    },
    {
      id: 12,
      name: "Chess Puzzle Book - 1001 Exercises",
      price: 18.95,
      rating: 4.9,
      image: "https://m.media-amazon.com/images/I/91KOKeFVhDL._AC_UF1000,1000_QL80_.jpg",
      description: "Collection of 1001 chess puzzles from real games. Organized by difficulty from beginner to advanced.",
      affiliateLink: "https://www.amazon.com/dp/1906454400",
      category: "Books",
      stock: 25,
      brand: "Everyman Chess"
    }
  ];

const ChessStore = () => {
  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      {/* Store Header */}
      <Box sx={{ textAlign: "center", mb: 5 }}>
        <Typography
          variant="h3"
          component="h1"
          gutterBottom
          sx={{ fontWeight: 700 }}
        >
          Master Chess Coaching Store
        </Typography>
      </Box>

      {/* Product Grid */}
      <Grid container spacing={4}>
        {products.map((product) => (
          <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
            <ProductCard product={product} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

// Product Card Component
const ProductCard = ({ product }) => {
  return (
    <Card
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        transition: "transform 0.3s, box-shadow 0.3s",
        "&:hover": {
          transform: "translateY(-5px)",
          boxShadow: "0 10px 20px rgba(0,0,0,0.1)",
        },
      }}
    >
      <CardMedia
        component="img"
        height="200"
        image={product.image}
        alt={product.name}
        sx={{ objectFit: "contain", p: 2, bgcolor: "#f5f5f5" }}
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography gutterBottom variant="h6" component="h3">
          {product.name}
        </Typography>

      </CardContent>

      <Box sx={{ p: 2, pt: 0 }}>
        <Button
          variant="contained"
          fullWidth
          component="a"
          href={product.affiliateLink}
          target="_blank"
          rel="noopener noreferrer"
          startIcon={<ShoppingCart />}
          sx={{ mb: 1 }}
        >
          Buy Now
        </Button>

      </Box>
    </Card>
  );
};

export default ChessStore;
