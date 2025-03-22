// // import React, { useEffect, useState } from "react";
// // import {
// //   Box,
// //   Toolbar,
// //   Typography,
// //   Table,
// //   TableBody,
// //   TableCell,
// //   TableContainer,
// //   TableHead,
// //   TableRow,
// //   Paper,
// //   Button,
// //   IconButton,
// //   CircularProgress,
// //   Dialog,
// //   DialogActions,
// //   DialogContent,
// //   DialogTitle,
// // } from "@mui/material";
// // import { Add as AddIcon, Delete as DeleteIcon } from "@mui/icons-material";
// // import axios from "axios";
// // import { useNavigate } from "react-router-dom";

// // export default function Course() {
// //   const navigate = useNavigate();
// //   const [apiData, setApiData] = useState([]);
// //   const [loading, setLoading] = useState(false);
// //   const [deleteId, setDeleteId] = useState(null); // Store course ID for deletion
// //   const [openDialog, setOpenDialog] = useState(false); // Controls confirmation dialog

// //   const getData = async () => {
// //     setLoading(true);
// //     try {
// //       const response = await axios.get(
// //         `${process.env.REACT_APP_BASE_ADMIN_URL}/course`
// //       );
// //       setApiData(response.data.courses);
// //     } catch (error) {
// //       console.error("Error fetching courses:", error);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const handleDelete = async () => {
// //     try {
// //       await axios.delete(
// //         `${process.env.REACT_APP_BASE_ADMIN_URL}/course/${deleteId}`
// //       );
// //       setApiData((prevData) => prevData.filter((item) => item._id !== deleteId));
// //     } catch (error) {
// //       console.error("Error deleting course:", error);
// //     } finally {
// //       setOpenDialog(false); // Close confirmation dialog
// //     }
// //   };

// //   useEffect(() => {
// //     getData();
// //   }, []);

// //   return (
// //     <Box
// //       component="main"
// //       sx={{ flexGrow: 1, p: 3, bgcolor: "#E3F2FD", height: "97vh" }}
// //     >
// //       <Toolbar />
// //       <TableContainer component={Paper} sx={{ marginTop: "20px", padding: "10px" }}>
// //         {/* Header Section */}
// //         <Box
// //           sx={{
// //             display: "flex",
// //             justifyContent: "space-between",
// //             alignItems: "center",
// //             padding: "10px 16px",
// //           }}
// //         >
// //           <Typography
// //             variant="h5"
// //             sx={{
// //               fontFamily: "'Poppins', sans-serif",
// //               fontWeight: 600,
// //               color: "#0D47A1",
// //             }}
// //           >
// //             Course Management
// //           </Typography>
// //           <Button
// //             variant="contained"
// //             color="primary"
// //             startIcon={<AddIcon />}
// //             onClick={() => navigate("/admin/addCourses")}
// //           >
// //             Create Course
// //           </Button>
// //         </Box>

// //         {/* Show Loading Spinner while fetching data */}
// //         {loading ? (
// //           <Box display="flex" justifyContent="center" p={3}>
// //             <CircularProgress />
// //           </Box>
// //         ) : (
// //           <Table sx={{ minWidth: 650 }} aria-label="course table">
// //             <TableHead>
// //               <TableRow sx={{ backgroundColor: "#1976D2" }}>
// //                 {["Title", "Description", "Curriculum", "Duration", "Price", "Level", "Image", "Actions"].map(
// //                   (header) => (
// //                     <TableCell key={header} align="center" sx={{ color: "white", fontWeight: 600 }}>
// //                       {header}
// //                     </TableCell>
// //                   )
// //                 )}
// //               </TableRow>
// //             </TableHead>

// //             <TableBody>
// //               {apiData.map((item) => (
// //                 <TableRow key={item._id} hover>
// //                   <TableCell align="center">{item.title}</TableCell>
// //                   <TableCell align="center">{item.description}</TableCell>
// //                   <TableCell align="center">
// //                     {item.curricullum?.length > 0 ? (
// //                       item.curricullum.map((point, index) => (
// //                         <Typography key={index} variant="body2">
// //                           {point}
// //                         </Typography>
// //                       ))
// //                     ) : (
// //                       <Typography variant="body2" color="textSecondary">
// //                         No curriculum available
// //                       </Typography>
// //                     )}
// //                   </TableCell>
// //                   <TableCell align="center">{item.duration}</TableCell>
// //                   <TableCell align="center">{item.price}</TableCell>
// //                   <TableCell align="center">{item.courseLevel}</TableCell>
// //                   <TableCell align="center">
// //                     {item.image ? (
// //                       <img style={{ width: "60px", borderRadius: "5px" }} src={item.image} alt="Course" />
// //                     ) : (
// //                       <Typography variant="body2" color="textSecondary">
// //                         No Image
// //                       </Typography>
// //                     )}
// //                   </TableCell>
// //                   <TableCell align="center">
// //                     <IconButton
// //                       color="error"
// //                       onClick={() => {
// //                         setDeleteId(item._id);
// //                         setOpenDialog(true);
// //                       }}
// //                     >
// //                       <DeleteIcon />
// //                     </IconButton>
// //                   </TableCell>
// //                 </TableRow>
// //               ))}
// //             </TableBody>
// //           </Table>
// //         )}
// //       </TableContainer>

// //       {/* Delete Confirmation Dialog */}
// //       <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
// //         <DialogTitle>Confirm Deletion</DialogTitle>
// //         <DialogContent>
// //           <Typography>Are you sure you want to delete this course?</Typography>
// //         </DialogContent>
// //         <DialogActions>
// //           <Button onClick={() => setOpenDialog(false)} color="primary">
// //             Cancel
// //           </Button>
// //           <Button onClick={handleDelete} color="error">
// //             Delete
// //           </Button>
// //         </DialogActions>
// //       </Dialog>
// //     </Box>
// //   );
// // }


// import React, { useEffect, useState } from "react";
// import {
//   Box,
//   Toolbar,
//   Typography,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
//   Button,
//   IconButton,
//   Dialog,
//   DialogActions,
//   DialogContent,
//   DialogContentText,
//   DialogTitle,
// } from "@mui/material";
// import { Add as AddIcon, Delete as DeleteIcon } from "@mui/icons-material";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// export default function Course() {
//   const navigate = useNavigate();
//   const [apiData, setApiData] = useState([]);
//   const [openDialog, setOpenDialog] = useState(false);
//   const [selectedCourseId, setSelectedCourseId] = useState(null);

//   useEffect(() => {
//     getData();
//   }, []);

//   const getData = async () => {
//     try {
//       const response = await axios.get(
//         `${process.env.REACT_APP_BASE_ADMIN_URL}/course`
//       );
//       setApiData(response.data.courses);
//     } catch (error) {
//       console.error("Error fetching courses:", error);
//     }
//   };

//   const handleDeleteClick = (id) => {
//     setSelectedCourseId(id);
//     setOpenDialog(true);
//   };

//   const handleCloseDialog = () => {
//     setOpenDialog(false);
//     setSelectedCourseId(null);
//   };

//   const handleConfirmDelete = async () => {
//     try {
//       await axios.delete(
//         `${process.env.REACT_APP_BASE_ADMIN_URL}/course/${selectedCourseId}`
//       );
//       setApiData((prevData) =>
//         prevData.filter((item) => item._id !== selectedCourseId)
//       );
//     } catch (error) {
//       console.error("Error deleting course:", error);
//     } finally {
//       handleCloseDialog();
//     }
//   };

//   return (
//     <Box
//       component="main"
//       sx={{ flexGrow: 1, p: 3, bgcolor: "#E3F2FD", height: "97vh" }}
//     >
//       <Toolbar />
//       <TableContainer
//         component={Paper}
//         sx={{ marginTop: "20px", padding: "10px" }}
//       >
//         {/* Header Section */}
//         <Box
//           sx={{
//             display: "flex",
//             justifyContent: "space-between",
//             alignItems: "center",
//             padding: "10px 16px",
//           }}
//         >
//           <Typography
//             variant="h5"
//             sx={{
//               fontFamily: "'Poppins', sans-serif",
//               fontWeight: 600,
//               color: "#0D47A1",
//             }}
//           >
//             Course Management
//           </Typography>
//           <Button
//             variant="contained"
//             color="primary"
//             startIcon={<AddIcon />}
//             onClick={() => navigate("/admin/addCourses")}
//           >
//             Create Course
//           </Button>
//         </Box>

//         <Table sx={{ minWidth: 650 }} aria-label="course table">
//           <TableHead>
//             <TableRow sx={{ backgroundColor: "#1976D2" }}>
//               <TableCell align="center" sx={{ color: "white", fontWeight: 600 }}>
//                 Title
//               </TableCell>
//               <TableCell align="center" sx={{ color: "white", fontWeight: 600 }}>
//                 Description
//               </TableCell>
//               <TableCell align="center" sx={{ color: "white", fontWeight: 600 }}>
//                 Curriculum
//               </TableCell>
//               <TableCell align="center" sx={{ color: "white", fontWeight: 600 }}>
//                 Duration
//               </TableCell>
//               <TableCell align="center" sx={{ color: "white", fontWeight: 600 }}>
//                 Price
//               </TableCell>
//               <TableCell align="center" sx={{ color: "white", fontWeight: 600 }}>
//                 Level
//               </TableCell>
//               <TableCell align="center" sx={{ color: "white", fontWeight: 600 }}>
//                 Image
//               </TableCell>
//               <TableCell align="center" sx={{ color: "white", fontWeight: 600 }}>
//                 Actions
//               </TableCell>
//             </TableRow>
//           </TableHead>

//           <TableBody>
//             {apiData.map((item) => (
//               <TableRow key={item._id} hover>
//                 <TableCell align="center">{item.title}</TableCell>
//                 <TableCell align="center">{item.description}</TableCell>
//                 <TableCell align="center">
//                   {item.curricullum.map((point, index) => (
//                     <Typography key={index} variant="body2">
//                       {point}
//                     </Typography>
//                   ))}
//                 </TableCell>
//                 <TableCell align="center">{item.duration}</TableCell>
//                 <TableCell align="center">{item.price}</TableCell>
//                 <TableCell align="center">{item.courseLevel}</TableCell>
//                 <TableCell align="center">
//                   <img
//                     style={{ width: "60px", borderRadius: "5px" }}
//                     src={item.image}
//                     alt="Course"
//                   />
//                 </TableCell>
//                 <TableCell align="center">
//                   <IconButton
//                     color="error"
//                     onClick={() => handleDeleteClick(item._id)}
//                   >
//                     <DeleteIcon />
//                   </IconButton>
//                 </TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </TableContainer>

//       {/* Delete Confirmation Dialog */}
//       <Dialog open={openDialog} onClose={handleCloseDialog}>
//         <DialogTitle>Delete Course</DialogTitle>
//         <DialogContent>
//           <DialogContentText>
//             Are you sure you want to delete this course? This action cannot be
//             undone.
//           </DialogContentText>
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleCloseDialog} color="primary">
//             Cancel
//           </Button>
//           <Button onClick={handleConfirmDelete} color="error" variant="contained">
//             Delete
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
} from "@mui/material";
import { Add as AddIcon, Delete as DeleteIcon } from "@mui/icons-material";
import EditIcon from "@mui/icons-material/Edit";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function Course() {
  const navigate = useNavigate();
  const [apiData, setApiData] = useState([]);

  useEffect(() => {
    getData();
  }, []);

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
      } catch (error) {
        console.error("Error deleting course:", error);
      }
    }
  };

  return (
    <Box
      component="main"
      sx={{ flexGrow: 1, p: 3, bgcolor: "#E3F2FD", height: "97vh" }}
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
          Course Management
        </Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={() => navigate("/admin/addCourses")}
          sx={{ fontFamily: "'Poppins', sans-serif", fontWeight: 400 }}
        >
          Create Course
        </Button>
      </Box>

      {/* Table Section */}
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#1976D2", color: "white" }}>
              <TableCell align="center" sx={{ color: "white", fontWeight: 700 }}>
                Title
              </TableCell>
              <TableCell align="center" sx={{ color: "white", fontWeight: 700 }}>
                Description
              </TableCell>
              <TableCell align="center" sx={{ color: "white", fontWeight: 700 }}>
                Curriculum
              </TableCell>
              <TableCell align="center" sx={{ color: "white", fontWeight: 700 }}>
                Duration
              </TableCell>
              <TableCell align="center" sx={{ color: "white", fontWeight: 700 }}>
                Price
              </TableCell>
              <TableCell align="center" sx={{ color: "white", fontWeight: 700 }}>
                Level
              </TableCell>
              <TableCell align="center" sx={{ color: "white", fontWeight: 700 }}>
                Image
              </TableCell>
              <TableCell align="center" sx={{ color: "white", fontWeight: 700 }}>
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
                  <IconButton color="primary">
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    color="error"
                    onClick={() => handleDeleteCourse(item._id)}
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
