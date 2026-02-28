import React from "react";
import type { Tweet } from "../models/tweet";

interface Props {
  tweet: Tweet;
  onReply: (id: string) => void;
  onLike: (id: string) => void;
  onUnlike: (id: string) => void;
  onDelete: (id: string) => void;
}

const TweetItem: React.FC<Props> = ({
  tweet,
  onReply,
  onLike,
  onUnlike,
  onDelete,
}) => {
  const likesCount = tweet.likes ?? 0;
  const repliesCount = tweet.replies?.length ?? 0;

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <img
          src={tweet.user.imageUrl}
          alt="avatar"
          style={styles.avatar}
        />

        <div>
          <strong>{tweet.user.name}</strong>{" "}
          <span style={styles.username}>@{tweet.user.username} · 3h</span>
        </div>
      </div>

      <p style={styles.content}>{tweet.content}</p>

      <div style={styles.actions}>

        <button style={styles.actionBtn} onClick={() => onReply(tweet.id)}>
          💬 {repliesCount}
        </button>

        <button style={styles.actionBtn} onClick={() => onLike(tweet.id)}>
          ❤️ {likesCount}
        </button>


        <button style={styles.actionBtn} onClick={() => onUnlike(tweet.id)}>
          💔
        </button>

        <button style={styles.actionBtn} onClick={() => onDelete(tweet.id)}>
          🗑️
        </button>

      </div>

      {repliesCount > 0 && <div style={styles.replyLine}></div>}
    </div>
  );
};

export default TweetItem;

const styles: Record<string, React.CSSProperties> = {
  container: {
    borderBottom: "1px solid #ddd",
    padding: "14px",
    position: "relative",
  },

  header: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
  },

  avatar: {
    width: "42px",
    height: "42px",
    borderRadius: "50%",
    objectFit: "cover",
  },

  username: {
    color: "#777",
    fontSize: "13px",
  },

  content: {
    marginTop: "8px",
    marginBottom: "12px",
    fontSize: "15px",
  },

  actions: {
    display: "flex",
    gap: "20px",
    marginTop: "6px",
  },

  actionBtn: {
    background: "transparent",
    border: "none",
    cursor: "pointer",
    fontSize: "16px",
    display: "flex",
    alignItems: "center",
    gap: "5px",
  },

  replyLine: {
    width: "2px",
    height: "40px",
    background: "#ddd",
    position: "absolute",
    left: "32px",
    top: "70px",
  },
};