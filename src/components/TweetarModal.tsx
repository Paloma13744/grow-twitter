import React, { useState } from "react";
import { Box, Button, Modal, TextField, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import tweetService from "../services/tweet.service";

type TweetModalProps =
  | { open: boolean; mode: "tweet"; onClose: () => void; onSuccess?: () => void }
  | { open: boolean; mode: "reply"; replyToId: string; onClose: () => void; onSuccess?: () => void };

const TweetarModal: React.FC<TweetModalProps> = (props) => {
  const { open, mode, onClose, onSuccess } = props;
  const [content, setContent] = useState("");

  const handleClose = () => {
    setContent("");
    onClose();
  };

  const handleSubmit = async () => {
    if (content.trim().length === 0) return;

    const res =
      mode === "tweet"
        ? await tweetService.createTweet(content)
        : await tweetService.replyTweet(props.replyToId, content);

    if (res.ok) {
      onSuccess?.();
      handleClose();
    } else {
      alert("Erro ao enviar!");
    }
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: 450, bgcolor: "background.paper", borderRadius: 3, boxShadow: 24, p: 3 }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
          <IconButton onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </Box>

        <TextField
          multiline
          minRows={4}
          fullWidth
          placeholder={mode === "reply" ? "Tweetar sua resposta" : "O que está acontecendo?"}
          variant="standard"
          InputProps={{ disableUnderline: true }}
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        <Button variant="contained" fullWidth onClick={handleSubmit} sx={{ mt: 2, textTransform: "none", borderRadius: "300px", bgcolor: "var(--color-blue-light)" }}>
          {mode === "reply" ? "Responder" : "Tweetar"}
        </Button>
      </Box>
    </Modal>
  );
};

export default TweetarModal;