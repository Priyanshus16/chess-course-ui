import { useState } from "react";
import { Box, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import VolumeOffIcon from "@mui/icons-material/VolumeOff";

const FloatingVideo = () => {
  const [showVideo, setShowVideo] = useState(true);
  const [isMuted, setIsMuted] = useState(true);

  if (!showVideo) return null;

  return (
    <Box
      sx={{
        position: "fixed",
        bottom: "10px",
        left: "10px",
        width: "250px",
        height: "150px",
        background: "#000",
        boxShadow: 3,
        borderRadius: "10px",
        overflow: "hidden",
        zIndex: 1000,
      }}
    >
      {/* Close Button */}
      <IconButton
        sx={{
          position: "absolute",
          top: "5px",
          right: "5px",
          color: "#fff",
          background: "rgba(0,0,0,0.5)",
          borderRadius: "50%",
          "&:hover": { background: "rgba(0,0,0,0.8)" },
        }}
        size="small"
        onClick={() => setShowVideo(false)}
      >
        <CloseIcon fontSize="small" />
      </IconButton>

      {/* Mute/Unmute Button */}
      <IconButton
        sx={{
          position: "absolute",
          bottom: "5px",
          right: "5px",
          color: "#fff",
          background: "rgba(0,0,0,0.5)",
          borderRadius: "50%",
          "&:hover": { background: "rgba(0,0,0,0.8)" },
        }}
        size="small"
        onClick={() => setIsMuted(!isMuted)}
      >
        {isMuted ? (
          <VolumeOffIcon fontSize="small" />
        ) : (
          <VolumeUpIcon fontSize="small" />
        )}
      </IconButton>

      {/* YouTube Video */}
      <iframe
        id="floating-video"
        width="100%"
        height="100%"
        src={`https://www.youtube-nocookie.com/embed/1ap-gram7_0?autoplay=1&mute=${
          isMuted ? 1 : 0
        }&cc_load_policy=0&iv_load_policy=3`}
        title="YouTube Video"
        allow="autoplay; encrypted-media"
        allowFullScreen
      ></iframe>
    </Box>
  );
};

export default FloatingVideo;
