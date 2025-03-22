import * as React from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Drawer,
  Toolbar,
  List,
  Typography,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  IconButton,
  Divider,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

// Icons
import PeopleIcon from "@mui/icons-material/People";
import FormatQuoteIcon from "@mui/icons-material/FormatQuote";
import SchoolIcon from "@mui/icons-material/School";
import ArticleIcon from "@mui/icons-material/Article";
import LogoutIcon from "@mui/icons-material/Logout";

const menuItems = [
  { text: "Users", icon: <PeopleIcon />, path: "/admin/Users" },
  { text: "Courses", icon: <PeopleIcon />, path: "/admin/course" },
  { text: "Testimonials", icon: <FormatQuoteIcon />, path: "/admin/testimonials" },
  { text: "Curriculum", icon: <SchoolIcon />, path: "/admin/curriculum" },
  { text: "Blogs", icon: <ArticleIcon />, path: "/admin/adminBlog" },
  // { text: "Youtube Video", icon: <YouTubeIcon />, path: "/admin/addYoutube" }, 
];

export default function Sidebar() {
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <>
      {/* Sidebar Toggle Button (Fixed Left Position) */}
      <IconButton
        color="inherit"
        onClick={() => setOpen(!open)}
        sx={{
          position: "fixed",
          top: 20,
          left: 15,
          zIndex: 1400,
          backgroundColor: "#fff",
          borderRadius: "50%",
          boxShadow: 3,
          transition: "transform 0.3s ease-in-out",
          "&:hover": { backgroundColor: "#e0e0e0" },
        }}
      >
        <MenuIcon sx={{ fontSize: 30, color: "#333" }} />
      </IconButton>

      {/* Sidebar Drawer */}
      <Drawer
        variant="persistent"
        open={open}
        sx={{
          width: open ? 260 : 0,
          transition: "width 0.3s ease-in-out",
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: 260,
            backgroundColor: "#F4F6F8",
            color: "#333",
            boxSizing: "border-box",
            transition: "width 0.3s ease-in-out",
            borderRight: "2px solid #ddd",
          },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: "auto", p: 2 }}>
          
          {/* Admin Panel Title (Shifted Slightly Right) */}
          <Typography
            sx={{
              fontSize: "18px",
              fontWeight: "bold",
              textAlign: "center",
              mb: 2,
              color: "#444",
              paddingLeft: "15px", // Moves text slightly right
            }}
          >
            Admin Panel
          </Typography>

          {/* Profile Section */}
          <List>
            <ListItem sx={{ display: "flex", flexDirection: "column", alignItems: "center", mb: 2 }}>
              <img
                src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                height="64px"
                width="60px"
                alt="profileImg"
                style={{ borderRadius: "50%", border: "2px solid #ddd", padding: 5 }}
              />
              <Typography sx={{ fontSize: "14px", color: "#666", mt: 1 }}>
                Welcome, Admin
              </Typography>
            </ListItem>
          </List>

          <Divider sx={{ backgroundColor: "#ccc" }} />

          {/* Sidebar Menu Items */}
          <List>
            {menuItems.map(({ text, icon, path }) => (
              <ListItem key={text} disablePadding>
                <ListItemButton
                  onClick={() => navigate(path)}
                  sx={{
                    color: "#444",
                    borderRadius: "8px",
                    "&:hover": { backgroundColor: "#e0e0e0" },
                  }}
                >
                  <ListItemIcon sx={{ color: "#0077b6" }}>{icon}</ListItemIcon>
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>

          <Divider sx={{ backgroundColor: "#ccc", mt: 2 }} />

          {/* Logout Button */}
          <List>
            <ListItem disablePadding>
              <ListItemButton
                onClick={handleLogout}
                sx={{
                  color: "#fff",
                  backgroundColor: "#d32f2f",
                  borderRadius: "8px",
                  "&:hover": { backgroundColor: "#b71c1c" },
                }}
              >
                <ListItemIcon sx={{ color: "#fff" }}>
                  <LogoutIcon />
                </ListItemIcon>
                <ListItemText primary="Logout" />
              </ListItemButton>
            </ListItem>
          </List>
        </Box>
      </Drawer>
    </>
  );
}
