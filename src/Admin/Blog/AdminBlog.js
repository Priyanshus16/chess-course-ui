// import React, { useEffect, useState } from "react";
// import {
//   Box,
//   Toolbar,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
//   Button,
//   Typography,
//   IconButton,
//   TextField,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
// } from "@mui/material";
// import {
//   Add as AddIcon,
//   Delete as DeleteIcon,
//   Edit as EditIcon,
//   Save as SaveIcon,
//   Close as CloseIcon,
//   Visibility as VisibilityIcon,
//   Search as SearchIcon,
// } from "@mui/icons-material";
// import InputAdornment from "@mui/material/InputAdornment";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import Swal from "sweetalert2";

// export default function AdminBlog() {
//   const navigate = useNavigate();
//   const [apiData, setApiData] = useState([]);
//   const [editId, setEditId] = useState(null);
//   const [editedData, setEditedData] = useState({ heading: "", description: "" });
//   const [searchTerm, setSearchTerm] = useState("");
//   const [selectedBlog, setSelectedBlog] = useState(null);
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   useEffect(() => {
//     getData();
//   }, []);

//   const getData = async () => {
//     try {
//       const response = await axios.get(`${process.env.REACT_APP_BASE_ADMIN_URL}/blogs`);
//       setApiData(response.data.blogs);
//     } catch (error) {
//       console.error("Error fetching data:", error);
//     }
//   };

//   const handleEdit = (item) => {
//     setEditId(item._id);
//     setEditedData({ heading: item.heading, description: item.description });
//   };

//   const handleSave = async (id) => {
//     try {
//       await axios.put(`${process.env.REACT_APP_BASE_ADMIN_URL}/blogs/${id}`, editedData);
//       setApiData((prevData) =>
//         prevData.map((item) => (item._id === id ? { ...item, ...editedData } : item))
//       );
//       setEditId(null);
//     } catch (error) {
//       console.error("Error updating blog:", error);
//     }
//   };

//   const handleCancel = () => {
//     setEditId(null);
//     setEditedData({ heading: "", description: "" });
//   };

//   const handleChange = (e) => {
//     setEditedData({ ...editedData, [e.target.name]: e.target.value });
//   };

//   const handleUserDelete = async (id) => {
//     const result = await Swal.fire({
//       title: "Are you sure?",
//       text: "You won't be able to revert this!",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonColor: "#d33",
//       cancelButtonColor: "#3085d6",
//       confirmButtonText: "Yes, delete it!",
//     });
//     if (result.isConfirmed) {
//       try {
//         await axios.delete(`${process.env.REACT_APP_BASE_ADMIN_URL}/blogs/${id}`);
//         setApiData((prevData) => prevData.filter((item) => item._id !== id));
//       } catch (error) {
//         console.error("Error deleting blog:", error);
//       }
//     }
//   };

//   const handleOpenModal = (blog) => {
//     setSelectedBlog(blog);
//     setIsModalOpen(true);
//   };

//   const handleCloseModal = () => {
//     setIsModalOpen(false);
//     setSelectedBlog(null);
//   };

//   const filteredBlogs = apiData.filter((blog) =>
//     blog.heading.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   return (
//     <Box component="main" sx={{ flexGrow: 1, p: 3, bgcolor: "#E3F2FD", height: "97vh" }}>
//       <Toolbar />
//       <Box display="flex" justifyContent="space-between" alignItems="center" sx={{ marginBottom: "20px" }}>
//         <Typography variant="h5" sx={{ fontFamily: "'Poppins', sans-serif", fontWeight: 500, color: "#0D47A1" }}>
//           Blogs Management
//         </Typography>
//         <Button variant="contained" color="primary" startIcon={<AddIcon />} onClick={() => navigate("/admin/addBlog")}>
//           Create
//         </Button>
//       </Box>

//       {/* Search Bar */}
//       <Box sx={{ mb: 3 }}>
//         <TextField
//           fullWidth
//           variant="outlined"
//           placeholder="Search testimonials..."
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//           InputProps={{
//             startAdornment: (
//               <InputAdornment position="start">
//                 <SearchIcon />
//               </InputAdornment>
//             ),
//           }}
//           sx={{
//             "& .MuiOutlinedInput-root": {
//               borderRadius: 2,
//               backgroundColor: "white",
//             },
//           }}
//         />
//       </Box>

//       <TableContainer component={Paper}>
//         <Table sx={{ minWidth: 650 }}>
//           <TableHead>
//             <TableRow sx={{ backgroundColor: "#1976D2", color: "white" }}>
//               <TableCell align="center" sx={{ color: "white",  fontWeight: 700 }}>Heading</TableCell>
//               <TableCell align="center" sx={{ color: "white", fontWeight: 700 }}>Description</TableCell>
//               <TableCell align="center" sx={{ color: "white",fontWeight: 700 }}>Image</TableCell>
//               <TableCell align="center" sx={{ color: "white", fontWeight: 700 }}>Action</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {filteredBlogs.map((item) => (
//               <TableRow key={item._id}>
//                 <TableCell align="center">
//                   {editId === item._id ? (
//                     <TextField name="heading" value={editedData.heading} onChange={handleChange} fullWidth />
//                   ) : (
//                     item.heading
//                   )}
//                 </TableCell>
//                 <TableCell align="center">
//                   {editId === item._id ? (
//                     <TextField name="description" value={editedData.description} onChange={handleChange} fullWidth />
//                   ) : (
//                     item.description.substring(0, 50) + "..."
//                   )}
//                 </TableCell>
//                 <TableCell align="center">
//                   <img src={item.image} alt={item.heading} style={{ width: "70px", height: "70px" }} />
//                 </TableCell>
//                 <TableCell align="center">
//                   {editId === item._id ? (
//                     <>
//                       <IconButton color="primary" onClick={() => handleSave(item._id)}>
//                         <SaveIcon />
//                       </IconButton>
//                       <IconButton color="secondary" onClick={handleCancel}>
//                         <CloseIcon />
//                       </IconButton>
//                     </>
//                   ) : (
//                     <>
//                       <IconButton color="primary" onClick={() => handleEdit(item)}>
//                         <EditIcon />
//                       </IconButton>
//                       <IconButton color="info" onClick={() => handleOpenModal(item)}>
//                         <VisibilityIcon />
//                       </IconButton>
//                       <IconButton color="error" onClick={() => handleUserDelete(item._id)}>
//                         <DeleteIcon />
//                       </IconButton>
                      
//                     </>
//                   )}
//                 </TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </TableContainer>
//       {selectedBlog && (
//         <Dialog open={isModalOpen} onClose={handleCloseModal}>
//           <DialogTitle>{selectedBlog.heading}</DialogTitle>
//           <DialogContent>
//             <Typography>{selectedBlog.description}</Typography>
//             <img src={selectedBlog.image} alt={selectedBlog.heading} style={{ width: "100%", marginTop: "10px" }} />
//           </DialogContent>
//           <DialogActions>
//             <Button onClick={handleCloseModal}>Close</Button>
//           </DialogActions>
//         </Dialog>
//       )}
//     </Box>
//   );
// }



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

export default function AdminBlog() {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md"));

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
      const response = await axios.get(`${process.env.REACT_APP_BASE_ADMIN_URL}/blogs`);
      setApiData(response.data.blogs || []);
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
      await axios.put(`${process.env.REACT_APP_BASE_ADMIN_URL}/blogs/${id}`, editedData);
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
        await axios.delete(`${process.env.REACT_APP_BASE_ADMIN_URL}/blogs/${id}`);
        setApiData((prevData) => prevData.filter((item) => item._id !== id));
        Swal.fire("Deleted!", "Your blog has been deleted.", "success");
      } catch (error) {
        console.error("Error deleting blog:", error);
        Swal.fire("Error!", "Failed to delete blog.", "error");
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
    if (!text) return "";
    if (text.length <= maxLength) return text;
    return `${text.substring(0, maxLength)}...`;
  };

  return (
    <Box
      component="main"
      sx={{ flexGrow: 1, p: { xs: 1, sm: 2, md: 3 }, bgcolor: "#E3F2FD", minHeight: "97vh" }}
    >
      <Toolbar />

      {/* Header Section */}
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          justifyContent: "space-between",
          alignItems: { xs: "flex-start", sm: "center" },
          mb: 2,
          gap: { xs: 1, sm: 0 },
        }}
      >
        <Typography
          variant={isMobile ? "h6" : "h5"}
          sx={{ fontFamily: "'Poppins', sans-serif", fontWeight: 500, color: "#0D47A1" }}
        >
          Blogs Management
        </Typography>
        <Button
          variant="contained"
          color="primary"
          size={isMobile ? "small" : "medium"}
          startIcon={<AddIcon />}
          onClick={() => navigate("/admin/addBlog")}
        >
          Create
        </Button>
      </Box>

      {/* Search Bar */}
      <Box sx={{ mb: 2 }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Search blogs..."
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
            "& .MuiOutlinedInput-root": { borderRadius: 2, backgroundColor: "white" },
          }}
        />
      </Box>

      {/* Table Section (Responsive) */}
      {isMobile ? (
        // Mobile: Card layout
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          {filteredBlogs.length > 0 ? (
            filteredBlogs.map((item) => (
              <Paper key={item._id} sx={{ p: 2, borderRadius: 2 }}>
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
                  <Typography variant="subtitle2" fontWeight="bold">Description:</Typography>
                  {editId === item._id ? (
                    <TextField
                      name="description"
                      value={editedData.description}
                      onChange={handleChange}
                      fullWidth
                      multiline
                      rows={2}
                      size="small"
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
                      <IconButton color="info" onClick={() => handleOpenModal(item)}>
                        <VisibilityIcon />
                      </IconButton>
                      <IconButton color="primary" onClick={() => handleEdit(item)}>
                        <EditIcon />
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
              No blogs found
            </Typography>
          )}
        </Box>
      ) : (
        // Desktop/Tablet: Table layout
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: { xs: 0, sm: 650 } }}>
            <TableHead>
              <TableRow sx={{ backgroundColor: "#1976D2", color: "white" }}>
                <TableCell align="center" sx={{ color: "white", fontWeight: 700 }}>Heading</TableCell>
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
                          name="description"
                          value={editedData.description}
                          onChange={handleChange}
                          fullWidth
                          multiline
                          rows={2}
                          size="small"
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
                          <IconButton color="info" onClick={() => handleOpenModal(item)}>
                            <VisibilityIcon />
                          </IconButton>
                          <IconButton color="primary" onClick={() => handleEdit(item)}>
                            <EditIcon />
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
                  <TableCell colSpan={4} align="center">
                    <Typography variant="body1" color="textSecondary">
                      No blogs found
                    </Typography>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {/* View Details Dialog */}
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
            <Typography variant="body1" sx={{ mb: 2 }}>
              {selectedBlog.description}
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
            <Button onClick={handleCloseModal} color="primary" size={isMobile ? "small" : "medium"}>
              Close
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </Box>
  );
}