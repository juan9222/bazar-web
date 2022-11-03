import { PropsWithChildren } from "react";

export interface IPrivateRouteProps extends PropsWithChildren {
  requiredPrivileges?: string[];
}