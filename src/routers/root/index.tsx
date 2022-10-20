import { lazy } from "react";
import { RouteObject } from "react-router-dom";
import authRoutes from "../auth";

const AuthLayout = lazy(() => import("../../modules/auth/layouts/authLayout"));
const rootRoutes: RouteObject[] = [
  {
    path: "/auth",
    element: <AuthLayout />,
    children: authRoutes,
  },
];

export default rootRoutes;
