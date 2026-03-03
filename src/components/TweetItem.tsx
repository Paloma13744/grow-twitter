import React, { useCallback, useEffect, useState } from "react";
import type { Tweet } from "../models/tweet";
import type { Comment } from "../models/comments";

import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import DeleteIcon from "@mui/icons-material/Delete";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";

import { api } from "../config/api";

interface Props {
  tweet: Tweet;
  onReply: (id: string) => void;
  onLike: (id: string) => void;
  onUnlike: (id: string) => void;
  onDelete: (id: string) => void;
}

const TweetItem: React.FC<Props> = ({ tweet, onReply, onLike, onUnlike, onDelete }) => {
  const likesCount = (tweet as any)?.likesCount ?? (tweet as any)?.likes ?? 0;
  const repliesCount = (tweet as any)?.repliesCount ?? (tweet as any)?.commentsCount ?? 0;
  const isLikedByMe = (tweet as any)?.isLikedByMe ?? false;

  const [openThread, setOpenThread] = useState(false);
  const [loadingThread, setLoadingThread] = useState(false);
  const [comments, setComments] = useState<Comment[]>([]);
  const [threadError, setThreadError] = useState<string | null>(null);

  const fetchComments = useCallback(async () => {
    setLoadingThread(true);
    setThreadError(null);

    try {
      const res = await api.get(`/tweets/${tweet.id}/comments`);

      const payload = (res as any)?.data;
      const list = payload?.data ?? payload?.comments ?? payload?.replies ?? [];
      setComments(Array.isArray(list) ? list : []);
    } catch (e: any) {
      setComments([]);
      setThreadError("Não foi possível carregar as respostas.");
      console.error("Erro ao buscar comentários:", e);
    } finally {
      setLoadingThread(false);
    }
  }, [tweet.id]);

  const handleToggleThread = async () => {
    const next = !openThread;
    setOpenThread(next);
    if (next) await fetchComments();
  };


  useEffect(() => {
    if (openThread) fetchComments();
  }, [openThread, repliesCount, fetchComments]);

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <img src={tweet.user?.imageUrl} alt="avatar" style={styles.avatar} />
        <div>
          <strong>{tweet.user?.name}</strong>{" "}
          <span style={styles.username}>@{tweet.user?.username} · 3h</span>
        </div>
      </div>

      <p style={styles.content}>{tweet.content}</p>

      <div style={styles.actions}>
        <button
          style={{ ...styles.actionBtn, color: "var(--color-gray-light)" }}
          onClick={() => {
            onReply(tweet.id);
            setOpenThread(true);
          }}
        >
          <ChatBubbleIcon /> {repliesCount}
        </button>

        <button
          style={{
            ...styles.actionBtn,
            color: isLikedByMe ? "red" : "var(--color-gray-light)",
          }}
          onClick={() => (isLikedByMe ? onUnlike(tweet.id) : onLike(tweet.id))}
        >
          {isLikedByMe ? <FavoriteIcon /> : <FavoriteBorderIcon />} {likesCount}
        </button>

        <button
          style={{ ...styles.actionBtn, color: "var(--color-gray-light)" }}
          onClick={() => onDelete(tweet.id)}
        >
          <DeleteIcon />
        </button>
      </div>

      {repliesCount > 0 && (
        <button style={styles.viewRepliesBtn} onClick={handleToggleThread}>
          {openThread ? "Ocultar respostas" : "Ver respostas"}
        </button>
      )}

      {openThread && (
        <div style={styles.thread}>
          {loadingThread && <div style={styles.threadInfo}>Carregando respostas...</div>}

          {!loadingThread && threadError && (
            <div style={{ ...styles.threadInfo, color: "#d33" }}>{threadError}</div>
          )}

          {!loadingThread && !threadError && comments.length === 0 && (
            <div style={styles.threadInfo}>Nenhuma resposta ainda.</div>
          )}

          {!loadingThread &&
            !threadError &&
            comments.map((c) => (
              <div key={c.id} style={styles.commentItem}>
                <img
                  src={c.user?.imageUrl || tweet.user?.imageUrl}
                  alt="avatar"
                  style={styles.commentAvatar}
                />

                <div style={styles.commentBody}>
                  <div style={styles.commentHeader}>
                    <strong>{c.user?.name}</strong>
                    <span style={styles.commentUsername}>@{c.user?.username}</span>
                  </div>
                  <div style={styles.commentContent}>{c.content}</div>
                </div>
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default TweetItem;

const styles: Record<string, React.CSSProperties> = {
  container: { borderBottom: "1px solid #ddd", padding: "14px" },
  header: { display: "flex", alignItems: "center", gap: "12px" },
  avatar: { width: "42px", height: "42px", borderRadius: "50%", objectFit: "cover" },
  username: { color: "#777", fontSize: "13px" },
  content: { marginTop: "8px", marginBottom: "12px", fontSize: "15px" },

  actions: { display: "flex", gap: "20px", marginTop: "6px" },
  actionBtn: {
    background: "transparent",
    border: "none",
    cursor: "pointer",
    fontSize: "16px",
    display: "flex",
    alignItems: "center",
    gap: "5px",
  },

  viewRepliesBtn: {
    marginTop: "8px",
    background: "transparent",
    border: "none",
    cursor: "pointer",
    color: "var(--color-blue-light)",
    padding: 0,
    fontSize: "13px",
  },

  thread: { marginTop: "12px", paddingLeft: "54px", borderLeft: "2px solid #eee" },
  threadInfo: { color: "#777", fontSize: "13px", margin: "6px 0" },

  commentItem: {
    display: "flex",
    gap: "10px",
    padding: "10px 0",
    borderBottom: "1px solid #f2f2f2",
  },
  commentAvatar: { width: "34px", height: "34px", borderRadius: "50%", objectFit: "cover" },
  commentBody: { flex: 1 },
  commentHeader: { display: "flex", gap: "8px", alignItems: "baseline" },
  commentUsername: { color: "#777", fontSize: "12px" },
  commentContent: { marginTop: "4px", fontSize: "14px" },
};