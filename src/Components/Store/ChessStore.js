import React, { useEffect, useState } from "react";
import {
  Container,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  Box,
} from "@mui/material";
import { ShoppingCart } from "@mui/icons-material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ChessStore = () => {
  const [products, setProducts] = useState([]);
  const [visibleCount, setVisibleCount] = useState(16); // Initial count

  const getData = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/store`);
      setProducts(res.data.items);
    } catch (error) {
      console.error("Problem while fetching data");
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      {/* Store Header */}
      <Box sx={{ textAlign: "center", mb: 5 }}>
        <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 700 }}>
          Master Chess Classes Store
        </Typography>
      </Box>

      {/* Product Grid */}
      <Grid container spacing={4}>
        {products.slice(0, visibleCount).map((product) => (
          <Grid item key={product._id} xs={12} sm={6} md={4} lg={3}>
            <ProductCard product={product} id={product._id} />
          </Grid>
        ))}
      </Grid>

      {/* Show More Button */}
      {products.length > visibleCount && (
        <Box sx={{ textAlign: "center", mt: 4 }}>
          <Button
            variant="contained"
            onClick={() => setVisibleCount((prev) => prev + 16)}
          >
            Show More
          </Button>
        </Box>
      )}
    </Container>
  );
};

// Product Card Component
const ProductCard = ({ product, id }) => {
  const navigate = useNavigate();
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
        alt={product.heading}
        sx={{ objectFit: "contain", p: 2, bgcolor: "#f5f5f5" }}
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography gutterBottom variant="h6" component="h3">
          {product.heading}
        </Typography>
      </CardContent>

      <Box sx={{ p: 2, pt: 0 }}>
        <Button
          onClick={() => {
            navigate(`/store/productDetail/${id}`, { state: { product: product } });
          }}
          variant="contained"
          fullWidth
          startIcon={<ShoppingCart />}
          sx={{ mb: 1 }}
        >
          See Detail
        </Button>
      </Box>
    </Card>
  );
};

export default ChessStore;

