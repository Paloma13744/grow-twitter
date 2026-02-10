import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setToken } from "../store/slice/authSlice";
import userService from "../services/user.service";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [erro, setErro] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErro("");

    const res = await userService.login(username, password);

    if (res.ok && res.token) {
      localStorage.setItem("token", res.token);
      dispatch(setToken(res.token));
      navigate("/");
    } else {
      setErro(res.message || "Login inválido");
    }
  };

  return (
    <div className="login-card">
      <h1>Growtwitter</h1>
      <p>Trabalho final do bloco intermediário</p>
      <p>
        O Growtwitter é a plataforma definitiva para todos os apaixonados por redes sociais que buscam uma experiência familiar e poderosa,
        semelhante ao Twitter, mas com um toque único. Seja parte desta comunidade que valoriza a liberdade de expressão,
        a conexão com pessoas de todo o mundo e a disseminação de ideias.
      </p>

      <div className="form">
        <div className="card">
          <h2>Entrar no Growtwitter</h2>
          <form onSubmit={handleSubmit}>
            <div className="inputs">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>

            <div className="inputs">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {erro && <p className="erro">{erro}</p>}

            <button type="submit" className="botao-entrar">
              Entrar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;