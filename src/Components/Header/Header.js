// import React, { useState } from "react";
// import {
//   Box,
//   Typography,
//   ListItemText,
//   IconButton,
//   MenuItem,
//   Menu,
//   Button,
// } from "@mui/material";
// import List from "@mui/material/List";
// import ListItem from "@mui/material/ListItem";
// import {
//   Instagram,
//   YouTube,
//   Menu as MenuIcon,
//   ExpandMore,
// } from "@mui/icons-material";
// import { Link, useNavigate } from "react-router-dom";

// const Header = ({ onCourseSelect }) => {
//   const [menuOpen, setMenuOpen] = useState(false);
//   const [anchorEl, setAnchorEl] = useState(null);

//   const navigate = useNavigate();

//   // Handle Dropdown Menu
//   const handleMenuClick = (event) => {
//     setAnchorEl(event.currentTarget);
//   };
//   const handleMenuClose = () => {
//     setAnchorEl(null);
//   };

//   const handleNavigate = () => {
//     navigate("/");
//   };

//   // Handle Course Selection
//   const handleCourseSelect = (course) => {
//     // onCourseSelect(course);
//     // handleMenuClose();
//     navigate("/Courses");
//   };

//   return (
//     <Box
//       sx={{
//         boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.1)",
//         display: "flex",
//         width: "100%",
//         justifyContent: "center", 
//         height: "80px",
//         zIndex: 10,
//         position: "fixed",
//         background: "#fff",
//         transition: "0.3s ease-in-out",
//         alignItems: "center",
//       }}
//     >
//       <Box
//         display="flex"
//         justifyContent="space-between"
//         alignItems="center"
//         sx={{ width: "90%", height: "100%" }}
//       >
//         {/* Logo */}
//         <Box sx={{ width: "150px", cursor: "pointer" }}>
//           <img
//             src={require("../../Assets/my-chess.png")}
//             width={"100%"}
//             alt={"logo"}
//             onClick={handleNavigate}
//           />
//         </Box>

//         {/* Mobile Menu Icon */}
//         <Box sx={{ display: { xs: "block", md: "none" } }}>
//           <IconButton onClick={() => setMenuOpen(!menuOpen)}>
//             <MenuIcon fontSize="large" />
//           </IconButton>
//         </Box>

//         {/* Navigation Menu */}
//         <Box
//           sx={{
//             display: { xs: menuOpen ? "flex" : "none", md: "flex" },
//             flexDirection: { xs: "column", md: "row" },
//             alignItems: "center",
//             width: { xs: "100%", md: "60%" },
//             backgroundColor: { xs: "#fff", md: "transparent" },
//             position: { xs: "absolute", md: "static" },
//             top: { xs: "80px", md: "auto" },
//             left: 0,
//             zIndex: 10,
//             padding: { xs: 2, md: 0 },
//             boxShadow: { xs: "0px 5px 10px rgba(0, 0, 0, 0.1)", md: "none" },
//           }}
//         >
//           <List
//             sx={{
//               display: "flex",
//               flexDirection: { xs: "column", md: "row" },
//               gap: 2,
//             }}
//           >
//             {/* View Courses with Dropdown */}
//             <ListItem
//               button
//               onClick={handleMenuClick}
//               sx={{ cursor: "pointer", fontWeight: "bold" }}
//             >
//               <ListItemText
//                 primary="Chess Coaching"
//                 primaryTypographyProps={{
//                   fontSize: "1rem",
//                   fontWeight: 600,
//                 }}
//               />
//               <ExpandMore />
//             </ListItem>

//             {/* Dropdown Items */}
//             <Menu
//               anchorEl={anchorEl}
//               open={Boolean(anchorEl)}
//               onClose={handleMenuClose}
//             >
//               <MenuItem onClick={() => handleCourseSelect("beginner")}>
//                 Beginner Online Coaching
//               </MenuItem>
//               <MenuItem onClick={() => handleCourseSelect("intermediate")}>
//                 Intermediate Online Coaching
//               </MenuItem>
//               <MenuItem onClick={() => handleCourseSelect("advanced")}>
//                 Advanced Online Coaching
//               </MenuItem>
//             </Menu>

//             {["About", "Blog", "Contact"].map((item, index) => (
//               <Link
//                 to={`/${item}`}
//                 key={index}
//                 style={{ textDecoration: "none" }}
//               >
//                 <ListItem
//                   button
//                   sx={{
//                     transition: "0.3s",
//                     "&:hover": {
//                       background: "#f5f5f5",
//                       borderRadius: "8px",
//                     },
//                   }}
//                 >
//                   <ListItemText
//                     primary={item.replace(/([A-Z])/g, " $1").trim()}
//                     primaryTypographyProps={{
//                       fontSize: "1rem",
//                       fontWeight: 600,
//                       color: "#333",
//                     }}
//                   />
//                 </ListItem>
//               </Link>
//             ))}
//           </List>
//         </Box>

//         {/* Login/Register and Social Icons */}
//         <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
//           <Link to={"/login"}>
//             <Button
//               variant="contained"
//               sx={{
//                 background: "#1976D2",
//                 color: "#fff",
//                 "&:hover": { background: "#1565C0" },
//                 fontSize: "0.875rem",
//                 fontWeight: "bold",
//                 textTransform: "none",
//                 padding: "6px 15px",
//                 borderRadius: "8px",
//               }}
//             >
//               Login/Register
//             </Button>
//           </Link>

//           {/* <IconButton
//             sx={{ color: "#E4405F", display: { xs: "none", md: "flex" } }}
//           >
//             <Instagram fontSize="large" />
//           </IconButton> */}
//           {/* <IconButton
//             sx={{ color: "#FF0000", display: { xs: "none", md: "flex" } }}
//           >
//             <YouTube fontSize="large" />
//           </IconButton> */}
//         </Box>
//       </Box>
//     </Box>
//   );
// };

// export default Header;


import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Menu,
  MenuItem,
  Button,
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  Drawer,
} from "@mui/material";
import { Menu as MenuIcon, ExpandMore, Instagram, YouTube } from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const navigate = useNavigate();

  // Open/Close Dropdown Menu
  const handleMenuClick = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  // Toggle Mobile Drawer
  const toggleDrawer = (open) => () => setDrawerOpen(open);

  return (
    <AppBar position="sticky" sx={{ background: "#fff", boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)" }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        
        {/* Logo */}
        <Box sx={{ cursor: "pointer", width: "150px" }} onClick={() => navigate("/")}>
          <img src={require("../../Assets/my-chess.png")} width="100%" alt="logo" />
        </Box>

        {/* Desktop Navigation */}
        <Box sx={{ display: { xs: "none", md: "flex" }, gap: 3, alignItems: "center" }}>
          {/* Chess Coaching Dropdown */}
          <Box sx={{ position: "relative" }}>
            <Button
              onClick={handleMenuClick}
              endIcon={<ExpandMore />}
              sx={{
                fontSize: "1rem",
                fontWeight: 600,
                color: "#333",
                textTransform: "none",
              }}
            >
              Chess Coaching
            </Button>
            <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
              <MenuItem onClick={() => navigate("/Courses/beginner")}>Beginner Online Coaching</MenuItem>
              <MenuItem onClick={() => navigate("/Courses/intermediate")}>Intermediate Online Coaching</MenuItem>
              <MenuItem onClick={() => navigate("/Courses/advanced")}>Advanced Online Coaching</MenuItem>
            </Menu>
          </Box>

          {["About", "Blog", "Contact"].map((item, index) => (
            <Link to={`/${item}`} key={index} style={{ textDecoration: "none" }}>
              <Button sx={{ fontSize: "1rem", fontWeight: 600, color: "#333", textTransform: "none" }}>
                {item}
              </Button>
            </Link>
          ))}

          {/* Login/Register */}
          <Link to="/login">
            <Button variant="contained" sx={{ background: "#1976D2", color: "#fff", borderRadius: "8px" }}>
              Login/Register
            </Button>
          </Link>
        </Box>

        {/* Mobile Menu Button */}
        <IconButton sx={{ display: { xs: "block", md: "none" } }} onClick={toggleDrawer(true)}>
          <MenuIcon fontSize="large" />
        </IconButton>

        {/* Mobile Drawer Menu */}
        <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)}>
          <Box sx={{ width: 250, padding: 2 }}>
            <List>
              <ListItem button onClick={handleMenuClick}>
                <ListItemText primary="Chess Coaching" />
                <ExpandMore />
              </ListItem>

              {["About", "Blog", "Contact"].map((item, index) => (
                <Link to={`/${item}`} key={index} style={{ textDecoration: "none", color: "inherit" }}>
                  <ListItem button>
                    <ListItemText primary={item} />
                  </ListItem>
                </Link>
              ))}

              <ListItem>
                <Link to="/login" style={{ textDecoration: "none", width: "100%" }}>
                  <Button variant="contained" fullWidth sx={{ background: "#1976D2", color: "#fff" }}>
                    Login/Register
                  </Button>
                </Link>
              </ListItem>
            </List>
          </Box>
        </Drawer>
      </Toolbar>
    </AppBar>
  );
};

export default Header;

