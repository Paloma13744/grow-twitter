import React, { useState } from "react";
import Menu from "../components/Menu";
import Card from "../components/Card";
import TweetModal from "../components/TweetarModal";

type ModalState =
  | { open: false }
  | { open: true; mode: "tweet" }
  | { open: true; mode: "reply"; replyToId: string };


const Profile : React.FC = () => {
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
          onSuccess={() => {}}
        />
      )}

      <div style={styles.center}>
        <h3>Perfil de </h3>
        <hr style={{ borderColor: "var(--border)" }} />
       
      </div>

      <div style={styles.right}>
        <Card />
      </div>
    </div>
  );
};


export default Profile


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