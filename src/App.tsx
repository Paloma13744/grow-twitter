import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/HomePage";
import Explore from "./pages/Explore";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import { useAuth } from "./hooks/auth";
import "./index.css"; 

export default function App() {
  const { isAuthenticated } = useAuth();

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={isAuthenticated ? <Home/> : <Navigate to="/login" />} />
        <Route path="/explore" element={isAuthenticated ? <Explore /> : <Navigate to="/login" />} />
        <Route path="/profile/:username" element={isAuthenticated ? <Profile /> : <Navigate to="/login" />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}