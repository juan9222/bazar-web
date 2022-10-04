import { lazy } from "react";
import { RouteObject } from "react-router-dom";
import ForgotPassword from "../../modules/auth/pages/forgotPassword";
import Register from "../../modules/auth/pages/register";

const LoginPage = lazy(() => import("../../modules/auth/pages/login"));
const authRoutes: RouteObject[] = [
  {
    path: "login",
    element: <LoginPage />,
  },
  {
    path: "register",
    element: <Register />,
  },
  {
    path: "forgot-password",
    element: <ForgotPassword />,
  },
];

export default authRoutes;
