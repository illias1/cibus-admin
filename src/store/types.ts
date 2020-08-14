import { TypedUseSelectorHook, useSelector } from "react-redux";
import { TItems } from "../sampleData";

export type TStore = {
  userName: string;
  userAlreadyVisited: boolean;
  cart: TCartItem[];
  groupCart: TGroupCartItem[];
  groupCartOrderPlaced: boolean;
  feedback: {
    open: boolean;
    message: string;
  };
};

export type TCartItem = {
  item: TItems;
  status: TCartItemStatus;
  quantity: number;
  img: string;
};
export type TCartItemStatus = "added" | "placed";

export type TGroupCartItem = {
  customerName: string;
  price: number;
  tip: number;
};

export const useTypedSelector: TypedUseSelectorHook<TStore> = useSelector;
