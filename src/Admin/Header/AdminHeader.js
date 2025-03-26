import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  CssBaseline,
  IconButton,
  Tooltip,
  Button,
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useNavigate } from "react-router-dom";

export default function AdminHeader() {
  const navigate = useNavigate();

  return (
    <>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
          background: "linear-gradient(90deg, #3B82F6 0%, #1E40AF 100%)",
          boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.2)",
          padding: "5px 0",
        }}
      >
        <Toolbar
          sx={{
            justifyContent: "space-between",
            paddingX: "20px",
            px: { xs: 10 },
          }}
        >
          {/* Admin Panel Title */}
          <Typography
            variant="h5"
            component="div"
            sx={{
              mt: 1.2,
              fontFamily: "'Poppins', sans-serif",
              fontWeight: "600",
              letterSpacing: "1px",
              color: "#F3F4F6",
            }}
          >
            Chess Learning
          </Typography>

          {/* Profile Icon with Tooltip */}
          <Tooltip title="Profile">
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "#2563EB", // Blue button
                  color: "#fff",
                  textTransform: "none",
                  fontWeight: "bold",
                  "&:hover": {
                    backgroundColor: "#1E40AF",
                  },
                }}
                onClick={() => navigate("/home")}
              >
                GoTo website
              </Button>
            <IconButton
              sx={{ color: "#F3F4F6", "&:hover": { color: "#E5E7EB" } }}
            >
              <AccountCircleIcon sx={{ fontSize: 36 }} />
            </IconButton>
          </Tooltip>
        </Toolbar>
      </AppBar>
    </>
  );
}
