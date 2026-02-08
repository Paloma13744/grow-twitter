import { createBrowserRouter } from "react-router-dom";
import Feed from "../pages/Feed.tsx";
import Explore from "../pages/Explore.tsx";
import Login from "../pages/Login.tsx";
import Profile from "../pages/Profile.tsx";

export const routes = createBrowserRouter([ 
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/",
    element: <Feed />
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