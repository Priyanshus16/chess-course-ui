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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  InputAdornment,
} from "@mui/material";
import {
  Add as AddIcon,
  Delete as DeleteIcon,
  Edit as EditIcon,
  Save as SaveIcon,
  Cancel as CancelIcon,
  Visibility as VisibilityIcon,
  Search as SearchIcon,
} from "@mui/icons-material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function Course() {
  const navigate = useNavigate();
  const [apiData, setApiData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [editRow, setEditRow] = useState(null);
  const [editedData, setEditedData] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_ADMIN_URL}/course`
      );
      setApiData(response.data.courses || []);
      setFilteredData(response.data.courses || []);
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };

  // Search functionality
  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredData(apiData);
    } else {
      const filtered = apiData.filter((course) =>
        course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (course.description && course.description.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (course.courseLevel && course.courseLevel.toLowerCase().includes(searchTerm.toLowerCase()))
      );
      setFilteredData(filtered);
    }
  }, [searchTerm, apiData]);

  const handleEdit = (item) => {
    setEditRow(item._id);
    setEditedData({ ...item });
  };

  const handleChange = (e, field) => {
    setEditedData({ ...editedData, [field]: e.target.value });
  };

  const handleSave = async (id) => {
    try {
      await axios.put(
        `${process.env.REACT_APP_BASE_ADMIN_URL}/course/${id}`,
        editedData
      );
      setApiData((prevData) =>
        prevData.map((item) => (item._id === id ? editedData : item))
      );
      setEditRow(null);
      Swal.fire("Success!", "Course updated successfully.", "success");
    } catch (error) {
      console.error("Error updating course:", error);
      Swal.fire("Error!", "Failed to update course.", "error");
    }
  };

  const handleCancel = () => {
    setEditRow(null);
  };

  const handleDeleteCourse = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        await axios.delete(
          `${process.env.REACT_APP_BASE_ADMIN_URL}/course/${id}`
        );
        setApiData((prevData) => prevData.filter((item) => item._id !== id));
        getData();
        Swal.fire("Deleted!", "Course has been deleted.", "success");
      } catch (error) {
        console.error("Error deleting course:", error);
        Swal.fire("Error!", "Failed to delete course.", "error");
      }
    }
  };

  const handleOpenModal = (course) => {
    setSelectedCourse(course);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedCourse(null);
  };

  const truncateText = (text, maxLength = 30) => {
    if (!text) return "";
    if (text.length <= maxLength) return text;
    return `${text.substring(0, maxLength)}...`;
  };

  return (
    <Box component="main" sx={{ flexGrow: 1, p: 3, bgcolor: "#E3F2FD", minHeight: "97vh" }}>
      <Toolbar />
      
      {/* Header Section */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px",
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
        
        <Box sx={{ display: "flex", gap: 2 }}>
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
            onClick={() => navigate("/admin/addCourses")}
          >
            Create Course
          </Button>
        </Box>
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
              {[
                "Title",
                "Description",
                "Duration",
                "Price",
                "Level",
                "Curriculum",
                "Image",
                "Actions",
              ].map((header) => (
                <TableCell
                  key={header}
                  align="center"
                  sx={{ color: "white", fontWeight: 700 }}
                >
                  {header}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredData.length > 0 ? (
              filteredData.map((item) => (
                <TableRow key={item._id} hover>
                  <TableCell align="center">
                    {editRow === item._id ? (
                      <TextField
                        value={editedData.title || ""}
                        onChange={(e) => handleChange(e, "title")}
                        size="small"
                        fullWidth
                      />
                    ) : (
                      truncateText(item.title, 25)
                    )}
                  </TableCell>
                  
                  <TableCell align="center">
                    {editRow === item._id ? (
                      <TextField
                        value={editedData.description || ""}
                        onChange={(e) => handleChange(e, "description")}
                        size="small"
                        multiline
                        rows={2}
                        fullWidth
                      />
                    ) : (
                      truncateText(item.description, 40)
                    )}
                  </TableCell>
                  
                  <TableCell align="center">
                    {editRow === item._id ? (
                      <TextField
                        value={editedData.duration || ""}
                        onChange={(e) => handleChange(e, "duration")}
                        size="small"
                        fullWidth
                      />
                    ) : (
                      item.duration
                    )}
                  </TableCell>
                  
                  <TableCell align="center">
                    {editRow === item._id ? (
                      <TextField
                        value={editedData.price || ""}
                        onChange={(e) => handleChange(e, "price")}
                        size="small"
                        fullWidth
                      />
                    ) : (
                      item.price
                    )}
                  </TableCell>
                  
                  <TableCell align="center">
                    {editRow === item._id ? (
                      <TextField
                        value={editedData.courseLevel || ""}
                        onChange={(e) => handleChange(e, "courseLevel")}
                        size="small"
                        fullWidth
                      />
                    ) : (
                      item.courseLevel
                    )}
                  </TableCell>
                  
                  <TableCell align="center">
                    {editRow === item._id ? (
                      <TextField
                        value={
                          editedData.curricullum
                            ? editedData.curricullum.join(", ")
                            : ""
                        }
                        onChange={(e) =>
                          setEditedData({
                            ...editedData,
                            curricullum: e.target.value.split(",").map(item => item.trim()),
                          })
                        }
                        size="small"
                        fullWidth
                      />
                    ) : (
                      truncateText(item.curricullum?.join(", ") || "", 30)
                    )}
                  </TableCell>
                  
                  <TableCell align="center">
                    <img
                      style={{ width: "60px", borderRadius: "5px" }}
                      src={item.image || "/default-course.jpg"}
                      alt={item.title || "Course"}
                    />
                  </TableCell>
                  
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
                          onClick={() => handleOpenModal(item)}
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
                          onClick={() => handleDeleteCourse(item._id)}
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
                <TableCell colSpan={8} align="center">
                  <Typography variant="body1" color="textSecondary">
                    No courses found
                  </Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Course View Modal */}
      <Dialog
        open={isModalOpen}
        onClose={handleCloseModal}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle sx={{ backgroundColor: "#1976D2", color: "white" }}>
          Course Details
        </DialogTitle>
        <DialogContent sx={{ p: 3 }}>
          {selectedCourse && (
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <Box sx={{ display: "flex", gap: 3, mb: 2 }}>
                <img
                  src={selectedCourse.image || "/default-course.jpg"}
                  alt={selectedCourse.title}
                  style={{
                    width: "150px",
                    height: "100px",
                    objectFit: "cover",
                    borderRadius: "8px",
                  }}
                />
                <Box>
                  <Typography variant="h6" gutterBottom>
                    {selectedCourse.title}
                  </Typography>
                  <Typography color="textSecondary">
                    Level: {selectedCourse.courseLevel}
                  </Typography>
                </Box>
              </Box>
              
              <Box>
                <Typography variant="subtitle1" fontWeight="bold">
                  Description:
                </Typography>
                <Typography paragraph>{selectedCourse.description}</Typography>
              </Box>
              
              <Box sx={{ display: "flex", gap: 4 }}>
                <Box>
                  <Typography variant="subtitle1" fontWeight="bold">
                    Duration:
                  </Typography>
                  <Typography>{selectedCourse.duration}</Typography>
                </Box>
                
                <Box>
                  <Typography variant="subtitle1" fontWeight="bold">
                    Price:
                  </Typography>
                  <Typography>{selectedCourse.price}</Typography>
                </Box>
              </Box>
              
              <Box>
                <Typography variant="subtitle1" fontWeight="bold">
                  Curriculum:
                </Typography>
                <ul style={{ marginTop: 0, paddingLeft: 20 }}>
                  {selectedCourse.curricullum?.map((item, index) => (
                    <li key={index}>
                      <Typography>{item}</Typography>
                    </li>
                  ))}
                </ul>
              </Box>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}