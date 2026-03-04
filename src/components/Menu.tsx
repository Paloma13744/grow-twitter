import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import logo from "../assets/logo.png";

import {
  Box,
  Button,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Avatar,
  Typography,
  Stack,
  Divider,
} from "@mui/material";

import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import TagOutlinedIcon from "@mui/icons-material/TagOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import LogoutIcon from "@mui/icons-material/Logout";

import { clearAuth } from "../store/authSlice";
import type { RootState } from "../store";

const Menu: React.FC<{ onOpenTweetModal: () => void }> = ({ onOpenTweetModal }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { token, username, name, email, imageUrl } = useSelector(
    (state: RootState) => state.auth
  );

  if (!token) {
    return null;
  }

  const handleLogout = () => {
    dispatch(clearAuth());
    localStorage.removeItem("auth_token");
    navigate("/");
  };

  return (
    <Box
      component="nav"
      sx={{
        width: 230,
        minHeight: "100vh", 
        py: 2,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        borderRight: 1,
        borderColor: "divider",
        bgcolor: "var(--background-color)"
      }}
    >
      <Box>
        <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 3 }}>
          <img src={logo} alt="logo grow" style={{ width: "auto", marginLeft: "15px" }} />
        </Stack>

        <List sx={{ mb: 2 }}>
          <NavLink to="/feed" style={{ textDecoration: "none", color: "inherit" }}>
            <ListItemButton
              sx={{
                borderRadius: "999px",
                mb: 1
              }}
            >
              <ListItemIcon sx={{ minWidth: 40 }}>
                <HomeOutlinedIcon />
              </ListItemIcon>

              <ListItemText
                primary="Página Inicial"
                primaryTypographyProps={{
                  fontFamily: "var(--font-family)",
                  fontSize: "14px",
                }}
              />
            </ListItemButton>

          </NavLink>

          <NavLink to="/explore" style={{ textDecoration: "none", color: "inherit" }}>
            <ListItemButton
              sx={{
                borderRadius: "999px",
                mb: 1
              }}
            >
              <ListItemIcon sx={{ minWidth: 40 }}>
                <TagOutlinedIcon />
              </ListItemIcon>
              <ListItemText primary="Explorar"
                primaryTypographyProps={{
                  fontFamily: "var(--font-family)",
                  fontSize: "14px",
                }}

              />
            </ListItemButton>

          </NavLink>

          <NavLink
            to={`/profile/${username}`}
            style={{ textDecoration: "none", color: "inherit" }}
          >

            <ListItemButton
              sx={{
                borderRadius: "900px",
                mb: 1
              }}
            >
              <ListItemIcon sx={{ minWidth: 40 }}>
                <PersonOutlineOutlinedIcon />
              </ListItemIcon>
              <ListItemText primary="Perfil"
                primaryTypographyProps={{
                  fontFamily: "var(--font-family)",
                  fontSize: "14px",
                }} />
            </ListItemButton>

          </NavLink>
        </List>

        <Button
          variant="contained"
          fullWidth
          onClick={onOpenTweetModal}
          sx={{
            width: "90%",
            borderRadius: "999px",
            py: 1.2,
            textTransform: "none",
            fontWeight: 400,
            bgcolor: "var(--color-blue-light)",
            marginRight: "5px"
          }}
        >
          Tweetar
        </Button>
      </Box>

      <Box>
        <Divider sx={{ mb: 1 }} />

        <Stack direction="row" spacing={1.5} alignItems="center" sx={{ mb: 1.5 }}>
          <Avatar
            src={imageUrl || undefined}
            alt={name || "Usuário"}
            sx={{ width: 40, height: 40 }}
          >
            {name?.[0] ?? "?"}
          </Avatar>

          <Box sx={{ overflow: "hidden" }}>
            <Typography variant="subtitle2" noWrap sx={{ fontWeight: 600 }}>
              {name}
            </Typography>

            <Typography variant="body2" noWrap sx={{ color: "text.secondary" }}>
              @{username}
            </Typography>

            {email && (
              <Typography variant="caption" noWrap sx={{ color: "text.secondary" }}>
                {email}
              </Typography>
            )}
          </Box>
        </Stack>

        <Button
          variant="outlined"
          fullWidth
          startIcon={<LogoutIcon />}
          onClick={handleLogout}
          sx={{
            textTransform: "none",
            fontWeight: 600,
            width: "90%"
          }}
        >
          Sair
        </Button>
      </Box>
    </Box>
  );
};

export default Menu;