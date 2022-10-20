import { lazy } from "react";
import { RouteObject } from "react-router-dom";

const LoginPage = lazy(() => import("../../modules/auth/pages/login"));
const RegisterPage = lazy(() => import("../../modules/auth/pages/register"));
const VerifyPage = lazy(() => import("../../modules/auth/pages/verify"));
const ForgotPasswordPage = lazy(() => import("../../modules/auth/pages/forgotPassword"));

const authRoutes: RouteObject[] = [
  {
    path: "login",
    element: <LoginPage />,
  },
  {
    path: "register",
    element: <RegisterPage />,
  },
  {
    path: "verify",
    element: <VerifyPage />
  },
  {
    path: "forgot-password",
    element: <ForgotPasswordPage />,
  },
];

export default authRoutes;
