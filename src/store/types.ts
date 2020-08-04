import { TypedUseSelectorHook, useSelector } from "react-redux";
import { TItems } from "../pages/Menu/components/MenuScreen.tsx/MenuScreen";

export type TStore = {
  userName: string;
  userAlreadyVisited: boolean;
  cart: TCartItem[];
  groupCart: TGroupCartItem[];
  groupCartOrderPlaced: boolean;
};

export type TCartItem = {
  item: TItems;
  status: TCartItemStatus;
  quantity: number;
};
export type TCartItemStatus = "added" | "placed";

export type TGroupCartItem = {
  customerName: string;
  price: number;
  tip: number;
};

export const useTypedSelector: TypedUseSelectorHook<TStore> = useSelector;
