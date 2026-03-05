import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Menu from "../components/Menu";
import Card from "../components/Card";
import TweetItem from "../components/TweetItem";
import TweetModal from "../components/TweetarModal";

import userService from "../services/user.service";
import tweetService from "../services/tweet.service";

import type { User } from "../models/user";
import type { Tweet } from "../models/tweet";

type ModalState =
  | { open: false }
  | { open: true; mode: "tweet" }
  | { open: true; mode: "reply"; replyToId: string };

function readAuthFromStorage(): { token: string | null; username: string | null } {
  try {
    const raw = localStorage.getItem("growtweet_auth");
    if (raw) {
      const parsed = JSON.parse(raw) as { token?: string; username?: string };
      const token = parsed?.token ?? null;
      const username = parsed?.username ?? null;

      if (token) localStorage.setItem("auth_token", token);
      if (username) localStorage.setItem("auth_username", username);

      return { token, username };
    }
  } catch {}

  return {
    token: localStorage.getItem("auth_token"),
    username: localStorage.getItem("auth_username"),
  };
}

const Profile: React.FC = () => {
  const { username: usernameParam } = useParams<{ username: string }>();
  const navigate = useNavigate();

  const auth = useMemo(() => readAuthFromStorage(), []);
  const usernameToShow = usernameParam ?? auth.username;

  const [modal, setModal] = useState<ModalState>({ open: false });
  const [loading, setLoading] = useState(true);

  const [user, setUser] = useState<User | null>(null);
  const [tweets, setTweets] = useState<Tweet[]>([]);

  const [isFollowing, setIsFollowing] = useState(false);
  const [followLoading, setFollowLoading] = useState(false);

  const isOwnProfile = useMemo(() => {
    if (!auth.username || !usernameToShow) return false;
    return auth.username === usernameToShow;
  }, [auth.username, usernameToShow]);

  const loadProfile = useCallback(async () => {
    if (!usernameToShow) {
      navigate("/login");
      return;
    }

    setLoading(true);

    try {
      const profileRes = await userService.getProfileByUsername(usernameToShow);
      const profile = profileRes.ok ? profileRes.data : null;

      if (!profile) {
        setUser(null);
        setTweets([]);
        setIsFollowing(false);
        return;
      }

      setUser(profile);


      const tweetsRes = await tweetService.getTweetsByUser(profile.id);
      const list = tweetsRes.ok && Array.isArray(tweetsRes.data) ? tweetsRes.data : [];
      setTweets(list);

      const loggedUsername = auth.username;
      const followers = (profile as any)?.followers as User[] | undefined;

      if (loggedUsername && Array.isArray(followers)) {
        setIsFollowing(followers.some((f) => f?.username === loggedUsername));
      } else {
        setIsFollowing(false);
      }
    } catch (err) {
      console.error("Erro ao carregar perfil:", err);
      setUser(null);
      setTweets([]);
      setIsFollowing(false);
    } finally {
      setLoading(false);
    }
  }, [auth.username, navigate, usernameToShow]);

  useEffect(() => {
    loadProfile();
  }, [loadProfile]);

  const openTweetModal = () => setModal({ open: true, mode: "tweet" });
  const openReplyModal = (tweetId: string) =>
    setModal({ open: true, mode: "reply", replyToId: tweetId });
  const closeModal = () => setModal({ open: false });

  const handleFollowToggle = async () => {
    if (!user) return;

      if (isOwnProfile) {
      alert("Você não pode seguir a si mesmo.");
      return;
    }

    setFollowLoading(true);
    try {
      if (isFollowing) {
        const res = await userService.unfollowUser(user.id);
        if (!res.ok) {
          alert(res.message ?? "Não foi possível deixar de seguir.");
          return;
        }
        setIsFollowing(false);
      } else {
        const res = await userService.followUser(user.id);
        if (!res.ok) {
          alert(res.message ?? "Não foi possível seguir.");
          return;
        }
        setIsFollowing(true);
      }

      await loadProfile();
    } finally {
      setFollowLoading(false);
    }
  };

  const handleLike = async (id: string) => {
    await tweetService.likeTweet(id);
    loadProfile();
  };

  const handleUnlike = async (id: string) => {
    await tweetService.unlikeTweet(id);
    loadProfile();
  };

  const handleDelete = async (id: string) => {
    const res = await tweetService.deleteTweet(id);

    if (res.ok) {
      setTweets((prev) => prev.filter((t) => t.id !== id));
      return;
    }

    alert("Não é possível deletar o tweet de outra pessoa. Tente deletar somente o seu.");
    console.error("Erro ao deletar:", res.message);
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
          onSuccess={loadProfile}
        />
      )}

      {modal.open && modal.mode === "reply" && (
        <TweetModal
          key={`reply-${modal.replyToId}`}
          open={true}
          mode="reply"
          replyToId={modal.replyToId}
          onClose={closeModal}
          onSuccess={loadProfile}
        />
      )}

      <div style={styles.center}>
        <div style={styles.headerRow}>
          <div>
            <h3 style={{ margin: 0 }}>Perfil de @{usernameToShow ?? ""}</h3>
            <p style={{ margin: "4px 0 0 0", color: "gray", fontSize: 12 }}>
              {tweets.length} tweets
            </p>
          </div>

          {!isOwnProfile && user && (
            <button
              style={{
                ...styles.followBtn,
                ...(isFollowing ? styles.unfollowBtn : null),
                opacity: followLoading ? 0.7 : 1,
                cursor: followLoading ? "not-allowed" : "pointer",
              }}
              onClick={handleFollowToggle}
              disabled={followLoading}
            >
              {isFollowing ? "Unfollow" : "Follow"}
            </button>
          )}
        </div>

        {loading && <p>Carregando perfil...</p>}
        {!loading && !user && <p>Usuário não encontrado.</p>}

        {!loading && user && (
          <div style={styles.profileCard}>
            <div style={styles.banner} />
            <div style={styles.avatarWrap}>
              <img src={user.imageUrl} alt={user.username} style={styles.avatar} />
            </div>
            <div style={{ padding: "12px 16px 16px" }}>
              <h3 style={{ margin: "6px 0 2px" }}>{user.name}</h3>
              <p style={{ margin: 0, color: "gray" }}>@{user.username}</p>
            </div>
          </div>
        )}

        {!loading &&
          user &&
          tweets.map((tweet) => (
            <TweetItem
              key={tweet.id}
              tweet={tweet}
              onReply={openReplyModal}
              onLike={handleLike}
              onUnlike={handleUnlike}
              onDelete={handleDelete}
            />
          ))}

        {!loading && user && tweets.length === 0 && (
          <p style={{ color: "gray" }}>Nenhum tweet encontrado.</p>
        )}
      </div>

      <div style={styles.right}>
        <Card />
      </div>
    </div>
  );
};

export default Profile;

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
  headerRow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "12px",
    marginBottom: "8px",
  },
  followBtn: {
    padding: "8px 14px",
    borderRadius: "999px",
    border: "1px solid var(--border)",
    cursor: "pointer",
    fontWeight: 600,
    background: "var(--color-blue-light)",
    color: "#fff",
  },
  unfollowBtn: {
    background: "#fff",
    color: "#111",
  },
  profileCard: {
    border: "1px solid var(--border)",
    borderRadius: "5px",
    overflow: "hidden",
    marginBottom: "12px",
  },
  banner: {
    height: "110px",
    background: "var(--color-blue-light)",
  },
  avatarWrap: {
    paddingLeft: "16px",
    marginTop: "-40px",
  },
  avatar: {
    width: "80px",
    height: "80px",
    borderRadius: "50%",
    border: "1px solid #fff",
    objectFit: "cover",
    background: "#eee",
  },
};