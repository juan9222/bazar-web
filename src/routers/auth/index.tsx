import { RouteObject } from "react-router-dom";
import Login from "../../modules/auth/pages/login";
import Register from "../../modules/auth/pages/register";
import Verify from "../../modules/auth/pages/verify";
import ForgotPassword from '../../modules/auth/pages/forgotPassword/index';


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
    element: <ForgotPassword />
  },
];

export default authRoutes;
