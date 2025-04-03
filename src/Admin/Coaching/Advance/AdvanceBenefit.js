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
} from "@mui/material";
import {
  Add as AddIcon,
  Delete as DeleteIcon,
  Edit as EditIcon,
  Save as SaveIcon,
  Close as CloseIcon,
  Visibility as VisibilityIcon,
  Search as SearchIcon,
} from "@mui/icons-material";
import InputAdornment from "@mui/material/InputAdornment";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function AdvanceBenefit() {
  const navigate = useNavigate();
  const [apiData, setApiData] = useState([]);
  const [editId, setEditId] = useState(null);
  const [editedData, setEditedData] = useState({ heading: "", description: "" });
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BASE_ADMIN_URL}/advanceBenefit`);
      console.log(response)
      setApiData(response.data.advanceCard);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleEdit = (item) => {
    setEditId(item._id);
    setEditedData({ heading: item.heading, description: item.description });
  };

  const handleSave = async (id) => {
    try {
      await axios.put(`${process.env.REACT_APP_BASE_ADMIN_URL}/advanceBenefit/${id}`, editedData);
      setApiData((prevData) =>
        prevData.map((item) => (item._id === id ? { ...item, ...editedData } : item))
      );
      setEditId(null);
    } catch (error) {
      console.error("Error updating blog:", error);
    }
  };

  const handleCancel = () => {
    setEditId(null);
    setEditedData({ heading: "", description: "" });
  };

  const handleChange = (e) => {
    setEditedData({ ...editedData, [e.target.name]: e.target.value });
  };

  const handleUserDelete = async (id) => {
    console.log(id)
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
        await axios.delete(`${process.env.REACT_APP_BASE_ADMIN_URL}/advanceBenefit/${id}`);
        setApiData((prevData) => prevData.filter((item) => item._id !== id));
      } catch (error) {
        console.error("Error deleting blog:", error);
      }
    }
  };

  const handleOpenModal = (blog) => {
    setSelectedBlog(blog);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedBlog(null);
  };

  const filteredBlogs = apiData.filter((blog) =>
    blog.heading.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Box component="main" sx={{ flexGrow: 1, p: 3, bgcolor: "#E3F2FD", height: "97vh" }}>
      <Toolbar />
      <Box display="flex" justifyContent="space-between" alignItems="center" sx={{ marginBottom: "20px" }}>
        <Typography variant="h5" sx={{ fontFamily: "'Poppins', sans-serif", fontWeight: 500, color: "#0D47A1" }}>
          advance Cards Management
        </Typography>
        <Button variant="contained" color="primary" startIcon={<AddIcon />} onClick={() => navigate("/admin/addAdvanceBenefit")}>
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

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#1976D2", color: "white" }}>
              <TableCell align="center" sx={{ color: "white",  fontWeight: 700 }}>Heading</TableCell>
              <TableCell align="center" sx={{ color: "white", fontWeight: 700 }}>Description</TableCell>
              <TableCell align="center" sx={{ color: "white", fontWeight: 700 }}>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredBlogs.map((item) => (
              <TableRow key={item._id}>
                <TableCell align="center">
                  {editId === item._id ? (
                    <TextField name="heading" value={editedData.heading} onChange={handleChange} fullWidth />
                  ) : (
                    item.heading
                  )}
                </TableCell>
                <TableCell align="center">
                  {editId === item._id ? (
                    <TextField name="description" value={editedData.description} onChange={handleChange} fullWidth />
                  ) : (
                    item.description.substring(0, 50) + "..."
                  )}
                </TableCell>
                <TableCell align="center">
                  {editId === item._id ? (
                    <>
                      <IconButton color="primary" onClick={() => handleSave(item._id)}>
                        <SaveIcon />
                      </IconButton>
                      <IconButton color="secondary" onClick={handleCancel}>
                        <CloseIcon />
                      </IconButton>
                    </>
                  ) : (
                    <>
                      <IconButton color="primary" onClick={() => handleEdit(item)}>
                        <EditIcon />
                      </IconButton>
                      <IconButton color="info" onClick={() => handleOpenModal(item)}>
                        <VisibilityIcon />
                      </IconButton>
                      <IconButton color="error" onClick={() => handleUserDelete(item._id)}>
                        <DeleteIcon />
                      </IconButton>
                      
                    </>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {selectedBlog && (
        <Dialog open={isModalOpen} onClose={handleCloseModal}>
          <DialogTitle>{selectedBlog.heading}</DialogTitle>
          <DialogContent>
            <Typography>{selectedBlog.description}</Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseModal}>Close</Button>   
          </DialogActions>
        </Dialog>
      )}
    </Box>
  );
}