import React, { useState, useEffect } from "react";
import { Modal, Box, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ContactForm from "../ContactUs/ContactForm";

const PopUpModal = () => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(true);
  }, []);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Modal 
      open={open} 
      onClose={handleClose}
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          bgcolor: "white",
          boxShadow: 24,
          borderRadius: 2,
          width: { xs: "90%", sm: "70%", md: "40%" }, // Adjusted width for better size
          maxHeight: "90vh", // Ensures it fits within viewport
          overflowY: "auto", // Enables scrolling if content overflows
          position: "relative",
        }}
      >
        <IconButton
          onClick={handleClose}
          sx={{
            position: "absolute",
            top: 8,
            right: 8,
            color: "red",
          }}
        >
          <CloseIcon />
        </IconButton>
        
        <ContactForm handleClose = {handleClose} />
      </Box>
    </Modal>
  );
};

export default PopUpModal;
