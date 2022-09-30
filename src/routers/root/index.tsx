import { lazy } from "react";
import { Navigate, RouteObject } from "react-router-dom";
import authRoutes from "../auth";

const AuthLayout = lazy(() => import("../../modules/auth/layouts/authLayout"));
const rootRoutes: RouteObject[] = [
  {
    path: "/",
    element: <Navigate to="auth/login" />,
    errorElement: <h2> ERROR </h2>,
  },
  {
    path: "/auth",
    element: <AuthLayout />,
    children: authRoutes,
  },
];

export default rootRoutes;
