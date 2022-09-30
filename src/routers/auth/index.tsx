import { lazy } from "react";
import { Navigate, RouteObject, useRoutes } from "react-router-dom";

const LoginPage = lazy(() => import("../../modules/auth/pages/login"));
const AuthLayout = lazy(() => import("../../modules/auth/layouts/authLayout"));
const authRoutes: RouteObject[] = [
  {
    path: "login",
    element: <LoginPage />,
  },
  {
    path: "neiro",
    element: <p>Hola Soy Neiro</p>,
  },
];

export default authRoutes;
