import { lazy } from "react";
import { RouteObject } from "react-router-dom";

const CreateOrder = lazy(() => import("../../modules/demo/pages/createOrder"));
const demoRoutes: RouteObject[] = [
  {
    path: "create-order",
    element: <CreateOrder />,
  },
];

export default demoRoutes;
