import { useOutletContext } from "react-router-dom";

type ContextType = {
  authenticatedUser: {
    firstName: string,
    lastName: string,
    role: string,
    profileImage: string,
    company: string,
  } | null;
};

export function useUser() {
  return useOutletContext<ContextType>();
}

export const isSeller = (authenticatedUser: any): boolean => authenticatedUser && authenticatedUser.role === "Seller";
export const isBuyer = (authenticatedUser: any): boolean => authenticatedUser && authenticatedUser.role === "Buyer";