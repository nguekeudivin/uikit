"use client";

import { IdType } from "@/types/shared";
import { createContext, ReactNode, useContext } from "react";

interface AccountContextType {
  addPaymentMethodDialog: any;
  addAddressDialog: any;
  addressBookDialog: any;
  paymentMethodDialog: any;
  defaultAddress: any;
  setDefaultAddress: any;
  defaultPaymentMethod: any;
  setDefaultPaymentMethod: any;
}

export interface AccountProvideProps {
  children: ReactNode;
}

export const AccountContext = createContext<AccountContextType | undefined>(
  undefined
);

export const useAccount = (): AccountContextType => {
  const context = useContext(AccountContext);
  if (!context) {
    throw new Error("useEmail must be used within a EmailProvider");
  }
  return context;
};
