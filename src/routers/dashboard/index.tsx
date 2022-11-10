import { RouteObject } from "react-router-dom";
import CompanyCreation from "../../modules/dashboard/screens/companyCreation";
import ProductCreation from "../../modules/dashboard/screens/productCreation";


const dashboardRoutes: RouteObject[] = [
  {
    path: "complete-registration",
    element: <CompanyCreation />,
  },
  {
    path: "home",
    element: <h1>Home</h1>,
  },
  {
    path: "create-product",
    element: <ProductCreation />
  }
];

export default dashboardRoutes;
