import { RouteObject } from "react-router-dom";

// Companies
import CompanyCreation from "../../modules/dashboard/screens/companyCreation";

// Products
import ProductCreation from "../../modules/dashboard/screens/productCreation";
import ProductDetails from "../../modules/dashboard/screens/productDetails";
import ProductList from "../../modules/dashboard/screens/productList";
import ProductListAdmin from "../../modules/dashboard/screens/productListAdmin";

// Users
import UserApprovals from "../../modules/dashboard/screens/userApprovals";
import TransactionStarted from "../../modules/dashboard/screens/transactionStarted";
import PaymentSummary from "../../modules/dashboard/screens/paymentSummary";
import Wishlist from "../../modules/dashboard/screens/wishlist";

const dashboardRoutes: RouteObject[] = [
  {
    path: "complete-registration",
    element: <CompanyCreation />,
  },
  {
    path: "purchase",
    element: <CompanyCreation />,
  },
  {
    path: "wallet",
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
    path: "products/:productId",
    element: <ProductDetails />
  },
  {
    path: "products-admin",
    element: <ProductListAdmin />
  },
  {
    path: "user-approvals",
    element: <UserApprovals />
  },
  {
    path: "transaction/:transactionId",
    element: <TransactionStarted />
  },
  {
    path: "payment-summary/:transactionId",
    element: <PaymentSummary />
  },
  {
    path: "wishlist",
    element: <Wishlist />
  }
];

export default dashboardRoutes;
