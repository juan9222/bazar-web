import { RouteObject, Navigate } from "react-router-dom";
import Authlayout from "../../modules/auth/layouts/authLayout";
import Dashboardlayout from "../../modules/dashboard/layouts/dashboardLayout";
import authRoutes from "../auth";
import dashboardRoutes from '../dashboard/index';

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
  {
    path: "/dashboard",
    element: <Dashboardlayout />,
    children: dashboardRoutes,
  },
];

export default rootRoutes;
