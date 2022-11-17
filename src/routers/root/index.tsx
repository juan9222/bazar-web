import { Navigate, RouteObject } from "react-router-dom";
import Authlayout from "../../modules/auth/layouts/authLayout";
import Dashboardlayout from "../../modules/dashboard/layouts/dashboardLayout";
import NotFound from "../../modules/auth/pages/notFound";
import authRoutes from "../auth";
import dashboardRoutes from '../dashboard/index';
import PrivateRoutes from "../../modules/auth/components/privateRoutes";


export const publicRoutes: RouteObject[] = [
  {
    path: "/",
    element: <Navigate to="/dashboard/complete-registration" />,
  },
  {
    path: "/auth",
    element: <Authlayout />,
    children: authRoutes,
  },
  {
    path: "/not-found",
    element: <NotFound />,
  },
  {
    path: "*",
    element: <Navigate to="/not-found" />,
  },
];

export const privateRoutes: RouteObject[] = [
  {
    path: "/dashboard",
    element: <PrivateRoutes />,
    children: dashboardRoutes,
  },
];