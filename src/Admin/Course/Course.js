import React, { useEffect, useState } from "react";
import {
  Box,
  Toolbar,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  IconButton,
} from "@mui/material";
import { Add as AddIcon, Delete as DeleteIcon } from "@mui/icons-material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Course() {
  const navigate = useNavigate();
  const [apiData, setApiData] = useState([]);

  const getData = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_ADMIN_URL}/course`
      );
      setApiData(response.data.courses);
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(
        `${process.env.REACT_APP_BASE_ADMIN_URL}/course/${id}`
      );
      setApiData((prevData) => prevData.filter((item) => item._id !== id));

    } catch (error) {
      console.error("Error deleting course:", error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <Box
      component="main"
      sx={{ flexGrow: 1, p: 3, bgcolor: "#E3F2FD", height: "97vh" }}
    >
      <Toolbar />
      <TableContainer
        component={Paper}
        sx={{ marginTop: "20px", padding: "10px" }}
      >
        {/* Header Section */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "10px 16px",
          }}
        >
          <Typography
            variant="h5"
            sx={{
              fontFamily: "'Poppins', sans-serif",
              fontWeight: 600,
              color: "#0D47A1",
            }}
          >
            Course Management
          </Typography>
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
            onClick={() => navigate("/admin/addCourses")}
          >
            Create Course
          </Button>
        </Box>

        <Table sx={{ minWidth: 650 }} aria-label="course table">
          <TableHead>
            <TableRow sx={{ backgroundColor: "#1976D2" }}>
              <TableCell
                align="center"
                sx={{ color: "white", fontWeight: 600 }}
              >
                Title
              </TableCell>
              <TableCell
                align="center"
                sx={{ color: "white", fontWeight: 600 }}
              >
                Description
              </TableCell>
              <TableCell
                align="center"
                sx={{ color: "white", fontWeight: 600 }}
              >
                Curricullum
              </TableCell>
              <TableCell
                align="center"
                sx={{ color: "white", fontWeight: 600 }}
              >
                Duration
              </TableCell>
              <TableCell
                align="center"
                sx={{ color: "white", fontWeight: 600 }}
              >
                Price
              </TableCell>
              <TableCell
                align="center"
                sx={{ color: "white", fontWeight: 600 }}
              >
                Level
              </TableCell>
              <TableCell
                align="center"
                sx={{ color: "white", fontWeight: 600 }}
              >
                Image
              </TableCell>
              <TableCell
                align="center"
                sx={{ color: "white", fontWeight: 600 }}
              >
                Actions
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {apiData.map((item) => (
              <TableRow key={item._id} hover>
                <TableCell align="center">{item.title}</TableCell>
                <TableCell align="center">{item.description}</TableCell>
                <TableCell align="center">
                  {item.curricullum.map((point, index) => (
                    <Typography key={index} variant="body2">
                      {point}
                    </Typography>
                  ))}
                </TableCell>
                <TableCell align="center">{item.duration}</TableCell>
                <TableCell align="center">{item.price}</TableCell>
                <TableCell align="center">{item.courseLevel}</TableCell>
                <TableCell align="center">
                  <img
                    style={{ width: "60px", borderRadius: "5px" }}
                    src={item.image}
                    alt="Course"
                  />
                </TableCell>
                <TableCell align="center">
                  <IconButton
                    color="error"
                    onClick={() => handleDelete(item._id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
