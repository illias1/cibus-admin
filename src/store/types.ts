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

export type OrderStatus = "READY" | "DENIED" | "REQUESTED" | "RECEIVED" | "PAYED";
export const OrderStatusEnum = {
  READY: "READY",
  DENIED: "DENIED",
  REQUESTED: "REQUESTED",
  RECEIVED: "RECEIVED",
  PAYED: "PAYED",
};

export const useTypedSelector: TypedUseSelectorHook<TStore> = useSelector;
