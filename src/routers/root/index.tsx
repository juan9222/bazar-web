import { RouteObject, Navigate } from "react-router-dom";
import Authlayout from "../../modules/auth/layouts/authLayout";
import authRoutes from "../auth";

const rootRoutes: RouteObject[] = [
  {
    path: "/",
    element: <Navigate to="/auth/login" />
  },
  {
    path: "/auth",
    element: <Authlayout />,
    children: authRoutes,
  },
];

export default rootRoutes;
