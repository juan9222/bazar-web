import { useOutletContext } from "react-router-dom";
import { getLocalStorageItem } from "../../../../common/helpers";

type ContextType = {
  authenticatedUser: {
    firstName: string,
    lastName: string,
    role: string,
    profileImage: string,
    company: string,
  } | null,
  binanceAccount: {
    myAccount: string,
  };
};

export function useUser() {
  return useOutletContext<ContextType>();
}

export const isSeller = (): boolean => (getLocalStorageItem('roles') as string).includes('seller');
export const isBuyer = (): boolean => (getLocalStorageItem('roles') as string).includes('buyer');
export const isAdmin = (): boolean => (getLocalStorageItem('roles') as string).includes('admin');