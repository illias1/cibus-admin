import { TypedUseSelectorHook, useSelector } from "react-redux";
import { GetOrderQuery, Language, MenuComponentInput } from "../API";
import { TcategorizedMenuItems } from "../pages/Menu/components/utils";
import { TNonNullPropertyQuery } from "../types";

export type TStore = {
  orders: NonNullable<GetOrderQuery["getOrder"]>[];
  selectedProperty: {
    name: string;
    open: boolean;
    currency: string;
  };
  menu: {
    categorizedItems: TcategorizedMenuItems;
    categoriesNumber: number;
    languages: Language[];
    menuComponents: MenuComponentInput[];
  };
  stuffCalls: {
    table: string;
    createdAt: string;
  }[];
};

export type OrderStatus =
  | "RECEIVED_BY_RESTAURANT"
  | "DENIED"
  | "REQUESTED_BY_CUSTOMER"
  | "READY"
  | "PAYED";
export const OrderStatusEnum = {
  RECEIVED_BY_RESTAURANT: "RECEIVED_BY_RESTAURANT",
  DENIED: "DENIED",
  REQUESTED_BY_CUSTOMER: "REQUESTED_BY_CUSTOMER",
  READY: "READY",
  PAYED: "PAYED",
};

export const useTypedSelector: TypedUseSelectorHook<TStore> = useSelector;
