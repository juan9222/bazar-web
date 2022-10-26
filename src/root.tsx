import React from "react";
import { createBrowserRouter, RouterProvider, RouteObject } from "react-router-dom";
import {publicRoutes, privateRoutes} from "./routers/root";
import useInterceptor from "./shared/config/interceptor";

const Root = () => {
  useInterceptor();

  const rootRoutes: RouteObject[] = [
    ...publicRoutes,
    ...privateRoutes,
  ];

  return (

    <RouterProvider router={ createBrowserRouter(rootRoutes) } />

  );
};

export default Root;