import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import Login from "../pages/Login";
import Register from "../components/Register";
import App from "../App";
import useUserStore from "../stores/userStore";
import Admin from "../pages/Admin";
import PrivacyPolicy from "../components/PrivacyPolicy";
import TermAndCond from "../components/TermAndCond";

const guestRouter = createBrowserRouter([
  { path: "/", element: <Login /> },
  { path: "/register", element: <Register /> },
  { path: "/privacy-policy", element: <PrivacyPolicy /> },
  { path: "/terms-and-conditions", element: <TermAndCond /> },
  { path: "*", element: <Navigate to="/" /> },
]);

const userRouter = createBrowserRouter([
  { path: "/", element: <App /> },
  { path: "/admin", element: <Admin /> },
  { path: "*", element: <Navigate to="/" /> },
]);

export default function AppRouter() {
  const user = useUserStore((state) => state.user);
  const finalRouter = user ? userRouter : guestRouter;
  return <RouterProvider router={finalRouter} />;
}
