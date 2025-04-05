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
  Modal,
  InputAdornment,
} from "@mui/material";
import {
  Add as AddIcon,
  Delete as DeleteIcon,
  Save as SaveIcon,
  Edit as EditIcon,
  Cancel as CancelIcon,
  Search as SearchIcon,
  Visibility as VisibilityIcon,
  Close as CloseIcon,
} from "@mui/icons-material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// Modal style
const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "60%",
  maxWidth: 800,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
  maxHeight: "80vh",
  overflowY: "auto",
};

export default function Testimonial() {
  const [apiData, setApiData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [editRow, setEditRow] = useState(null);
  const [viewItem, setViewItem] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [editedData, setEditedData] = useState({});
  const navigate = useNavigate();
  const userType = localStorage.getItem("userType");
  if (userType !== "admin") {
    navigate("/");
  }
  // Fetch testimonials
  const getData = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_ADMIN_URL}/testimonials`
      );
      setApiData(response.data.testimonials || []);
      setFilteredData(response.data.testimonials || []);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // Search functionality
  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredData(apiData);
    } else {
      const filtered = apiData.filter(
        (item) =>
          (item.name &&
            item.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
          (item.achievement &&
            item.achievement
              .toLowerCase()
              .includes(searchTerm.toLowerCase())) ||
          (item.description &&
            item.description
              .toLowerCase()
              .includes(searchTerm.toLowerCase())) ||
          (item.course &&
            item.course.toLowerCase().includes(searchTerm.toLowerCase()))
      );
      setFilteredData(filtered);
    }
  }, [searchTerm, apiData]);

  // Handle edit button click
  const handleEdit = (item) => {
    setEditRow(item._id);
    setEditedData({ ...item });
  };

  // Handle input change in edit mode
  const handleChange = (e, field) => {
    setEditedData({ ...editedData, [field]: e.target.value });
  };

  // Save edited data
  const handleSave = async (id) => {
    try {
      await axios.put(
        `${process.env.REACT_APP_BASE_ADMIN_URL}/testimonials/${id}`,
        editedData
      );
      setApiData((prevData) =>
        prevData.map((item) => (item._id === id ? editedData : item))
      );
      setEditRow(null); // Exit edit mode
    } catch (error) {
      console.error("Error updating testimonial:", error);
    }
  };

  // Cancel editing
  const handleCancel = () => {
    setEditRow(null);
  };

  // Delete testimonial
  const handleUserDelete = async (id) => {
    try {
      await axios.delete(
        `${process.env.REACT_APP_BASE_ADMIN_URL}/testimonials/${id}`
      );
      setApiData((prevData) => prevData.filter((item) => item._id !== id));
      getData();
    } catch (error) {
      console.error("Error deleting testimonial:", error);
    }
  };

  // View details
  const handleViewDetails = (item) => {
    setViewItem(item);
    setOpenModal(true);
  };

  // Truncate text
  const truncateText = (text, maxLength = 30) => {
    if (!text) return "";
    if (text.length <= maxLength) return text;
    return `${text.substring(0, maxLength)}...`;
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
          onClick={() => navigate("/admin/addtestimonials")}
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
        >
          Create
        </Button>
      </Box>

      {/* Search Bar */}
      <Box sx={{ mb: 3 }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Search testimonials..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: 2,
              backgroundColor: "white",
            },
          }}
        />
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
                Achievement
              </TableCell>
              <TableCell
                align="center"
                sx={{ color: "white", fontWeight: 700 }}
              >
                Description
              </TableCell>
              <TableCell
                align="center"
                sx={{ color: "white", fontWeight: 700 }}
              >
                Course
              </TableCell>
              <TableCell
                align="center"
                sx={{ color: "white", fontWeight: 700 }}
              >
                Image
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
            {filteredData.length > 0 ? (
              filteredData.map((item) => (
                <TableRow key={item._id}>
                  {/* Full Name */}
                  <TableCell align="center">
                    {editRow === item._id ? (
                      <TextField
                        variant="outlined"
                        size="small"
                        value={editedData.name}
                        onChange={(e) => handleChange(e, "name")}
                      />
                    ) : (
                      truncateText(item.name, 20)
                    )}
                  </TableCell>

                  {/* Achievement */}
                  <TableCell align="center">
                    {editRow === item._id ? (
                      <TextField
                        variant="outlined"
                        size="small"
                        value={editedData.achievement}
                        onChange={(e) => handleChange(e, "achievement")}
                      />
                    ) : (
                      truncateText(item.achievement, 20)
                    )}
                  </TableCell>

                  {/* Description */}
                  <TableCell align="center">
                    {editRow === item._id ? (
                      <TextField
                        variant="outlined"
                        size="small"
                        value={editedData.description}
                        onChange={(e) => handleChange(e, "description")}
                        multiline
                        rows={2}
                      />
                    ) : (
                      truncateText(item.description, 40)
                    )}
                  </TableCell>

                  {/* Course */}
                  <TableCell align="center">
                    {editRow === item._id ? (
                      <TextField
                        variant="outlined"
                        size="small"
                        value={editedData.course}
                        onChange={(e) => handleChange(e, "course")}
                      />
                    ) : (
                      truncateText(item.course, 20)
                    )}
                  </TableCell>

                  {/* Image */}
                  <TableCell align="center">
                    <img
                      style={{ width: "60px", borderRadius: "5px" }}
                      src={item.image || "/default-placeholder.jpg"}
                      alt={item.name || "No Image"}
                    />
                  </TableCell>

                  {/* Actions */}
                  <TableCell align="center">
                    {editRow === item._id ? (
                      <>
                        <IconButton
                          color="success"
                          onClick={() => handleSave(item._id)}
                        >
                          <SaveIcon />
                        </IconButton>
                        <IconButton color="error" onClick={handleCancel}>
                          <CancelIcon />
                        </IconButton>
                      </>
                    ) : (
                      <>
                        <IconButton
                          color="info"
                          onClick={() => handleViewDetails(item)}
                        >
                          <VisibilityIcon />
                        </IconButton>
                        <IconButton
                          color="primary"
                          onClick={() => handleEdit(item)}
                        >
                          <EditIcon />
                        </IconButton>
                        <IconButton
                          color="error"
                          onClick={() => handleUserDelete(item._id)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </>
                    )}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  <Typography variant="body1" color="textSecondary">
                    No testimonials found
                  </Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* View Details Modal */}
      <Modal
        open={openModal}
        onClose={() => setOpenModal(false)}
        aria-labelledby="view-testimonial-modal"
        aria-describedby="view-testimonial-details"
      >
        <Box sx={modalStyle}>
          {viewItem && (
            <>
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                mb={3}
              >
                <Typography variant="h5" component="h2">
                  Testimonial Details
                </Typography>
                <IconButton onClick={() => setOpenModal(false)}>
                  <CloseIcon />
                </IconButton>
              </Box>

              <Box display="flex" mb={3}>
                <Box flex={1} mr={2}>
                  <Typography variant="subtitle1" fontWeight="bold">
                    Full Name:
                  </Typography>
                  <Typography variant="body1">{viewItem.name}</Typography>
                </Box>

                <Box flex={1}>
                  <Typography variant="subtitle1" fontWeight="bold">
                    Course:
                  </Typography>
                  <Typography variant="body1">{viewItem.course}</Typography>
                </Box>
              </Box>

              <Box mb={3}>
                <Typography variant="subtitle1" fontWeight="bold">
                  Achievement:
                </Typography>
                <Typography variant="body1">{viewItem.achievement}</Typography>
              </Box>

              <Box mb={3}>
                <Typography variant="subtitle1" fontWeight="bold">
                  Description:
                </Typography>
                <Typography variant="body1">{viewItem.description}</Typography>
              </Box>

              <Box>
                <Typography variant="subtitle1" fontWeight="bold">
                  Image:
                </Typography>
                <img
                  style={{
                    width: "150px",
                    borderRadius: "8px",
                    marginTop: "10px",
                  }}
                  src={viewItem.image || "/default-placeholder.jpg"}
                  alt={viewItem.name || "No Image"}
                />
              </Box>
            </>
          )}
        </Box>
      </Modal>
    </Box>
  );
}
