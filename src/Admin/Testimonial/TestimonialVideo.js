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
//   InputAdornment,
// } from "@mui/material";
// import {
//   Delete as DeleteIcon,
//   Search as SearchIcon,
// } from "@mui/icons-material";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import Swal from "sweetalert2";

// export default function TestimonialVideo() {
//   const [apiData, setApiData] = useState([]);
//   const navigate = useNavigate();
//   const userType = localStorage.getItem("userType");
//   if (userType !== "admin") {
//     navigate("/");
//   }
//   // Fetch testimonials
//   const getData = async () => {
//     try {
//       const response = await axios.get(
//         `${process.env.REACT_APP_BASE_ADMIN_URL}/testimonialVideo`
//       );
//       setApiData(response.data.testimonialVideo || []);
//       //   setFilteredData(response.data.testimonials || []);
//     } catch (error) {
//       console.error("Error fetching data:", error);
//     }
//   };

//   // Delete testimonial video

//   const handleUserDelete = async (id) => {
//     Swal.fire({
//       title: "Are you sure?",
//       text: "You won't be able to revert this!",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonColor: "#d33",
//       cancelButtonColor: "#3085d6",
//       confirmButtonText: "Yes, delete it!",
//     }).then(async (result) => {
//       if (result.isConfirmed) {
//         try {
//           await axios.delete(
//             `${process.env.REACT_APP_BASE_ADMIN_URL}/testimonialVideo/${id}`
//           );
//           setApiData((prevData) => prevData.filter((item) => item._id !== id));
//           Swal.fire("Deleted!", "Your testimonial has been deleted.", "success");
//         } catch (error) {
//           console.error("Error deleting testimonial:", error);
//           Swal.fire("Error!", "Something went wrong.", "error");
//         }
//       }
//     });
//   };

//   useEffect(() => {
//     getData();
//   }, []);

//   return (
//     <Box
//       component="main"
//       sx={{ flexGrow: 1, p: 3, bgcolor: "#E3F2FD", minHeight: "97vh" }}
//     >
//       <Toolbar />

//       {/* Header Section */}
//       <Box
//         display="flex"
//         justifyContent="space-between"
//         alignItems="center"
//         sx={{ marginBottom: "20px" }}
//       >
//         <Typography
//           variant="h5"
//           sx={{
//             fontFamily: "'Poppins', sans-serif",
//             fontWeight: 500,
//             color: "#0D47A1",
//           }}
//         >
//           Testimonial Management
//         </Typography>
//         <Button
//           onClick={() => navigate("/admin/addTestimonialVideo")}
//           variant="contained"
//           color="primary"
//         >
//           Add Video
//         </Button>
//       </Box>


//       {/* Table Section */}
//       <TableContainer component={Paper}>
//         <Table sx={{ minWidth: 650 }}>
//           <TableHead>
//             <TableRow sx={{ backgroundColor: "#1976D2", color: "white" }}>
//               <TableCell
//                 align="center"
//                 sx={{ color: "white", fontWeight: 700 }}
//               >
//                 Full Name
//               </TableCell>
//               <TableCell
//                 align="center"
//                 sx={{ color: "white", fontWeight: 700 }}
//               >
//                 Video
//               </TableCell>
//               <TableCell
//                 align="center"
//                 sx={{ color: "white", fontWeight: 700 }}
//               >
//                 Action
//               </TableCell>
//             </TableRow>
//           </TableHead>

//           <TableBody>
//             {apiData.length > 0 ? (
//               apiData.map((item) => (
//                 <TableRow key={item._id}>
//                   <TableCell align="center">{item.name}</TableCell>
//                   <TableCell align="center">{item.video}</TableCell>
//                   <TableCell align="center">
//                     <IconButton
//                       color="error"
//                       onClick={() => handleUserDelete(item._id)}
//                     >
//                       <DeleteIcon />
//                     </IconButton>
//                   </TableCell>
//                 </TableRow>
//               ))
//             ) : (
//               <TableRow>
//                 <TableCell colSpan={3} align="center">
//                   <Typography variant="body1" color="textSecondary">
//                     No testimonials found
//                   </Typography>
//                 </TableCell>
//               </TableRow>
//             )}
//           </TableBody>
//         </Table>
//       </TableContainer>
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
  Modal,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import {
  Delete as DeleteIcon,
  Visibility as VisibilityIcon,
  Close as CloseIcon,
} from "@mui/icons-material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

// Modal style with responsive adjustments
const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: { xs: "90%", sm: "75%", md: "50%" }, // Responsive width
  maxWidth: 600,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: { xs: 2, sm: 3, md: 4 }, // Responsive padding
  borderRadius: 2,
  maxHeight: "80vh",
  overflowY: "auto",
};

export default function TestimonialVideo() {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md"));

  const [apiData, setApiData] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const userType = localStorage.getItem("userType");
  if (userType !== "admin") {
    navigate("/");
  }

  const getData = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BASE_ADMIN_URL}/testimonialVideo`);
      setApiData(response.data.testimonialVideo || []);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

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
          await axios.delete(`${process.env.REACT_APP_BASE_ADMIN_URL}/testimonialVideo/${id}`);
          setApiData((prevData) => prevData.filter((item) => item._id !== id));
          Swal.fire("Deleted!", "Your testimonial video has been deleted.", "success");
        } catch (error) {
          console.error("Error deleting testimonial:", error);
          Swal.fire("Error!", "Something went wrong.", "error");
        }
      }
    });
  };

  const truncateText = (text, maxLength = isMobile ? 20 : isTablet ? 40 : 60) => {
    if (!text) return "";
    if (text.length <= maxLength) return text;
    return `${text.substring(0, maxLength)}...`;
  };

  const handleViewDetails = (item) => {
    setSelectedItem(item);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedItem(null);
  };

  useEffect(() => {
    getData();
  }, []);

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
          Testimonial Video Management
        </Typography>
        <Button
          onClick={() => navigate("/admin/addTestimonialVideo")}
          variant="contained"
          color="primary"
          size={isMobile ? "small" : "medium"}
        >
          Add Video
        </Button>
      </Box>

      {/* Table Section (Responsive) */}
      {isMobile ? (
        // Mobile: Card layout
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          {apiData.length > 0 ? (
            apiData.map((item) => (
              <Paper key={item._id} sx={{ p: 2, borderRadius: 2 }}>
                <Box sx={{ mb: 1 }}>
                  <Typography variant="subtitle2" fontWeight="bold">Full Name:</Typography>
                  <Typography variant="body2">{item.name}</Typography>
                </Box>
                <Box sx={{ mb: 1 }}>
                  <Typography variant="subtitle2" fontWeight="bold">Video:</Typography>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <Typography variant="body2">{truncateText(item.video)}</Typography>
                    <IconButton color="info" onClick={() => handleViewDetails(item)}>
                      <VisibilityIcon />
                    </IconButton>
                  </Box>
                </Box>
                <Box sx={{ display: "flex", gap: 1, justifyContent: "flex-end" }}>
                  <IconButton color="error" onClick={() => handleUserDelete(item._id)}>
                    <DeleteIcon />
                  </IconButton>
                </Box>
              </Paper>
            ))
          ) : (
            <Typography variant="body1" color="textSecondary" align="center">
              No testimonial videos found
            </Typography>
          )}
        </Box>
      ) : (
        // Desktop/Tablet: Table layout
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: { xs: 0, sm: 650 } }}>
            <TableHead>
              <TableRow sx={{ backgroundColor: "#1976D2", color: "white" }}>
                <TableCell align="center" sx={{ color: "white", fontWeight: 700 }}>Full Name</TableCell>
                <TableCell align="center" sx={{ color: "white", fontWeight: 700 }}>Video</TableCell>
                <TableCell align="center" sx={{ color: "white", fontWeight: 700 }}>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {apiData.length > 0 ? (
                apiData.map((item) => (
                  <TableRow key={item._id}>
                    <TableCell align="center">{item.name}</TableCell>
                    <TableCell align="center">
                      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 1 }}>
                        <Typography>{truncateText(item.video)}</Typography>
                      </Box>
                    </TableCell>
                    <TableCell align="center">
                      <IconButton color="error" onClick={() => handleUserDelete(item._id)}>
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={3} align="center">
                    <Typography variant="body1" color="textSecondary">
                      No testimonial videos found
                    </Typography>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {/* View Details Modal */}
      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="view-testimonial-video-modal"
        aria-describedby="view-testimonial-video-details"
      >
        <Box sx={modalStyle}>
          {selectedItem && (
            <>
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                mb={2}
              >
                <Typography variant={isMobile ? "h6" : "h5"} component="h2">
                  Testimonial Video Details
                </Typography>
                <IconButton onClick={handleCloseModal}>
                  <CloseIcon />
                </IconButton>
              </Box>
              <Box mb={2}>
                <Typography variant="subtitle1" fontWeight="bold">Full Name:</Typography>
                <Typography variant="body1">{selectedItem.name}</Typography>
              </Box>
              <Box mb={2}>
                <Typography variant="subtitle1" fontWeight="bold">Video URL:</Typography>
                <Typography variant="body1" sx={{ wordBreak: "break-all" }}>
                  {selectedItem.video}
                </Typography>
              </Box>
            </>
          )}
        </Box>
      </Modal>
    </Box>
  );
}