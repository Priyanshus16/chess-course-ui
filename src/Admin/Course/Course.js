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
//   InputAdornment,
// } from "@mui/material";
// import {
//   Add as AddIcon,
//   Delete as DeleteIcon,
//   Edit as EditIcon,
//   Save as SaveIcon,
//   Cancel as CancelIcon,
//   Visibility as VisibilityIcon,
//   Search as SearchIcon,
// } from "@mui/icons-material";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import Swal from "sweetalert2";
// import { Menu, MenuItem, ListItemIcon, ListItemText } from "@mui/material";
// import MoreVertIcon from "@mui/icons-material/MoreVert";

// export default function Course() {
//   const navigate = useNavigate();
//   const [apiData, setApiData] = useState([]);
//   const [filteredData, setFilteredData] = useState([]);
//   const [editRow, setEditRow] = useState(null);
//   const [editedData, setEditedData] = useState({});
//   const [searchTerm, setSearchTerm] = useState("");
//   const [selectedCourse, setSelectedCourse] = useState(null);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [anchorEl, setAnchorEl] = useState(null);
//   const [selectedMenuItem, setMenuItem] = useState(null);
//   const open = Boolean(anchorEl);

//   useEffect(() => {
//     getData();
//   }, []);

//   const getData = async () => {
//     try {
//       const response = await axios.get(
//         `${process.env.REACT_APP_BASE_ADMIN_URL}/course`
//       );
//       setApiData(response.data.courses || []);
//       setFilteredData(response.data.courses || []);
//     } catch (error) {
//       console.error("Error fetching courses:", error);
//     }
//   };

//   // Search functionality
//   useEffect(() => {
//     if (searchTerm.trim() === "") {
//       setFilteredData(apiData);
//     } else {
//       const filtered = apiData.filter(
//         (course) =>
//           course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
//           (course.description &&
//             course.description
//               .toLowerCase()
//               .includes(searchTerm.toLowerCase())) ||
//           (course.courseLevel &&
//             course.courseLevel.toLowerCase().includes(searchTerm.toLowerCase()))
//       );
//       setFilteredData(filtered);
//     }
//   }, [searchTerm, apiData]);

//   const handleEdit = () => {
//     if (selectedMenuItem) {
//       setEditRow(selectedMenuItem._id);
//       setEditedData({ ...selectedMenuItem });
//     }
//     handleClose();
//   };
//   const handleChange = (e, field) => {
//     setEditedData({ ...editedData, [field]: e.target.value });
//   };

//   const handleSave = async (id) => {
//     try {
//       await axios.put(
//         `${process.env.REACT_APP_BASE_ADMIN_URL}/course/${id}`,
//         editedData
//       );
//       setApiData((prevData) =>
//         prevData.map((item) => (item._id === id ? editedData : item))
//       );
//       setEditRow(null);
//       Swal.fire("Success!", "Course updated successfully.", "success");
//     } catch (error) {
//       console.error("Error updating course:", error);
//       Swal.fire("Error!", "Failed to update course.", "error");
//     }
//   };
//   const handleCancel = () => {
//     setEditRow(null);
//     setMenuItem(null);
//     setAnchorEl(null);
//   };

//   const handleDeleteCourse = async (id) => {
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
//         await axios.delete(
//           `${process.env.REACT_APP_BASE_ADMIN_URL}/course/${id}`
//         );
//         getData();
//         setApiData((prevData) => prevData.filter((item) => item._id !== id));
//         Swal.fire("Deleted!", "Course has been deleted.", "success");
//       } catch (error) {
//         console.error("Error deleting course:", error);
//         Swal.fire("Error!", "Failed to delete course.", "error");
//       }
//     }
//   };

//   const handleOpenModal = (event) => {
//     setSelectedCourse(selectedMenuItem);
//     setIsModalOpen(true);
//     setAnchorEl(event.currentTarget);
//   };

//   const handleCloseModal = () => {
//     setIsModalOpen(false);
//     setSelectedCourse(null);
//   };
//   const handleMenuModel = (event, currentItem) => {
//     setAnchorEl(event.currentTarget);
//     setMenuItem(currentItem);
//   };

//   const handleClose = () => {
//     setAnchorEl(null);
//   };

//   const handleContentModel = (item) => {
//     navigate(`/admin/addCourseVideos?courseId=${selectedMenuItem._id}`);
//   };
//   const truncateText = (text, maxLength = 30) => {
//     if (!text) return "";
//     if (text.length <= maxLength) return text;
//     return `${text.substring(0, maxLength)}...`;
//   };

//   return (
//     <Box
//       component="main"
//       sx={{ flexGrow: 1, p: 3, bgcolor: "#E3F2FD", minHeight: "97vh" }}
//     >
//       <Toolbar />

//       {/* Header Section */}
//       <Box
//         sx={{
//           display: "flex",
//           justifyContent: "space-between",
//           alignItems: "center",
//           marginBottom: "20px",
//         }}
//       >
//         <Typography
//           variant="h5"
//           sx={{
//             fontFamily: "'Poppins', sans-serif",
//             fontWeight: 600,
//             color: "#0D47A1",
//           }}
//         >
//           Course Management
//         </Typography>

//         <Box sx={{ display: "flex", gap: 2 }}>
//           <Button
//             variant="contained"
//             color="primary"
//             startIcon={<AddIcon />}
//             onClick={() => navigate("/admin/addCourses")}
//           >
//             Create Course
//           </Button>
//         </Box>
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

//       {/* Table Section */}
//       <TableContainer component={Paper}>
//         <Table sx={{ minWidth: 650 }}>
//           <TableHead>
//             <TableRow sx={{ backgroundColor: "#1976D2", color: "white" }}>
//               {[
//                 "Title",
//                 "Description",
//                 "Duration",
//                 "Price",
//                 "Level",
//                 "Curriculum",
//                 "Image",
//                 "Actions",
//               ].map((header) => (
//                 <TableCell
//                   key={header}
//                   align="center"
//                   sx={{ color: "white", fontWeight: 700 }}
//                 >
//                   {header}
//                 </TableCell>
//               ))}
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {filteredData.length > 0 ? (
//               filteredData.map((item) => (
//                 <TableRow key={item._id} hover>
//                   <TableCell align="center">
//                     {editRow === item._id.toString() ? (
//                       <TextField
//                         value={editedData.title || ""}
//                         onChange={(e) => handleChange(e, "title")}
//                         size="small"
//                         fullWidth
//                       />
//                     ) : (
//                       truncateText(item.title, 25)
//                     )}
//                   </TableCell>

//                   <TableCell align="center">
//                     {editRow === item._id.toString() ? (
//                       <TextField
//                         value={editedData.description || ""}
//                         onChange={(e) => handleChange(e, "description")}
//                         size="small"
//                         multiline
//                         rows={2}
//                         fullWidth
//                       />
//                     ) : (
//                       truncateText(item.description, 40)
//                     )}
//                   </TableCell>

//                   <TableCell align="center">
//                     {editRow === item._id.toString() ? (
//                       <TextField
//                         value={editedData.duration || ""}
//                         onChange={(e) => handleChange(e, "duration")}
//                         size="small"
//                         fullWidth
//                       />
//                     ) : (
//                       item.duration
//                     )}
//                   </TableCell>

//                   <TableCell align="center">
//                     {editRow === item._id.toString() ? (
//                       <TextField
//                         value={editedData.price || ""}
//                         onChange={(e) => handleChange(e, "price")}
//                         size="small"
//                         fullWidth
//                       />
//                     ) : (
//                       item.price
//                     )}
//                   </TableCell>

//                   <TableCell align="center">
//                     {editRow === item._id.toString() ? (
//                       <TextField
//                         value={editedData.courseLevel || ""}
//                         onChange={(e) => handleChange(e, "courseLevel")}
//                         size="small"
//                         fullWidth
//                       />
//                     ) : (
//                       item.courseLevel
//                     )}
//                   </TableCell>

//                   <TableCell align="center">
//                     {editRow === item._id.toString() ? (
//                       <TextField
//                         value={
//                           editedData.curricullum
//                             ? editedData.curricullum.join(", ")
//                             : ""
//                         }
//                         onChange={(e) =>
//                           setEditedData({
//                             ...editedData,
//                             curricullum: e.target.value
//                               .split(",")
//                               .map((item) => item.trim()),
//                           })
//                         }
//                         size="small"
//                         fullWidth
//                       />
//                     ) : (
//                       truncateText(item.curricullum?.join(", ") || "", 30)
//                     )}
//                   </TableCell>

//                   <TableCell align="center">
//                     <img
//                       style={{ width: "60px", borderRadius: "5px" }}
//                       src={item.image || "/default-course.jpg"}
//                       alt={item.title || "Course"}
//                     />
//                   </TableCell>

//                   <TableCell align="center">
//                     {editRow === item._id.toString() ? (
//                       <>
//                         <IconButton
//                           color="success"
//                           onClick={() => handleSave(item._id)}
//                         >
//                           <SaveIcon />
//                         </IconButton>
//                         <IconButton color="error" onClick={handleCancel}>
//                           <CancelIcon />
//                         </IconButton>
//                       </>
//                     ) : (
//                       <>
//                         <IconButton
//                           color="info"
//                           onClick={(e) => handleMenuModel(e, item)}
//                         >
//                           <MoreVertIcon />
//                         </IconButton>

//                         <Menu
//                           anchorEl={anchorEl}
//                           open={open}
//                           onClose={handleClose}
//                           anchorOrigin={{
//                             vertical: "bottom",
//                             horizontal: "left",
//                           }}
//                           transformOrigin={{
//                             vertical: "top",
//                             horizontal: "left",
//                           }}
//                         >
//                           <MenuItem
//                             onClick={(e) => {
//                               handleOpenModal(e);
//                               handleClose();
//                             }}
//                           >
//                             <ListItemIcon>
//                               <VisibilityIcon fontSize="small" />
//                             </ListItemIcon>
//                             <ListItemText primary="View" />
//                           </MenuItem>
//                           <MenuItem
//                             onClick={() => {
//                               handleClose();
//                               handleContentModel(item);
//                             }}
//                           >
//                             <ListItemIcon>
//                               <AddIcon fontSize="small" />
//                             </ListItemIcon>
//                             <ListItemText primary="Add Content" />
//                           </MenuItem>

//                           <MenuItem
//                             onClick={() => {
//                               handleClose();
//                               handleEdit(item);
//                             }}
//                           >
//                             <ListItemIcon>
//                               <EditIcon fontSize="small" />
//                             </ListItemIcon>
//                             <ListItemText primary="Edit" />
//                           </MenuItem>

//                           <MenuItem
//                             onClick={() => {
//                               handleDeleteCourse(selectedMenuItem?._id);
//                               handleClose();
//                             }}
//                           >
//                             <ListItemIcon>
//                               <DeleteIcon fontSize="small" />
//                             </ListItemIcon>
//                             <ListItemText primary="Delete" />
//                           </MenuItem>
//                         </Menu>
//                       </>
//                     )}
//                   </TableCell>
//                 </TableRow>
//               ))
//             ) : (
//               <TableRow>
//                 <TableCell colSpan={8} align="center">
//                   <Typography variant="body1" color="textSecondary">
//                     No courses found
//                   </Typography>
//                 </TableCell>
//               </TableRow>
//             )}
//           </TableBody>
//         </Table>
//       </TableContainer>

//       {/* Course View Modal */}
//       <Dialog
//         open={isModalOpen}
//         onClose={handleCloseModal}
//         maxWidth="md"
//         fullWidth
//       >
//         <DialogTitle sx={{ backgroundColor: "#1976D2", color: "white" }}>
//           Course Details
//         </DialogTitle>
//         <DialogContent sx={{ p: 3 }}>
//           {selectedCourse && (
//             <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
//               <Box sx={{ display: "flex", gap: 3, mb: 2 }}>
//                 <img
//                   src={selectedCourse.image || "/default-course.jpg"}
//                   alt={selectedCourse.title}
//                   style={{
//                     width: "150px",
//                     height: "100px",
//                     objectFit: "cover",
//                     borderRadius: "8px",
//                   }}
//                 />
//                 <Box>
//                   <Typography variant="h6" gutterBottom>
//                     {selectedCourse.title}
//                   </Typography>
//                   <Typography color="textSecondary">
//                     Level: {selectedCourse.courseLevel}
//                   </Typography>
//                 </Box>
//               </Box>

//               <Box>
//                 <Typography variant="subtitle1" fontWeight="bold">
//                   Description:
//                 </Typography>
//                 <Typography paragraph>{selectedCourse.description}</Typography>
//               </Box>

//               <Box sx={{ display: "flex", gap: 4 }}>
//                 <Box>
//                   <Typography variant="subtitle1" fontWeight="bold">
//                     Duration:
//                   </Typography>
//                   <Typography>{selectedCourse.duration}</Typography>
//                 </Box>

//                 <Box>
//                   <Typography variant="subtitle1" fontWeight="bold">
//                     Price:
//                   </Typography>
//                   <Typography>{selectedCourse.price}</Typography>
//                 </Box>
//               </Box>

//               <Box>
//                 <Typography variant="subtitle1" fontWeight="bold">
//                   Curriculum:
//                 </Typography>
//                 <ul style={{ marginTop: 0, paddingLeft: 20 }}>
//                   {selectedCourse.curricullum?.map((item, index) => (
//                     <li key={index}>
//                       <Typography>{item}</Typography>
//                     </li>
//                   ))}
//                 </ul>
//               </Box>
//             </Box>
//           )}
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleCloseModal} color="primary">
//             Close
//           </Button>
//         </DialogActions>
//       </Dialog>
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
  InputAdornment,
  useMediaQuery,
  useTheme,
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
import { Menu, MenuItem, ListItemIcon, ListItemText } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";

export default function Course() {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md"));

  const [apiData, setApiData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [editRow, setEditRow] = useState(null);
  const [editedData, setEditedData] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedMenuItem, setMenuItem] = useState(null);
  const open = Boolean(anchorEl);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BASE_ADMIN_URL}/course`);
      setApiData(response.data.courses || []);
      setFilteredData(response.data.courses || []);
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };

  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredData(apiData);
    } else {
      const filtered = apiData.filter(
        (course) =>
          course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (course.description &&
            course.description.toLowerCase().includes(searchTerm.toLowerCase())) ||
          (course.courseLevel &&
            course.courseLevel.toLowerCase().includes(searchTerm.toLowerCase()))
      );
      setFilteredData(filtered);
    }
  }, [searchTerm, apiData]);

  const handleEdit = () => {
    if (selectedMenuItem) {
      setEditRow(selectedMenuItem._id);
      setEditedData({ ...selectedMenuItem });
    }
    handleClose();
  };

  const handleChange = (e, field) => {
    setEditedData({ ...editedData, [field]: e.target.value });
  };

  const handleSave = async (id) => {
    try {
      await axios.put(`${process.env.REACT_APP_BASE_ADMIN_URL}/course/${id}`, editedData);
      setApiData((prevData) => prevData.map((item) => (item._id === id ? editedData : item)));
      setEditRow(null);
      Swal.fire("Success!", "Course updated successfully.", "success");
    } catch (error) {
      console.error("Error updating course:", error);
      Swal.fire("Error!", "Failed to update course.", "error");
    }
  };

  const handleCancel = () => {
    setEditRow(null);
    setMenuItem(null);
    setAnchorEl(null);
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
        await axios.delete(`${process.env.REACT_APP_BASE_ADMIN_URL}/course/${id}`);
        getData();
        setApiData((prevData) => prevData.filter((item) => item._id !== id));
        Swal.fire("Deleted!", "Course has been deleted.", "success");
      } catch (error) {
        console.error("Error deleting course:", error);
        Swal.fire("Error!", "Failed to delete course.", "error");
      }
    }
  };

  const handleOpenModal = (event) => {
    setSelectedCourse(selectedMenuItem);
    setIsModalOpen(true);
    setAnchorEl(event.currentTarget);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedCourse(null);
  };

  const handleMenuModel = (event, currentItem) => {
    setAnchorEl(event.currentTarget);
    setMenuItem(currentItem);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleContentModel = () => {
    navigate(`/admin/addCourseVideos?courseId=${selectedMenuItem._id}`);
  };

  const truncateText = (text, maxLength = isMobile ? 20 : isTablet ? 25 : 30) => {
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
          sx={{ fontFamily: "'Poppins', sans-serif", fontWeight: 600, color: "#0D47A1" }}
        >
          Course Management
        </Typography>
        <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
          <Button
            variant="contained"
            color="primary"
            size={isMobile ? "small" : "medium"}
            startIcon={<AddIcon />}
            onClick={() => navigate("/admin/addCourses")}
          >
            Create Course
          </Button>
        </Box>
      </Box>

      {/* Search Bar */}
      <Box sx={{ mb: 2 }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Search courses..."
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
          {filteredData.length > 0 ? (
            filteredData.map((item) => (
              <Paper key={item._id} sx={{ p: 2, borderRadius: 2 }}>
                <Box sx={{ mb: 1 }}>
                  <Typography variant="subtitle2" fontWeight="bold">Title:</Typography>
                  {editRow === item._id.toString() ? (
                    <TextField
                      value={editedData.title || ""}
                      onChange={(e) => handleChange(e, "title")}
                      size="small"
                      fullWidth
                    />
                  ) : (
                    <Typography variant="body2">{truncateText(item.title)}</Typography>
                  )}
                </Box>
                <Box sx={{ mb: 1 }}>
                  <Typography variant="subtitle2" fontWeight="bold">Description:</Typography>
                  {editRow === item._id.toString() ? (
                    <TextField
                      value={editedData.description || ""}
                      onChange={(e) => handleChange(e, "description")}
                      size="small"
                      multiline
                      rows={2}
                      fullWidth
                    />
                  ) : (
                    <Typography variant="body2">{truncateText(item.description, 30)}</Typography>
                  )}
                </Box>
                <Box sx={{ mb: 1 }}>
                  <Typography variant="subtitle2" fontWeight="bold">Duration:</Typography>
                  {editRow === item._id.toString() ? (
                    <TextField
                      value={editedData.duration || ""}
                      onChange={(e) => handleChange(e, "duration")}
                      size="small"
                      fullWidth
                    />
                  ) : (
                    <Typography variant="body2">{item.duration}</Typography>
                  )}
                </Box>
                <Box sx={{ mb: 1 }}>
                  <Typography variant="subtitle2" fontWeight="bold">Price:</Typography>
                  {editRow === item._id.toString() ? (
                    <TextField
                      value={editedData.price || ""}
                      onChange={(e) => handleChange(e, "price")}
                      size="small"
                      fullWidth
                    />
                  ) : (
                    <Typography variant="body2">{item.price}</Typography>
                  )}
                </Box>
                <Box sx={{ mb: 1 }}>
                  <Typography variant="subtitle2" fontWeight="bold">Level:</Typography>
                  {editRow === item._id.toString() ? (
                    <TextField
                      value={editedData.courseLevel || ""}
                      onChange={(e) => handleChange(e, "courseLevel")}
                      size="small"
                      fullWidth
                    />
                  ) : (
                    <Typography variant="body2">{item.courseLevel}</Typography>
                  )}
                </Box>
                <Box sx={{ mb: 1 }}>
                  <Typography variant="subtitle2" fontWeight="bold">Curriculum:</Typography>
                  {editRow === item._id.toString() ? (
                    <TextField
                      value={editedData.curricullum ? editedData.curricullum.join(", ") : ""}
                      onChange={(e) =>
                        setEditedData({
                          ...editedData,
                          curricullum: e.target.value.split(",").map((item) => item.trim()),
                        })
                      }
                      size="small"
                      fullWidth
                    />
                  ) : (
                    <Typography variant="body2">{truncateText(item.curricullum?.join(", ") || "")}</Typography>
                  )}
                </Box>
                <Box sx={{ mb: 1 }}>
                  <Typography variant="subtitle2" fontWeight="bold">Image:</Typography>
                  <img
                    style={{ width: "60px", borderRadius: "5px" }}
                    src={item.image || "/default-course.jpg"}
                    alt={item.title || "Course"}
                  />
                </Box>
                <Box sx={{ display: "flex", gap: 1, justifyContent: "flex-end" }}>
                  {editRow === item._id.toString() ? (
                    <>
                      <IconButton color="success" onClick={() => handleSave(item._id)}>
                        <SaveIcon />
                      </IconButton>
                      <IconButton color="error" onClick={handleCancel}>
                        <CancelIcon />
                      </IconButton>
                    </>
                  ) : (
                    <>
                      <IconButton color="info" onClick={(e) => handleMenuModel(e, item)}>
                        <MoreVertIcon />
                      </IconButton>
                      <Menu
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
                        transformOrigin={{ vertical: "top", horizontal: "left" }}
                      >
                        <MenuItem onClick={(e) => { handleOpenModal(e); handleClose(); }}>
                          <ListItemIcon><VisibilityIcon fontSize="small" /></ListItemIcon>
                          <ListItemText primary="View" />
                        </MenuItem>
                        <MenuItem onClick={() => { handleClose(); handleContentModel(item); }}>
                          <ListItemIcon><AddIcon fontSize="small" /></ListItemIcon>
                          <ListItemText primary="Add Content" />
                        </MenuItem>
                        <MenuItem onClick={() => { handleClose(); handleEdit(item); }}>
                          <ListItemIcon><EditIcon fontSize="small" /></ListItemIcon>
                          <ListItemText primary="Edit" />
                        </MenuItem>
                        <MenuItem onClick={() => { handleDeleteCourse(selectedMenuItem?._id); handleClose(); }}>
                          <ListItemIcon><DeleteIcon fontSize="small" /></ListItemIcon>
                          <ListItemText primary="Delete" />
                        </MenuItem>
                      </Menu>
                    </>
                  )}
                </Box>
              </Paper>
            ))
          ) : (
            <Typography variant="body1" color="textSecondary" align="center">
              No courses found
            </Typography>
          )}
        </Box>
      ) : (
        // Desktop/Tablet: Table layout
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: { xs: 0, sm: 650 } }}>
            <TableHead>
              <TableRow sx={{ backgroundColor: "#1976D2", color: "white" }}>
                {["Title", "Description", "Duration", "Price", "Level", "Curriculum", "Image", "Actions"].map((header) => (
                  <TableCell key={header} align="center" sx={{ color: "white", fontWeight: 700 }}>
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
                      {editRow === item._id.toString() ? (
                        <TextField
                          value={editedData.title || ""}
                          onChange={(e) => handleChange(e, "title")}
                          size="small"
                          fullWidth
                        />
                      ) : (
                        truncateText(item.title)
                      )}
                    </TableCell>
                    <TableCell align="center">
                      {editRow === item._id.toString() ? (
                        <TextField
                          value={editedData.description || ""}
                          onChange={(e) => handleChange(e, "description")}
                          size="small"
                          multiline
                          rows={2}
                          fullWidth
                        />
                      ) : (
                        truncateText(item.description, isTablet ? 30 : 40)
                      )}
                    </TableCell>
                    <TableCell align="center">
                      {editRow === item._id.toString() ? (
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
                      {editRow === item._id.toString() ? (
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
                      {editRow === item._id.toString() ? (
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
                      {editRow === item._id.toString() ? (
                        <TextField
                          value={editedData.curricullum ? editedData.curricullum.join(", ") : ""}
                          onChange={(e) =>
                            setEditedData({
                              ...editedData,
                              curricullum: e.target.value.split(",").map((item) => item.trim()),
                            })
                          }
                          size="small"
                          fullWidth
                        />
                      ) : (
                        truncateText(item.curricullum?.join(", ") || "")
                      )}
                    </TableCell>
                    <TableCell align="center">
                      <img
                        style={{ width: isMobile ? "40px" : "60px", borderRadius: "5px" }}
                        src={item.image || "/default-course.jpg"}
                        alt={item.title || "Course"}
                      />
                    </TableCell>
                    <TableCell align="center">
                      {editRow === item._id.toString() ? (
                        <>
                          <IconButton color="success" onClick={() => handleSave(item._id)}>
                            <SaveIcon />
                          </IconButton>
                          <IconButton color="error" onClick={handleCancel}>
                            <CancelIcon />
                          </IconButton>
                        </>
                      ) : (
                        <>
                          <IconButton color="info" onClick={(e) => handleMenuModel(e, item)}>
                            <MoreVertIcon />
                          </IconButton>
                          <Menu
                            anchorEl={anchorEl}
                            open={open}
                            onClose={handleClose}
                            anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
                            transformOrigin={{ vertical: "top", horizontal: "left" }}
                          >
                            <MenuItem onClick={(e) => { handleOpenModal(e); handleClose(); }}>
                              <ListItemIcon><VisibilityIcon fontSize="small" /></ListItemIcon>
                              <ListItemText primary="View" />
                            </MenuItem>
                            <MenuItem onClick={() => { handleClose(); handleContentModel(item); }}>
                              <ListItemIcon><AddIcon fontSize="small" /></ListItemIcon>
                              <ListItemText primary="Add Content" />
                            </MenuItem>
                            <MenuItem onClick={() => { handleClose(); handleEdit(item); }}>
                              <ListItemIcon><EditIcon fontSize="small" /></ListItemIcon>
                              <ListItemText primary="Edit" />
                            </MenuItem>
                            <MenuItem onClick={() => { handleDeleteCourse(selectedMenuItem?._id); handleClose(); }}>
                              <ListItemIcon><DeleteIcon fontSize="small" /></ListItemIcon>
                              <ListItemText primary="Delete" />
                            </MenuItem>
                          </Menu>
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
      )}

      {/* Course View Dialog */}
      <Dialog
        open={isModalOpen}
        onClose={handleCloseModal}
        maxWidth="md"
        fullWidth
        sx={{ "& .MuiDialog-paper": { width: { xs: "90%", sm: "75%", md: "60%" }, maxHeight: "90vh" } }}
      >
        <DialogTitle sx={{ backgroundColor: "#1976D2", color: "white" }}>
          Course Details
        </DialogTitle>
        <DialogContent sx={{ p: { xs: 2, sm: 3 } }}>
          {selectedCourse && (
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <Box sx={{ display: "flex", flexDirection: { xs: "column", sm: "row" }, gap: 2, mb: 2 }}>
                <img
                  src={selectedCourse.image || "/default-course.jpg"}
                  alt={selectedCourse.title}
                  style={{
                    width: isMobile ? "100%" : "150px",
                    height: isMobile ? "auto" : "100px",
                    objectFit: "cover",
                    borderRadius: "8px",
                  }}
                />
                <Box>
                  <Typography variant={isMobile ? "subtitle1" : "h6"} gutterBottom>
                    {selectedCourse.title}
                  </Typography>
                  <Typography color="textSecondary">
                    Level: {selectedCourse.courseLevel}
                  </Typography>
                </Box>
              </Box>
              <Box>
                <Typography variant="subtitle1" fontWeight="bold">Description:</Typography>
                <Typography paragraph>{selectedCourse.description}</Typography>
              </Box>
              <Box sx={{ display: "flex", flexDirection: { xs: "column", sm: "row" }, gap: 2 }}>
                <Box>
                  <Typography variant="subtitle1" fontWeight="bold">Duration:</Typography>
                  <Typography>{selectedCourse.duration}</Typography>
                </Box>
                <Box>
                  <Typography variant="subtitle1" fontWeight="bold">Price:</Typography>
                  <Typography>{selectedCourse.price}</Typography>
                </Box>
              </Box>
              <Box>
                <Typography variant="subtitle1" fontWeight="bold">Curriculum:</Typography>
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
          <Button onClick={handleCloseModal} color="primary" size={isMobile ? "small" : "medium"}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}