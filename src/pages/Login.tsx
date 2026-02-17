import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
} from "@mui/material";
import userService from "../services/user.service";
import { setCredentials } from "../store/authSlice";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [erro, setErro] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErro("");
    setLoading(true);

    const res = await userService.login(username, password);

    if (!res.ok || !res.data) {
      setErro(res.message || "Login inválido");
      setLoading(false);
      return;
    }

    const { authToken, username: returnedUsername } = res.data;

    localStorage.setItem("auth_token", authToken);
    dispatch(setCredentials({ token: authToken, username: returnedUsername }));

    setLoading(false);
    navigate("/feed");
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "#f5f5f5",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        px: 2,
      }}
    >
      <Card
        sx={{
          width: "100%",
          maxWidth: 1200,
          borderRadius: 3,
          boxShadow: 3,
          overflow: "hidden",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
          }}
        >
          <Box
            sx={{
              flex: 1,
              bgcolor: "var(--color-blue-light)",
              color: "#fff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              p: 5,
            }}
          >
            <CardContent
              sx={{
                p: 0,
                maxWidth: 520,
              }}
            >
              <Typography variant="h4" fontWeight={700} gutterBottom>
                Growtwitter
              </Typography>

              <Typography
                variant="subtitle2"
                sx={{ opacity: 0.9, mb: 2 }}
              >
                Trabalho final do bloco intermediário
              </Typography>

              <Typography variant="body1" sx={{ lineHeight: 1.6 }}>
                O Growtwitter é a plataforma definitiva para todos os apaixonados
                por redes sociais que buscam uma experiência familiar e
                poderosa, semelhante ao Twitter, mas com um toque único. Seja
                parte desta comunidade que valoriza a liberdade de expressão, a
                conexão com pessoas de todo o mundo e a disseminação de ideias.
              </Typography>
            </CardContent>
          </Box>

          <Box
            sx={{
              flex: 1,
              bgcolor: "#fff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              p: 5,
            }}
          >
            <CardContent sx={{ p: 0, width: "100%", maxWidth: 380 }}>
              <Typography
                variant="h5"
                fontWeight={600}
                textAlign="center"
                color= "var(--color-black)"
                gutterBottom
              >
                Entrar no Growtwitter
              </Typography>

              <Box
                component="form"
                onSubmit={handleSubmit}
                sx={{
                  mt: 3,
                  display: "flex",
                  flexDirection: "column",
                  gap: 2,
                }}
              >
                <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}>
                  <Typography variant="body2" color= "var(--color-gray-light)">
                    Username
                  </Typography>

                  <TextField
                    variant="outlined"
                    fullWidth
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    size="small"
                  />
                </Box>

                <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}>
                  <Typography variant="body2" color= "var(--color-gray-light)">
                    Password
                  </Typography>

                  <TextField
                    type="password"
                    variant="outlined"
                    fullWidth
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    size="small"
                  />
                </Box>

                {erro && (
                  <Typography variant="body2" color="error">
                    {erro}
                  </Typography>
                )}

                <Button
                  type="submit"
                  variant="contained"
                  fullWidth
                  sx={{
                    mt: 1,
                    textTransform: "none",
                    bgcolor:"var(--color-blue-light)",
                    ":hover": { bgcolor: "#1A8CD8" },
                  }}
                  disabled={loading}
                >
                  {loading ? "Entrando..." : "Entrar"}
                </Button>
              </Box>
            </CardContent>
          </Box>

        </Box>
      </Card>
    </Box>
  );
};

export default Login;