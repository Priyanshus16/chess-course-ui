// import React, { useState } from "react";
// import {
//   TextField,
//   Button,
//   Container,
//   Typography,
//   Box,
//   Avatar,
//   InputLabel,
//   Select,
//   MenuItem,
//   InputAdornment,
// } from "@mui/material";
// import {
//   School,
//   Description,
//   Timelapse,
//   MonetizationOn,
//   CloudUpload,
// } from "@mui/icons-material";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import Swal from "sweetalert2";
// import {
//   Editor,
//   EditorProvider,
//   Toolbar,
//   BtnBold,
//   BtnItalic,
//   BtnUnderline,
//   BtnUndo,
//   BtnRedo,
// } from "react-simple-wysiwyg";

// const AddCourses = () => {
//   const navigate = useNavigate();
//   const cloud_name = "dvheeoqcn";

//   const [formData, setFormData] = useState({
//     title: "",
//     description: "",
//     duration: "",
//     curricullum: "",
//     price: "",
//     image: null,
//     imagePreview: null,
//     courseLevel: "beginner",
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value,
//     });
//   };

//   const handleEditorChange = (fieldName, value) => {
//     setFormData({
//       ...formData,
//       [fieldName]: value,
//     });
//   };

//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setFormData({
//         ...formData,
//         image: file,
//         imagePreview: URL.createObjectURL(file),
//       });
//     }
//     Swal.fire("Image uploaded successfully!");
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       let imageUrl = "";

//       if (formData.image) {
//         const imageData = new FormData();
//         imageData.append("file", formData.image);
//         imageData.append("upload_preset", "chess-course");
//         imageData.append("folder", "courses");

//         const cloudinaryRes = await axios.post(
//           `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`,
//           imageData
//         );
//         imageUrl = cloudinaryRes.data.secure_url;
//       }

//       const finalData = {
//         ...formData,
//         image: imageUrl,
//         curricullum: formData.curricullum
//         .split("\n")
//         .filter((point) => point.trim() !== ""),
//       };
//       console.log(finalData);

//       // if (
//       //   !finalData.title ||
//       //   !finalData.duration ||
//       //   !finalData.price ||
//       //   !finalData.description ||
//       //   !finalData.curricullum ||
//       //   !finalData.image
//       // ) {
//       //   return Swal.fire("Please provide all fields.");
//       // }

//       await axios.post(
//         `${process.env.REACT_APP_BASE_ADMIN_URL}/addCourses`,
//         finalData
//       );
//       navigate("/admin/course");
//     } catch (error) {
//       console.error(error, "Error while sending data");
//     }
//   };

//   return (
//     <EditorProvider>
//       <Container maxWidth="sm">
//         <Box
//           sx={{
//             mt: 10,
//             p: 4,
//             boxShadow: 4,
//             borderRadius: 3,
//             bgcolor: "#F8FAFC",
//             textAlign: "center",
//             fontFamily: "'Poppins', sans-serif",
//           }}
//         >
//           <Typography
//             variant="h4"
//             gutterBottom
//             sx={{ fontWeight: "600", color: "#1E3A8A" }}
//           >
//             Add Course
//           </Typography>

//           <form>
//             {/* Title */}
//             <TextField
//               label="Title"
//               fullWidth
//               name="title"
//               value={formData.title}
//               onChange={handleChange}
//               margin="normal"
//               InputProps={{
//                 startAdornment: (
//                   <InputAdornment position="start">
//                     <School sx={{ color: "#1E3A8A" }} />
//                   </InputAdornment>
//                 ),
//               }}
//             />

//             {/* Description */}
//             <Box sx={{ mt: 2, mb: 2 }}>
//               <Typography
//                 variant="body1"
//                 sx={{ textAlign: "left", mb: 1, color: "#1E3A8A" }}
//               >
//                 Description
//               </Typography>
//               <Toolbar>
//                 <BtnUndo />
//                 <BtnRedo />
//                 <BtnBold />
//                 <BtnItalic />
//                 <BtnUnderline />
//               </Toolbar>
//               <Editor
//                 value={formData.description}
//                 onChange={(e) =>
//                   handleEditorChange("description", e.target.value)
//                 }
//                 containerProps={{
//                   style: {
//                     border: "1px solid #ccc",
//                     borderRadius: 4,
//                     padding: 8,
//                     textAlign: "left",
//                     minHeight: 100,
//                     verticalAlign: "top",
//                   },
//                 }}
//               />
//             </Box>

//             {/* curriculum */}

//             <Box sx={{ mt: 2, mb: 2 }}>
//               <Typography
//                 variant="body1"
//                 sx={{ textAlign: "left", mb: 1, color: "#1E3A8A" }}
//               >
//                 Curriculum
//               </Typography>
//               <Toolbar>
//                 <BtnUndo />
//                 <BtnRedo />
//                 <BtnBold />
//                 <BtnItalic />
//                 <BtnUnderline />
//               </Toolbar>
//               <Editor
//                 value={formData.curricullum}
//                 onChange={(e) =>
//                   handleEditorChange("curricullum", e.target.value)
//                 }
//                 containerProps={{
//                   style: {
//                     border: "1px solid #ccc",
//                     borderRadius: 4,
//                     padding: 8,
//                     textAlign: "left",
//                     minHeight: 100,
//                     verticalAlign: "top",
//                   },
//                 }}
//               />
//             </Box>

//             {/* Duration */}

//             <Box
//               sx={{ display: "flex", justifyContent: "space-between", gap: 2 }}
//             >
//               <TextField
//                 label="Duration"
//                 fullWidth
//                 name="duration"
//                 value={formData.duration}
//                 onChange={handleChange}
//                 margin="normal"
//                 InputProps={{
//                   startAdornment: (
//                     <InputAdornment position="start">
//                       <Timelapse sx={{ color: "#1E3A8A" }} />
//                     </InputAdornment>
//                   ),
//                 }}
//               />

//               {/* Price */}
//               <TextField
//                 label="Price"
//                 fullWidth
//                 name="price"
//                 value={formData.price}
//                 onChange={handleChange}
//                 margin="normal"
//                 InputProps={{
//                   startAdornment: (
//                     <InputAdornment position="start">
//                       <MonetizationOn sx={{ color: "#1E3A8A" }} />
//                     </InputAdornment>
//                   ),
//                 }}
//               />
//             </Box>

//             {/* Course Level */}

//             <Box></Box>

//             <InputLabel sx={{ textAlign: "left", mt: 2, color: "#1E3A8A" }}>
//               Course Level
//             </InputLabel>

//             <Select
//               fullWidth
//               name="courseLevel"
//               value={formData.courseLevel}
//               onChange={handleChange}
//               sx={{
//                 bgcolor: "white",
//                 borderRadius: 1,
//                 "&:focus": { bgcolor: "white" },
//               }}
//             >
//               <MenuItem value="beginner">Beginner</MenuItem>
//               <MenuItem value="intermediate">Intermediate</MenuItem>
//               <MenuItem value="advance">Advanced</MenuItem>
//             </Select>

//             {/* Image Upload */}
//             <Box
//               display="flex"
//               flexDirection="column"
//               alignItems="center"
//               mt={3}
//             >
//               <Avatar
//                 src={formData.imagePreview}
//                 sx={{ width: 70, height: 70, mb: 2, border: "2px solid #ccc" }}
//               />
//               <Button
//                 variant="contained"
//                 component="label"
//                 startIcon={<CloudUpload />}
//                 sx={{
//                   backgroundColor: "#1976d2",
//                   color: "#fff",
//                   fontWeight: "bold",
//                   "&:hover": { backgroundColor: "#1565c0" },
//                 }}
//               >
//                 Upload THumbnail
//                 <input onChange={handleFileChange} type="file" hidden />
//               </Button>
//             </Box>

//             {/* Submit Button */}
//             <Button
//               type="submit"
//               variant="contained"
//               fullWidth
//               onClick={handleSubmit}
//               sx={{
//                 mt: 3,
//                 bgcolor: "#0F172A",
//                 "&:hover": { bgcolor: "#1E293B" },
//                 color: "white",
//                 fontWeight: "bold",
//                 p: 1.5,
//                 borderRadius: 2,
//               }}
//             >
//               Submit Course
//             </Button>
//           </form>
//         </Box>
//       </Container>
//     </EditorProvider>
//   );
// };

// export default AddCourses;

import React, { useState } from "react";
import {
  TextField,
  Button,
  Container,
  Typography,
  Box,
  Avatar,
  InputLabel,
  Select,
  MenuItem,
  InputAdornment,
} from "@mui/material";
import {
  School,
  Timelapse,
  MonetizationOn,
  CloudUpload,
} from "@mui/icons-material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const AddCourses = () => {
  const navigate = useNavigate();
  const cloud_name = "dvheeoqcn";

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    duration: "",
    curricullum: "",
    price: "",
    image: null,
    imagePreview: null,
    courseLevel: "beginner",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({
        ...formData,

        image: file,
        imagePreview: URL.createObjectURL(file),
      });
    }
    Swal.fire("Image uploaded successfully!");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let imageUrl = "";

      if (formData.image) {
        const imageData = new FormData();
        imageData.append("file", formData.image);
        imageData.append("upload_preset", "chess-course");
        imageData.append("folder", "courses");

        const cloudinaryRes = await axios.post(
          `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`,
          imageData
        );
        imageUrl = cloudinaryRes.data.secure_url;
      }

      const finalData = {
        ...formData,
        image: imageUrl,
        curricullum: formData.curricullum
          .split("\n")
          .filter((point) => point.trim() !== ""),
      };

      if (!finalData.title || !finalData.duration || !finalData.price || !finalData.description || !finalData.curricullum || !finalData.image) {
        return Swal.fire("Please provide all fields.");
      }

      console.log(finalData);

      await axios.post(
        `${process.env.REACT_APP_BASE_ADMIN_URL}/addCourses`,
        finalData
      );
      navigate("/admin/course");
    } catch (error) {
      console.error(error, "Error while sending data");
    }
  };

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          mt: 10,
          p: 4,
          boxShadow: 4,
          borderRadius: 3,
          bgcolor: "#F8FAFC",
          textAlign: "center",
        }}
      >
        <Typography
          variant="h4"
          gutterBottom
          sx={{ fontWeight: "600", color: "#1E3A8A" }}
        >
          Add Course
        </Typography>

        <form>
          <TextField
            label="Title"
            fullWidth
            name="title"
            value={formData.title}
            onChange={handleChange}
            margin="normal"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <School sx={{ color: "#1E3A8A" }} />
                </InputAdornment>
              ),
            }}
          />

          <TextField
            label="Description"
            fullWidth
            name="description"
            value={formData.description}
            onChange={handleChange}
            margin="normal"
            multiline
            rows={4}
          />

          <TextField
            label="Curriculum"
            fullWidth
            name="curricullum"
            value={formData.curricullum}
            onChange={handleChange}
            margin="normal"
            multiline
            rows={4}
          />

          <Box
            sx={{ display: "flex", justifyContent: "space-between", gap: 2 }}
          >
            <TextField
              label="Duration"
              fullWidth
              name="duration"
              value={formData.duration}
              onChange={handleChange}
              margin="normal"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Timelapse sx={{ color: "#1E3A8A" }} />
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              label="Price"
              fullWidth
              name="price"
              value={formData.price}
              onChange={handleChange}
              margin="normal"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <MonetizationOn sx={{ color: "#1E3A8A" }} />
                  </InputAdornment>
                ),
              }}
            />
          </Box>

          <InputLabel sx={{ textAlign: "left", mt: 2, color: "#1E3A8A" }}>
            Course Level
          </InputLabel>
          <Select
            fullWidth
            name="courseLevel"
            value={formData.courseLevel}
            onChange={handleChange}
            sx={{ bgcolor: "white", borderRadius: 1 }}
          >
            <MenuItem value="beginner">Beginner</MenuItem>
            <MenuItem value="intermediate">Intermediate</MenuItem>
            <MenuItem value="advance">Advanced</MenuItem>
          </Select>

          <Box display="flex" flexDirection="column" alignItems="center" mt={3}>
            <Avatar
              src={formData.imagePreview}
              sx={{ width: 70, height: 70, mb: 2, border: "2px solid #ccc" }}
            />
            <Button
              variant="contained"
              component="label"
              startIcon={<CloudUpload />}
              sx={{
                backgroundColor: "#1976d2",
                color: "#fff",
                fontWeight: "bold",
              }}
            >
              Upload Thumbnail
              <input onChange={handleFileChange} type="file" hidden />
            </Button>
          </Box>

          <Button
            type="submit"
            variant="contained"
            fullWidth
            onClick={handleSubmit}
            sx={{
              mt: 3,
              bgcolor: "#0F172A",
              color: "white",
              fontWeight: "bold",
              p: 1.5,
              borderRadius: 2,
            }}
          >
            Submit Course
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default AddCourses;
