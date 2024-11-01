import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";

import App from "../App";
import useUserStore from "../stores/userStore";
import Admin from "../pages/Admin";
import Landing from "../pages/Landing"

import Pinxy from "../pinxy";

const guestRouter = createBrowserRouter([
  { path: "/", element: <Landing /> },
  { path: "*", element: <Navigate to="/" /> },
  { path: "/posts", element: <Pinxy /> },
]);

const userRouter = createBrowserRouter([
  { path: "/", element: <Pinxy /> },
  { path: "/admin", element: <Admin /> },
  { path: "*", element: <Navigate to="/" /> },
]);

export default function AppRouter() {
  const user = useUserStore((state) => state.user);
  const finalRouter = user ? userRouter : guestRouter;
  return <RouterProvider router={finalRouter} />;
}
