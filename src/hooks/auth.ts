export function useAuth() {
  const token = localStorage.getItem("token");

  return {
    isAuthenticated: !!token,
    logout: () => {
      localStorage.removeItem("token");
      window.location.href = "/login";
    }
  };
}