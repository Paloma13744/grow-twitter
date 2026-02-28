import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Box, Button, Modal, TextField, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import tweetService from "../services/tweet.service";
import type { RootState } from "../store";

interface TweetModalProps {
  open: boolean;
  onClose: () => void;
}

const TweetModal: React.FC<TweetModalProps> = ({ open, onClose }) => {
  const [content, setContent] = useState("");

  const token = useSelector((state: RootState) => state.auth.token);

  const handleCreateTweet = async () => {
    if (!token) {
      alert("Você precisa estar autenticado!");
      return;
    }

    if (content.trim().length === 0) return;

    const res = await tweetService.createTweet(content);

    if (res.ok) {
      setContent("");
      onClose();
    } else {
      alert("Erro ao criar tweet!");
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 450,
          bgcolor: "background.paper",
          borderRadius: 3,
          boxShadow: 24,
          p: 3,
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>

        <TextField
          multiline
          minRows={4}
          fullWidth
          placeholder="O que está acontecendo?"
          variant="standard"
          InputProps={{ disableUnderline: true }}
          sx={{
            "& .MuiInputBase-root": {
              padding: 0,
              fontSize: "14px",
              marginLeft: "10px",
              fontFamily: "var(--font-family)",
            },
          }}
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        <Button
          variant="contained"
          fullWidth
          sx={{
            mt: 2,
            textTransform: "none",
            borderRadius: "300px",
            backgroundColor: "var(--color-blue-light)"
          }}
          onClick={handleCreateTweet}
        >
          Tweetar
        </Button>
      </Box>
    </Modal>
  );
};

export default TweetModal;