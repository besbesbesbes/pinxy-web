import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import Login from "../pages/Login";
import App from "../App";
import useUserStore from "../stores/userStore";
import Admin from "../pages/Admin";
import LayoutAdmin from "../layouts/LayoutAdmin";
import PostManage from "../pages/admin/PostManage";
import UserManage from "../pages/admin/UserManage";

const guestRouter = createBrowserRouter([
  { path: "/", element: <Login /> },
  { path: "*", element: <Navigate to="/" /> },
]);

const userRouter = createBrowserRouter([
  { path: "/", element: <App /> },
  { path: "/admin",
     element: <LayoutAdmin />,
     children : [
      {index : true,element: <PostManage />},
      { path : 'usermanage', element : <UserManage />},
     ]

     },
  { path: "*", element: <Navigate to="/" /> },
]);

export default function AppRouter() {
  const user = useUserStore((state) => state.user);
  const finalRouter = user ? userRouter : guestRouter;
  return <RouterProvider router={finalRouter} />;
}
