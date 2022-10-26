import { RouteObject } from "react-router-dom";
import CompanyCreation from "../../modules/dashboard/screens/companyCreation";


const dashboardRoutes: RouteObject[] = [
  {
    path: "complete-registration",
    element: <CompanyCreation />,
  },
];

export default dashboardRoutes;
