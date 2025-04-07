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
  Collapse,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";

// Icons
import PeopleIcon from "@mui/icons-material/People";
import FormatQuoteIcon from "@mui/icons-material/FormatQuote";
import SchoolIcon from "@mui/icons-material/School";
import ArticleIcon from "@mui/icons-material/Article";
import LogoutIcon from "@mui/icons-material/Logout";
import RateReviewIcon from "@mui/icons-material/RateReview";
import ImageIcon from "@mui/icons-material/Image";
import VideoLibraryIcon from "@mui/icons-material/VideoLibrary";

const menuItems = [
  { text: "Users", icon: <PeopleIcon />, path: "/admin/Users" },
  { text: "Courses", icon: <SchoolIcon />, path: "/admin/course" },
  {
    text: "Testimonials",
    icon: <FormatQuoteIcon />,
    subItems: [
      {
        text: "Testimonials",
        icon: <RateReviewIcon />,
        path: "/admin/testimonials",
      },
      {
        text: "Testimonial Image",
        icon: <ImageIcon />,
        path: "/admin/testimonialImage",
      },
      {
        text: "Testimonial Video",
        icon: <VideoLibraryIcon />,
        path: "/admin/testimonialVideo",
      },
    ],
  },
  { text: "Curriculum", icon: <SchoolIcon />, path: "/admin/curriculum" },
  { text: "Blogs", icon: <ArticleIcon />, path: "/admin/adminBlog" },
  {
    text: "Banner",
    icon: <FormatQuoteIcon />,
    subItems: [
      {
        text: "Home Banner",
        icon: <RateReviewIcon />,
        path: "/admin/banner",
      },
      {
        text: "Advance Banner",
        icon: <ImageIcon />,
        path: "/admin/advanceBanner",
      },
      {
        text: "Intermediate Banner",
        icon: <VideoLibraryIcon />,
        path: "/admin/intermediateBanner",
      },
      {
        text: "Beginner Banner",
        icon: <VideoLibraryIcon />,
        path: "/admin/beginnerBanner",
      },
    ],
  },
  {
    text: "Benefits Cards",
    icon: <FormatQuoteIcon />,
    subItems: [
      {
        text: "Advance Benefits",
        icon: <RateReviewIcon />,
        path: "/admin/advanceBenefit",
      },
      {
        text: "Intermediate Benefits",
        icon: <ImageIcon />,
        path: "/admin/intermediateBenefit",
      },
      {
        text: "Beginner Benefits",
        icon: <VideoLibraryIcon />,
        path: "/admin/beginnerBenefit",
      },
    ],
  },
  { text: "Chess Store", icon: <ArticleIcon />, path: "/admin/store" },
  { text: "Contact Detail", icon: <ArticleIcon />, path: "/admin/contactDetail" },
];

export default function Sidebar() {
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  const [openDropdowns, setOpenDropdowns] = React.useState({});

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  const handleDropdownClick = (menuText) => {
    setOpenDropdowns((prevState) => ({
      ...prevState,
      [menuText]: !prevState[menuText],
    }));
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
          <Typography
            sx={{
              fontSize: "18px",
              fontWeight: "bold",
              textAlign: "center",
              mb: 2,
              color: "#444",
              paddingLeft: "15px",
            }}
          >
            Admin Panel
          </Typography>

          {/* Profile Section */}
          <List>
            <ListItem
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                mb: 2,
              }}
            >
              <img
                src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                height="64px"
                width="60px"
                alt="profileImg"
                style={{
                  borderRadius: "50%",
                  border: "2px solid #ddd",
                  padding: 5,
                }}
              />
              <Typography sx={{ fontSize: "14px", color: "#666", mt: 1 }}>
                Welcome, Admin
              </Typography>
            </ListItem>
          </List>

          <Divider sx={{ backgroundColor: "#ccc" }} />

          {/* Sidebar Menu Items */}
          <List>
            {menuItems.map((item) => (
              <React.Fragment key={item.text}>
                {item.subItems ? (
                  <>
                    <ListItemButton
                      onClick={() => handleDropdownClick(item.text)}
                      sx={{
                        color: "#444",
                        borderRadius: "8px",
                        "&:hover": { backgroundColor: "#e0e0e0" },
                      }}
                    >
                      <ListItemIcon sx={{ color: "#0077b6" }}>
                        {item.icon}
                      </ListItemIcon>
                      <ListItemText primary={item.text} />
                      {openDropdowns[item.text] ? (
                        <ExpandLess />
                      ) : (
                        <ExpandMore />
                      )}
                    </ListItemButton>
                    <Collapse
                      in={openDropdowns[item.text]}
                      timeout="auto"
                      unmountOnExit
                    >
                      <List component="div" disablePadding>
                        {item.subItems.map((subItem) => (
                          <ListItemButton
                            key={subItem.text}
                            onClick={() => navigate(subItem.path)}
                            sx={{
                              pl: 4,
                              color: "#444",
                              borderRadius: "8px",
                              "&:hover": { backgroundColor: "#e0e0e0" },
                            }}
                          >
                            <ListItemIcon sx={{ color: "#0077b6" }}>
                              {subItem.icon}
                            </ListItemIcon>
                            <ListItemText primary={subItem.text} />
                          </ListItemButton>
                        ))}
                      </List>
                    </Collapse>
                  </>
                ) : (
                  <ListItem disablePadding>
                    <ListItemButton
                      onClick={() => navigate(item.path)}
                      sx={{
                        color: "#444",
                        borderRadius: "8px",
                        "&:hover": { backgroundColor: "#e0e0e0" },
                      }}
                    >
                      <ListItemIcon sx={{ color: "#0077b6" }}>
                        {item.icon}
                      </ListItemIcon>
                      <ListItemText primary={item.text} />
                    </ListItemButton>
                  </ListItem>
                )}
              </React.Fragment>
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
