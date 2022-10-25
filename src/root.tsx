import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import rootRoutes from "./routers/root";
import useInterceptor from "./shared/config/interceptor";

const Root = () => {
  useInterceptor();
  return (
    <React.StrictMode>
      <RouterProvider router={ createBrowserRouter(rootRoutes) } />
    </React.StrictMode>
  );
};

export default Root;