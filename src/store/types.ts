import { TypedUseSelectorHook, useSelector } from "react-redux";
import { GetOrderQuery } from "../API";

export type TStore = {
  orders: GetOrderQuery["getOrder"][];
  selectedProperty: {
    name: string;
    open: boolean;
    currency: string;
  };
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
