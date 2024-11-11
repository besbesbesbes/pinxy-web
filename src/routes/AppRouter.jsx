import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";

import App from "../App";
import useUserStore from "../stores/userStore";
import Admin from "../pages/Admin";
import LayoutAdmin from "../layouts/LayoutAdmin";
import PostManage from "../pages/admin/PostManage";
import UserManage from "../pages/admin/UserManage";
import Landing from "../pages/Landing"

import Pinxy from "../pinxy";
import ResetPassword from "../pages/ResetPassword";

const guestRouter = createBrowserRouter([
  { path: "/", element: <Landing /> },
  { path: "*", element: <Navigate to="/" /> },
  { path: "/posts", element: <Pinxy /> },
  { path: "/reset-password/:token", element: <ResetPassword /> },
]);

const userRouter = createBrowserRouter([
  { path: "/", element: <Pinxy /> },
  {
    path: "/admin",
    element: <LayoutAdmin />,
    children: [
      { index: true, element: <PostManage /> },
      { path: 'usermanage', element: <UserManage /> },
    ]

  },
  { path: "*", element: <Navigate to="/" /> },
]);

export default function AppRouter() {
  const user = useUserStore((state) => state.user);
  const finalRouter = user ? userRouter : guestRouter;
  return <RouterProvider router={finalRouter} />;
}
