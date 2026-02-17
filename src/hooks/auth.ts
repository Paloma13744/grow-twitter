import { useSelector, useDispatch } from "react-redux";
import type { RootState, AppDispatch } from "../store";
import { setCredentials, clearAuth } from "../store/authSlice";

export function useAuth() {
  const dispatch: AppDispatch = useDispatch();

  const reduxToken = useSelector((state: RootState) => state.auth.token);
  const username = useSelector((state: RootState) => state.auth.username);
  const localToken = localStorage.getItem("auth_token");

  const token = reduxToken || localToken;
  const isAuthenticated = !!token;

  function login(token: string, username: string) {
    localStorage.setItem("auth_token", token);
    localStorage.setItem("username", username);

    dispatch(setCredentials({ token, username }));
  }

  function logout() {
    localStorage.removeItem("auth_token");
    localStorage.removeItem("username");
    dispatch(clearAuth());
  }

  return { token, username, isAuthenticated, login, logout };
}