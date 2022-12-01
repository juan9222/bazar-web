import { RouteObject } from "react-router-dom";
import CompanyCreation from "../../modules/dashboard/screens/companyCreation";
import ProductCreation from "../../modules/dashboard/screens/productCreation";
import ProductList from "../../modules/dashboard/screens/productList";
import UserApprovals from "../../modules/dashboard/screens/userApprovals";

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
  },
  {
    path: "product-list",
    element: <ProductList />
  },
  {
    path: "user-approvals",
    element: <UserApprovals />
  },
];

export default dashboardRoutes;
