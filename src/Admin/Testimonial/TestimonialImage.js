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
// } from "@mui/material";
// import {
//   Add as AddIcon,
//   Delete as DeleteIcon,
// } from "@mui/icons-material";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import Swal from "sweetalert2";

// export default function TestimonialImage() {
//   const navigate = useNavigate();
//   const [apiData, setApiData] = useState([]);

//   useEffect(() => {
//     getData();
//   }, []);

//   const getData = async () => {
//     try {
//       const response = await axios.get(`${process.env.REACT_APP_BASE_ADMIN_URL}/testimonialImage`);
//       setApiData(response.data.testimonialImage);
//     } catch (error) {
//       console.error("Error fetching data:", error);
//     }
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
//         await axios.delete(`${process.env.REACT_APP_BASE_ADMIN_URL}/testimonialImage/${id}`);
//         setApiData((prevData) => prevData.filter((item) => item._id !== id));
//       } catch (error) { 
//         console.error("Error deleting blog:", error);
//       }
//     }
//   };


//   return (
//     <Box component="main" sx={{ width: "100%", flexGrow: 1, p: 3, bgcolor: "#E3F2FD", minHeight: "100vh", overflow: "auto" }}>

//       <Toolbar />
//       <Box display="flex" justifyContent="space-between" alignItems="center" sx={{ marginBottom: "20px" }}>
//         <Typography variant="h5" sx={{ fontFamily: "'Poppins', sans-serif", fontWeight: 500, color: "#0D47A1" }}>
//           Testimonial Image Management
//         </Typography>
//         <Button variant="contained" color="primary" startIcon={<AddIcon />} onClick={() => navigate("/admin/addTestimonialImage")}>
//           Create
//         </Button>
//       </Box>

//       <TableContainer component={Paper}>
//         <Table sx={{ minWidth: 650 }}>
//           <TableHead>
//             <TableRow sx={{ backgroundColor: "#1976D2", color: "white" }}>
//               <TableCell align="center" sx={{ color: "white",  fontWeight: 700 }}>Full Name</TableCell>
//               <TableCell align="center" sx={{ color: "white",fontWeight: 700 }}>Image</TableCell>
//               <TableCell align="center" sx={{ color: "white", fontWeight: 700 }}>Action</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {apiData.map((item) => (
//               <TableRow key={item._id}>
//                 <TableCell align="center">
//                     {item.name}
//                 </TableCell>
//                 <TableCell align="center">
//                   <img src={item.image} alt={item.heading} style={{ width: "70px", height: "70px" }} />
//                 </TableCell>
//                 <TableCell align="center">
//                       <IconButton color="error" onClick={() => handleUserDelete(item._id)}>
//                         <DeleteIcon />
//                       </IconButton>
                      
//                 </TableCell>
//               </TableRow>
//             ))}
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
  useMediaQuery,
  useTheme,
} from "@mui/material";
import {
  Add as AddIcon,
  Delete as DeleteIcon,
} from "@mui/icons-material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function TestimonialImage() {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md"));

  const [apiData, setApiData] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BASE_ADMIN_URL}/testimonialImage`);
      setApiData(response.data.testimonialImage || []);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
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
        await axios.delete(`${process.env.REACT_APP_BASE_ADMIN_URL}/testimonialImage/${id}`);
        setApiData((prevData) => prevData.filter((item) => item._id !== id));
        Swal.fire("Deleted!", "Testimonial image has been deleted.", "success");
      } catch (error) {
        console.error("Error deleting testimonial image:", error);
        Swal.fire("Error!", "Failed to delete testimonial image.", "error");
      }
    }
  };

  return (
    <Box
      component="main"
      sx={{
        width: "100%",
        flexGrow: 1,
        p: { xs: 1, sm: 2, md: 3 },
        bgcolor: "#E3F2FD",
        minHeight: "100vh",
        overflow: "auto",
      }}
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
          Testimonial Image Management
        </Typography>
        <Button
          variant="contained"
          color="primary"
          size={isMobile ? "small" : "medium"}
          startIcon={<AddIcon />}
          onClick={() => navigate("/admin/addTestimonialImage")}
        >
          Create
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
                  <Typography variant="subtitle2" fontWeight="bold">Image:</Typography>
                  <img
                    src={item.image}
                    alt={item.name || "Testimonial"}
                    style={{ width: "60px", height: "60px", borderRadius: "5px" }}
                  />
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
              No testimonial images found
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
                <TableCell align="center" sx={{ color: "white", fontWeight: 700 }}>Image</TableCell>
                <TableCell align="center" sx={{ color: "white", fontWeight: 700 }}>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {apiData.length > 0 ? (
                apiData.map((item) => (
                  <TableRow key={item._id}>
                    <TableCell align="center">{item.name}</TableCell>
                    <TableCell align="center">
                      <img
                        src={item.image}
                        alt={item.name || "Testimonial"}
                        style={{
                          width: isTablet ? "60px" : "70px",
                          height: isTablet ? "60px" : "70px",
                        }}
                      />
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
                      No testimonial images found
                    </Typography>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
}