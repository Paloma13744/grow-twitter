import { useSelector, useDispatch } from "react-redux";
import type { RootState, AppDispatch } from "../store";
import { setCredentials, clearAuth } from "../store/authSlice";

export function useAuth() {
  const dispatch: AppDispatch = useDispatch();

  const reduxToken = useSelector((state: RootState) => state.auth.token);
  const reduxUsername = useSelector((state: RootState) => state.auth.username);
  const reduxName = useSelector((state: RootState) => state.auth.name);
  const reduxEmail = useSelector((state: RootState) => state.auth.email);
  const reduxImageUrl = useSelector((state: RootState) => state.auth.imageUrl);

  const localToken = localStorage.getItem("auth_token");

  const token = reduxToken || localToken;
  const isAuthenticated = !!token;

  function login(
    token: string,
    username: string,
    name: string,
    email: string,
    imageUrl: string
  ) {
    localStorage.setItem("auth_token", token);
    localStorage.setItem("username", username);

    dispatch(
      setCredentials({
        token,
        username,
        name,
        email,
        imageUrl,
      })
    );
  }

  function logout() {
    localStorage.removeItem("auth_token");
    localStorage.removeItem("username");
    dispatch(clearAuth());
  }

  return {
    token,
    username: reduxUsername,
    name: reduxName,
    email: reduxEmail,
    imageUrl: reduxImageUrl,
    isAuthenticated,
    login,
    logout,
  };
}