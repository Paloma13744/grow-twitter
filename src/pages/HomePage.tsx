import React, { useCallback, useEffect, useState } from "react";
import Menu from "../components/Menu";
import TweetModal from "../components/TweetarModal";
import Card from "../components/Card";
import TweetItem from "../components/TweetItem";

import tweetService from "../services/tweet.service";
import type { Tweet } from "../models/tweet";

type ModalState =
  | { open: false }
  | { open: true; mode: "tweet" }
  | { open: true; mode: "reply"; replyToId: string };

const HomePage: React.FC = () => {
  const [modal, setModal] = useState<ModalState>({ open: false });
  const [feed, setFeed] = useState<Tweet[]>([]);
  const [loading, setLoading] = useState(true);

  const loadFeed = useCallback(async () => {
    setLoading(true);
    try {
      const res = await tweetService.getFeed();
      setFeed(res.ok && Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error("Erro ao carregar feed:", err);
      setFeed([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadFeed();
  }, [loadFeed]);

  const openTweetModal = () => setModal({ open: true, mode: "tweet" });
  const openReplyModal = (tweetId: string) =>
    setModal({ open: true, mode: "reply", replyToId: tweetId });
  const closeModal = () => setModal({ open: false });

  const handleLike = async (id: string) => {
    await tweetService.likeTweet(id);
    loadFeed();
  };

  const handleUnlike = async (id: string) => {
    await tweetService.unlikeTweet(id);
    loadFeed();
  };

  const handleDelete = async (id: string) => {
    await tweetService.deleteTweet(id);
    loadFeed();
  };

  return (
    <div style={styles.layout}>
      <div style={styles.left}>
        <Menu onOpenTweetModal={openTweetModal} />
      </div>

      {modal.open && modal.mode === "tweet" && (
        <TweetModal
          key="tweet"
          open={true}
          mode="tweet"
          onClose={closeModal}
          onSuccess={loadFeed}
        />
      )}

      {modal.open && modal.mode === "reply" && (
        <TweetModal
          key={`reply-${modal.replyToId}`}
          open={true}
          mode="reply"
          replyToId={modal.replyToId}
          onClose={closeModal}
          onSuccess={loadFeed}
        />
      )}

      <div style={styles.center}>
        <h3>Página Inicial</h3>
        <hr style={{ borderColor: "var(--border)" }} />

        {loading && <p>Carregando tweets...</p>}
        {!loading && feed.length === 0 && <p>Nenhum tweet encontrado.</p>}

        {!loading &&
          feed.map((tweet) => (
            <TweetItem
              key={tweet.id}
              tweet={tweet}
              onReply={openReplyModal}
              onLike={handleLike}
              onUnlike={handleUnlike}
              onDelete={handleDelete}
            />
          ))}
      </div>

      <div style={styles.right}>
        <Card />
      </div>
    </div>
  );
};

export default HomePage;

const styles: Record<string, React.CSSProperties> = {
  layout: {
    display: "flex",
    justifyContent: "center",
    width: "100%",
    marginTop: "20px",
  },
  left: {
    width: "25%",
    display: "flex",
    justifyContent: "flex-end",
    paddingRight: "20px",
  },
  center: {
    width: "45%",
    borderRight: "1px solid var(--border)",
    padding: "0 20px",
  },
  right: {
    width: "25%",
    paddingLeft: "20px",
  },
};