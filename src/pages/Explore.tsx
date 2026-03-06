import React, { useState } from "react";
import Menu from "../components/Menu";
import Card from "../components/Card";
import TweetModal from "../components/TweetarModal";

type ModalState =
  | { open: false }
  | { open: true; mode: "tweet" }
  | { open: true; mode: "reply"; replyToId: string };

const Explore: React.FC = () => {
  const [modal, setModal] = useState<ModalState>({ open: false });

  const openTweetModal = () => setModal({ open: true, mode: "tweet" });
  const closeModal = () => setModal({ open: false });

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
          onSuccess={() => { }}
        />
      )}

      <div style={styles.center}>
        <h3>Explorar</h3>
        <hr style={{ borderColor: "var(--border)" }} />

        <div style={{ marginTop: 10 }}>
          <p style={styles.topicCategory}>Esportes · há 45 min</p>
          <h4 style={styles.topicTitle}>Assunto sobre esportes</h4>

          <p style={styles.topicCategory}>Assunto do Momento no Brasil</p>
          <h4 style={styles.topicTitle}>Assunto do Momento</h4>

          <p style={styles.topicCategory}>Música · Assunto do Momento</p>
          <h4 style={styles.topicTitle}>Assunto sobre Música</h4>

          <p style={styles.topicCategory}>Cinema · Assunto do Momento</p>
          <h4 style={styles.topicTitle}>Assunto sobre Filmes e Cinema</h4>

          <p style={styles.topicCategory}>Entretenimento · Assunto do Momento</p>
          <h4 style={styles.topicTitle}>Assunto sobre Entretenimento</h4>

          <p style={styles.topicCategory}>Assunto do Momento em Porto Alegre</p>
          <h4 style={styles.topicTitle}>Assunto do Momento em Porto Alegre</h4>

          <p style={styles.topicCategory}>Daphne · Principal Assunto do Momento</p>
          <h4 style={styles.topicTitle}>Assunto sobre a Daphne</h4>
        </div>
      </div>

      <div style={styles.right}>
        <Card />
      </div>
    </div>
  );
};

export default Explore;

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

  topicCategory: {
    margin: "0 0 2px 0",
    fontSize: "12px",
    color: "gray",
  },
  topicTitle: {
    margin: "0 0 14px 0",
    fontSize: "14px",
    fontWeight: 700,
  },
};