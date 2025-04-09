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
  useMediaQuery,
  useTheme,
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

export default function Store() {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm")); // < 600px
  const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md")); // 600px–960px

  const [apiData, setApiData] = useState([]);
  const [editId, setEditId] = useState(null);
  const [editedData, setEditedData] = useState({
    heading: "",
    description: "",
    shortDescription: "",
    category: "",
    price: "",
    link: "",
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BASE_ADMIN_URL}/store`);
      setApiData(response.data.item || []);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleEdit = (item) => {
    setEditId(item._id);
    setEditedData({
      heading: item.heading,
      description: item.description,
      shortDescription: item.shortDescription,
      category: item.category,
      price: item.price,
      link: item.link,
    });
  };

  const handleSave = async (id) => {
    try {
      await axios.put(`${process.env.REACT_APP_BASE_ADMIN_URL}/store/${id}`, editedData);
      setApiData((prevData) =>
        prevData.map((item) => (item._id === id ? { ...item, ...editedData } : item))
      );
      setEditId(null);
      Swal.fire("Success!", "Item updated successfully.", "success");
    } catch (error) {
      console.error("Error updating item:", error);
      Swal.fire("Error!", "Failed to update item.", "error");
    }
  };

  const handleCancel = () => {
    setEditId(null);
    setEditedData({
      heading: "",
      description: "",
      shortDescription: "",
      category: "",
      price: "",
      link: "",
    });
  };

  const handleChange = (e) => {
    setEditedData({ ...editedData, [e.target.name]: e.target.value });
  };

  const handleUserDelete = async (id) => {
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
        await axios.delete(`${process.env.REACT_APP_BASE_ADMIN_URL}/store/${id}`);
        setApiData((prevData) => prevData.filter((item) => item._id !== id));
        Swal.fire("Deleted!", "Item has been deleted.", "success");
      } catch (error) {
        console.error("Error deleting item:", error);
        Swal.fire("Error!", "Failed to delete item.", "error");
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

  const truncateText = (text, maxLength = isMobile ? 20 : isTablet ? 30 : 50) => {
    if (!text) return "N/A";
    if (text.length <= maxLength) return text;
    return `${text.substring(0, maxLength)}...`;
  };

  return (
    <Box
      component="main"
      sx={{ flexGrow: 1, p: { xs: 1, sm: 2, md: 3 }, bgcolor: "#E3F2FD", minHeight: "100vh" }}
    >
      <Toolbar />

      {/* Header Section */}
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          justifyContent: "space-between",
          alignItems: { xs: "flex-start", sm: "center" },
          mb: { xs: 2, sm: 3 },
          gap: { xs: 1, sm: 0 },
        }}
      >
        <Typography
          variant={isMobile ? "h6" : "h5"}
          sx={{
            fontFamily: "'Poppins', sans-serif",
            fontWeight: 500,
            color: "#0D47A1",
            fontSize: { xs: "1.25rem", sm: "1.5rem", md: "1.75rem" },
          }}
        >
          Store Management
        </Typography>
        <Button
          variant="contained"
          color="primary"
          size={isMobile ? "small" : "medium"}
          startIcon={<AddIcon />}
          onClick={() => navigate("/admin/addItem")}
        >
          Create
        </Button>
      </Box>

      {/* Search Bar */}
      <Box sx={{ mb: { xs: 2, sm: 3 } }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Search store items..."
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
              fontSize: { xs: "0.9rem", sm: "1rem" },
            },
          }}
        />
      </Box>

      {/* Content Display */}
      {isMobile ? (
        // Mobile: Card layout
        <Box sx={{ display: "flex", flexDirection: "column", gap: { xs: 1.5, sm: 2 } }}>
          {filteredBlogs.length > 0 ? (
            filteredBlogs.map((item) => (
              <Paper
                key={item._id}
                sx={{ p: { xs: 1.5, sm: 2 }, borderRadius: 2, bgcolor: "white" }}
              >
                <Box sx={{ mb: 1 }}>
                  <Typography variant="subtitle2" fontWeight="bold">Heading:</Typography>
                  {editId === item._id ? (
                    <TextField
                      name="heading"
                      value={editedData.heading}
                      onChange={handleChange}
                      fullWidth
                      size="small"
                    />
                  ) : (
                    <Typography variant="body2">{truncateText(item.heading)}</Typography>
                  )}
                </Box>
                <Box sx={{ mb: 1 }}>
                  <Typography variant="subtitle2" fontWeight="bold">Price:</Typography>
                  {editId === item._id ? (
                    <TextField
                      name="price"
                      value={editedData.price}
                      onChange={handleChange}
                      fullWidth
                      size="small"
                    />
                  ) : (
                    <Typography variant="body2">{`$${item.price}`}</Typography>
                  )}
                </Box>
                <Box sx={{ mb: 1 }}>
                  <Typography variant="subtitle2" fontWeight="bold">Category:</Typography>
                  {editId === item._id ? (
                    <TextField
                      name="category"
                      value={editedData.category}
                      onChange={handleChange}
                      fullWidth
                      size="small"
                    />
                  ) : (
                    <Typography variant="body2">{truncateText(item.category)}</Typography>
                  )}
                </Box>
                <Box sx={{ mb: 1 }}>
                  <Typography variant="subtitle2" fontWeight="bold">Product Link:</Typography>
                  {editId === item._id ? (
                    <TextField
                      name="link"
                      value={editedData.link}
                      onChange={handleChange}
                      fullWidth
                      size="small"
                    />
                  ) : (
                    <Typography variant="body2">
                      <a href={item.link} target="_blank" rel="noopener noreferrer" style={{ color: "#1976D2" }}>
                        {truncateText(item.link, 25)}
                      </a>
                    </Typography>
                  )}
                </Box>
                <Box sx={{ mb: 1 }}>
                  <Typography variant="subtitle2" fontWeight="bold">Short Description:</Typography>
                  {editId === item._id ? (
                    <TextField
                      name="shortDescription"
                      value={editedData.shortDescription}
                      onChange={handleChange}
                      fullWidth
                      size="small"
                      multiline
                      rows={2}
                    />
                  ) : (
                    <Typography variant="body2">{truncateText(item.shortDescription)}</Typography>
                  )}
                </Box>
                <Box sx={{ mb: 1 }}>
                  <Typography variant="subtitle2" fontWeight="bold">Description:</Typography>
                  {editId === item._id ? (
                    <TextField
                      name="description"
                      value={editedData.description}
                      onChange={handleChange}
                      fullWidth
                      size="small"
                      multiline
                      rows={2}
                    />
                  ) : (
                    <Typography variant="body2">{truncateText(item.description)}</Typography>
                  )}
                </Box>
                <Box sx={{ mb: 1 }}>
                  <Typography variant="subtitle2" fontWeight="bold">Image:</Typography>
                  <img
                    src={item.image}
                    alt={item.heading}
                    style={{ width: "60px", height: "60px", borderRadius: "5px" }}
                  />
                </Box>
                <Box sx={{ display: "flex", gap: 1, justifyContent: "flex-end" }}>
                  {editId === item._id ? (
                    <>
                      <IconButton color="success" onClick={() => handleSave(item._id)}>
                        <SaveIcon />
                      </IconButton>
                      <IconButton color="error" onClick={handleCancel}>
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
                </Box>
              </Paper>
            ))
          ) : (
            <Typography variant="body1" color="textSecondary" align="center">
              No store items found
            </Typography>
          )}
        </Box>
      ) : (
        // Tablet/Desktop: Table layout
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: { xs: 0, sm: 650 } }}>
            <TableHead>
              <TableRow sx={{ backgroundColor: "#1976D2" }}>
                <TableCell align="center" sx={{ color: "white", fontWeight: 700 }}>Heading</TableCell>
                <TableCell align="center" sx={{ color: "white", fontWeight: 700 }}>Price</TableCell>
                <TableCell align="center" sx={{ color: "white", fontWeight: 700 }}>Category</TableCell>
                <TableCell align="center" sx={{ color: "white", fontWeight: 700 }}>Product Link</TableCell>
                <TableCell align="center" sx={{ color: "white", fontWeight: 700 }}>Short Description</TableCell>
                <TableCell align="center" sx={{ color: "white", fontWeight: 700 }}>Description</TableCell>
                <TableCell align="center" sx={{ color: "white", fontWeight: 700 }}>Image</TableCell>
                <TableCell align="center" sx={{ color: "white", fontWeight: 700 }}>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredBlogs.length > 0 ? (
                filteredBlogs.map((item) => (
                  <TableRow key={item._id}>
                    <TableCell align="center">
                      {editId === item._id ? (
                        <TextField
                          name="heading"
                          value={editedData.heading}
                          onChange={handleChange}
                          fullWidth
                          size="small"
                        />
                      ) : (
                        truncateText(item.heading)
                      )}
                    </TableCell>
                    <TableCell align="center">
                      {editId === item._id ? (
                        <TextField
                          name="price"
                          value={editedData.price}
                          onChange={handleChange}
                          fullWidth
                          size="small"
                        />
                      ) : (
                        `$${item.price}`
                      )}
                    </TableCell>
                    <TableCell align="center">
                      {editId === item._id ? (
                        <TextField
                          name="category"
                          value={editedData.category}
                          onChange={handleChange}
                          fullWidth
                          size="small"
                        />
                      ) : (
                        truncateText(item.category)
                      )}
                    </TableCell>
                    <TableCell align="center" sx={{ maxWidth: { sm: 100, md: 150 } }}>
                      {editId === item._id ? (
                        <TextField
                          name="link"
                          value={editedData.link}
                          onChange={handleChange}
                          fullWidth
                          size="small"
                        />
                      ) : (
                        <a
                          href={item.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{
                            color: "#1976D2",
                            textDecoration: "none",
                            display: "block",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                          }}
                          title={item.link}
                        >
                          {truncateText(item.link, isTablet ? 25 : 40)}
                        </a>
                      )}
                    </TableCell>
                    <TableCell align="center">
                      {editId === item._id ? (
                        <TextField
                          name="shortDescription"
                          value={editedData.shortDescription}
                          onChange={handleChange}
                          fullWidth
                          size="small"
                          multiline
                          rows={2}
                        />
                      ) : (
                        truncateText(item.shortDescription || "No description")
                      )}
                    </TableCell>
                    <TableCell align="center">
                      {editId === item._id ? (
                        <TextField
                          name="description"
                          value={editedData.description}
                          onChange={handleChange}
                          fullWidth
                          size="small"
                          multiline
                          rows={2}
                        />
                      ) : (
                        truncateText(item.description)
                      )}
                    </TableCell>
                    <TableCell align="center">
                      <img
                        src={item.image}
                        alt={item.heading}
                        style={{
                          width: isTablet ? "60px" : "70px",
                          height: isTablet ? "60px" : "70px",
                        }}
                      />
                    </TableCell>
                    <TableCell align="center">
                      {editId === item._id ? (
                        <>
                          <IconButton color="success" onClick={() => handleSave(item._id)}>
                            <SaveIcon />
                          </IconButton>
                          <IconButton color="error" onClick={handleCancel}>
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
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={8} align="center">
                    <Typography variant="body1" color="textSecondary">
                      No store items found
                    </Typography>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {/* Responsive Dialog */}
      {selectedBlog && (
        <Dialog
          open={isModalOpen}
          onClose={handleCloseModal}
          maxWidth="md"
          fullWidth
          sx={{ "& .MuiDialog-paper": { width: { xs: "90%", sm: "75%", md: "60%" }, maxHeight: "90vh" } }}
        >
          <DialogTitle sx={{ backgroundColor: "#1976D2", color: "white" }}>
            {selectedBlog.heading}
          </DialogTitle>
          <DialogContent sx={{ p: { xs: 2, sm: 3 } }}>
            <Typography variant="body1" sx={{ mb: 1 }}>
              <strong>Price:</strong> ${selectedBlog.price}
            </Typography>
            <Typography variant="body1" sx={{ mb: 1 }}>
              <strong>Category:</strong> {selectedBlog.category}
            </Typography>
            <Typography variant="body1" sx={{ mb: 1 }}>
              <strong>Short Description:</strong> {selectedBlog.shortDescription || "N/A"}
            </Typography>
            <Typography variant="body1" sx={{ mb: 2 }}>
              <strong>Description:</strong> {selectedBlog.description}
            </Typography>
            <Typography variant="body1" sx={{ mb: 2 }}>
              <strong>Link:</strong>{" "}
              <a href={selectedBlog.link} target="_blank" rel="noopener noreferrer" style={{ color: "#1976D2" }}>
                {selectedBlog.link}
              </a>
            </Typography>
            <img
              src={selectedBlog.image}
              alt={selectedBlog.heading}
              style={{
                width: isMobile ? "100%" : "300px",
                height: "auto",
                borderRadius: "8px",
                maxWidth: "100%",
              }}
            />
          </DialogContent>
          <DialogActions>
            <Button
              onClick={handleCloseModal}
              color="primary"
              size={isMobile ? "small" : "medium"}
            >
              Close
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </Box>
  );
}