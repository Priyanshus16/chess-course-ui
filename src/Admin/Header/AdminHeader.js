// import React from "react";
// import {
//   AppBar,
//   Toolbar,
//   Typography,
//   CssBaseline,
//   IconButton,
//   Tooltip,
//   Button,
// } from "@mui/material";
// import AccountCircleIcon from "@mui/icons-material/AccountCircle";
// import { useNavigate } from "react-router-dom";

// export default function AdminHeader() {
//   const navigate = useNavigate();

//   return (
//     <>
//       <CssBaseline />
//       <AppBar
//         position="fixed"
//         sx={{
//           zIndex: (theme) => theme.zIndex.drawer + 1,
//           background: "linear-gradient(90deg, #3B82F6 0%, #1E40AF 100%)",
//           boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.2)",
//           padding: "5px 0",
//         }}
//       >
//         <Toolbar
//           sx={{
//             justifyContent: "space-between",
//             paddingX: "20px",
//             px: { xs: 10 },
//           }}
//         >
//           {/* Admin Panel Title */}
//           <Typography
//             variant="h5"
//             component="div"
//             sx={{
//               mt: 1.2,
//               fontFamily: "'Poppins', sans-serif",
//               fontWeight: "600",
//               letterSpacing: "1px",
//               color: "#F3F4F6",
//             }}
//           >
//             Chess Learning
//           </Typography>

//           {/* Profile Icon with Tooltip */}
//           <Tooltip title="Profile">
//               <Button
//                 variant="contained"
//                 sx={{
//                   backgroundColor: "#2563EB", // Blue button
//                   color: "#fff",
//                   textTransform: "none",
//                   fontWeight: "bold",
//                   "&:hover": {
//                     backgroundColor: "#1E40AF",
//                   },
//                 }}
//                 onClick={() => navigate("/home")}
//               >
//                 GoTo website
//               </Button>
//             <IconButton
//               sx={{ color: "#F3F4F6", "&:hover": { color: "#E5E7EB" } }}
//             >
//               <AccountCircleIcon sx={{ fontSize: 36 }} />
//             </IconButton>
//           </Tooltip>
//         </Toolbar>
//       </AppBar>
//     </>
//   );
// }

import React from "react";
import {
  AppBar,
  Toolbar,
  CssBaseline,
  IconButton,
  Tooltip,
  Button,
  Box,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate } from "react-router-dom";

export default function AdminHeader({ toggleDrawer }) {
  const navigate = useNavigate();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
          background: "linear-gradient(90deg, #3B82F6 0%, #1E40AF 100%)",
          boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.2)",
          py: 1,
        }}
      >
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
            px: { xs: 1, sm: 2, md: 3 },
          }}
        >
          {/* Left side container */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              minWidth: 0,
              flex: 1,
            }}
          >
            {/* Sidebar toggle - mobile only */}
            <IconButton
              color="inherit"
              edge="start"
              onClick={toggleDrawer}
              sx={{
                mr: 1,
                display: { xs: "flex", sm: "none" }, // Only on mobile
              }}
            >
              <MenuIcon />
            </IconButton>
          </Box>

          {/* Right side container */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              ml: "auto",
              flexShrink: 0,
            }}
          >
            {/* Desktop button */}
            <Button
              variant="contained"
              size="medium"  // Fixed size for desktop
              sx={{
                backgroundColor: "#2563EB",
                color: "#fff",
                textTransform: "none",
                fontWeight: "bold",
                "&:hover": { backgroundColor: "#1E40AF" },
                display: { xs: "none", sm: "flex" }, // Hidden on mobile
              }}
              onClick={() => navigate("/home")}
            >
              GoTo website
            </Button>

            {/* Mobile button */}
            <Button
              variant="contained"
              size="small"
              sx={{
                backgroundColor: "#2563EB",
                color: "#fff",
                minWidth: "auto",
                px: 1,
                display: { xs: "flex", sm: "none" }, // Only on mobile
              }}
              onClick={() => navigate("/home")}
            >
              Home
            </Button>

            {/* Profile icon */}
            <Tooltip title="Profile">
              <IconButton
                sx={{
                  color: "#F3F4F6",
                  "&:hover": { color: "#E5E7EB" },
                  p: { xs: "6px", sm: "8px" },
                }}
              >
                <AccountCircleIcon sx={{ fontSize: { xs: 30, sm: 36 } }} />
              </IconButton>
            </Tooltip>
          </Box>
        </Toolbar>
      </AppBar>
    </>
  );
}