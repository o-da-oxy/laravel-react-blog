import {createBrowserRouter} from "react-router-dom";
import Login from "./pages/Login.tsx";
import Signup from "./pages/Signup.tsx";
import Posts from "./pages/Posts.tsx";
import NotFound from "./pages/NotFound.tsx";
import Home from "./pages/Home.tsx";

const router = createBrowserRouter([
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/signup',
    element: <Signup />
  },
  {
    path: '/posts',
    element: <Posts />
  },
  {
    path: '/',
    element: <Home />
  },
  {
    path: '*',
    element: <NotFound />
  }
]);

export default router;
