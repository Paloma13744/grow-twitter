import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/HomePage.tsx";
import Explore from "../pages/Explore.tsx";
import Login from "../pages/Login.tsx";
import Profile from "../pages/Profile.tsx";

export const routes = createBrowserRouter([ 
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/feed",
    element: <Home/>
  },
  {
    path: "/explore",
    element: <Explore />
  },
  {
    path: "/profile/:username", 
    element: <Profile />
  }
]);