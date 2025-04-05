import React, { useEffect, useState } from "react";
import {
  Box,
  Toolbar,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Typography,
  IconButton,
  TextField,
  InputAdornment,
} from "@mui/material";
import {
  Delete as DeleteIcon,
  Search as SearchIcon,
} from "@mui/icons-material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function TestimonialVideo() {
  const [apiData, setApiData] = useState([]);
  const navigate = useNavigate();
  const userType = localStorage.getItem("userType");
  if (userType !== "admin") {
    navigate("/");
  }
  // Fetch testimonials
  const getData = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_ADMIN_URL}/testimonialVideo`
      );
      setApiData(response.data.testimonialVideo || []);
      //   setFilteredData(response.data.testimonials || []);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // Delete testimonial video

  const handleUserDelete = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(
            `${process.env.REACT_APP_BASE_ADMIN_URL}/testimonialVideo/${id}`
          );
          setApiData((prevData) => prevData.filter((item) => item._id !== id));
          Swal.fire("Deleted!", "Your testimonial has been deleted.", "success");
        } catch (error) {
          console.error("Error deleting testimonial:", error);
          Swal.fire("Error!", "Something went wrong.", "error");
        }
      }
    });
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <Box
      component="main"
      sx={{ flexGrow: 1, p: 3, bgcolor: "#E3F2FD", minHeight: "97vh" }}
    >
      <Toolbar />

      {/* Header Section */}
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        sx={{ marginBottom: "20px" }}
      >
        <Typography
          variant="h5"
          sx={{
            fontFamily: "'Poppins', sans-serif",
            fontWeight: 500,
            color: "#0D47A1",
          }}
        >
          Testimonial Management
        </Typography>
        <Button
          onClick={() => navigate("/admin/addTestimonialVideo")}
          variant="contained"
          color="primary"
        >
          Add Video
        </Button>
      </Box>


      {/* Table Section */}
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#1976D2", color: "white" }}>
              <TableCell
                align="center"
                sx={{ color: "white", fontWeight: 700 }}
              >
                Full Name
              </TableCell>
              <TableCell
                align="center"
                sx={{ color: "white", fontWeight: 700 }}
              >
                Video
              </TableCell>
              <TableCell
                align="center"
                sx={{ color: "white", fontWeight: 700 }}
              >
                Action
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {apiData.length > 0 ? (
              apiData.map((item) => (
                <TableRow key={item._id}>
                  <TableCell align="center">{item.name}</TableCell>
                  <TableCell align="center">{item.video}</TableCell>
                  <TableCell align="center">
                    <IconButton
                      color="error"
                      onClick={() => handleUserDelete(item._id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={3} align="center">
                  <Typography variant="body1" color="textSecondary">
                    No testimonials found
                  </Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
