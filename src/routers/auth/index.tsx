import { RouteObject } from "react-router-dom";
import ForgotPassword from "../../modules/auth/pages/forgotPassword";
import Login from "../../modules/auth/pages/login";
import Register from "../../modules/auth/pages/register";
import Verify from "../../modules/auth/pages/verify";


const authRoutes: RouteObject[] = [
  {
    path: "login",
    element: <Login />,
  },
  {
    path: "register",
    element: <Register />,
  },
  {
    path: "verify",
    element: <Verify />
  },
  {
    path: "forgot-password",
    element: <ForgotPassword />,
  },
];

export default authRoutes;
