import React, { useEffect, useState, useCallback } from "react";
import Menu from "../components/Menu";
import TweetModal from "../components/TweetarModal";
import Card from "../components/Card";
import TweetItem from "../components/TweetItem";

import tweetService from "../services/tweet.service";
import type { Tweet } from "../models/tweet";

const HomePage = () => {
  const [openModal, setOpenModal] = useState(false);
  const [feed, setFeed] = useState<Tweet[]>([]);
  const [loading, setLoading] = useState(true);


  const loadFeed = useCallback(async () => {
    try {
      setLoading(true);

      const res = await tweetService.getFeed();

      if (res.ok && Array.isArray(res.data)) {
        setFeed(res.data);
      } else {
        setFeed([]); 
      }

    } catch (err) {
      console.error("Erro ao carregar feed:", err);
      setFeed([]);
    } finally {
      setLoading(false);
    }
  }, []);

  // ============================
  // EXECUTA AO INICIAR A PÁGINA
  // ============================
  useEffect(() => {
    loadFeed();
  }, [loadFeed]);

 

  const handleReply = async (id: string) => {
    console.log("reply tweet", id);
  };

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
        <Menu onOpenTweetModal={() => setOpenModal(true)} />
      </div>

      <TweetModal open={openModal} onClose={() => setOpenModal(false)} />

      <div style={styles.center}>
        <h3>Página Inicial</h3>
        <hr />

        {loading && <p>Carregando tweets...</p>}

        {!loading && feed.length === 0 && <p>Nenhum tweet encontrado.</p>}

        {!loading &&
          feed.map((tweet) => (
            <TweetItem
              key={tweet.id}
              tweet={tweet}
              onReply={handleReply}
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
    borderLeft: "1px solid #eee",
    borderRight: "1px solid #eee",
    padding: "0 20px",
  },

  right: {
    width: "25%",
    paddingLeft: "20px",
  },
};